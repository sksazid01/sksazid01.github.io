'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Moon, Sun, Volume2, VolumeX, Menu, X, Monitor } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [isSoundEnabled, setIsSoundEnabled] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [showThemeMenu, setShowThemeMenu] = useState(false)

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#github-projects', label: 'Live GitHub' },
    { href: '#contact', label: 'Contact' },
  ]

  const themes = [
    { id: 'light', name: 'Light', icon: Sun },
    { id: 'dark', name: 'Dark', icon: Moon },
    { id: 'system', name: 'System', icon: Monitor }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.substring(1))
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return Sun
      case 'dark': return Moon
      case 'system': return Monitor
      default: return Moon
    }
  }

  const ThemeIcon = getThemeIcon()

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-blue-100 dark:border-gray-800 z-50"
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
          >
            Ahasanul
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === link.href.substring(1)
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
                {activeSection === link.href.substring(1) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                    initial={false}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => setIsSoundEnabled(!isSoundEnabled)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Toggle Sound Effects"
            >
              {isSoundEnabled ? (
                <Volume2 className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <VolumeX className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </motion.button>

            {/* Enhanced Theme Selector */}
            <div className="relative">
              <motion.button
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={`Current theme: ${theme}`}
              >
                <ThemeIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </motion.button>

              {/* Theme Dropdown */}
              {showThemeMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 min-w-[120px]"
                >
                  {themes.map((themeOption) => (
                    <motion.button
                      key={themeOption.id}
                      onClick={() => {
                        setTheme(themeOption.id as any)
                        setShowThemeMenu(false)
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                        theme === themeOption.id ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                      }`}
                      whileHover={{ x: 2 }}
                    >
                      <themeOption.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{themeOption.name}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4"
          >
            {navLinks.map((link, index) => (
              <motion.button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`block w-full text-left px-4 py-3 text-base font-medium transition-colors ${
                  activeSection === link.href.substring(1)
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </nav>

      {/* Click outside to close theme menu */}
      {showThemeMenu && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => setShowThemeMenu(false)}
        />
      )}
    </motion.header>
  )
}
