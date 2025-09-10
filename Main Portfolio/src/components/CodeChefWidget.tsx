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
  currentRating = 1474,
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
        className="group bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-xl text-white text-center hover:shadow-xl transition-all duration-300 relative"
      >
        <div className="animate-pulse">
          <div className="text-3xl font-bold mb-2">---</div>
          <div className="text-sm opacity-90 mb-2">Loading...</div>
          <div className="font-semibold">CodeChef</div>
          <div className="text-xs opacity-75 mt-1">@{handle}</div>
        </div>
        {/* Loading spinner */}
        <motion.div
          className="absolute top-2 right-2 w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
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
        className="group bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-xl text-white text-center hover:shadow-xl transition-all duration-300"
      >
        <div className="text-3xl font-bold mb-2">⭐</div>
        <div className="text-sm opacity-90 mb-2">Active Profile</div>
        <div className="font-semibold">CodeChef</div>
        <div className="text-xs opacity-75 mt-1">@{handle}</div>
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
      className="group bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-xl text-white text-center hover:shadow-xl transition-all duration-300 block relative overflow-hidden"
    >
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-orange-600 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      />

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
          className="text-3xl font-bold mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          key={stats.totalSolved} // Re-animate when data changes
        >
          {stats.totalSolved}+
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
          <Award className="w-4 h-4" />
          CodeChef
          <ExternalLink className="w-3 h-3 opacity-75 group-hover:opacity-100 transition-opacity" />
        </motion.div>

        {/* Handle and Stars */}
        <motion.div 
          className="text-xs opacity-75 mt-1 flex items-center justify-center gap-1"
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
            <TrendingUp className="w-3 h-3" />
            <span className={getRatingColor(stats.currentRating)}>
              {stats.currentRating}
            </span>
            <span className="opacity-75">({stats.division})</span>
          </div>
          <div className="text-xs opacity-60">
            Max: {stats.maxRating} • {stats.contestsParticipated} contests
          </div>
          {stats.lastUpdated && (
            <div className="text-xs opacity-50">
              Updated: {new Date(stats.lastUpdated).toLocaleTimeString()}
              {stats.cached && ' (cached)'}
            </div>
          )}
        </motion.div>

        {/* Floating Stars Animation */}
        <motion.div
          className="absolute top-2 right-2 opacity-30 group-hover:opacity-60"
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
          className="absolute inset-0 rounded-xl border-2 border-white/20 opacity-0 group-hover:opacity-100"
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
