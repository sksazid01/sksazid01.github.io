'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Code, Globe, BarChart3, Smartphone, Wrench, Languages, Calendar } from 'lucide-react'

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null)

  interface Skill {
    name: string
    level: 'Beginner' | 'Intermediate' | 'Proficient' | 'Advanced'
    category: string
    projects: number
    experience: string
    description: string
  }

  const skills: Skill[] = [
    // Programming Languages
    {
      name: 'Python',
      level: 'Beginner',
      category: 'Programming',
      projects: 5,
      experience: '2+ years',
      description: 'Data science, machine learning, and web APIs'
    },
    {
      name: 'Java',
      level: 'Intermediate',
      category: 'Programming',
      projects: 3,
      experience: '1+ years',
      description: 'Enterprise applications and Android development'
    },
    {
      name: 'C and C++',
      level: 'Intermediate',
      category: 'Programming',
      projects: 2,
      experience: '3+ years',
      description: 'Competitive programming and system-level development'
    },
    {
      name: 'JavaScript/TypeScript',
      level: 'Beginner',
      category: 'Programming',
      projects: 3,
      experience: '6+ months',
      description: 'Modern web development with type safety'
    },
    {
      name: 'Kotlin',
      level: 'Intermediate',
      category: 'Programming',
      projects: 2,
      experience: '1+ years',
      description: 'Android development with Jetpack Compose'
    },
    // Web Development
    {
      name: 'Django',
      level: 'Intermediate',
      category: 'Web Development',
      projects: 2,
      experience: '1+ years',
      description: 'Python web framework for rapid development'
    },
    {
      name: 'React/Next.js',
      level: 'Intermediate',
      category: 'Web Development',
      projects: 3,
      experience: '6+ months',
      description: 'Modern React ecosystem and SSR applications'
    },
    {
      name: 'HTML5 & CSS3',
      level: 'Intermediate',
      category: 'Web Development',
      projects: 4,
      experience: '2+ years',
      description: 'Responsive design and modern web standards'
    },
    // Mobile Development
    {
      name: 'Android Development',
      level: 'Intermediate',
      category: 'Mobile',
      projects: 2,
      experience: '1+ years',
      description: 'Native Android apps with Kotlin and Jetpack Compose'
    },
    {
      name: 'JavaFX',
      level: 'Intermediate',
      category: 'Mobile',
      projects: 1,
      experience: '6+ months',
      description: 'Desktop GUI applications with Java'
    },
    // Data Science & ML
    {
      name: 'Machine Learning',
      level: 'Proficient',
      category: 'Data Science',
      projects: 2,
      experience: '1+ years',
      description: 'Deep learning models with Keras and TensorFlow'
    },
    {
      name: 'Data Science',
      level: 'Intermediate',
      category: 'Data Science',
      projects: 3,
      experience: '1+ years',
      description: 'Statistical analysis with Pandas and NumPy'
    },
    {
      name: 'Data Structures & Algorithms',
      level: 'Proficient',
      category: 'Data Science',
      projects: 10,
      experience: '3+ years',
      description: 'Competitive programming and problem solving (650+ problems)'
    },
    // Tools & Others
    {
      name: 'Git & GitHub',
      level: 'Intermediate',
      category: 'Tools',
      projects: 15,
      experience: '2+ years',
      description: 'Version control and collaborative development'
    },
    {
      name: 'VS Code',
      level: 'Proficient',
      category: 'Tools',
      projects: 20,
      experience: '3+ years',
      description: 'Primary development environment with extensions'
    },
    {
      name: 'IntelliJ IDEA',
      level: 'Intermediate',
      category: 'Tools',
      projects: 5,
      experience: '1+ years',
      description: 'Java and Kotlin development IDE'
    },
    {
      name: 'Android',
      level: 'Intermediate',
      category: 'Tools',
      projects: 2,
      experience: '1+ years',
      description: 'Android app development environment'
    }
  ]

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'Beginner': return '🎯'
      case 'Intermediate': return '⭐'
      case 'Proficient': return '✅'
      case 'Advanced': return '🚀'
      default: return '💻'
    }
  }

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/50">
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
              Skills & Technical Expertise
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        {/* Unified Skills Grid with Detailed Proficiency UI */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              onHoverStart={() => setActiveSkill(skill.name)}
              onHoverEnd={() => setActiveSkill(null)}
              className={`relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 group ${
                activeSkill === skill.name ? 'scale-105' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
                  <span>{getLevelIcon(skill.level)}</span>
                  {skill.level}
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  {skill.category}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {skill.name}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                {skill.description}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Code className="w-4 h-4 text-blue-500" />
                  <span>{skill.projects} projects</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-green-500" />
                  <span>{skill.experience}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="text-center p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-3xl font-bold text-blue-500 mb-2">
              {skills.reduce((acc, skill) => acc + skill.projects, 0)}
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">Total Projects</div>
          </div>
          <div className="text-center p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-3xl font-bold text-green-500 mb-2">
              {skills.filter(skill => skill.level === 'Proficient' || skill.level === 'Advanced').length}
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">Advanced Skills</div>
          </div>
          <div className="text-center p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-3xl font-bold text-purple-500 mb-2">
              {skills.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">Total Technologies</div>
          </div>
        </motion.div>

        {/* Expertise Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
            Expertise Levels
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>🎯</span>
              <span className="font-medium">Beginner</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>⭐</span>
              <span className="font-medium">Intermediate</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>✅</span>
              <span className="font-medium">Proficient</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>🚀</span>
              <span className="font-medium">Advanced</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
