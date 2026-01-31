'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ExternalLink, Award, TrendingUp, Trophy, Star, Plus } from 'lucide-react'
import { getStoredStats, updatePlatformStats } from '@/utils/localStats'

interface CodeChefStats {
  totalSolved: number
  currentRating: number
  maxRating: number
  stars: number
  division: string
  contestsParticipated: number
  handle: string
  country: string
  institution: string
  lastUpdated?: string
  cached?: boolean
}

interface CodeChefWidgetProps {
  handle?: string
  problemsSolved?: number
  currentRating?: number
  maxRating?: number
  enableManualUpdate?: boolean
}

export default function CodeChefWidget({ 
  handle = 'sksazid', 
  problemsSolved = 100,
  currentRating = 1437,
  maxRating = 1474,
  enableManualUpdate = true
}: CodeChefWidgetProps) {
  const [stats, setStats] = useState<CodeChefStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [showUpdateInput, setShowUpdateInput] = useState(false)
  const [newCount, setNewCount] = useState('')

  useEffect(() => {
    // Check for stored stats first
    const stored = getStoredStats('codechef')
    
    // Validate stored stats - if the count seems unreasonable, ignore it
    if (stored && stored.totalSolved > 0 && stored.totalSolved < 10000) {
      setStats({
        totalSolved: stored.totalSolved,
        currentRating: currentRating,
        maxRating: maxRating,
        stars: 2,
        division: 'Div 3',
        contestsParticipated: 12,
        handle: handle,
        country: 'Bangladesh',
        institution: 'SUST',
        lastUpdated: stored.lastUpdated,
        cached: true
      })
    } else {
      // Use fallback data if no valid stored stats
      setStats({
        totalSolved: problemsSolved,
        currentRating: currentRating,
        maxRating: maxRating,
        stars: 2,
        division: 'Div 3',
        contestsParticipated: 12,
        handle: handle,
        country: 'Bangladesh',
        institution: 'SUST'
      })
    }
    
    setLoading(false)
  }, [handle, problemsSolved, currentRating, maxRating])

  // Listen for stats updates
  useEffect(() => {
    const handleStatsUpdate = (event: CustomEvent) => {
      setStats(prev => prev ? {
        ...prev,
        totalSolved: event.detail.totalSolved,
        lastUpdated: event.detail.lastUpdated,
        cached: true
      } : null)
    }

    window.addEventListener('codechef_stats_updated', handleStatsUpdate as EventListener)
    return () => window.removeEventListener('codechef_stats_updated', handleStatsUpdate as EventListener)
  }, [])

  const handleManualUpdate = () => {
    const count = parseInt(newCount)
    if (count && count > 0) {
      updatePlatformStats('codechef', count)
      setNewCount('')
      setShowUpdateInput(false)
    }
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 rounded-xl text-center hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 relative"
      >
        <div className="animate-pulse">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3">
            <Trophy className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">---</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Loading...</div>
          <div className="font-semibold text-gray-900 dark:text-white">CodeChef</div>
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
      <div className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">100+</div>
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Problems Solved</div>
        <div className="font-semibold text-gray-900 dark:text-white">CodeChef</div>
        <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">@{handle}</div>
      </motion.div>
    )
  }

  const getStarIcon = (count: number) => {
    return Array.from({ length: count }, (_, i) => (
      <Star key={i} className="w-3 h-3 fill-current" />
    ))
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 2000) return 'text-red-300'
    if (rating >= 1800) return 'text-purple-300'
    if (rating >= 1600) return 'text-blue-300'
    if (rating >= 1400) return 'text-green-300'
    return 'text-yellow-300'
  }

  return (
    <motion.a
      href={`https://www.codechef.com/users/${handle}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3 }}
      className="group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 rounded-xl text-center hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 block relative overflow-hidden"
    >
      {/* Perimeter Border Light Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Edge */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] w-[40%] bg-gradient-to-r from-transparent via-white/80 to-transparent"
          style={{ filter: 'blur(1px)' }}
          animate={{
            left: ['-40%', '100%']
          }}
          transition={{
            duration: 8,
            ease: 'linear',
            repeat: Infinity,
            repeatDelay: 0
          }}
        />
        {/* Right Edge */}
        <motion.div
          className="absolute top-0 right-0 w-[2px] h-[40%] bg-gradient-to-b from-transparent via-white/80 to-transparent"
          style={{ filter: 'blur(1px)' }}
          animate={{
            top: ['-40%', '100%']
          }}
          transition={{
            duration: 8,
            ease: 'linear',
            repeat: Infinity,
            repeatDelay: 0,
            delay: 2
          }}
        />
        {/* Bottom Edge */}
        <motion.div
          className="absolute bottom-0 right-0 h-[2px] w-[40%] bg-gradient-to-l from-transparent via-white/80 to-transparent"
          style={{ filter: 'blur(1px)' }}
          animate={{
            right: ['-40%', '100%']
          }}
          transition={{
            duration: 8,
            ease: 'linear',
            repeat: Infinity,
            repeatDelay: 0,
            delay: 4
          }}
        />
        {/* Left Edge */}
        <motion.div
          className="absolute bottom-0 left-0 w-[2px] h-[40%] bg-gradient-to-t from-transparent via-white/80 to-transparent"
          style={{ filter: 'blur(1px)' }}
          animate={{
            bottom: ['-40%', '100%']
          }}
          transition={{
            duration: 8,
            ease: 'linear',
            repeat: Infinity,
            repeatDelay: 0,
            delay: 6
          }}
        />
      </div>
      
      <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3">
        <Trophy className="w-6 h-6 text-blue-600 dark:text-blue-400" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Manual Update Button */}
        {enableManualUpdate && (
          <motion.button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setShowUpdateInput(!showUpdateInput)
            }}
            className="absolute top-1 right-1 p-1 rounded-full hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Plus className="w-3 h-3" />
          </motion.button>
        )}

        {/* Update Input */}
        {showUpdateInput && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-8 right-1 bg-white dark:bg-gray-800 rounded-lg p-2 shadow-lg border z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="number"
              value={newCount}
              onChange={(e) => setNewCount(e.target.value)}
              placeholder="New count"
              className="w-20 px-2 py-1 text-xs border rounded text-black"
              autoFocus
            />
            <button
              onClick={handleManualUpdate}
              className="ml-1 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
            >
              ✓
            </button>
          </motion.div>
        )}

        {/* Problems Solved */}
        <motion.div 
          className="text-3xl font-bold mb-2 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          key={stats.totalSolved} // Re-animate when data changes
        >
          {stats.totalSolved}+
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
          className="font-semibold flex items-center justify-center gap-2 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Award className="w-4 h-4" />
          CodeChef
          <ExternalLink className="w-3 h-3 text-gray-600 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
        </motion.div>

        {/* Handle and Stars */}
        <motion.div 
          className="text-xs text-gray-500 dark:text-gray-500 mt-1 flex items-center justify-center gap-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span>@{handle}</span>
          <div className="flex items-center ml-2">
            {getStarIcon(stats.stars)}
          </div>
        </motion.div>

        {/* Rating Info */}
        <motion.div 
          className="text-xs mt-2 space-y-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          key={stats.currentRating} // Re-animate when rating changes
        >
          <div className="flex items-center justify-center gap-2">
            <TrendingUp className="w-3 h-3 text-gray-600 dark:text-gray-400" />
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 font-semibold">
              {stats.currentRating}
            </span>
            <span className="text-gray-600 dark:text-gray-400">({stats.division})</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-500">
            Max: {stats.maxRating} • {stats.contestsParticipated} contests
          </div>
          {stats.lastUpdated && (
            <div className="text-xs text-gray-400 dark:text-gray-600">
              Updated: {new Date(stats.lastUpdated).toLocaleTimeString()}
              {stats.cached && ' (cached)'}
            </div>
          )}
        </motion.div>

        {/* Floating Stars Animation */}
        <motion.div
          className="absolute top-2 right-2 text-gray-300 dark:text-gray-700 group-hover:text-blue-500 dark:group-hover:text-blue-400"
          animate={{
            y: [0, -5, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Trophy className="w-5 h-5" />
        </motion.div>

        {/* Pulse Effect on Hover */}
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-blue-500/20 dark:border-blue-400/20 opacity-0 group-hover:opacity-100"
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
    </motion.a>
  )
}
