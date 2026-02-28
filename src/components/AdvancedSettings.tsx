'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Settings, 
  Volume2, 
  VolumeX, 
  Eye, 
  Palette, 
  Zap, 
  Save, 
  RotateCcw,
  Monitor,
  Sun,
  Moon
} from 'lucide-react'
import { useTheme } from './ThemeProvider'

interface SettingsState {
  soundEnabled: boolean
  animations: boolean
  particleEffects: boolean
  autoSave: boolean
  reducedMotion: boolean
}

export default function AdvancedSettings() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState<SettingsState>({
    soundEnabled: true,
    animations: true,
    particleEffects: true,
    autoSave: true,
    reducedMotion: false
  })
  const { theme, setTheme } = useTheme()

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('portfolio-settings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('portfolio-settings', JSON.stringify(settings))
    
    // Apply settings to document
    if (settings.reducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0s')
    } else {
      document.documentElement.style.removeProperty('--animation-duration')
    }
  }, [settings])

  const updateSetting = (key: keyof SettingsState, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const resetSettings = () => {
    const defaultSettings: SettingsState = {
      soundEnabled: true,
      animations: true,
      particleEffects: true,
      autoSave: true,
      reducedMotion: false
    }
    setSettings(defaultSettings)
  }

  const themes = [
    { id: 'light' as const, name: 'Light', icon: Sun },
    { id: 'dark' as const, name: 'Dark', icon: Moon },
    { id: 'system' as const, name: 'System', icon: Monitor }
  ]

  return (
    <>
      {/* Settings Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 left-6 z-50 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        title="Open Settings"
      >
        <Settings className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </motion.button>

      {/* Settings Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Settings Panel */}
            <motion.div
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-4 top-4 bottom-4 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-y-auto"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Settings
                  </h3>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ✕
                  </motion.button>
                </div>
              </div>

              {/* Theme Selection */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Theme
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {themes.map((themeOption) => (
                    <motion.button
                      key={themeOption.id}
                      onClick={() => setTheme(themeOption.id)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        theme === themeOption.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <themeOption.icon className="w-5 h-5 mx-auto mb-1 text-gray-700 dark:text-gray-300" />
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        {themeOption.name}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Preferences */}
              <div className="p-6 space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Preferences
                </h4>

                {/* Sound Effects */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {settings.soundEnabled ? (
                      <Volume2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    ) : (
                      <VolumeX className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    )}
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Sound Effects
                    </span>
                  </div>
                  <motion.button
                    onClick={() => updateSetting('soundEnabled', !settings.soundEnabled)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.soundEnabled ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                      animate={{ x: settings.soundEnabled ? 24 : 4 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    />
                  </motion.button>
                </div>

                {/* Animations */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Animations
                    </span>
                  </div>
                  <motion.button
                    onClick={() => updateSetting('animations', !settings.animations)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.animations ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                      animate={{ x: settings.animations ? 24 : 4 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    />
                  </motion.button>
                </div>

                {/* Particle Effects */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Particle Effects
                    </span>
                  </div>
                  <motion.button
                    onClick={() => updateSetting('particleEffects', !settings.particleEffects)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.particleEffects ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                      animate={{ x: settings.particleEffects ? 24 : 4 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    />
                  </motion.button>
                </div>

                {/* Reduced Motion */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <RotateCcw className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Reduced Motion
                    </span>
                  </div>
                  <motion.button
                    onClick={() => updateSetting('reducedMotion', !settings.reducedMotion)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.reducedMotion ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                      animate={{ x: settings.reducedMotion ? 24 : 4 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    />
                  </motion.button>
                </div>

                {/* Auto Save */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Save className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Auto Save Settings
                    </span>
                  </div>
                  <motion.button
                    onClick={() => updateSetting('autoSave', !settings.autoSave)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.autoSave ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                      animate={{ x: settings.autoSave ? 24 : 4 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    />
                  </motion.button>
                </div>
              </div>

              {/* Reset Button */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                <motion.button
                  onClick={resetSettings}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset to Defaults
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
