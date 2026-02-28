// Utility functions for fetching competitive programming data
export interface CodeforcesStat {
  totalSolved: number
  rating: number
  rank: string
  maxRating: number
  handle: string
  contests: number
}

export interface VJudgeStat {
  totalSolved: number
  handle: string
  school: string
  membership: string
}

export interface CodeChefStat {
  totalSolved: number
  currentRating: number
  maxRating: number
  stars: number
  division: string
  contestsParticipated: number
  handle: string
  country: string
  institution: string
}

export interface LeetCodeStat {
  totalSolved: number
  easySolved: number
  easyTotal: number
  mediumSolved: number
  mediumTotal: number
  hardSolved: number
  hardTotal: number
  ranking: number
  handle: string
}

// Codeforces API - Real-time data
export async function fetchCodeforcesStats(handle: string): Promise<CodeforcesStat | null> {
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

    const user = userData.result[0]
    const submissions = submissionsData.result

    // Count unique solved problems
    const solvedProblems = new Set()
    submissions.forEach((submission: any) => {
      if (submission.verdict === 'OK') {
        const problemId = `${submission.problem.contestId}-${submission.problem.index}`
        solvedProblems.add(problemId)
      }
    })

    // Count contests participated
    const contestsParticipated = new Set()
    submissions.forEach((submission: any) => {
      if (submission.author.participantType === 'CONTESTANT') {
        contestsParticipated.add(submission.contestId)
      }
    })

    return {
      totalSolved: solvedProblems.size,
      rating: user.rating || 0,
      rank: user.rank || 'Unrated',
      maxRating: user.maxRating || user.rating || 0,
      handle: user.handle,
      contests: contestsParticipated.size
    }
  } catch {
    return null
  }
}

// VJudge - Using static data since no public API available
export async function fetchVJudgeStats(handle: string): Promise<VJudgeStat | null> {
  try {
    // Static data for known handles - replace with your actual stats
    const staticData: Record<string, VJudgeStat> = {
      'sksazid': {
        totalSolved: 326,
        handle: 'sksazid',
        school: 'SUST',
        membership: 'Active Member'
      }
    }
    
    // Return static data if available, otherwise default values
    if (staticData[handle]) {
      return staticData[handle]
    }
    
    // Default values for unknown handles
    return {
      totalSolved: 0,
      handle,
      school: 'Unknown',
      membership: 'Member'
    }
  } catch {
    return null
  }
}

// CodeChef - Using static data since no public API available
export async function fetchCodeChefStats(handle: string): Promise<CodeChefStat | null> {
  try {
    // Static data for known handles - replace with your actual stats
    const staticData: Record<string, CodeChefStat> = {
      'sksazid': {
        totalSolved: 150,
        currentRating: 1500,
        maxRating: 1600,
        stars: 3,
        division: 'Division 2',
        contestsParticipated: 15,
        handle: 'sksazid',
        country: 'Bangladesh',
        institution: 'SUST'
      }
    }
    
    // Return static data if available, otherwise default values
    if (staticData[handle]) {
      return staticData[handle]
    }
    
    // Default values for unknown handles
    return {
      totalSolved: 0,
      currentRating: 0,
      maxRating: 0,
      stars: 0,
      division: 'Unrated',
      contestsParticipated: 0,
      handle,
      country: 'Unknown',
      institution: 'Unknown'
    }
  } catch {
    return null
  }
}

// LeetCode - Using static data since no public API available
export async function fetchLeetCodeStats(handle: string): Promise<LeetCodeStat | null> {
  try {
    // Static data for known handles - replace with your actual stats
    const staticData: Record<string, LeetCodeStat> = {
      'sksazid': {
        totalSolved: 153,
        easySolved: 80,
        easyTotal: 922,
        mediumSolved: 70,
        mediumTotal: 1997,
        hardSolved: 3,
        hardTotal: 903,
        ranking: 964583,
        handle: 'sksazid'
      }
    }
    
    // Return static data if available, otherwise default values
    if (staticData[handle]) {
      return staticData[handle]
    }
    
    // Default values for unknown handles
    return {
      totalSolved: 0,
      easySolved: 0,
      easyTotal: 922,
      mediumSolved: 0,
      mediumTotal: 1997,
      hardSolved: 0,
      hardTotal: 903,
      ranking: 0,
      handle
    }
  } catch {
    return null
  }
}

// Utility to refresh all competitive programming data
export async function refreshAllCompetitiveProgrammingData(handle: string) {
  const results = await Promise.allSettled([
    fetchCodeforcesStats(handle),
    fetchVJudgeStats(handle),
    fetchCodeChefStats(handle),
    fetchLeetCodeStats(handle)
  ])

  return {
    codeforces: results[0].status === 'fulfilled' ? results[0].value : null,
    vjudge: results[1].status === 'fulfilled' ? results[1].value : null,
    codechef: results[2].status === 'fulfilled' ? results[2].value : null,
    leetcode: results[3].status === 'fulfilled' ? results[3].value : null
  }
}

// Cache management for performance
const CACHE_KEY = 'competitive_programming_cache'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export function getCachedData(handle: string) {
  if (typeof window === 'undefined') return null
  
  try {
    const cached = localStorage.getItem(`${CACHE_KEY}_${handle}`)
    if (!cached) return null
    
    const { data, timestamp } = JSON.parse(cached)
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(`${CACHE_KEY}_${handle}`)
      return null
    }
    
    return data
  } catch {
    return null
  }
}

export function setCachedData(handle: string, data: any) {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(`${CACHE_KEY}_${handle}`, JSON.stringify({
      data,
      timestamp: Date.now()
    }))
  } catch {
    // Ignore localStorage errors
  }
}
