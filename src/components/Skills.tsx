'use client'

import { motion } from 'framer-motion'
import { Trophy, Code, Target, Award, Zap, TrendingUp } from 'lucide-react'
import CodeforcesWidget from './CodeforcesWidget'
import VJudgeWidget from './VJudgeWidget'
import CodeChefWidget from './CodeChefWidget'
import LeetCodeWidget from './LeetCodeWidget'
import CodingStatsWidget from './CodingStatsWidget'
import { useDynamicPortfolio } from '@/hooks/useDynamicPortfolio'
import GlossyBorder, { GLOSS_BLUE, GLOSS_PURPLE } from './GlossyBorder'

export default function Skills() {
  const { codingStats, loading } = useDynamicPortfolio()

  const cpHighlights = [
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Codeforces Pupil",
      rating: "1200+",
      description: "Active competitive programmer with consistent rating",
      color: "blue"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Multi-Platform Solver",
      rating: "1200+",
      description: "Problems solved across Codeforces, VJudge, CodeChef, LeetCode",
      color: "purple"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "VJudge Enthusiast",
      rating: "325+",
      description: "Diverse problem-solving experience",
      color: "green"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "CodeChef Competitor",
      rating: "1437",
      description: "2-Star coder, max rating 1474",
      color: "orange"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "LeetCode",
      rating: "150+",
      description: "Problems solved on LeetCode",
      color: "yellow"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Primary Languages",
      rating: "C/C++",
      description: "Expert in competitive programming with C++ and Python",
      color: "red"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
              Competitive Programming
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Problem-solving expertise across multiple coding platforms
          </p>
        </motion.div>

        {/* CP Highlights Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {cpHighlights.map((highlight, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                z: 50
              }}
              className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden"
              style={{ perspective: '1000px' }}
            >
              {/* Animated Border */}
              <GlossyBorder edges={['top']} color={GLOSS_BLUE} duration={3} delay={index * 0.1} showGlow />

              <div className={`inline-flex p-3 rounded-xl bg-${highlight.color}-100 dark:bg-${highlight.color}-900/30 text-${highlight.color}-600 dark:text-${highlight.color}-400 mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                {highlight.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors relative z-10">
                {highlight.title}
              </h3>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text mb-2 relative z-10">
                {highlight.rating}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed relative z-10">
                {highlight.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Competitive Programming Profiles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden"
        >
          {/* Animated Border */}
          <GlossyBorder edges={['top', 'bottom']} color={GLOSS_PURPLE} duration={3} showGlow />
          
          <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 text-transparent bg-clip-text relative z-10">
            🏆 Live Platform Statistics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            <CodeforcesWidget handle="sksazid" />
            <LeetCodeWidget handle="sksazid" />
            <VJudgeWidget handle="sksazid" />
            <CodeChefWidget handle="sksazid" />
          </div>
        </motion.div>

        {/* Dynamic Coding Stats Widget */}
        <CodingStatsWidget stats={codingStats} loading={loading} />

        {/* Problem Solving Journey */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50"
        >
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            💡 Problem-Solving Approach
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">1200+</div>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Total Problems</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">3+</div>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-2">4</div>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Active Platforms</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">C++</div>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Primary Language</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
