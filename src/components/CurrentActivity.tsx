'use client'

import { motion } from 'framer-motion'
import { Activity, Eye } from 'lucide-react'

interface CurrentActivityProps {
  activity: string
  visitorCount?: number
  loading: boolean
  showVisitorCount?: boolean
  compact?: boolean
}

export default function CurrentActivity({ 
  activity, 
  visitorCount, 
  loading, 
  showVisitorCount = true,
  compact = false 
}: CurrentActivityProps) {
  if (loading) {
    return (
      <div className={`${compact ? 'flex items-center gap-2' : 'mt-8 text-center space-y-4'}`}>
        <div className="inline-flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 animate-pulse">
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className={`h-4 bg-gray-300 dark:bg-gray-600 rounded ${compact ? 'w-32' : 'w-48'}`}></div>
        </div>
        {showVisitorCount && !compact && (
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-gray-800 px-4 py-2 rounded-lg animate-pulse">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
          </div>
        )}
      </div>
    )
  }

  const ActivityIndicator = (
    <motion.div
      className={`inline-flex items-center gap-2 ${
        compact 
          ? 'bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-full border border-green-200 dark:border-green-700' 
          : 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow'
      }`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      whileHover={{ scale: compact ? 1.02 : 1.05 }}
    >
      <motion.div 
        className="w-2 h-2 bg-green-500 rounded-full"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [1, 0.7, 1]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <span className={`${compact ? 'text-xs' : 'text-sm'} font-medium ${
        compact 
          ? 'text-green-700 dark:text-green-300 max-w-[200px] truncate' 
          : 'text-gray-700 dark:text-gray-300'
      } flex items-center gap-1`}>
        {!compact && <Activity className="w-4 h-4" />}
        {activity}
      </span>
    </motion.div>
  )

  if (compact) {
    return ActivityIndicator
  }

  return (
    <motion.div 
      className="mt-8 text-center space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {ActivityIndicator}

      {/* Visitor Counter */}
      {showVisitorCount && visitorCount && (
        <motion.div
          className="inline-flex items-center gap-2 bg-blue-50 dark:bg-gray-800 px-4 py-2 rounded-lg border border-blue-100 dark:border-gray-700"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Portfolio Views: 
            <motion.span 
              className="font-bold text-blue-600 dark:text-blue-400 ml-1"
              key={visitorCount}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {visitorCount.toLocaleString()}
            </motion.span>
          </span>
        </motion.div>
      )}
    </motion.div>
  )
}
