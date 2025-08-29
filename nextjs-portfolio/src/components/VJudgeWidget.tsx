'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ExternalLink, Target, Calendar, School } from 'lucide-react'

interface VJudgeStats {
  totalSolved: number
  joinDate: string
  school: string
  handle: string
  lastSeen: string
}

interface VJudgeWidgetProps {
  handle?: string
  problemsSolved?: number
}

export default function VJudgeWidget({ handle = 'sksazid', problemsSolved = 325 }: VJudgeWidgetProps) {
  const [stats, setStats] = useState<VJudgeStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading and set static data since VJudge doesn't have a public API
    const timer = setTimeout(() => {
      setStats({
        totalSolved: problemsSolved,
        joinDate: '41 months ago',
        school: 'SUST',
        handle: handle,
        lastSeen: '4 days ago'
      })
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [handle, problemsSolved])

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
        {/* Problems Solved */}
        <motion.div 
          className="text-3xl font-bold mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
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
          <Target className="w-4 h-4" />
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
            <School className="w-3 h-3" />
            <span>{stats.school}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Calendar className="w-3 h-3" />
            <span>Member since {stats.joinDate}</span>
          </div>
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
