'use client'

import { motion } from 'framer-motion'
import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export default function FloatingThemeToggle() {
  const { theme, setTheme } = useTheme()

  const getNextTheme = () => {
    if (theme === 'light') return 'dark'
    if (theme === 'dark') return 'system'
    return 'light'
  }

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-6 h-6" />
      case 'dark':
        return <Moon className="w-6 h-6" />
      default:
        return <Monitor className="w-6 h-6" />
    }
  }

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Switch to Dark Mode'
      case 'dark':
        return 'Switch to System Mode'
      default:
        return 'Switch to Light Mode'
    }
  }

  return (
    <motion.button
      onClick={() => setTheme(getNextTheme())}
      className="fixed bottom-6 left-6 z-50 bg-white dark:bg-gray-800 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 w-14 h-14 flex items-center justify-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2 }}
      title={getThemeLabel()}
    >
      <div className="text-gray-700 dark:text-gray-300">
        {getThemeIcon()}
      </div>
    </motion.button>
  )
}
