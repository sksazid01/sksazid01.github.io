'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw, CheckCircle, Wifi } from 'lucide-react'
import { useAutoStatsUpdate } from '@/hooks/useAutoStatsUpdate'

export default function AutoUpdateIndicator() {
  const { isUpdating, lastUpdateTime, updateStatus, manualUpdate } = useAutoStatsUpdate()

  return (
    <div className="fixed top-4 right-4 z-50">
      <AnimatePresence>
        {/* Update Status Toast */}
        {updateStatus && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3 mb-2 max-w-sm"
          >
            <div className="flex items-center gap-2">
              {isUpdating ? (
                <RefreshCw className="w-4 h-4 animate-spin text-blue-500" />
              ) : (
                <CheckCircle className="w-4 h-4 text-green-500" />
              )}
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {updateStatus}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auto-Update Indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 p-2"
      >
        <motion.button
          onClick={manualUpdate}
          disabled={isUpdating}
          className="flex items-center gap-2 px-3 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={isUpdating ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 1, repeat: isUpdating ? Infinity : 0, ease: "linear" }}
          >
            <RefreshCw className="w-4 h-4 text-blue-500" />
          </motion.div>
          
          <div className="text-xs">
            <div className="text-gray-700 dark:text-gray-300 font-medium">
              {isUpdating ? 'Updating...' : 'Auto-Update'}
            </div>
            {lastUpdateTime && (
              <div className="text-gray-500 dark:text-gray-400">
                {lastUpdateTime.toLocaleTimeString()}
              </div>
            )}
          </div>
        </motion.button>
      </motion.div>

      {/* Connection Status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-2 flex justify-center"
      >
        <div className="flex items-center gap-1 px-2 py-1 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
          <Wifi className="w-3 h-3 text-green-500" />
          <span className="text-xs text-gray-600 dark:text-gray-400">Live</span>
        </div>
      </motion.div>
    </div>
  )
}
