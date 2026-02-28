'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTheme } from './ThemeProvider'
import GlossyBorder from './GlossyBorder'

interface LeetCodeWidgetProps {
  handle?: string
  font?: string
  ext?: 'heatmap' | 'activity' | 'contest' | ''
}

export default function LeetCodeWidget({
  handle = 'sksazid',
  font = 'ZCOOL%20XiaoWei',
  ext = 'heatmap',
}: LeetCodeWidgetProps) {
  const { theme } = useTheme()
  const [cardTheme, setCardTheme] = useState<'dark' | 'light'>('dark')
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)

  // Resolve portfolio theme (incl. 'system') to dark or light
  useEffect(() => {
    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      setCardTheme(mq.matches ? 'dark' : 'light')
    } else {
      setCardTheme(theme === 'light' ? 'light' : 'dark')
    }
  }, [theme])

  // Reset image state when card URL changes so spinner shows while reloading
  useEffect(() => {
    setImgLoaded(false)
    setImgError(false)
  }, [cardTheme, handle])

  const extParam = ext ? `&ext=${ext}` : ''
  const cardUrl = `https://leetcard.jacoblin.cool/${handle}?theme=${cardTheme}&font=${font}&border=0&radius=8${extParam}`

  return (
    <motion.a
      href={`https://leetcode.com/u/${handle}/`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3 }}
      className="group relative block rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-400 hover:shadow-xl transition-all duration-300"
    >
      <GlossyBorder />

      {/* Spinner while SVG loads */}
      {!imgLoaded && !imgError && (
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 min-h-[220px]">
          <motion.div
            className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      )}

      {/* Fallback if the external service is unreachable */}
      {imgError && (
        <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 min-h-[220px] gap-1 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold">LeetCode</span>
          <span>@{handle}</span>
        </div>
      )}

      <img
        src={cardUrl}
        alt={`LeetCode stats for @${handle}`}
        className={`w-full transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
        onLoad={() => setImgLoaded(true)}
        onError={() => { setImgError(true); setImgLoaded(false) }}
        loading="lazy"
      />
    </motion.a>
  )
}
