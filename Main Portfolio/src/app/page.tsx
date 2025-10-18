'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import SkillsVisualization from '@/components/SkillsVisualization'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import LoadingScreen from '@/components/LoadingScreen'

// Lazy load heavy components with dynamic imports
const StarryBackground = dynamic(() => import('@/components/StarryBackground'), {
  ssr: false,
  loading: () => null
})

const CursorTrail = dynamic(() => import('@/components/CursorTrail'), {
  ssr: false,
  loading: () => null
})

const ProfessionalAchievements = dynamic(() => import('@/components/ProfessionalAchievements'), {
  loading: () => <div className="py-20 text-center">Loading achievements...</div>
})

const AchievementsSection = dynamic(() => import('@/components/AchievementsSection'), {
  loading: () => <div className="py-20 text-center">Loading projects...</div>
})

const AdvancedSettings = dynamic(() => import('@/components/AdvancedSettings'), {
  ssr: false
})

const InteractiveTerminal = dynamic(() => import('@/components/InteractiveTerminal'), {
  ssr: false
})

const PerformanceIndicator = dynamic(() => import('@/components/PerformanceIndicator'), {
  ssr: false
})

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500) // 1.5s Loading

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
        <ProfessionalAchievements />
        <AchievementsSection />
        <Contact />
        <Footer />
      </motion.div>

      {/* Enhanced Features */}
      <AdvancedSettings />
      <InteractiveTerminal />
      <PerformanceIndicator />
    </main>
  )
}
