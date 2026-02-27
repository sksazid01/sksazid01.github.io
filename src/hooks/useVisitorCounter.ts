'use client'

/**
 * useVisitorCounter
 *
 * Increments a visit counter in Upstash Redis on every page load and returns
 * the live count (plus a fixed offset of 2000 so the number looks reasonable
 * from day one).
 *
 * Security notes:
 *  - The REST token is embedded in the static bundle (NEXT_PUBLIC_).  This is
 *    acceptable because this key only has access to one Redis database.
 *  - Lock it down further in the Upstash dashboard:
 *    Settings → Allow List → add "https://sksazid.me"
 *    so the token is useless from any other origin.
 *  - The counter key is "portfolio:visitors" — nothing sensitive is stored.
 */

import { useState, useEffect } from 'react'

const UPSTASH_URL  = process.env.NEXT_PUBLIC_UPSTASH_REST_URL   ?? ''
const UPSTASH_TOKEN = process.env.NEXT_PUBLIC_UPSTASH_REST_TOKEN ?? ''

// Added to the raw Redis count so the number starts at a realistic baseline
const BASE_OFFSET = 2000
// Redis key used for the counter
const COUNTER_KEY = 'portfolio:visitors'

async function upstashFetch(command: string[]): Promise<number | null> {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return null

  try {
    const res = await fetch(`${UPSTASH_URL}/${command.join('/')}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${UPSTASH_TOKEN}`,
      },
      // Don't cache — always get the latest count
      cache: 'no-store',
    })

    if (!res.ok) return null
    const data = await res.json()
    // Upstash REST API response shape: { result: number }
    return typeof data.result === 'number' ? data.result : null
  } catch {
    return null
  }
}

export function useVisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number>(BASE_OFFSET)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function run() {
      // INCR atomically increments and returns the new value in one call
      const raw = await upstashFetch(['incr', COUNTER_KEY])

      if (!cancelled) {
        if (raw !== null) {
          setVisitorCount(raw + BASE_OFFSET)
        }
        // If Upstash is unreachable just keep the BASE_OFFSET default
        setLoading(false)
      }
    }

    run()
    return () => { cancelled = true }
  }, [])

  return { visitorCount, loading }
}
