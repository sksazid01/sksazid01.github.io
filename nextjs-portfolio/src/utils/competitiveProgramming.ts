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

// Codeforces API - Real-time data
export async function fetchCodeforcesStats(handle: string): Promise<CodeforcesStat | null> {
  try {
    const [userResponse, submissionsResponse] = await Promise.all([
      fetch(`https://codeforces.com/api/user.info?handles=${handle}`),
      fetch(`https://codeforces.com/api/user.status?handle=${handle}`)
    ])

    if (!userResponse.ok || !submissionsResponse.ok) {
      console.error('Failed to fetch Codeforces data')
      return null
    }

    const userData = await userResponse.json()
    const submissionsData = await submissionsResponse.json()

    if (userData.status !== 'OK' || submissionsData.status !== 'OK') {
      console.error('Codeforces API returned error')
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
  } catch (error) {
    console.error('Error fetching Codeforces stats:', error)
    return null
  }
}

// VJudge - No public API, so we'll use web scraping via backend API
export async function fetchVJudgeStats(handle: string): Promise<VJudgeStat | null> {
  try {
    const response = await fetch(`/api/vjudge?handle=${handle}`)
    if (!response.ok) {
      console.error('Failed to fetch VJudge data')
      return null
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching VJudge stats:', error)
    return null
  }
}

// CodeChef - No public API, so we'll use web scraping via backend API
export async function fetchCodeChefStats(handle: string): Promise<CodeChefStat | null> {
  try {
    const response = await fetch(`/api/codechef?handle=${handle}`)
    if (!response.ok) {
      console.error('Failed to fetch CodeChef data')
      return null
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching CodeChef stats:', error)
    return null
  }
}

// Utility to refresh all competitive programming data
export async function refreshAllCompetitiveProgrammingData(handle: string) {
  const results = await Promise.allSettled([
    fetchCodeforcesStats(handle),
    fetchVJudgeStats(handle),
    fetchCodeChefStats(handle)
  ])

  return {
    codeforces: results[0].status === 'fulfilled' ? results[0].value : null,
    vjudge: results[1].status === 'fulfilled' ? results[1].value : null,
    codechef: results[2].status === 'fulfilled' ? results[2].value : null
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
