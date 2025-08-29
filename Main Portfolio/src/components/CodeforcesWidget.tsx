'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ExternalLink, Trophy, TrendingUp, RefreshCw } from 'lucide-react'
import { getStoredStats } from '@/utils/localStats'

interface CodeforcesStats {
  totalSolved: number
  rating: number
  rank: string
  maxRating: number
  handle: string
  contests: number
  lastUpdated?: string
  cached?: boolean
}

interface CodeforcesWidgetProps {
  handle?: string
  enableAutoUpdate?: boolean
}

export default function CodeforcesWidget({ 
  handle = 'sksazid', 
  enableAutoUpdate = true 
}: CodeforcesWidgetProps) {
  const [stats, setStats] = useState<CodeforcesStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    // Load data from storage or use defaults
    const stored = getStoredStats('codeforces')
    
    if (stored) {
      setStats({
        totalSolved: stored.totalSolved,
        rating: 1228,
        rank: 'Pupil',
        maxRating: 1228,
        handle: handle,
        contests: 0,
        lastUpdated: stored.lastUpdated,
        cached: true
      })
      setLastUpdated(new Date(stored.lastUpdated))
    } else {
      // Default values
      setStats({
        totalSolved: 1230,
        rating: 1228,
        rank: 'Pupil',
        maxRating: 1228,
        handle: handle,
        contests: 0
      })
    }
    
    setLoading(false)
  }, [handle])

  // Listen for auto-updates
  useEffect(() => {
    const handleStatsUpdate = (event: CustomEvent) => {
      setStats(prev => prev ? {
        ...prev,
        totalSolved: event.detail.totalSolved,
        lastUpdated: event.detail.lastUpdated,
        cached: true
      } : null)
      setLastUpdated(new Date())
    }

    window.addEventListener('codeforces_stats_updated', handleStatsUpdate as EventListener)
    return () => window.removeEventListener('codeforces_stats_updated', handleStatsUpdate as EventListener)
  }, [])

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="group bg-gradient-to-r from-red-500 to-orange-500 p-6 rounded-xl text-white text-center hover:shadow-xl transition-all duration-300"
      >
        <div className="animate-pulse">
          <div className="text-3xl font-bold mb-2">---</div>
          <div className="text-sm opacity-90 mb-2">Loading...</div>
          <div className="font-semibold">CodeForces</div>
          <div className="text-xs opacity-75 mt-1">@{handle}</div>
        </div>
      </motion.div>
    )
  }

  if (!stats) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="group bg-gradient-to-r from-red-500 to-orange-500 p-6 rounded-xl text-white text-center hover:shadow-xl transition-all duration-300"
      >
        <div className="text-3xl font-bold mb-2">650+</div>
        <div className="text-sm opacity-90 mb-2">Problems Solved</div>
        <div className="font-semibold">CodeForces</div>
        <div className="text-xs opacity-75 mt-1">@{handle}</div>
      </motion.div>
    )
  }

  const getRankColor = (rank: string) => {
    switch (rank.toLowerCase()) {
      case 'newbie': return 'text-gray-300'
      case 'pupil': return 'text-green-300'
      case 'specialist': return 'text-cyan-300'
      case 'expert': return 'text-blue-300'
      case 'candidate master': return 'text-purple-300'
      case 'master': return 'text-orange-300'
      case 'international master': return 'text-orange-200'
      case 'grandmaster': return 'text-red-300'
      default: return 'text-white'
    }
  }

  return (
    <motion.a
      href={`https://codeforces.com/profile/${handle}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3 }}
      className="group bg-gradient-to-r from-red-500 to-orange-500 p-6 rounded-xl text-white text-center hover:shadow-xl transition-all duration-300 block relative overflow-hidden"
    >
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Auto-Update Indicator */}
        {stats?.cached && (
          <motion.div
            className="absolute top-1 right-1 w-2 h-2 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        {/* Problems Solved */}
        <motion.div 
          className="text-3xl font-bold mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          key={stats.totalSolved} // Re-animate when data changes
        >
          {stats.totalSolved.toLocaleString()}
        </motion.div>
      
        <motion.div 
          className="text-sm opacity-90 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Problems Solved
        </motion.div>

        {/* Platform */}
        <motion.div 
          className="font-semibold flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Trophy className="w-4 h-4" />
          CodeForces
          <ExternalLink className="w-3 h-3 opacity-75 group-hover:opacity-100 transition-opacity" />
        </motion.div>

        {/* Handle and Rating */}
        <motion.div 
          className="text-xs opacity-75 mt-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          @{handle}
        </motion.div>

        {/* Rating and Rank */}
        <motion.div 
          className="text-xs mt-2 space-y-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          key={stats.rating} // Re-animate when rating changes
        >
          <div className="flex items-center justify-center gap-2">
            <TrendingUp className="w-3 h-3" />
            <span>Rating: {stats.rating}</span>
          </div>
          <div className={`font-medium capitalize ${getRankColor(stats.rank)}`}>
            {stats.rank}
          </div>
          {lastUpdated && (
            <div className="text-xs opacity-50 mt-1">
              Updated: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
        </motion.div>
      </div>

      {/* Hover Effect */}
      <motion.div
        className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        initial={false}
      />
    </motion.a>
  )
}
