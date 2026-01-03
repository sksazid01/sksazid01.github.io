'use client'

import { motion } from 'framer-motion'
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

// Below-the-fold sections - lazy load on scroll/intersection
const About = dynamic(() => import('@/components/About'), {
  loading: () => <div className="py-20" />,
  ssr: false
})

const ProfessionalAchievements = dynamic(() => import('@/components/ProfessionalAchievements'), {
  loading: () => <div className="py-20" />,
  ssr: false
})

const Projects = dynamic(() => import('@/components/Projects'), {
  loading: () => <div className="py-20" />,
  ssr: false
})

const Skills = dynamic(() => import('@/components/Skills'), {
  loading: () => <div className="py-20" />,
  ssr: false
})

const Experience = dynamic(() => import('@/components/Experience'), {
  loading: () => <div className="py-20" />,
  ssr: false
})

const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => <div className="py-20" />,
  ssr: false
})

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="py-10" />,
  ssr: false
})

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
        <ProfessionalAchievements />
        <Projects />
        <Skills />
        <Experience />
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
