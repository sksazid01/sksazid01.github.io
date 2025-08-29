'use client'

interface CodeforcesSubmission {
  id: number
  contestId: number
  problem: {
    contestId: number
    index: string
    name: string
    rating?: number
  }
  verdict: string
}

interface CodeforcesUserInfo {
  handle: string
  rating: number
  maxRating: number
  rank: string
  maxRank: string
  firstName?: string
  country?: string
  organization?: string
}

interface CodeforcesStats {
  totalSolved: number
  rating: number
  maxRating: number
  rank: string
  handle: string
  firstName?: string
  country?: string
  organization?: string
}

export async function fetchCodeforcesStats(handle: string): Promise<CodeforcesStats | null> {
  try {
    // Fetch user info
    const userInfoResponse = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`)
    if (!userInfoResponse.ok) throw new Error('Failed to fetch user info')
    
    const userInfoData = await userInfoResponse.json()
    if (userInfoData.status !== 'OK') throw new Error('API returned error')
    
    const userInfo: CodeforcesUserInfo = userInfoData.result[0]

    // Fetch user submissions to count solved problems
    const submissionsResponse = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`)
    if (!submissionsResponse.ok) throw new Error('Failed to fetch submissions')
    
    const submissionsData = await submissionsResponse.json()
    if (submissionsData.status !== 'OK') throw new Error('API returned error for submissions')
    
    const submissions: CodeforcesSubmission[] = submissionsData.result

    // Count unique solved problems (verdict = "OK")
    const solvedProblems = new Set<string>()
    
    submissions.forEach(submission => {
      if (submission.verdict === 'OK') {
        const problemKey = `${submission.problem.contestId}${submission.problem.index}`
        solvedProblems.add(problemKey)
      }
    })

    return {
      totalSolved: solvedProblems.size,
      rating: userInfo.rating,
      maxRating: userInfo.maxRating,
      rank: userInfo.rank,
      handle: userInfo.handle,
      firstName: userInfo.firstName,
      country: userInfo.country,
      organization: userInfo.organization
    }
  } catch (error) {
    console.error('Error fetching Codeforces stats:', error)
    return null
  }
}

export default fetchCodeforcesStats
