'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ExternalLink, Trophy, TrendingUp } from 'lucide-react'
import { getStoredStats } from '@/utils/localStats'
import GlossyBorder from './GlossyBorder'

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
        rating: 1200,
        rank: 'Pupil',
        maxRating: 1200,
        handle: handle,
        contests: 0,
        lastUpdated: stored.lastUpdated,
        cached: true
      })
      setLastUpdated(new Date(stored.lastUpdated))
    } else {
      // Default values
      setStats({
        totalSolved: 650,
        rating: 1200,
        rank: 'Pupil',
        maxRating: 1200,
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
        className="group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 rounded-xl text-center hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300"
      >
                <div className="animate-pulse">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3">
            <Trophy className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">---</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Loading...</div>
          <div className="font-semibold text-gray-900 dark:text-white">Codeforces</div>
          <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">@{handle}</div>
        </div>
        {/* Loading spinner */}
        <motion.div
          className="absolute top-2 right-2 w-4 h-4 border-2 border-gray-300 dark:border-gray-600 border-t-blue-600 dark:border-t-blue-400 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    )
  }

  if (!stats) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 rounded-xl text-center hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300"
      >
        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3">
          <Trophy className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">650+</div>
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Problems Solved</div>
        <div className="font-semibold text-gray-900 dark:text-white">CodeForces</div>
        <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">@{handle}</div>
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
      className="group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 rounded-xl text-center hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 block relative overflow-hidden"
    >
      {/* Perimeter Border Light Animation */}
      <GlossyBorder />
      
      <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3">
        <Trophy className="w-6 h-6 text-blue-600 dark:text-blue-400" />
      </div>

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
          className="text-3xl font-bold mb-2 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          key={stats.totalSolved} // Re-animate when data changes
        >
          {stats.totalSolved.toLocaleString()+"+"}
        </motion.div>
      
        <motion.div 
          className="text-sm text-gray-600 dark:text-gray-400 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Problems Solved
        </motion.div>

        {/* Platform */}
        <motion.div 
          className="font-semibold text-gray-900 dark:text-white flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Trophy className="w-4 h-4" />
          CodeForces
          <ExternalLink className="w-3 h-3 text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
        </motion.div>

        {/* Handle and Rating */}
        <motion.div 
          className="text-xs text-gray-500 dark:text-gray-500 mt-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          @{handle}
        </motion.div>

        {/* Rating and Rank */}
        <motion.div 
          className="text-xs mt-3 space-y-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          key={stats.rating} // Re-animate when rating changes
        >
          <div className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300">
            <TrendingUp className="w-3 h-3" />
            <span>Rating: {stats.rating}</span>
          </div>
          <div className="mt-2 inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 capitalize">
              {stats.rank}
            </span>
          </div>
          {lastUpdated && (
            <div className="text-xs text-gray-400 dark:text-gray-600 mt-1">
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
