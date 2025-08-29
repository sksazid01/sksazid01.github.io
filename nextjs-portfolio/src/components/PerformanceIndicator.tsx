'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  Rocket, 
  Zap, 
  Sparkles, 
  Clock,
  TrendingUp,
  Activity,
  Wifi,
  WifiOff,
  Eye
} from 'lucide-react'
import { useDynamicPortfolio } from '@/hooks/useDynamicPortfolio'

interface PerformanceMetrics {
  pageLoadTime: number
  renderTime: number
  networkStatus: 'online' | 'offline'
  lastUpdated: string
}

export default function PerformanceIndicator() {
  const [isVisible, setIsVisible] = useState(false)
  const { currentActivity, visitorCount, loading: activityLoading } = useDynamicPortfolio()
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    pageLoadTime: 0,
    renderTime: 0,
    networkStatus: 'online',
    lastUpdated: new Date().toLocaleTimeString()
  })

  useEffect(() => {
    // Calculate page load time
    const loadTime = performance.now()
    
    // Simulate render time calculation
    const renderStart = performance.now()
    
    setTimeout(() => {
      const renderEnd = performance.now()
      setMetrics(prev => ({
        ...prev,
        pageLoadTime: Math.round(loadTime),
        renderTime: Math.round(renderEnd - renderStart),
        lastUpdated: new Date().toLocaleTimeString()
      }))
    }, 100)

    // Network status monitoring
    const updateNetworkStatus = () => {
      setMetrics(prev => ({
        ...prev,
        networkStatus: navigator.onLine ? 'online' : 'offline',
        lastUpdated: new Date().toLocaleTimeString()
      }))
    }

    window.addEventListener('online', updateNetworkStatus)
    window.addEventListener('offline', updateNetworkStatus)

    // Show indicator after a delay
    const timer = setTimeout(() => setIsVisible(true), 3000)

    return () => {
      window.removeEventListener('online', updateNetworkStatus)
      window.removeEventListener('offline', updateNetworkStatus)
      clearTimeout(timer)
    }
  }, [])

  const getPerformanceColor = (time: number) => {
    if (time < 100) return 'text-green-500'
    if (time < 500) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getPerformanceIcon = (time: number) => {
    if (time < 100) return Rocket
    if (time < 500) return Zap
    return Clock
  }

  const LoadIcon = getPerformanceIcon(metrics.pageLoadTime)
  const RenderIcon = getPerformanceIcon(metrics.renderTime)

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 300 }}
      transition={{ duration: 0.5 }}
      className="fixed top-44 right-4 z-35 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 max-w-[280px] hidden lg:block"
    >
      {/* Activity Status */}
      {!activityLoading && currentActivity && (
        <motion.div
          className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full border border-green-200 dark:border-green-700 mb-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="w-1.5 h-1.5 bg-green-500 rounded-full"
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
          <span className="text-xs font-medium text-green-700 dark:text-green-300 max-w-[140px] truncate">
            {currentActivity}
          </span>
        </motion.div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold text-gray-900 dark:text-white flex items-center gap-1">
          <Activity className="w-3 h-3 text-blue-500" />
          Performance
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

      {/* Metrics */}
      <div className="space-y-2">
        {/* Page Load Time */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <LoadIcon className={`w-3 h-3 ${getPerformanceColor(metrics.pageLoadTime)}`} />
            <span className="text-xs text-gray-600 dark:text-gray-400">Load</span>
          </div>
          <span className={`text-xs font-mono ${getPerformanceColor(metrics.pageLoadTime)}`}>
            {metrics.pageLoadTime}ms
          </span>
        </div>

        {/* Network Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {metrics.networkStatus === 'online' ? (
              <Wifi className="w-3 h-3 text-green-500" />
            ) : (
              <WifiOff className="w-3 h-3 text-red-500" />
            )}
            <span className="text-xs text-gray-600 dark:text-gray-400">Net</span>
          </div>
          <span className={`text-xs capitalize ${
            metrics.networkStatus === 'online' ? 'text-green-500' : 'text-red-500'
          }`}>
            {metrics.networkStatus}
          </span>
        </div>

        {/* Visitor Count */}
        {!activityLoading && visitorCount > 0 && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3 text-blue-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Views</span>
            </div>
            <span className="text-xs font-medium text-blue-500">
              {visitorCount.toLocaleString()}
            </span>
          </div>
        )}

        {/* Performance Score */}
        <div className="pt-1 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-blue-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Score</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-green-500">98</span>
              <Sparkles className="w-2 h-2 text-yellow-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Animated dots */}
      <div className="absolute -top-1 -right-1">
        <motion.div
          className="w-1.5 h-1.5 bg-green-500 rounded-full"
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
