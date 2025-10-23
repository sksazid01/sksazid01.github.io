'use client'

import { motion } from 'framer-motion'
import { Github, Star, GitFork, Code, Activity } from 'lucide-react'

interface GitHubStats {
  totalRepos: number
  totalStars: number
  totalForks: number
  languages: [string, number][]
  lastCommit: string
}

interface GitHubStatsWidgetProps {
  stats: GitHubStats | null
  loading: boolean
}

export default function GitHubStatsWidget({ stats, loading }: GitHubStatsWidgetProps) {
  if (loading) {
    return (
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 animate-pulse">
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded mb-6 mx-auto w-64"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="text-center">
              <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!stats) return null

  const statItems = [
    {
      value: stats.totalRepos,
      label: 'Repositories',
      icon: Github,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      value: stats.totalStars,
      label: 'Stars Earned',
      icon: Star,
      color: 'text-green-600 dark:text-green-400'
    },
    {
      value: stats.totalForks,
      label: 'Forks',
      icon: GitFork,
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      value: stats.languages.length,
      label: 'Languages',
      icon: Code,
      color: 'text-orange-600 dark:text-orange-400'
    }
  ]

  return (
    <motion.div 
      className="mt-12 relative overflow-hidden bg-gradient-to-r from-blue-50/90 to-cyan-50/90 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-sm rounded-2xl p-8 border border-blue-100/50 dark:border-gray-700/50 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Diamond glint effect - light traveling around the entire card perimeter */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
      >
        {/* Animated border light that travels around the card */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Top edge light */}
          <motion.div
            className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent"
            style={{
              width: '40%',
              boxShadow: '0 0 15px rgba(255,255,255,0.5)',
            }}
            animate={{
              left: ['-40%', '100%'],
            }}
            transition={{
              duration: 8,
              ease: 'linear',
              repeat: Infinity,
              repeatDelay: 0
            }}
          />
          
          {/* Right edge light */}
          <motion.div
            className="absolute top-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-white/80 to-transparent"
            style={{
              height: '40%',
              boxShadow: '0 0 15px rgba(255,255,255,0.5)',
            }}
            animate={{
              top: ['-40%', '100%'],
            }}
            transition={{
              duration: 8,
              ease: 'linear',
              repeat: Infinity,
              delay: 2,
              repeatDelay: 0
            }}
          />
          
          {/* Bottom edge light */}
          <motion.div
            className="absolute bottom-0 right-0 h-[2px] bg-gradient-to-l from-transparent via-white/80 to-transparent"
            style={{
              width: '40%',
              boxShadow: '0 0 15px rgba(255,255,255,0.5)',
            }}
            animate={{
              right: ['-40%', '100%'],
            }}
            transition={{
              duration: 8,
              ease: 'linear',
              repeat: Infinity,
              delay: 4,
              repeatDelay: 0
            }}
          />
          
          {/* Left edge light */}
          <motion.div
            className="absolute bottom-0 left-0 w-[2px] bg-gradient-to-t from-transparent via-white/80 to-transparent"
            style={{
              height: '40%',
              boxShadow: '0 0 15px rgba(255,255,255,0.5)',
            }}
            animate={{
              bottom: ['-40%', '100%'],
            }}
            transition={{
              duration: 8,
              ease: 'linear',
              repeat: Infinity,
              delay: 6,
              repeatDelay: 0
            }}
          />
          
          {/* Soft glow halo following the border */}
          <motion.div
            className="absolute top-0 left-0 h-[6px] bg-gradient-to-r from-transparent via-white/40 to-transparent blur-sm"
            style={{
              width: '40%',
            }}
            animate={{
              left: ['-40%', '100%'],
            }}
            transition={{
              duration: 8,
              ease: 'linear',
              repeat: Infinity,
              repeatDelay: 0
            }}
          />
        </motion.div>
      </motion.div>      <div className="relative z-20">
      <motion.h3 
        className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white flex items-center justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        Live GitHub Stats
      </motion.h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            className="text-center group"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center justify-center mb-2">
              <item.icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`} />
            </div>
            <motion.div 
              className={`text-3xl font-bold ${item.color}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              {item.value}
            </motion.div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              {item.label}
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {stats.languages.map(([lang, count], index) => (
            <motion.span
              key={lang}
              className="px-3 py-1.5 bg-white dark:bg-gray-700 rounded-full text-sm font-medium shadow-sm border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              {lang} ({count})
            </motion.span>
          ))}
        </div>
        <motion.p 
          className="text-sm text-gray-500 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Activity className="w-4 h-4" />
          Last activity: {stats.lastCommit}
        </motion.p>
      </motion.div>
      </div>
    </motion.div>
  )
}
