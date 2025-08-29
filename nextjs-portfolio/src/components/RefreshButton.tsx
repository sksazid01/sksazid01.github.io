'use client'

import { motion } from 'framer-motion'
import { RefreshCw } from 'lucide-react'
import { useState } from 'react'

interface RefreshButtonProps {
  onRefresh: () => Promise<void>
  className?: string
}

export default function RefreshButton({ onRefresh, className = '' }: RefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await onRefresh()
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <motion.button
      onClick={handleRefresh}
      disabled={isRefreshing}
      className={`
        flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 
        text-white rounded-lg transition-colors disabled:opacity-50 
        disabled:cursor-not-allowed ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
      <span>
        {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
      </span>
    </motion.button>
  )
}
