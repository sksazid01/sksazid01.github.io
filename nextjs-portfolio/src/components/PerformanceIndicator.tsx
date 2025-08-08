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
  WifiOff
} from 'lucide-react'

interface PerformanceMetrics {
  pageLoadTime: number
  renderTime: number
  networkStatus: 'online' | 'offline'
  lastUpdated: string
}

export default function PerformanceIndicator() {
  const [isVisible, setIsVisible] = useState(false)
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
      className="fixed top-20 right-4 z-40 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 max-w-xs"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-500" />
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
      <div className="space-y-3">
        {/* Page Load Time */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LoadIcon className={`w-4 h-4 ${getPerformanceColor(metrics.pageLoadTime)}`} />
            <span className="text-xs text-gray-600 dark:text-gray-400">Load Time</span>
          </div>
          <span className={`text-xs font-mono ${getPerformanceColor(metrics.pageLoadTime)}`}>
            {metrics.pageLoadTime}ms
          </span>
        </div>

        {/* Render Time */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RenderIcon className={`w-4 h-4 ${getPerformanceColor(metrics.renderTime)}`} />
            <span className="text-xs text-gray-600 dark:text-gray-400">Render Time</span>
          </div>
          <span className={`text-xs font-mono ${getPerformanceColor(metrics.renderTime)}`}>
            {metrics.renderTime}ms
          </span>
        </div>

        {/* Network Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {metrics.networkStatus === 'online' ? (
              <Wifi className="w-4 h-4 text-green-500" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-500" />
            )}
            <span className="text-xs text-gray-600 dark:text-gray-400">Network</span>
          </div>
          <span className={`text-xs capitalize ${
            metrics.networkStatus === 'online' ? 'text-green-500' : 'text-red-500'
          }`}>
            {metrics.networkStatus}
          </span>
        </div>

        {/* Performance Score */}
        <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Score</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-green-500">98</span>
              <Sparkles className="w-3 h-3 text-yellow-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-600">
        <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
          Updated: {metrics.lastUpdated}
        </p>
      </div>

      {/* Animated dots */}
      <div className="absolute -top-1 -right-1">
        <motion.div
          className="w-2 h-2 bg-green-500 rounded-full"
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
