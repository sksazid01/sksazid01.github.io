'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Code, 
  Star, 
  Calendar,
  Award,
  CheckCircle,
  TrendingUp
} from 'lucide-react'

interface Skill {
  name: string
  level: 'Beginner' | 'Intermediate' | 'Proficient' | 'Advanced'
  category: string
  projects: number
  experience: string
  description: string
}

export default function SkillsVisualization() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null)

  const skills: Skill[] = [
    {
      name: 'JavaScript/TypeScript',
      level: 'Beginner',
      category: 'Frontend',
      projects: 3,
      experience: '6+ months',
      description: 'Modern web development with type safety'
    },
    {
      name: 'Python',
      level: 'Beginner',
      category: 'Backend/AI',
      projects: 5,
      experience: '2+ years',
      description: 'Data science, machine learning, and web APIs'
    },
    {
      name: 'Java',
      level: 'Intermediate',
      category: 'Backend',
      projects: 3,
      experience: '1+ years',
      description: 'Enterprise applications and Android development'
    },
    {
      name: 'C and C++',
      level: 'Intermediate',
      category: 'Systems',
      projects: 2,
      experience: '3+ years',
      description: 'Competitive programming'
    },
    {
      name: 'React/Next.js',
      level: 'Intermediate',
      category: 'Frontend',
      projects: 3,
      experience: '6+ months',
      description: 'Modern React ecosystem and SSR applications'
    },
    {
      name: 'Android Development',
      level: 'Intermediate',
      category: 'Mobile',
      projects: 2,
      experience: '1+ years',
      description: 'Native Android apps with Jetpack Compose'
    },
    {
      name: 'Machine Learning',
      level: 'Proficient',
      category: 'AI/ML',
      projects: 2,
      experience: '1+ years',
      description: 'Deep learning models and data analysis'
    },
    {
      name: 'Data Science',
      level: 'Intermediate',
      category: 'Analytics',
      projects: 3,
      experience: '1+ years',
      description: 'Statistical analysis and data visualization'
    },
    {
      name: 'Node.js/Express',
      level: 'Intermediate',
      category: 'Backend',
      projects: 2,
      experience: '1+ years',
      description: 'RESTful APIs and server-side JavaScript'
    },
    {
      name: 'Tailwind CSS',
      level: 'Intermediate',
      category: 'Frontend',
      projects: 3,
      experience: '6+ months',
      description: 'Utility-first CSS framework for modern UIs'
    },
    {
      name: 'Git/GitHub',
      level: 'Proficient',
      category: 'Tools',
      projects: 10,
      experience: '3+ years',
      description: 'Version control and collaborative development'
    },
    {
      name: 'SQL/Databases',
      level: 'Intermediate',
      category: 'Backend',
      projects: 4,
      experience: '2+ years',
      description: 'Relational databases and query optimization'
    },
    {
      name: 'RESTful APIs',
      level: 'Intermediate',
      category: 'Backend',
      projects: 3,
      experience: '1+ years',
      description: 'API design and integration'
    }
  ]

  const getLevelColor = (level: string) => {
    // All levels use blue color for consistency
    return 'blue'
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'Beginner': return <Award className="w-4 h-4" />
      case 'Intermediate': return <Star className="w-4 h-4" />
      case 'Proficient': return <CheckCircle className="w-4 h-4" />
      case 'Advanced': return <TrendingUp className="w-4 h-4" />
      default: return <Code className="w-4 h-4" />
    }
  }

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
              Technical Expertise
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Core technologies and frameworks I specialize in for building modern applications
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
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
              {/* Professional Level Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${getLevelColor(skill.level)} text-white text-sm font-medium`}>
                  {getLevelIcon(skill.level)}
                  {skill.level}
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  {skill.category}
                </div>
              </div>

              {/* Skill Name */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {skill.name}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                {skill.description}
              </p>

              {/* Stats */}
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

              {/* Hover Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${getLevelColor(skill.level)} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
            </motion.div>
          ))}
        </div>

        {/* Performance Indicators */}
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
              {skills.filter(skill => skill.level === 'Beginner').length}
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">Beginner Skills</div>
          </div>
          <div className="text-center p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-3xl font-bold text-purple-500 mb-2">
              {skills.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">Technologies</div>
          </div>
        </motion.div>

        {/* Professional Legend */}
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
              <div className="w-3 h-3 rounded-full bg-blue-500 dark:bg-blue-400"></div>
              <span className="font-medium">Beginner</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600"></div>
              <span className="font-medium">Intermediate</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="w-3 h-3 rounded-full bg-blue-600 dark:bg-blue-500"></div>
              <span className="font-medium">Proficient</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="w-3 h-3 rounded-full bg-blue-400 dark:bg-blue-600"></div>
              <span className="font-medium">Advanced</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

