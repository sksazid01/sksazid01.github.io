'use client'

/**
 * useVisitorCounter
 *
 * On a NEW visit (new tab / hard refresh):
 *  1. Fetches IP + geolocation from ipapi.co
 *  2. Collects browser, OS, device, screen, referrer, language, timestamp
 *  3. Runs an Upstash pipeline:
 *       INCR  portfolio:visitors            ← bump the counter
 *       LPUSH portfolio:visitors:log <json> ← store visitor record
 *       LTRIM portfolio:visitors:log 0 999  ← keep last 1 000 entries
 *
 * On a NORMAL refresh (F5 / Ctrl+R):
 *  - sessionStorage flag is still set → only GET the counter, no write.
 *
 * Data stored per visit (all in one JSON string inside the Redis list):
 *  ip, country, country_code, region, city, latitude, longitude, org,
 *  browser, os, device, screen, referrer, language, timestamp
 */

import { useState, useEffect } from 'react'

const UPSTASH_URL   = process.env.NEXT_PUBLIC_UPSTASH_REST_URL   ?? ''
const UPSTASH_TOKEN = process.env.NEXT_PUBLIC_UPSTASH_REST_TOKEN ?? ''

const BASE_OFFSET    = 2000
const COUNTER_KEY    = 'portfolio:visitors'
const LOG_KEY        = 'portfolio:visitors:log'
const SESSION_KEY    = 'visitor_counted'
const MAX_LOG        = 1000   // keep last N visits in the Redis list

// ─── Types ────────────────────────────────────────────────────────────────────

interface VisitorData {
  // Geolocation
  ip?:           string
  country?:      string
  country_code?: string
  region?:       string
  city?:         string
  latitude?:     number
  longitude?:    number
  org?:          string
  // Browser / device
  browser:   string
  os:        string
  device:    string
  screen:    string
  referrer:  string
  language:  string
  timestamp: string
}

// ─── Upstash helpers ──────────────────────────────────────────────────────────

/** GET / INCR via URL-based REST (returns a single number). */
async function upstashFetch(command: string[]): Promise<number | null> {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return null
  try {
    const res = await fetch(`${UPSTASH_URL}/${command.join('/')}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
      cache: 'no-store',
    })
    if (!res.ok) return null
    const data = await res.json()
    if (typeof data.result === 'number') return data.result
    if (typeof data.result === 'string') {
      const parsed = parseInt(data.result, 10)
      return isNaN(parsed) ? null : parsed
    }
    return null
  } catch {
    return null
  }
}

/** Run multiple commands in one round-trip via the pipeline endpoint. */
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

// ─── Visitor data collection ──────────────────────────────────────────────────

function parseUserAgent(ua: string): { browser: string; os: string; device: string } {
  let browser = 'Unknown'
  let os      = 'Unknown'
  let device  = 'Desktop'

  // Browser (order matters — Edge/OPR embed "Chrome" too)
  if      (ua.includes('Edg/'))                              browser = 'Edge'
  else if (ua.includes('Firefox/'))                          browser = 'Firefox'
  else if (ua.includes('OPR/') || ua.includes('Opera'))     browser = 'Opera'
  else if (ua.includes('Chrome/'))                           browser = 'Chrome'
  else if (ua.includes('Safari/') && !ua.includes('Chrome')) browser = 'Safari'

  // OS
  if      (ua.includes('Windows NT'))                        os = 'Windows'
  else if (ua.includes('Mac OS X'))                          os = 'macOS'
  else if (ua.includes('Android'))                           os = 'Android'
  else if (ua.includes('iPhone') || ua.includes('iPad'))     os = 'iOS'
  else if (ua.includes('Linux'))                             os = 'Linux'

  // Device
  if      (ua.includes('Mobile') || ua.includes('Android') || ua.includes('iPhone')) device = 'Mobile'
  else if (ua.includes('Tablet') || ua.includes('iPad'))     device = 'Tablet'

  return { browser, os, device }
}

async function collectVisitorData(): Promise<VisitorData> {
  const ua = navigator.userAgent
  const { browser, os, device } = parseUserAgent(ua)

  const data: VisitorData = {
    browser,
    os,
    device,
    screen:    `${window.screen.width}x${window.screen.height}`,
    referrer:  document.referrer || 'Direct',
    language:  navigator.language,
    timestamp: new Date().toISOString(),
  }

  // IP + geolocation via ipapi.co (free, no API key required)
  try {
    const geo = await fetch('https://ipapi.co/json/', { cache: 'no-store' })
    if (geo.ok) {
      const g = await geo.json()
      data.ip           = g.ip
      data.country      = g.country_name
      data.country_code = g.country_code
      data.region       = g.region
      data.city         = g.city
      data.latitude     = g.latitude
      data.longitude    = g.longitude
      data.org          = g.org
    }
  } catch {
    // geolocation unavailable — continue without it
  }

  return data
}

// ─── Singleton promise (one request per page load) ────────────────────────────

let singletonPromise: Promise<number | null> | null = null

function resolveCount(): Promise<number | null> {
  if (singletonPromise) return singletonPromise

  const alreadyCounted =
    typeof sessionStorage !== 'undefined' &&
    sessionStorage.getItem(SESSION_KEY) === '1'

  if (alreadyCounted) {
    // Normal refresh — just read the current value, no write
    singletonPromise = upstashFetch(['get', COUNTER_KEY])
  } else {
    // New visit — collect data, then pipeline INCR + LPUSH + LTRIM
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(SESSION_KEY, '1')
    }
    singletonPromise = (async (): Promise<number | null> => {
      const visitorData = await collectVisitorData()
      const jsonString  = JSON.stringify(visitorData)

      const results = await upstashPipeline([
        ['INCR', COUNTER_KEY],
        ['LPUSH', LOG_KEY, jsonString],
        ['LTRIM', LOG_KEY, '0', String(MAX_LOG - 1)],
      ])

      // results[0] is the INCR response — the new counter value
      if (results && typeof (results[0]?.result) === 'number') {
        return results[0].result as number
      }
      // Fallback: GET the counter if pipeline failed
      return upstashFetch(['get', COUNTER_KEY])
    })()
  }

  return singletonPromise
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useVisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number>(BASE_OFFSET)
  const [loading, setLoading] = useState(true)

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
