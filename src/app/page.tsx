'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Hero from '@/components/Hero'

// Background effects - load immediately but render without blocking
const StarryBackground = dynamic(() => import('@/components/StarryBackground'), {
  ssr: false,
  loading: () => null
})

const CursorTrail = dynamic(() => import('@/components/CursorTrail'), {
  ssr: false,
  loading: () => null
})

// Below-the-fold sections - preload after initial render
const About = dynamic(() => import('@/components/About'))
const ProfessionalAchievements = dynamic(() => import('../components/ProfessionalAchievements'))
const Projects = dynamic(() => import('@/components/Projects'))
const Skills = dynamic(() => import('@/components/Skills'))
const Experience = dynamic(() => import('@/components/Experience'))
const Contact = dynamic(() => import('@/components/Contact'))
const Footer = dynamic(() => import('@/components/Footer'))

// UI enhancements - load in background
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
  const [showBelowFold, setShowBelowFold] = useState(false)

  // Load below-the-fold content after Hero renders
  useEffect(() => {
    // Start loading other sections immediately after component mounts
    setShowBelowFold(true)
  }, [])

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
      <StarryBackground />
      <CursorTrail />
      <Header />
      
      {/* Above the fold - loads immediately */}
      <Hero />

      {/* Below the fold - loads after Hero is rendered */}
      {showBelowFold && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <About />
          <ProfessionalAchievements />
          <Projects />
          <Skills />
          <Experience />
          <Contact />
          <Footer />
        </motion.div>
      )}

      {/* Enhanced Features */}
      <AdvancedSettings />
      <InteractiveTerminal />
      <PerformanceIndicator />
    </main>
  )
}
