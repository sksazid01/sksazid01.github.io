'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ExternalLink, Trophy, TrendingUp, Target } from 'lucide-react'
import { getStoredStats } from '@/utils/localStats'
import GlossyBorder from './GlossyBorder'

interface LeetCodeStats {
  totalSolved: number
  easySolved: number
  easyTotal: number
  mediumSolved: number
  mediumTotal: number
  hardSolved: number
  hardTotal: number
  ranking: number
  handle: string
  lastUpdated?: string
  cached?: boolean
}

interface LeetCodeWidgetProps {
  handle?: string
  enableAutoUpdate?: boolean
}

export default function LeetCodeWidget({ 
  handle = 'sksazid', 
  enableAutoUpdate = true 
}: LeetCodeWidgetProps) {
  const [stats, setStats] = useState<LeetCodeStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    // Load data from storage or use current defaults
    const stored = getStoredStats('leetcode')
    
    if (stored && stored.totalSolved > 0) {
      setStats({
        totalSolved: stored.totalSolved,
        easySolved: 80,
        easyTotal: 922,
        mediumSolved: 70,
        mediumTotal: 1997,
        hardSolved: 3,
        hardTotal: 903,
        ranking: 964583,
        handle: handle,
        lastUpdated: stored.lastUpdated,
        cached: true
      })
      setLastUpdated(new Date(stored.lastUpdated))
    } else {
      // Current known values (manually keep these updated)
      setStats({
        totalSolved: 153,
        easySolved: 80,
        easyTotal: 922,
        mediumSolved: 70,
        mediumTotal: 1997,
        hardSolved: 3,
        hardTotal: 903,
        ranking: 964583,
        handle: handle,
        lastUpdated: new Date().toISOString()
      })
      setLastUpdated(new Date())
    }
    
    setLoading(false)
  }, [handle])

  // Listen for auto-updates
  useEffect(() => {
    const handleStatsUpdate = (event: CustomEvent) => {
      setStats(prev => prev ? {
        ...prev,
        totalSolved: event.detail.totalSolved,
        easySolved: event.detail.easySolved,
        mediumSolved: event.detail.mediumSolved,
        hardSolved: event.detail.hardSolved,
        lastUpdated: event.detail.lastUpdated,
        cached: true
      } : null)
      setLastUpdated(new Date())
    }

    window.addEventListener('leetcode_stats_updated', handleStatsUpdate as EventListener)
    return () => window.removeEventListener('leetcode_stats_updated', handleStatsUpdate as EventListener)
  }, [])

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 rounded-xl text-center hover:shadow-xl hover:border-orange-500 dark:hover:border-orange-400 transition-all duration-300"
      >
        <div className="animate-pulse">
          <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mx-auto mb-3">
            <Trophy className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">---</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Loading...</div>
          <div className="font-semibold text-gray-900 dark:text-white">LeetCode</div>
          <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">@{handle}</div>
        </div>
        {/* Loading spinner */}
        <motion.div
          className="absolute top-2 right-2 w-4 h-4 border-2 border-gray-300 dark:border-gray-600 border-t-orange-600 dark:border-t-orange-400 rounded-full"
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
        className="group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 rounded-xl text-center hover:shadow-xl hover:border-orange-500 dark:hover:border-orange-400 transition-all duration-300"
      >
        <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mx-auto mb-3">
          <Trophy className="w-6 h-6 text-orange-600 dark:text-orange-400" />
        </div>
        <div className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Loading...</div>
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Problems Solved</div>
        <div className="font-semibold text-gray-900 dark:text-white">LeetCode</div>
        <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">@{handle}</div>
      </motion.div>
    )
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-600 dark:text-green-400'
      case 'medium': return 'text-orange-600 dark:text-orange-400'
      case 'hard': return 'text-red-600 dark:text-red-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getDifficultyBgColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 dark:bg-green-900/30'
      case 'medium': return 'bg-orange-100 dark:bg-orange-900/30'
      case 'hard': return 'bg-red-100 dark:bg-red-900/30'
      default: return 'bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getProgressBarColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-500'
      case 'medium': return 'bg-orange-500'
      case 'hard': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const calculatePercentage = (solved: number, total: number) => {
    return ((solved / total) * 100).toFixed(1)
  }

  return (
    <motion.a
      href={`https://leetcode.com/u/${handle}/`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3 }}
      className="group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 rounded-xl text-center hover:shadow-xl hover:border-orange-500 dark:hover:border-orange-400 transition-all duration-300 block relative overflow-hidden"
    >
      {/* Perimeter Border Light Animation */}
      <GlossyBorder />
      
      <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mx-auto mb-3">
        <Trophy className="w-6 h-6 text-orange-600 dark:text-orange-400" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Updated Indicator */}
        <motion.div
          className="absolute top-1 right-1 w-2 h-2 bg-blue-400 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Total Problems Solved */}
        <motion.div 
          className="text-3xl font-bold mb-2 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          key={stats.totalSolved}
        >
          {stats.totalSolved}
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
          <Target className="w-4 h-4" />
          LeetCode
          <ExternalLink className="w-3 h-3 text-gray-500 dark:text-gray-400 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors" />
        </motion.div>

        {/* Handle */}
        <motion.div 
          className="text-xs text-gray-500 dark:text-gray-500 mt-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          @{handle}
        </motion.div>

        {/* Difficulty Breakdown */}
        <motion.div 
          className="mt-4 space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* Easy */}
          <div className="text-left">
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs font-medium ${getDifficultyColor('easy')}`}>Easy</span>
              <span className="text-xs text-gray-600 dark:text-gray-400">{stats.easySolved}/{stats.easyTotal}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <motion.div 
                className={`${getProgressBarColor('easy')} h-1.5 rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${calculatePercentage(stats.easySolved, stats.easyTotal)}%` }}
                transition={{ duration: 1, delay: 0.6 }}
              />
            </div>
          </div>

          {/* Medium */}
          <div className="text-left">
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs font-medium ${getDifficultyColor('medium')}`}>Medium</span>
              <span className="text-xs text-gray-600 dark:text-gray-400">{stats.mediumSolved}/{stats.mediumTotal}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <motion.div 
                className={`${getProgressBarColor('medium')} h-1.5 rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${calculatePercentage(stats.mediumSolved, stats.mediumTotal)}%` }}
                transition={{ duration: 1, delay: 0.7 }}
              />
            </div>
          </div>

          {/* Hard */}
          <div className="text-left">
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs font-medium ${getDifficultyColor('hard')}`}>Hard</span>
              <span className="text-xs text-gray-600 dark:text-gray-400">{stats.hardSolved}/{stats.hardTotal}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <motion.div 
                className={`${getProgressBarColor('hard')} h-1.5 rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${calculatePercentage(stats.hardSolved, stats.hardTotal)}%` }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Ranking */}
        <motion.div 
          className="mt-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/30 rounded-full">
            <span className="text-xs font-semibold text-orange-700 dark:text-orange-300">
              Rank: #{stats.ranking.toLocaleString()}
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
