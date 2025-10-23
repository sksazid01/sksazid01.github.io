'use client'

import { motion } from 'framer-motion'
import { Clock, TrendingUp } from 'lucide-react'

interface CodingStats {
  total_seconds: number
  languages: { name: string; percent: number }[]
  last_heartbeat: string
}

interface CodingStatsWidgetProps {
  stats: CodingStats | null
  loading: boolean
}

export default function CodingStatsWidget({ stats, loading }: CodingStatsWidgetProps) {
  if (loading) {
    return (
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 animate-pulse">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-4 mx-auto w-80"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-8"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!stats) return null

  const hours = Math.floor(stats.total_seconds / 3600)
  const minutes = Math.round((stats.total_seconds % 3600) / 60)
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
    
    if (seconds < 60) return 'Just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  const getLanguageColor = (index: number) => {
    // All languages use blue color for consistency
    return 'blue'
  }

  return (
    <motion.div 
      className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800/50 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
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
        {/* Top Edge Glow */}
        <motion.div
          className="absolute top-0 left-0 h-[4px] w-[40%] bg-gradient-to-r from-transparent via-white/40 to-transparent blur-sm"
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
      
      <motion.h3 
        className="text-xl font-bold text-center mb-4 text-gray-800 dark:text-white flex items-center justify-center gap-2 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        This Week's Coding Activity
        <span className="text-sm font-normal text-gray-500 bg-white dark:bg-gray-700 px-2 py-1 rounded-full">
          {hours}h {minutes}m total
        </span>
      </motion.h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {/* Languages Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Languages Used
          </h4>
          <div className="space-y-3">
            {stats.languages.map((lang, index) => (
              <motion.div
                key={lang.name}
                className="flex items-center justify-between group"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {lang.name}
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${getLanguageColor(index)} transition-all duration-1000 group-hover:scale-105`}
                      initial={{ width: 0 }}
                      animate={{ width: `${lang.percent}%` }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 w-10 text-right font-medium">
                    {Math.round(lang.percent)}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Quick Stats</h4>
          <div className="space-y-3">
            {[
              { label: 'Daily Average', value: `${Math.round(hours/7)}h ${Math.round(minutes/7)}m` },
              { label: 'Most Active', value: stats.languages[0]?.name || 'N/A' },
              { label: 'Last Coded', value: getTimeAgo(stats.last_heartbeat) },
              { 
                label: 'Status', 
                value: (
                  <span className="text-green-600 dark:text-green-400 flex items-center gap-1 font-medium">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Active Developer
                  </span>
                )
              }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="flex justify-between items-center py-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {typeof item.value === 'string' ? item.value : item.value}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
