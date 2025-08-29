'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  Trophy, 
  Target, 
  Medal, 
  Award, 
  Star,
  Calendar,
  Code,
  Users,
  TrendingUp,
  Clock
} from 'lucide-react'

interface Achievement {
  id: string
  title: string
  description: string
  date: string
  category: 'coding' | 'project' | 'learning' | 'recognition'
  icon: React.ReactNode
  color: string
  status: 'completed' | 'in-progress' | 'featured' | 'ongoing'
  badge?: string
}

export default function AchievementsSection() {
  const [filter, setFilter] = useState<string>('all')
  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      title: '650+ Problems Solved',
      description: 'Solved over 650 competitive programming problems across multiple platforms',
      date: '2024-12',
      category: 'coding',
      icon: <Code className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      status: 'ongoing',
      badge: 'Master'
    },
    {
      id: '2',
      title: 'Full-Stack Portfolio',
      description: 'Built a complete responsive portfolio with advanced features and animations',
      date: '2024-12',
      category: 'project',
      icon: <Trophy className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      status: 'completed',
      badge: 'Complete'
    },
    {
      id: '3',
      title: 'Restaurant Management App',
      description: 'Developed native Android application for restaurant order management',
      date: '2024-10',
      category: 'project',
      icon: <Star className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      status: 'featured',
      badge: 'Featured'
    },
    {
      id: '4',
      title: 'Machine Learning Expertise',
      description: 'Mastered Python ML libraries: Keras, NumPy, Matplotlib, Pandas',
      date: '2024-08',
      category: 'learning',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
      status: 'completed',
      badge: 'Advanced'
    },
    {
      id: '5',
      title: 'Multi-Platform Problem Solver',
      description: 'Achieved 590+ problems solved on Vjudge and other platforms',
      date: '2024-06',
      category: 'coding',
      icon: <Target className="w-6 h-6" />,
      color: 'from-indigo-500 to-purple-500',
      status: 'ongoing',
      badge: 'Expert'
    },
    {
      id: '6',
      title: 'Contest Champion',
      description: 'Won 235+ coding challenges and contest problems on CodeChef',
      date: '2024-04',
      category: 'recognition',
      icon: <Medal className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-500',
      status: 'completed',
      badge: 'Champion'
    },
    {
      id: '7',
      title: 'JavaFX Game Development',
      description: 'Created interactive Word Matching Game with modern UI/UX design',
      date: '2024-02',
      category: 'project',
      icon: <Award className="w-6 h-6" />,
      color: 'from-teal-500 to-green-500',
      status: 'completed',
      badge: 'Innovation'
    },
    {
      id: '8',
      title: '2+ Years Python Experience',
      description: 'Maintained consistent Python development and data science work',
      date: '2024-01',
      category: 'learning',
      icon: <Clock className="w-6 h-6" />,
      color: 'from-blue-600 to-indigo-600',
      status: 'ongoing',
      badge: 'Veteran'
    }
  ])

  const categories = [
    { id: 'all', name: 'All Achievements', icon: Trophy },
    { id: 'coding', name: 'Coding', icon: Code },
    { id: 'project', name: 'Projects', icon: Star },
    { id: 'learning', name: 'Learning', icon: TrendingUp },
    { id: 'recognition', name: 'Recognition', icon: Medal }
  ]

  const filteredAchievements = filter === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === filter)

  const stats = {
    total: achievements.length,
    coding: achievements.filter(a => a.category === 'coding').length,
    projects: achievements.filter(a => a.category === 'project').length,
    learning: achievements.filter(a => a.category === 'learning').length,
    recognition: achievements.filter(a => a.category === 'recognition').length
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/50">
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
              Achievements & Milestones
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Notable accomplishments and milestones in my journey
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12"
        >
          {[
            { label: 'Total', value: stats.total, color: 'from-blue-500 to-cyan-500' },
            { label: 'Coding', value: stats.coding, color: 'from-green-500 to-emerald-500' },
            { label: 'Projects', value: stats.projects, color: 'from-purple-500 to-pink-500' },
            { label: 'Learning', value: stats.learning, color: 'from-orange-500 to-red-500' },
            { label: 'Recognition', value: stats.recognition, color: 'from-yellow-500 to-orange-500' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl shadow-lg text-center border border-gray-200/50 dark:border-gray-700/50"
            >
              <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                filter === category.id
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Achievements Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
            >
              {/* Achievement Header */}
              <div className={`h-32 bg-gradient-to-br ${achievement.color} flex items-center justify-center text-white relative overflow-hidden`}>
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {achievement.icon}
                </motion.div>
                
                {/* Badge */}
                {achievement.badge && (
                  <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                    {achievement.badge}
                  </div>
                )}

                {/* Animated particles */}
                <motion.div
                  className="absolute top-2 left-2 w-2 h-2 bg-white/30 rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-2 right-2 w-1 h-1 bg-white/40 rounded-full"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.9, 0.4]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                />
              </div>

              {/* Achievement Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {achievement.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                  {achievement.description}
                </p>

                {/* Status Indicator */}
                <div className="mb-4">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                    achievement.status === 'completed' 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                      : achievement.status === 'ongoing' 
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                      : achievement.status === 'featured'
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                      : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      achievement.status === 'completed' 
                        ? 'bg-green-500' 
                        : achievement.status === 'ongoing' 
                        ? 'bg-blue-500'
                        : achievement.status === 'featured'
                        ? 'bg-purple-500'
                        : 'bg-orange-500'
                    }`} />
                    <span className="capitalize">{achievement.status === 'in-progress' ? 'In Progress' : achievement.status}</span>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(achievement.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    year: 'numeric' 
                  })}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievement Summary */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Achievement Summary
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Continuous learning and achievement across multiple domains of technology and development
          </p>
          <div className="flex justify-center">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-full font-semibold"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              🎯 Always striving for excellence
            </motion.div>
          </div>
        </motion.div> */}
      </div>
    </section>
  )
}
