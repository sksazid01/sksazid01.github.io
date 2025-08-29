import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const handle = searchParams.get('handle')

  if (!handle) {
    return NextResponse.json({ error: 'Handle parameter is required' }, { status: 400 })
  }

  try {
    // Fetch CodeChef profile page
    const response = await fetch(`https://www.codechef.com/users/${handle}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch CodeChef profile' }, { status: 404 })
    }

    const html = await response.text()

    // Parse CodeChef profile data
    let totalSolved = 0
    let currentRating = 0
    let maxRating = 0
    let stars = 0
    let division = 'Unrated'
    let contestsParticipated = 0
    let country = 'Unknown'
    let institution = 'Unknown'

    // Extract total problems solved
    const problemsMatch = html.match(/Total Problems Solved:\s*(\d+)/i) || 
                         html.match(/Problems Solved[^>]*>.*?(\d+)/i) ||
                         html.match(/(\d+)\s*problems?\s*solved/i)
    if (problemsMatch) {
      totalSolved = parseInt(problemsMatch[1])
    }

    // Extract current rating
    const ratingMatch = html.match(/Current Rating[^>]*>.*?(\d+)/i) || 
                       html.match(/Rating[^>]*>.*?(\d+)/i) ||
                       html.match(/(\d{3,4})\s*\(Div\s*\d+\)/i)
    if (ratingMatch) {
      currentRating = parseInt(ratingMatch[1])
    }

    // Extract max rating
    const maxRatingMatch = html.match(/Highest Rating[^>]*>.*?(\d+)/i) || 
                          html.match(/Max[^>]*>.*?(\d+)/i)
    if (maxRatingMatch) {
      maxRating = parseInt(maxRatingMatch[1])
    }

    // Extract division
    const divisionMatch = html.match(/\(Div\s*(\d+)\)/i)
    if (divisionMatch) {
      division = `Div ${divisionMatch[1]}`
    }

    // Extract contests participated
    const contestsMatch = html.match(/Contests[^>]*>.*?(\d+)/i) ||
                         html.match(/(\d+)\s*contests?/i)
    if (contestsMatch) {
      contestsParticipated = parseInt(contestsMatch[1])
    }

    // Extract stars (based on rating or explicit star display)
    if (currentRating >= 2000) stars = 4
    else if (currentRating >= 1800) stars = 3
    else if (currentRating >= 1400) stars = 2
    else if (currentRating >= 1000) stars = 1
    else stars = 0

    // Try to extract country/institution
    const countryMatch = html.match(/Country[^>]*>.*?>([^<]+)</i)
    if (countryMatch) {
      country = countryMatch[1].trim()
    }

    const institutionMatch = html.match(/Institution[^>]*>.*?>([^<]+)</i) ||
                            html.match(/School[^>]*>.*?>([^<]+)</i)
    if (institutionMatch) {
      institution = institutionMatch[1].trim()
    }

    // If no data found from scraping, use fallback for known handles
    if (totalSolved === 0 && currentRating === 0) {
      if (handle === 'sksazid') {
        return NextResponse.json({
          totalSolved: 54,
          currentRating: 1437,
          maxRating: 1474,
          stars: 2,
          division: 'Div 3',
          contestsParticipated: 12,
          handle,
          country: 'Bangladesh',
          institution: 'SUST',
          lastUpdated: new Date().toISOString(),
          cached: true
        })
      }
    }

    return NextResponse.json({
      totalSolved: totalSolved || 0,
      currentRating: currentRating || 0,
      maxRating: maxRating || currentRating || 0,
      stars,
      division,
      contestsParticipated: contestsParticipated || 0,
      handle,
      country: country || 'Unknown',
      institution: institution || 'Unknown',
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error fetching CodeChef stats:', error)
    
    // Fallback data for known handles
    if (handle === 'sksazid') {
      return NextResponse.json({
        totalSolved: 54,
        currentRating: 1437,
        maxRating: 1474,
        stars: 2,
        division: 'Div 3',
        contestsParticipated: 12,
        handle,
        country: 'Bangladesh',
        institution: 'SUST',
        lastUpdated: new Date().toISOString(),
        cached: true
      })
    }

    return NextResponse.json({ 
      error: 'Failed to fetch CodeChef statistics',
      totalSolved: 0,
      currentRating: 0,
      maxRating: 0,
      stars: 0,
      division: 'Unrated',
      contestsParticipated: 0,
      handle,
      country: 'Unknown',
      institution: 'Unknown',
      lastUpdated: new Date().toISOString()
    }, { status: 500 })
  }
}
