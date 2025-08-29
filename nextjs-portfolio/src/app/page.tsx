'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import SkillsVisualization from '@/components/SkillsVisualization'
import Experience from '@/components/Experience'
import AchievementsSection from '@/components/AchievementsSection'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import LoadingScreen from '@/components/LoadingScreen'
import StarryBackground from '@/components/StarryBackground'
import AdvancedSettings from '@/components/AdvancedSettings'
import InteractiveTerminal from '@/components/InteractiveTerminal'
import PerformanceIndicator from '@/components/PerformanceIndicator'
import CursorTrail from '@/components/CursorTrail'
import QuickStatsUpdater from '@/components/QuickStatsUpdater'
import AutoUpdateIndicator from '@/components/AutoUpdateIndicator'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // 2s Loading

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
      <StarryBackground />
      <CursorTrail />
      <Header />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Hero />
        <About />
        <Skills />
        <SkillsVisualization />
        <Experience />
        <AchievementsSection />
        <Projects />
        <Contact />
        <Footer />
      </motion.div>

      {/* Enhanced Features */}
      <AdvancedSettings />
      <InteractiveTerminal />
      <PerformanceIndicator />
      <QuickStatsUpdater />
      <AutoUpdateIndicator />
    </main>
  )
}
