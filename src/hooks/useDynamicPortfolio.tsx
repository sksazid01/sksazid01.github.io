'use client'

import { useState, useEffect, useCallback } from 'react'

interface GitHubRepo {
  id: number
  name: string
  description: string
  html_url: string
  language: string
  stargazers_count: number
  forks_count: number
  updated_at: string
  topics: string[]
}

interface GitHubStats {
  totalRepos: number
  totalStars: number
  totalForks: number
  languages: [string, number][]
  lastCommit: string
}

interface GitHubUser {
  name: string
  login: string
  avatar_url: string
  public_repos: number
  followers: number
  html_url: string
}

interface GitHubEvent {
  type: string
  repo: { name: string }
  created_at: string
  payload: any
}

interface CodingStats {
  total_seconds: number
  languages: { name: string; percent: number }[]
  last_heartbeat: string
}

interface VisitorData {
  count: number
  uniqueToday: number
  location: string
  lastVisit: string
}

export const useDynamicPortfolio = () => {
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([])
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null)
  const [githubActivity, setGithubActivity] = useState<{ user: GitHubUser; recentEvents: GitHubEvent[] } | null>(null)
  const [codingStats, setCodingStats] = useState<CodingStats | null>(null)
  const [visitorCount, setVisitorCount] = useState<number>(0)
  const [visitorData, setVisitorData] = useState<VisitorData | null>(null)
  const [currentActivity, setCurrentActivity] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [lastGitHubUpdate, setLastGitHubUpdate] = useState<Date | null>(null)

  // Constants for caching
  const GITHUB_CACHE_KEY = 'github_stats_cache'
  const CACHE_DURATION = 30 * 60 * 1000 // 30 minutes
  const UPDATE_INTERVAL = 30 * 60 * 1000 // Check every 30 minutes

  // Check if cached data is still valid
  const isCacheValid = (timestamp: string): boolean => {
    return Date.now() - new Date(timestamp).getTime() < CACHE_DURATION
  }

  // Save GitHub data to cache
  const saveToCache = (data: any) => {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem(GITHUB_CACHE_KEY, JSON.stringify({
        ...data,
        timestamp: new Date().toISOString()
      }))
    } catch (error) {
      console.log('Cache save failed, continuing without cache')
    }
  }

  // Load GitHub data from cache
  const loadFromCache = (): any => {
    if (typeof window === 'undefined') return null
    
    try {
      const cached = localStorage.getItem(GITHUB_CACHE_KEY)
      if (cached) {
        const data = JSON.parse(cached)
        if (isCacheValid(data.timestamp)) {
          return data
        }
      }
    } catch (error) {
      console.log('Cache load failed, will fetch fresh data')
    }
    return null
  }

  // GitHub Projects Integration (smart caching + auto-refresh)
  const fetchGitHubProjects = async (forceRefresh = false) => {
    // Check cache first unless force refresh
    if (!forceRefresh) {
      const cachedData = loadFromCache()
      if (cachedData && cachedData.repos && cachedData.stats) {
        setGithubRepos(cachedData.repos)
        setGithubStats(cachedData.stats)
        setLastGitHubUpdate(new Date(cachedData.timestamp))
        return
      }
    }

    // Load fallback first for immediate UI responsiveness
    loadFallbackProjects()

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000) // Longer timeout for better success

      const response = await fetch('https://api.github.com/users/sksazid01/repos?per_page=100', {
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response || !response.ok) {
        // keep fallback
        return
      }

      const repos = await response.json()

      const filteredRepos = repos
        .filter((repo: any) => !repo.fork && !repo.archived)
        .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6)

      // Calculate comprehensive stats
      const stats: GitHubStats = {
        totalRepos: repos.filter((repo: any) => !repo.fork).length,
        totalStars: repos.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0),
        totalForks: repos.reduce((sum: number, repo: any) => sum + repo.forks_count, 0),
        languages: getTopLanguages(repos),
        lastCommit: getRecentActivity(repos)
      }

      setGithubRepos(filteredRepos)
      setGithubStats(stats)
      setLastGitHubUpdate(new Date())

      // Cache the fresh data
      saveToCache({
        repos: filteredRepos,
        stats: stats
      })

    } catch {
      // Silently handle abort errors and network failures
      // Keep fallback data
    }
  }

  // GitHub Activity Stream (enhanced with caching)
  const fetchGitHubActivity = async (forceRefresh = false) => {
    // Check cache for activity data
    if (!forceRefresh) {
      const cachedData = loadFromCache()
      if (cachedData && cachedData.activity) {
        setGithubActivity(cachedData.activity)
        return
      }
    }

    // Show fallback first for immediate UI
    loadFallbackActivity()

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      const [userResponse, eventsResponse] = await Promise.all([
        fetch('https://api.github.com/users/sksazid01', { signal: controller.signal }),
        fetch('https://api.github.com/users/sksazid01/events/public?per_page=10', { signal: controller.signal })
      ])

      clearTimeout(timeoutId)

      if (userResponse && eventsResponse && userResponse.ok && eventsResponse.ok) {
        const user = await userResponse.json()
        const events = await eventsResponse.json()
        const activityData = { user, recentEvents: events }
        
        setGithubActivity(activityData)

        // Update cache with activity data
        const existingCache = loadFromCache() || {}
        saveToCache({
          ...existingCache,
          activity: activityData
        })
      }
    } catch {
      // Silently handle abort errors and network failures
      // Keep fallback data
    }
  }

  // Fetch real visitor count from Google Analytics (via pre-built static JSON)
  const initializeVisitorCounter = async () => {
    // Show a neutral placeholder while we load
    setVisitorCount(2000)
    try {
      const res = await fetch('/stats/ga-stats.json', { cache: 'no-store' })
      if (res.ok) {
        const data = await res.json()
        const count = typeof data.totalVisitors === 'number' ? data.totalVisitors : 2000
        setVisitorCount(count)
      }
    } catch {
      // Keep the 2000 placeholder on any network error
    }
  }

  // Sync visitor analytics state with the same GA JSON
  const initializeVisitorAnalytics = async () => {
    try {
      const res = await fetch('/stats/ga-stats.json', { cache: 'no-store' })
      if (res.ok) {
        const data = await res.json()
        const count = typeof data.totalVisitors === 'number' ? data.totalVisitors : 2000
        const visitorAnalytics: VisitorData = {
          count,
          uniqueToday: 0,
          location: 'Global',
          lastVisit: data.lastUpdated
            ? new Date(data.lastUpdated).toLocaleTimeString()
            : new Date().toLocaleTimeString(),
        }
        setVisitorData(visitorAnalytics)
        setVisitorCount(count)
      }
    } catch {
      // Silently fall through – initializeVisitorCounter already set a default
    }
  }

  // Coding Statistics
  const loadCodingStats = () => {
    // Professional development stats reflecting industry standards
    const mockStats: CodingStats = {
      total_seconds: 32400 + Math.random() * 3600, // 9-10 hours (professional work day)
      languages: [
        { name: 'TypeScript', percent: 32 + Math.random() * 8 },
        { name: 'JavaScript', percent: 28 + Math.random() * 7 },
        { name: 'Python', percent: 20 + Math.random() * 5 },
        { name: 'Java', percent: 12 + Math.random() * 4 },
        { name: 'SQL', percent: 8 + Math.random() * 3 }
      ],
      last_heartbeat: new Date().toISOString()
    }
    
    setCodingStats(mockStats)
  }

  // Current Activity
  const loadCurrentActivity = () => {
    const activities = [
      "💻 Developing enterprise solutions",
      "🏗 Architecting scalable systems", 
      "📊 Analyzing performance metrics",
      "⚡ Implementing optimization strategies",
      "🎯 Delivering client requirements",
      "🔍 Conducting code reviews",
      "🎨 Enhancing user experience",
      "🛡️ Ensuring security best practices",
      "🚀 Deploying production applications",
      "📚 Researching emerging technologies",
      "🔧 Engineering innovative solutions",
      "♻️ Refactoring legacy codebases"
    ]

    const randomActivity = activities[Math.floor(Math.random() * activities.length)]
    setCurrentActivity(randomActivity)

    // Update activity every 3 minutes for more professional feel
    const interval = setInterval(() => {
      const newActivity = activities[Math.floor(Math.random() * activities.length)]
      setCurrentActivity(newActivity)
    }, 180000)

    return () => clearInterval(interval)
  }

  // Helper functions
  const getTopLanguages = (repos: any[]): [string, number][] => {
    const languages: { [key: string]: number } = {}
    repos.forEach(repo => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1
      }
    })
    
    return Object.entries(languages)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
  }

  const getRecentActivity = (repos: any[]): string => {
    const recent = repos
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())[0]
    
    return recent ? new Date(recent.updated_at).toLocaleDateString() : 'N/A'
  }

  const loadFallbackProjects = () => {
    const fallbackRepos: GitHubRepo[] = [
      {
        id: 1,
        name: 'RAG-on-Research-Paper',
        description: 'RAG-based research paper analysis with Python',
        html_url: 'https://github.com/sksazid01/RAG-on-Research-Paper',
        language: 'Python',
        stargazers_count: 2,
        forks_count: 0,
        updated_at: new Date().toISOString(),
        topics: ['python', 'rag', 'ai', 'research']
      },
      {
        id: 2,
        name: 'sksazid01.github.io',
        description: 'Personal portfolio website',
        html_url: 'https://github.com/sksazid01/sksazid01.github.io',
        language: 'TypeScript',
        stargazers_count: 1,
        forks_count: 0,
        updated_at: new Date().toISOString(),
        topics: ['portfolio', 'nextjs', 'typescript']
      }
    ]

    setGithubRepos(fallbackRepos)
    
    const stats: GitHubStats = {
      totalRepos: 48,
      totalStars: 12,
      totalForks: 3,
      languages: [['Java', 8], ['C++', 6], ['Python', 6], ['TypeScript', 5], ['JavaScript', 4]],
      lastCommit: new Date().toLocaleDateString()
    }
    
    setGithubStats(stats)
  }

  const loadFallbackActivity = () => {
    const fallbackData = {
      user: {
        name: 'Md Ahasanul Haque Sazid',
        login: 'sksazid01',
        avatar_url: '/favicon.ico',
        public_repos: 48,
        followers: 18,
        html_url: 'https://github.com/sksazid01'
      },
      recentEvents: [
        {
          type: 'PushEvent',
          repo: { name: 'sksazid01/RAG-on-Research-Paper' },
          created_at: new Date().toISOString(),
          payload: { commits: [{}] }
        },
        {
          type: 'CreateEvent',
          repo: { name: 'sksazid01/sksazid01.github.io' },
          created_at: new Date(Date.now() - 3600000).toISOString(),
          payload: { ref_type: 'repository' }
        }
      ]
    }

    setGithubActivity(fallbackData)
  }

  const getTimeAgo = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
    
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    }

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit)
      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`
      }
    }

    return 'Just now'
  }

  // Initialize all features
  useEffect(() => {
    const initializeFeatures = async () => {
      setLoading(true)
      
      await Promise.allSettled([
        fetchGitHubProjects(),
        fetchGitHubActivity(),
        initializeVisitorCounter(),
        initializeVisitorAnalytics()
      ])
      
      loadCodingStats()
      const cleanupActivity = loadCurrentActivity()
      
      setLoading(false)
      
      return cleanupActivity
    }

    const cleanup = initializeFeatures()
    
    return () => {
      cleanup.then(fn => fn && fn())
    }
  }, [])

  // Auto-refresh GitHub data periodically
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      // Only refresh if page is visible to save API calls
      if (!document.hidden) {
        fetchGitHubProjects(true) // Force refresh
        fetchGitHubActivity(true)
      }
    }, UPDATE_INTERVAL)

    return () => clearInterval(refreshInterval)
  }, [])

  // Refresh when page becomes visible (user returns to tab)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const cachedData = loadFromCache()
        if (!cachedData || !isCacheValid(cachedData.timestamp)) {
          fetchGitHubProjects(true)
          fetchGitHubActivity(true)
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  // Manual refresh function that can be called externally
  const refreshGitHubData = async () => {
    await Promise.all([
      fetchGitHubProjects(true),
      fetchGitHubActivity(true)
    ])
  }

  return {
    githubRepos,
    githubStats,
    githubActivity,
    codingStats,
    visitorCount,
    visitorData,
    currentActivity,
    loading,
    lastGitHubUpdate,
    refreshGitHubData,
    getTimeAgo
  }
}
