'use client'

// Simple utility for managing problem counts locally
export interface PlatformStats {
  totalSolved: number
  lastUpdated: string
  platform: string
}

const STORAGE_KEYS = {
  codeforces: 'codeforces_stats',
  vjudge: 'vjudge_stats', 
  codechef: 'codechef_stats',
  leetcode: 'leetcode_stats'
}

export function getStoredStats(platform: keyof typeof STORAGE_KEYS): PlatformStats | null {
  if (typeof window === 'undefined') return null
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS[platform])
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

export function setStoredStats(platform: keyof typeof STORAGE_KEYS, stats: PlatformStats) {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(STORAGE_KEYS[platform], JSON.stringify({
      ...stats,
      lastUpdated: new Date().toISOString()
    }))
  } catch {
    // Ignore storage errors
  }
}

export function updatePlatformStats(platform: keyof typeof STORAGE_KEYS, newCount: number) {
  const stats: PlatformStats = {
    totalSolved: newCount,
    lastUpdated: new Date().toISOString(),
    platform: platform
  }
  
  setStoredStats(platform, stats)
  
  // Trigger a custom event to notify components
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(`${platform}_stats_updated`, { 
      detail: stats 
    }))
  }
  
  return stats
}
