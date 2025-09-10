'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ExternalLink, Code, TrendingUp, Trophy, RefreshCw, Plus } from 'lucide-react'
import { getStoredStats, setStoredStats, updatePlatformStats } from '@/utils/localStats'

interface VJudgeStats {
  totalSolved: number
  handle: string
  school: string
  membership: string
  lastUpdated?: string
  cached?: boolean
}

interface VJudgeWidgetProps {
  handle?: string
  problemsSolved?: number
  enableManualUpdate?: boolean
}

export default function VJudgeWidget({ 
  handle = 'sksazid', 
  problemsSolved = 330, // Updated to correct count
  enableManualUpdate = false 
}: VJudgeWidgetProps) {
  const [stats, setStats] = useState<VJudgeStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [showUpdateInput, setShowUpdateInput] = useState(false)
  const [newCount, setNewCount] = useState('')

  useEffect(() => {
    // Check for stored stats first
    const stored = getStoredStats('vjudge')
    
    // Validate stored stats - if the count seems unreasonable, ignore it
    if (stored && stored.totalSolved > 0 && stored.totalSolved < 10000) {
      setStats({
        totalSolved: stored.totalSolved,
        handle: handle,
        school: 'SUST',
        membership: 'Active Member',
        lastUpdated: stored.lastUpdated,
        cached: true
      })
    } else {
      // Use fallback data if no valid stored stats
      setStats({
        totalSolved: problemsSolved,
        handle: handle,
        school: 'SUST',
        membership: 'Active Member'
      })
    }
    
    setLoading(false)
  }, [handle, problemsSolved])

  // Listen for stats updates from other components
  useEffect(() => {
    const handleStatsUpdate = (event: CustomEvent) => {
      setStats(prev => prev ? {
        ...prev,
        totalSolved: event.detail.totalSolved,
        lastUpdated: event.detail.lastUpdated,
        cached: true
      } : null)
    }

    window.addEventListener('vjudge_stats_updated', handleStatsUpdate as EventListener)
    return () => window.removeEventListener('vjudge_stats_updated', handleStatsUpdate as EventListener)
  }, [])

  const handleManualUpdate = () => {
    const count = parseInt(newCount)
    if (count && count > 0) {
      updatePlatformStats('vjudge', count)
      setNewCount('')
      setShowUpdateInput(false)
    }
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="group bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-xl text-white text-center hover:shadow-xl transition-all duration-300"
      >
        <div className="animate-pulse">
          <div className="text-3xl font-bold mb-2">---</div>
          <div className="text-sm opacity-90 mb-2">Loading...</div>
          <div className="font-semibold">VJudge</div>
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
        className="group bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-xl text-white text-center hover:shadow-xl transition-all duration-300"
      >
        <div className="text-3xl font-bold mb-2">{problemsSolved}+</div>
        <div className="text-sm opacity-90 mb-2">Good Problems</div>
        <div className="font-semibold">VJudge</div>
        <div className="text-xs opacity-75 mt-1">@{handle}</div>
      </motion.div>
    )
  }

  return (
    <motion.a
      href={`https://vjudge.net/user/${handle}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3 }}
      className="group bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-xl text-white text-center hover:shadow-xl transition-all duration-300 block relative overflow-hidden"
    >
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
          {stats.totalSolved.toLocaleString()}+
        </motion.div>
        
        <motion.div 
          className="text-sm opacity-90 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Good Problems
        </motion.div>

        {/* Platform */}
        <motion.div 
          className="font-semibold flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Code className="w-4 h-4" />
          VJudge
          <ExternalLink className="w-3 h-3 opacity-75 group-hover:opacity-100 transition-opacity" />
        </motion.div>

        {/* Handle */}
        <motion.div 
          className="text-xs opacity-75 mt-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          @{handle}
        </motion.div>

        {/* Additional Info */}
        <motion.div 
          className="text-xs mt-2 space-y-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2">
            <Trophy className="w-3 h-3" />
            <span>{stats.school}</span>
          </div>
          <div className="opacity-75">{stats.membership}</div>
          {stats.lastUpdated && (
            <div className="text-xs opacity-50 mt-1">
              Updated: {new Date(stats.lastUpdated).toLocaleTimeString()}
              {stats.cached && ' (cached)'}
            </div>
          )}
        </motion.div>

        {/* Floating Animation */}
        <motion.div
          className="absolute top-2 left-2 opacity-30 group-hover:opacity-60"
          animate={{
            y: [0, -3, 0],
            rotate: [0, 3, -3, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <TrendingUp className="w-4 h-4" />
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
