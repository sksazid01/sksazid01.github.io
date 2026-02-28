'use client'

/**
 * useVisitorCounter
 *
 * Redis data model
 * ─────────────────────────────────────────────────────────────────────────────
 * portfolio:visitors            STRING  – total visit counter (increments every new session)
 * portfolio:visitors:log        HASH    – field = IP address (or fallback session ID)
 *                                         value = JSON {
 *                                           ip, country, country_code, region,
 *                                           city, latitude, longitude, org,
 *                                           browser, os, device, screen,
 *                                           referrer, language,
 *                                           count,        ← visit count for this IP
 *                                           firstVisit,   ← ISO timestamp
 *                                           lastVisit     ← ISO timestamp
 *                                         }
 *
 * Logic per new session (sessionStorage flag absent):
 *  1. Collect browser/device data + fetch IP+geolocation from ipapi.co
 *  2. HGET portfolio:visitors:log <ip>
 *     • IP is NEW  → INCR portfolio:visitors + HSET the full record (count=1)
 *     • IP is KNOWN → INCR portfolio:visitors + update count++ and lastVisit via HSET
 *  → Counter ALWAYS increments for every new session regardless of IP.
 *
 * Normal refresh (F5/Ctrl+R) → sessionStorage flag present → GET counter only.
 */

import { useState, useEffect } from 'react'

const UPSTASH_URL   = process.env.NEXT_PUBLIC_UPSTASH_REST_URL   ?? ''
const UPSTASH_TOKEN = process.env.NEXT_PUBLIC_UPSTASH_REST_TOKEN ?? ''

const BASE_OFFSET = 2000
const COUNTER_KEY = 'portfolio:visitors'
const LOG_KEY     = 'portfolio:visitors:log'
const SESSION_KEY = 'visitor_counted'

// ─── Types ────────────────────────────────────────────────────────────────────

interface VisitorRecord {
  ip:           string
  country:      string
  country_code: string
  region:       string
  city:         string
  latitude:     number | null
  longitude:    number | null
  org:          string
  browser:      string
  os:           string
  device:       string
  screen:       string
  referrer:     string
  language:     string
  count:        number
  firstVisit:   string
  lastVisit:    string
}

// ─── Upstash helpers ──────────────────────────────────────────────────────────

/** Single command via URL-path REST API. */
async function upstashFetch(command: string[]): Promise<unknown> {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return null
  try {
    const res = await fetch(`${UPSTASH_URL}/${command.map(encodeURIComponent).join('/')}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
      cache: 'no-store',
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.result ?? null
  } catch {
    return null
  }
}

/** Pipeline: multiple commands in one HTTP request. */
async function upstashPipeline(
  commands: (string | number)[][],
): Promise<Array<{ result: unknown }> | null> {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return null
  try {
    const res = await fetch(`${UPSTASH_URL}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${UPSTASH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commands),
      cache: 'no-store',
    })
    if (!res.ok) return null
    const data = await res.json()
    return Array.isArray(data) ? data : null
  } catch {
    return null
  }
}

function toNumber(raw: unknown): number | null {
  if (typeof raw === 'number') return raw
  if (typeof raw === 'string') {
    const n = parseInt(raw, 10)
    return isNaN(n) ? null : n
  }
  return null
}

// ─── Visitor data collection ──────────────────────────────────────────────────

function parseUserAgent(ua: string): { browser: string; os: string; device: string } {
  let browser = 'Unknown'
  let os      = 'Unknown'
  let device  = 'Desktop'

  if      (ua.includes('Edg/'))                               browser = 'Edge'
  else if (ua.includes('Firefox/'))                           browser = 'Firefox'
  else if (ua.includes('OPR/') || ua.includes('Opera'))      browser = 'Opera'
  else if (ua.includes('Chrome/'))                            browser = 'Chrome'
  else if (ua.includes('Safari/') && !ua.includes('Chrome'))  browser = 'Safari'

  if      (ua.includes('Windows NT'))                         os = 'Windows'
  else if (ua.includes('Mac OS X'))                           os = 'macOS'
  else if (ua.includes('Android'))                            os = 'Android'
  else if (ua.includes('iPhone') || ua.includes('iPad'))      os = 'iOS'
  else if (ua.includes('Linux'))                              os = 'Linux'

  if      (ua.includes('Mobile') || ua.includes('Android') || ua.includes('iPhone')) device = 'Mobile'
  else if (ua.includes('Tablet') || ua.includes('iPad'))      device = 'Tablet'

  return { browser, os, device }
}

