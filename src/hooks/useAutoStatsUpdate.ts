'use client'

import { useState, useEffect } from 'react'
import { getStoredStats, setStoredStats, updatePlatformStats } from '@/utils/localStats'

// Fetch Codeforces data directly from their API
async function fetchCodeforcesLiveData(handle: string) {
  try {
    const [userResponse, submissionsResponse] = await Promise.all([
      fetch(`https://codeforces.com/api/user.info?handles=${handle}`),
      fetch(`https://codeforces.com/api/user.status?handle=${handle}`)
    ])

    if (!userResponse.ok || !submissionsResponse.ok) {
      return null
    }

    const userData = await userResponse.json()
    const submissionsData = await submissionsResponse.json()

    if (userData.status !== 'OK' || submissionsData.status !== 'OK') {
      return null
    }

    const submissions = submissionsData.result
    const solvedProblems = new Set()
    
    submissions.forEach((submission: any) => {
      if (submission.verdict === 'OK') {
        const problemId = `${submission.problem.contestId}-${submission.problem.index}`
        solvedProblems.add(problemId)
      }
    })

    return {
      totalSolved: solvedProblems.size,
      rating: userData.result[0].rating || 0,
      rank: userData.result[0].rank || 'Unrated',
      handle: handle
    }
  } catch (error) {

    return null
  }
}

// Try to extract data from VJudge profile page (CORS might block this)
async function fetchVJudgeLiveData(handle: string) {
  try {
    // This might be blocked by CORS, but we can try
    const response = await fetch(`https://vjudge.net/user/${handle}`, {
      mode: 'cors',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Portfolio/1.0)'
      }
    })

    if (!response.ok) {
      return null
    }

    const html = await response.text()
    
    // Try to extract solved problems count
    const solvedMatch = html.match(/Solved:\s*(\d+)/i) || 
                       html.match(/(\d+)\s*Solved/i) ||
                       html.match(/Problems\s*Solved[^>]*>.*?(\d+)/i)
    
    if (solvedMatch) {
      return {
        totalSolved: parseInt(solvedMatch[1]),
        handle: handle
      }
    }
    
    return null
  } catch (error) {

    return null
  }
}

// Auto-update hook
export function useAutoStatsUpdate(handle: string = 'sksazid') {
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateStatus, setUpdateStatus] = useState<string>('')

  const performAutoUpdate = async () => {
    setIsUpdating(true)
    setUpdateStatus('Checking for updates...')
    
    try {
      // Fetch Codeforces data (this usually works)
      const codeforcesData = await fetchCodeforcesLiveData(handle)
      if (codeforcesData) {
        const stored = getStoredStats('codeforces')
        if (!stored || stored.totalSolved !== codeforcesData.totalSolved) {
          updatePlatformStats('codeforces', codeforcesData.totalSolved)
          setUpdateStatus(`Updated Codeforces: ${codeforcesData.totalSolved} problems`)
        }
      }

      // Try VJudge (might be blocked by CORS)
      const vjudgeData = await fetchVJudgeLiveData(handle)
      if (vjudgeData) {
        const stored = getStoredStats('vjudge')
        if (!stored || stored.totalSolved !== vjudgeData.totalSolved) {
          updatePlatformStats('vjudge', vjudgeData.totalSolved)
          setUpdateStatus(prev => prev + ` | VJudge: ${vjudgeData.totalSolved} problems`)
        }
      }

      setLastUpdateTime(new Date())
      
      // Clear status after 3 seconds
      setTimeout(() => setUpdateStatus(''), 3000)
      
    } catch (error) {
      setUpdateStatus('Update failed - using cached data')
      setTimeout(() => setUpdateStatus(''), 3000)
    } finally {
      setIsUpdating(false)
    }
  }

  // Auto-update on component mount
  useEffect(() => {
    // Check if we should update (avoid too frequent updates)
    const stored = getStoredStats('codeforces')
    const shouldUpdate = !stored || 
      (new Date().getTime() - new Date(stored.lastUpdated).getTime()) > 10 * 60 * 1000 // 10 minutes

    if (shouldUpdate) {
      // Small delay to let the page load first
      const timer = setTimeout(performAutoUpdate, 2000)
      return () => clearTimeout(timer)
    }
  }, [handle])

  // Periodic updates every 15 minutes when page is visible
  useEffect(() => {
    const interval = setInterval(() => {
      if (!document.hidden && !isUpdating) {
        performAutoUpdate()
      }
    }, 15 * 60 * 1000) // 15 minutes

    return () => clearInterval(interval)
  }, [handle, isUpdating])

  // Update when page becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && !isUpdating) {
        const lastUpdate = lastUpdateTime?.getTime() || 0
        const now = new Date().getTime()
        
        // Update if more than 10 minutes since last update
        if (now - lastUpdate > 10 * 60 * 1000) {
          performAutoUpdate()
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [lastUpdateTime, isUpdating])

  return {
    isUpdating,
    lastUpdateTime,
    updateStatus,
    manualUpdate: performAutoUpdate
  }
}
