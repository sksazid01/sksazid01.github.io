'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Edit3, Check, X } from 'lucide-react'
import { updatePlatformStats, getStoredStats } from '@/utils/localStats'

export default function QuickStatsUpdater() {
  const [isOpen, setIsOpen] = useState(false)
  const [vjudgeCount, setVjudgeCount] = useState('')
  const [codechefCount, setCodechefCount] = useState('')

  const handleUpdate = () => {
    if (vjudgeCount && parseInt(vjudgeCount) > 0) {
      updatePlatformStats('vjudge', parseInt(vjudgeCount))
    }
    if (codechefCount && parseInt(codechefCount) > 0) {
      updatePlatformStats('codechef', parseInt(codechefCount))
    }
    
    setVjudgeCount('')
    setCodechefCount('')
    setIsOpen(false)
  }

  const getCurrentStats = () => {
    const vjudge = getStoredStats('vjudge')
    const codechef = getStoredStats('codechef')
    return {
      vjudge: vjudge?.totalSolved || 326,
      codechef: codechef?.totalSolved || 54
    }
  }

  const currentStats = getCurrentStats()

  if (!isOpen) {
    return (
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Update Problem Counts"
      >
        <Edit3 className="w-5 h-5" />
      </motion.button>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 border dark:border-gray-700 z-50 min-w-[250px]"
    >
      <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
        Quick Stats Update
      </h3>
      
      <div className="space-y-3">
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400">
            VJudge (current: {currentStats.vjudge})
          </label>
          <input
            type="number"
            value={vjudgeCount}
            onChange={(e) => setVjudgeCount(e.target.value)}
            placeholder="New count"
            className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400">
            CodeChef (current: {currentStats.codechef})
          </label>
          <input
            type="number"
            value={codechefCount}
            onChange={(e) => setCodechefCount(e.target.value)}
            placeholder="New count"
            className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>
      
      <div className="flex gap-2 mt-4">
        <motion.button
          onClick={handleUpdate}
          disabled={!vjudgeCount && !codechefCount}
          className="flex-1 bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Check className="w-4 h-4" />
          Update
        </motion.button>
        
        <motion.button
          onClick={() => {
            setIsOpen(false)
            setVjudgeCount('')
            setCodechefCount('')
          }}
          className="bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-gray-600 flex items-center justify-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <X className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}
