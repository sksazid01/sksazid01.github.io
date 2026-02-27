'use client'

/**
 * useVisitorCounter
 *
 * Increments the Upstash Redis counter only for new visits (new tab / hard
 * refresh).  A normal refresh reuses the existing sessionStorage flag and only
 * GETs the current count — no increment.
 *
 * Behaviour summary:
 *  - New visitor / hard refresh  → INCR  (sessionStorage cleared by browser)
 *  - Normal refresh (F5 / Ctrl+R) → GET   (sessionStorage survives)
 *  - Multiple components on the same page → singleton promise, one request
 *
 * Security notes:
 *  - The REST token is embedded in the static bundle (NEXT_PUBLIC_).
 *  - Lock it down in Upstash: Settings → Allow List → "https://sksazid.me"
 *  - The counter key is "portfolio:visitors" — nothing sensitive is stored.
 */

import { useState, useEffect } from 'react'

const UPSTASH_URL   = process.env.NEXT_PUBLIC_UPSTASH_REST_URL   ?? ''
const UPSTASH_TOKEN = process.env.NEXT_PUBLIC_UPSTASH_REST_TOKEN ?? ''

const BASE_OFFSET = 2000
const COUNTER_KEY = 'portfolio:visitors'
// sessionStorage key — present for the lifetime of the browser tab
const SESSION_KEY = 'visitor_counted'

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
    // INCR returns a number; GET returns a string — handle both
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

// Module-level singleton so all hook instances (one per component) share
// a single in-flight request — INCR or GET fires exactly once per page load.
let singletonPromise: Promise<number | null> | null = null

function resolveCount(): Promise<number | null> {
  if (!singletonPromise) {
    const alreadyCounted =
      typeof sessionStorage !== 'undefined' &&
      sessionStorage.getItem(SESSION_KEY) === '1'

    if (alreadyCounted) {
      // Normal refresh — just read the current value, do not increment
      singletonPromise = upstashFetch(['get', COUNTER_KEY])
    } else {
      // New visitor or hard refresh — increment and flag this session
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem(SESSION_KEY, '1')
      }
      singletonPromise = upstashFetch(['incr', COUNTER_KEY])
    }
  }
  return singletonPromise
}

export function useVisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number>(BASE_OFFSET)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function run() {
      const raw = await resolveCount()

      if (!cancelled) {
        if (raw !== null) {
          setVisitorCount(raw + BASE_OFFSET)
        }
        setLoading(false)
      }
    }

    run()
    return () => { cancelled = true }
  }, [])

  return { visitorCount, loading }
}