async function fetchGeoAndBuild(): Promise<Omit<VisitorRecord, 'count' | 'firstVisit' | 'lastVisit'>> {
  const ua = navigator.userAgent
  const { browser, os, device } = parseUserAgent(ua)

  const base = {
    ip: '',
    country: 'Unknown', country_code: '', region: '', city: '',
    latitude: null as number | null, longitude: null as number | null, org: '',
    browser, os, device,
    screen:   `${window.screen.width}x${window.screen.height}`,
    referrer: document.referrer || 'Direct',
    language: navigator.language,
  }

  try {
    const geo = await fetch('https://ipapi.co/json/', { cache: 'no-store' })
    if (geo.ok) {
      const g = await geo.json()
      base.ip           = g.ip           ?? ''
      base.country      = g.country_name ?? 'Unknown'
      base.country_code = g.country_code ?? ''
      base.region       = g.region       ?? ''
      base.city         = g.city         ?? ''
      base.latitude     = g.latitude     ?? null
      base.longitude    = g.longitude    ?? null
      base.org          = g.org          ?? ''
    }
  } catch { /* continue without geo */ }

  return base
}

// ─── Core logic ───────────────────────────────────────────────────────────────

let singletonPromise: Promise<number | null> | null = null

function resolveCount(): Promise<number | null> {
  if (singletonPromise) return singletonPromise

  const alreadyCounted =
    typeof sessionStorage !== 'undefined' &&
    sessionStorage.getItem(SESSION_KEY) === '1'

  if (alreadyCounted) {
    // Normal refresh — read-only
    singletonPromise = upstashFetch(['get', COUNTER_KEY]).then(toNumber)
    return singletonPromise
  }

  // New session — flag immediately to prevent double-counting
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem(SESSION_KEY, '1')
  }

  singletonPromise = (async (): Promise<number | null> => {
    const baseData = await fetchGeoAndBuild()
    // Fallback: if geo lookup failed and no IP was returned, generate a
    // random session ID so visitors without an IP don't overwrite each other
    // in the Hash. Prefix with 'anon:' to distinguish from real IPs.
    const ip  = baseData.ip || `anon:${crypto.randomUUID()}`
    const now = new Date().toISOString()

    // Check if this IP has visited before
    const existing = await upstashFetch(['hget', LOG_KEY, ip])

    if (existing && typeof existing === 'string') {
      // ── Returning IP: increment counter + update count & lastVisit ──
      try {
        const record: VisitorRecord = JSON.parse(existing)
        record.count    += 1
        record.lastVisit = now

        const results = await upstashPipeline([
          ['INCR', COUNTER_KEY],
          ['HSET', LOG_KEY, ip, JSON.stringify(record)],
        ])

        return toNumber(results?.[0]?.result)
      } catch {
        return toNumber(await upstashFetch(['get', COUNTER_KEY]))
      }
    } else {
      // ── Brand-new IP: store full record + increment total counter ──
      const record: VisitorRecord = {
        ...baseData,
        ip,
        count:      1,
        firstVisit: now,
        lastVisit:  now,
      }

      const results = await upstashPipeline([
        ['INCR', COUNTER_KEY],
        ['HSET', LOG_KEY, ip, JSON.stringify(record)],
      ])

      return toNumber(results?.[0]?.result)
    }
  })()

  return singletonPromise
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useVisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number>(BASE_OFFSET)
  const [loading, setLoading]           = useState(true)

  useEffect(() => {
    let cancelled = false

    async function run() {
      const raw = await resolveCount()
      if (!cancelled) {
        if (raw !== null) setVisitorCount(raw + BASE_OFFSET)
        setLoading(false)
      }
    }

    run()
    return () => { cancelled = true }
  }, [])

  return { visitorCount, loading }
}
