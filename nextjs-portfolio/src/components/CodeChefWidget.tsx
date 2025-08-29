'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ExternalLink, Award, TrendingUp, Trophy, Star } from 'lucide-react'

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
}

interface CodeChefWidgetProps {
  handle?: string
  problemsSolved?: number
  currentRating?: number
  maxRating?: number
}

export default function CodeChefWidget({ 
  handle = 'sksazid', 
  problemsSolved = 54,
  currentRating = 1437,
  maxRating = 1474
}: CodeChefWidgetProps) {
  const [stats, setStats] = useState<CodeChefStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading and set real data
    const timer = setTimeout(() => {
      setStats({
        totalSolved: problemsSolved,
        currentRating: currentRating,
        maxRating: maxRating,
        stars: 2, // 2★ from the profile
        division: 'Div 3',
        contestsParticipated: 12,
        handle: handle,
        country: 'Bangladesh',
        institution: 'SUST'
      })
      setLoading(false)
    }, 1200)

    return () => clearTimeout(timer)
  }, [handle, problemsSolved, currentRating, maxRating])

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="group bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-xl text-white text-center hover:shadow-xl transition-all duration-300"
      >
        <div className="animate-pulse">
          <div className="text-3xl font-bold mb-2">---</div>
          <div className="text-sm opacity-90 mb-2">Loading...</div>
          <div className="font-semibold">CodeChef</div>
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
        {/* Problems Solved */}
        <motion.div 
          className="text-3xl font-bold mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {stats.totalSolved}
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
