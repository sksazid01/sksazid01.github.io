'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  Code, 
  Star, 
  GitCommit, 
  Users, 
  Calendar,
  TrendingUp,
  Activity,
  Zap
} from 'lucide-react'

interface Skill {
  name: string
  level: number
  color: string
  projects: number
  experience: string
}

export default function SkillsVisualization() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null)
  const [animateProgress, setAnimateProgress] = useState(false)

  const skills: Skill[] = [
    {
      name: 'JavaScript/TypeScript',
      level: 90,
      color: 'from-yellow-400 to-orange-500',
      projects: 15,
      experience: '3+ years'
    },
    {
      name: 'Python',
      level: 95,
      color: 'from-blue-400 to-blue-600',
      projects: 25,
      experience: '5+ years'
    },
    {
      name: 'Java',
      level: 85,
      color: 'from-red-400 to-red-600',
      projects: 12,
      experience: '3+ years'
    },
    {
      name: 'C++',
      level: 80,
      color: 'from-blue-600 to-indigo-600',
      projects: 8,
      experience: '2+ years'
    },
    {
      name: 'React/Next.js',
      level: 88,
      color: 'from-cyan-400 to-blue-500',
      projects: 10,
      experience: '2+ years'
    },
    {
      name: 'Android Development',
      level: 82,
      color: 'from-green-400 to-green-600',
      projects: 6,
      experience: '2+ years'
    },
    {
      name: 'Machine Learning',
      level: 75,
      color: 'from-purple-400 to-pink-500',
      projects: 8,
      experience: '2+ years'
    },
    {
      name: 'Data Science',
      level: 85,
      color: 'from-indigo-400 to-purple-600',
      projects: 12,
      experience: '3+ years'
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateProgress(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Skills Mastery
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Interactive visualization of my technical expertise and proficiency levels
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setActiveSkill(skill.name)}
              onHoverEnd={() => setActiveSkill(null)}
              className={`relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 group ${
                activeSkill === skill.name ? 'scale-105' : ''
              }`}
            >
              {/* Skill Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {skill.name}
                </h3>
                <span className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                  {skill.level}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full mb-4 overflow-hidden">
                <motion.div
                  className={`absolute top-0 left-0 h-full bg-gradient-to-r ${skill.color} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: animateProgress ? `${skill.level}%` : 0 }}
                  transition={{ 
                    duration: 1.5, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                />
                
                {/* Animated glow effect */}
                <motion.div
                  className={`absolute top-0 left-0 h-full w-8 bg-gradient-to-r ${skill.color} opacity-60 blur-sm`}
                  animate={{
                    x: activeSkill === skill.name ? [0, skill.level * 2, 0] : 0,
                  }}
                  transition={{
                    duration: 2,
                    repeat: activeSkill === skill.name ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                />
              </div>

              {/* Skill Details */}
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Code className="w-4 h-4" />
                    {skill.projects} projects
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {skill.experience}
                  </span>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
              />
            </motion.div>
          ))}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Star, value: '95%', label: 'Max Proficiency', color: 'text-yellow-500' },
            { icon: TrendingUp, value: '85%', label: 'Avg. Skill Level', color: 'text-green-500' },
            { icon: GitCommit, value: '100+', label: 'Projects Built', color: 'text-blue-500' },
            { icon: Zap, value: '8', label: 'Core Technologies', color: 'text-purple-500' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center border border-gray-200/50 dark:border-gray-700/50"
            >
              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skill Legend */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
            Proficiency Levels
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">Beginner (0-40%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">Intermediate (41-70%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">Advanced (71-90%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">Expert (91-100%)</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
