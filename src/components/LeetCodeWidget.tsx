'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { ExternalLink, Trophy, TrendingUp } from 'lucide-react'
import { fetchLeetCodeStats, getCachedData, setCachedData, type LeetCodeStat } from '@/utils/competitiveProgramming'
import GlossyBorder from './GlossyBorder'

interface LeetCodeWidgetProps {
  handle?: string
}

const REFRESH_INTERVAL = 5 * 60 * 1000 // 5 minutes

export default function LeetCodeWidget({ handle = 'sksazid' }: LeetCodeWidgetProps) {
  const [stats, setStats] = useState<LeetCodeStat | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [isLive, setIsLive] = useState(false)

  const loadStats = useCallback(async (useCache = true) => {
    // Try cache first for instant render
    if (useCache) {
      const cached = getCachedData(handle)
      if (cached?.leetcode) {
        setStats(cached.leetcode)
        setLastUpdated(new Date(cached.timestamp ?? Date.now()))
        setLoading(false)
        setIsLive(false)
      }
    }

    // Always fetch fresh data in background
    try {
      const fresh = await fetchLeetCodeStats(handle)
      if (fresh) {
        setStats(fresh)
        setLastUpdated(new Date())
        setIsLive(true)
        const existing = getCachedData(handle) ?? {}
        setCachedData(handle, { ...existing, leetcode: fresh, timestamp: Date.now() })
      }
    } catch {
      // fall back to cached/fallback data already set
    } finally {
      setLoading(false)
    }
  }, [handle])

  useEffect(() => {
    loadStats(true)
    const interval = setInterval(() => loadStats(false), REFRESH_INTERVAL)
    return () => clearInterval(interval)
  }, [loadStats])

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 rounded-xl text-center hover:shadow-xl hover:border-yellow-500 dark:hover:border-yellow-400 transition-all duration-300 relative"
      >
        <div className="animate-pulse">
          <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mx-auto mb-3">
            <Trophy className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">---</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Loading...</div>
          <div className="font-semibold text-gray-900 dark:text-white">LeetCode</div>
          <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">@{handle}</div>
        </div>
        <motion.div
          className="absolute top-2 right-2 w-4 h-4 border-2 border-gray-300 dark:border-gray-600 border-t-yellow-500 dark:border-t-yellow-400 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
    )
  }

  if (!stats) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 rounded-xl text-center hover:shadow-xl hover:border-yellow-500 dark:hover:border-yellow-400 transition-all duration-300"
      >
        <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mx-auto mb-3">
          <Trophy className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
        </div>
        <div className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">154+</div>
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Problems Solved</div>
        <div className="font-semibold text-gray-900 dark:text-white">LeetCode</div>
        <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">@{handle}</div>
      </motion.div>
    )
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
      className="group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 rounded-xl text-center hover:shadow-xl hover:border-yellow-500 dark:hover:border-yellow-400 transition-all duration-300 block relative overflow-hidden"
    >
      <GlossyBorder />

      <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mx-auto mb-3">
        <Trophy className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
      </div>

      <div className="relative z-10">
        {/* Live indicator */}
        {isLive && (
          <motion.div
            className="absolute top-1 right-1 w-2 h-2 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            title="Live data"
          />
        )}

        {/* Total Solved */}
        <motion.div
          className="text-3xl font-bold mb-2 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          key={stats.totalSolved}
        >
          {stats.totalSolved.toLocaleString()}+
        </motion.div>

        <motion.div
          className="text-sm text-gray-600 dark:text-gray-400 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Problems Solved
        </motion.div>

        {/* Platform name */}
        <motion.div
          className="font-semibold text-gray-900 dark:text-white flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Trophy className="w-4 h-4 text-yellow-500" />
          LeetCode
          <ExternalLink className="w-3 h-3 text-gray-500 dark:text-gray-400 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors" />
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

        {/* Difficulty breakdown */}
        <motion.div
          className="mt-3 space-y-1.5 text-xs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          key={`${stats.easySolved}-${stats.mediumSolved}-${stats.hardSolved}`}
        >
          {/* Easy */}
          <div className="flex items-center gap-2">
            <span className="w-12 text-left text-green-500 dark:text-green-400 font-medium">Easy</span>
            <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-green-500 dark:bg-green-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (stats.easySolved / Math.max(stats.easyTotal, 1)) * 100)}%` }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
            </div>
            <span className="w-8 text-right text-gray-600 dark:text-gray-400">{stats.easySolved}</span>
          </div>

          {/* Medium */}
          <div className="flex items-center gap-2">
            <span className="w-12 text-left text-yellow-500 dark:text-yellow-400 font-medium">Med</span>
            <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-yellow-500 dark:bg-yellow-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (stats.mediumSolved / Math.max(stats.mediumTotal, 1)) * 100)}%` }}
                transition={{ delay: 0.7, duration: 0.8 }}
              />
            </div>
            <span className="w-8 text-right text-gray-600 dark:text-gray-400">{stats.mediumSolved}</span>
          </div>

          {/* Hard */}
          <div className="flex items-center gap-2">
            <span className="w-12 text-left text-red-500 dark:text-red-400 font-medium">Hard</span>
            <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-red-500 dark:bg-red-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (stats.hardSolved / Math.max(stats.hardTotal, 1)) * 100)}%` }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </div>
            <span className="w-8 text-right text-gray-600 dark:text-gray-400">{stats.hardSolved}</span>
          </div>

          {/* Ranking */}
          {stats.ranking > 0 && (
            <div className="flex items-center justify-center gap-1 mt-2 text-gray-600 dark:text-gray-400">
              <TrendingUp className="w-3 h-3" />
              <span>Rank #{stats.ranking.toLocaleString()}</span>
            </div>
          )}

          {/* Last updated */}
          {lastUpdated && (
            <div className="text-gray-400 dark:text-gray-600 mt-1">
              {isLive ? 'Live' : 'Cached'} · {lastUpdated.toLocaleTimeString()}
            </div>
          )}
        </motion.div>
      </div>

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        initial={false}
      />
    </motion.a>
  )
}
