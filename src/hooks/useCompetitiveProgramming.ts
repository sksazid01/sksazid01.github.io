'use client'

import { useState, useEffect, useCallback } from 'react'
import { 
  fetchCodeforcesStats, 
  fetchVJudgeStats, 
  fetchCodeChefStats,
  fetchLeetCodeStats,
  getCachedData,
  setCachedData,
  type CodeforcesStat,
  type VJudgeStat,
  type CodeChefStat,
  type LeetCodeStat
} from '@/utils/competitiveProgramming'

interface CompetitiveProgrammingData {
  codeforces: CodeforcesStat | null
  vjudge: VJudgeStat | null
  codechef: CodeChefStat | null
  leetcode: LeetCodeStat | null
}

interface UseCompetitiveProgrammingReturn {
  data: CompetitiveProgrammingData
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
  lastUpdated: Date | null
}

export function useCompetitiveProgramming(handle: string): UseCompetitiveProgrammingReturn {
  const [data, setData] = useState<CompetitiveProgrammingData>({
    codeforces: null,
    vjudge: null,
    codechef: null,
    leetcode: null
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchData = useCallback(async (useCache = true) => {
    setLoading(true)
    setError(null)

    try {
      // Try to get cached data first
      if (useCache) {
        const cached = getCachedData(handle)
        if (cached) {
          setData(cached.data)
          setLastUpdated(new Date(cached.lastUpdated))
          setLoading(false)
          return
        }
      }

      // Fetch fresh data from all platforms
      const [codeforcesResult, vjudgeResult, codechefResult, leetcodeResult] = await Promise.allSettled([
        fetchCodeforcesStats(handle),
        fetchVJudgeStats(handle),
        fetchCodeChefStats(handle),
        fetchLeetCodeStats(handle)
      ])

      const newData: CompetitiveProgrammingData = {
        codeforces: codeforcesResult.status === 'fulfilled' ? codeforcesResult.value : null,
        vjudge: vjudgeResult.status === 'fulfilled' ? vjudgeResult.value : null,
        codechef: codechefResult.status === 'fulfilled' ? codechefResult.value : null,
        leetcode: leetcodeResult.status === 'fulfilled' ? leetcodeResult.value : null
      }

      // Cache the new data
      const cacheData = {
        data: newData,
        lastUpdated: new Date().toISOString()
      }
      setCachedData(handle, cacheData)

      setData(newData)
      setLastUpdated(new Date())

    } catch (err) {

      setError('Failed to fetch competitive programming data')
    } finally {
      setLoading(false)
    }
  }, [handle])

  const refresh = useCallback(async () => {
    await fetchData(false) // Force fresh data
  }, [fetchData])

  // Initial load
  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Auto-refresh every 10 minutes when component is visible
  useEffect(() => {
    const interval = setInterval(() => {
      if (!document.hidden) {
        fetchData()
      }
    }, 10 * 60 * 1000) // 10 minutes

    return () => clearInterval(interval)
  }, [fetchData])

  // Refresh when page becomes visible again
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchData()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [fetchData])

  return {
    data,
    loading,
    error,
    refresh,
    lastUpdated
  }
}
