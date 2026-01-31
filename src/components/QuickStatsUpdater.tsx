'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Code, Target, X } from 'lucide-react'
import { getStoredStats } from '@/utils/localStats'

export default function QuickStatsUpdater() {
  const [isVisible, setIsVisible] = useState(false)
  const [stats, setStats] = useState({
    vjudge: 0,
    codechef: 0
  })

  useEffect(() => {
    const getCurrentStats = () => {
      const vjudge = getStoredStats('vjudge')
      const codechef = getStoredStats('codechef')
      return {
        vjudge: vjudge?.totalSolved || 590,
        codechef: codechef?.totalSolved || 235
      }
    }

    setStats(getCurrentStats())
    
    // Show widget immediately
    setIsVisible(true)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 300 }}
      transition={{ duration: 0.5 }}
      className="fixed top-72 right-4 z-35 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 max-w-[280px] hidden lg:block"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold text-gray-900 dark:text-white flex items-center gap-1">
          <Code className="w-3 h-3 text-purple-500" />
          Coding Stats
        </h3>
        <motion.button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xs"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ✕
        </motion.button>
      </div>

      {/* Stats */}
      <div className="space-y-2">
        {/* VJudge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Target className="w-3 h-3 text-blue-500" />
            <span className="text-xs text-gray-600 dark:text-gray-400">VJudge</span>
          </div>
          <span className="text-xs font-medium text-blue-500">
            {stats.vjudge}
          </span>
        </div>

        {/* CodeChef */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Target className="w-3 h-3 text-orange-500" />
            <span className="text-xs text-gray-600 dark:text-gray-400">CodeChef</span>
          </div>
          <span className="text-xs font-medium text-orange-500">
            {stats.codechef}
          </span>
        </div>

        {/* Total */}
        <div className="pt-1 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Code className="w-3 h-3 text-green-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Total</span>
            </div>
            <span className="text-xs font-bold text-green-500">
              {stats.vjudge + stats.codechef}
            </span>
          </div>
        </div>
      </div>

      {/* Animated indicator */}
      <div className="absolute -top-1 -right-1">
        <motion.div
          className="w-1.5 h-1.5 bg-purple-500 rounded-full"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  )
}
