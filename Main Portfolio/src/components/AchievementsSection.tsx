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
  Clock,
  Github,
  ExternalLink,
  ShoppingCart,
  Smartphone,
  Gamepad2,
  BarChart3
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
  technologies?: string[]
  links?: {
    github?: string
    demo?: string
  }
  repoName?: string // Add this to map to actual GitHub repos
}

interface GitHubRepo {
  id: number
  name: string
  html_url: string
  description: string
  language: string
  updated_at: string
}

export default function AchievementsSection() {
  const [filter, setFilter] = useState<string>('all')
  const [repositories, setRepositories] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch GitHub repositories
  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch('https://api.github.com/users/sksazid01/repos?sort=updated&per_page=50')
        if (response.ok) {
          const repos = await response.json()
          setRepositories(repos)
        }
      } catch (error) {
        console.error('Error fetching repositories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRepositories()
  }, [])

  // Function to get repository URL by name or closest match
  const getRepositoryUrl = (repoName?: string, projectTitle?: string) => {
    if (!repoName && !projectTitle) return 'https://github.com/sksazid01'
    
    // First, try to find exact match by repoName
    if (repoName) {
      const repo = repositories.find(r => r.name.toLowerCase() === repoName.toLowerCase())
      if (repo) return repo.html_url
    }
    
    // Then try to find by project title keywords
    if (projectTitle) {
      const keywords = projectTitle.toLowerCase().split(' ')
      const repo = repositories.find(r => 
        keywords.some(keyword => 
          r.name.toLowerCase().includes(keyword) || 
          r.description?.toLowerCase().includes(keyword)
        )
      )
      if (repo) return repo.html_url
    }
    
    // Default to profile
    return 'https://github.com/sksazid01'
  }
  const [achievements] = useState<Achievement[]>([
    {
      id: '0',
      title: '4th Position at Inter-University National Hackathon 2025',
      description: 'Team SUST_Prompt_Storm secured 4th position at Green University of Bangladesh, powered by SmythOS. Ranked 6th out of ~250 teams in selection, competed among 50 finalists.',
      date: '2025-09',
      category: 'recognition',
      icon: <Trophy className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-500',
      status: 'featured',
      badge: '🏆 Champion',
      technologies: ['SmythOS', 'AI Agents', 'Full Stack', 'Team Leadership'],
      repoName: 'Smart-IELTS',
      links: {
        github: 'https://github.com/sksazid01/Smart-IELTS',
        demo: '#'
      }
    },
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
      badge: 'Complete',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      repoName: 'sksazid01.github.io',
      links: {
        demo: '#'
      }
    },
    {
      id: '3',
      title: 'Restaurant Management App',
      description: 'Native Android application for restaurant management and order processing with modern UI/UX',
      date: '2024-10',
      category: 'project',
      icon: <Smartphone className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      status: 'featured',
      badge: 'Featured',
      technologies: ['Android', 'Kotlin', 'Jetpack Compose', 'Room Database', 'MVVM'],
      repoName: 'Eatery_Android_Project',
      links: {
        demo: '#'
      }
    },
    {
      id: '4',
      title: 'E-commerce Marketplace',
      description: 'Comprehensive e-commerce platform with user management, product catalog, and secure transactions',
      date: '2023-07',
      category: 'project',
      icon: <ShoppingCart className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      status: 'completed',
      badge: 'Academic',
      technologies: ['Django', 'Python', 'JavaScript', 'PostgreSQL', 'HTML/CSS'],
      repoName: 'E-commerce_web_project',
      links: {
        demo: '#'
      }
    },
    {
      id: '5',
      title: 'Machine Learning Expertise',
      description: 'Mastered Python ML libraries and data science projects with real-world datasets',
      date: '2024-08',
      category: 'learning',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
      status: 'ongoing',
      badge: 'Advanced',
      technologies: ['Python', 'Keras', 'NumPy', 'Matplotlib', 'Pandas', 'Scikit-learn'],
      repoName: 'Neural_Network'
    },
    {
      id: '6',
      title: 'Multi-Platform Problem Solver',
      description: 'Achieved 590+ problems solved on Vjudge and other competitive programming platforms',
      date: '2024-06',
      category: 'coding',
      icon: <Target className="w-6 h-6" />,
      color: 'from-indigo-500 to-purple-500',
      status: 'ongoing',
      badge: 'Expert',
      repoName: 'Random_Problem_Solving_Code'
    },
    {
      id: '7',
      title: 'JavaFX Game Development',
      description: 'Interactive Word Matching Game with engaging UI/UX design and multiple difficulty levels',
      date: '2024-02',
      category: 'project',
      icon: <Gamepad2 className="w-6 h-6" />,
      color: 'from-teal-500 to-green-500',
      status: 'completed',
      badge: 'Innovation',
      technologies: ['Java', 'JavaFX', 'FXML', 'CSS', 'Scene Builder'],
      repoName: 'Word-Game-JavaFX',
      links: {
        demo: '#'
      }
    },
    {
      id: '8',
      title: 'Contest Champion',
      description: "Solved 235+ contest's problems on CodeChef",
      date: '2024-04',
      category: 'recognition',
      icon: <Medal className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-500',
      status: 'completed',
      badge: 'Champion'
    },
    {
      id: '9',
      title: 'Club Management System',
      description: 'Full-stack web application for club activities with member registration and event management',
      date: '2025-07',
      category: 'project',
      icon: <Users className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
      status: 'in-progress',
      badge: 'Upcoming',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT'],
      repoName: 'Project350_CMS',
      links: {
        demo: '#'
      }
    },
    {
      id: '10',
      title: '3+ Years Python Experience',
      description: 'Maintained consistent Python development and data science work across multiple domains',
      date: '2024-01',
      category: 'learning',
      icon: <Clock className="w-6 h-6" />,
      color: 'from-blue-600 to-indigo-600',
      status: 'ongoing',
      badge: 'Veteran'
    }
  ])

  const categories = [
    { id: 'all', name: 'All Items', icon: Trophy },
    { id: 'project', name: 'Projects', icon: Star },
    { id: 'coding', name: 'Coding', icon: Code },
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
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/50">
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
              Projects & Achievements
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Featured projects, notable accomplishments, and milestones in my development journey
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

                {/* Technologies */}
                {achievement.technologies && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {achievement.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Status Indicator and Project Links */}
                <div className="flex justify-between items-center mb-4">
                  {/* Status Indicator on the left */}
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

                  {/* Code button on the right */}
                  <div className="flex gap-2">
                    {achievement.links?.demo && achievement.links.demo !== '#' && (
                      <motion.a
                        href={achievement.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r ${achievement.color} text-white rounded-full hover:shadow-lg transition-all text-xs`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-3 h-3" />
                        Demo
                      </motion.a>
                    )}
                    {achievement.repoName && (
                      <motion.a
                        href={getRepositoryUrl(achievement.repoName)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 bg-gray-900 dark:bg-gray-700 text-white rounded-full hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors text-xs"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="w-3 h-3" />
                        Code
                      </motion.a>
                    )}
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
