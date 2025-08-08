'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Trophy, Code, Database, Globe, Star, Target, BookOpen } from 'lucide-react'
import GitHubStatsWidget from './GitHubStatsWidget'
import CodingStatsWidget from './CodingStatsWidget'
import { useDynamicPortfolio } from '@/hooks/useDynamicPortfolio'

export default function About() {
  const { githubStats, codingStats, loading } = useDynamicPortfolio()
  const highlights = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Computer Science Engineering Student",
      description: "Shahjalal University of Engineering and Technology",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Competitive Programming",
      description: "1230+ problems solved across multiple platforms with expertise in algorithmic problem-solving",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Full-Stack Development",
      description: "Web & mobile application expertise with modern frameworks and technologies",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Science & ML",
      description: "Hands-on machine learning experience with real-world applications",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Programming Languages",
      description: "Python, Java, C++, JavaScript with production-level proficiency",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Professional Edge",
      description: "Multilingual communication skills (English, Bangla, Hindi) for global collaboration",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Innovation Focus",
      description: "Passionate about building impactful technology solutions that solve real-world problems",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Academic Excellence",
      description: "Strong foundation in Computer Science fundamentals and emerging technologies",
      color: "from-teal-500 to-green-500"
    }
  ]

  const stats = [
    { number: "1230+", label: "Problems Solved" },
    { number: "590+", label: "Projects Completed" },
    { number: "235+", label: "Challenges Won" },
    { number: "2+", label: "Years Experience" }
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
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
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
              About Me
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Professional background, technical expertise, and achievements
          </p>
        </motion.div>

        {/* 3x4 Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                z: 50
              }}
              className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
              style={{ perspective: '1000px' }}
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${highlight.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {highlight.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {highlight.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {highlight.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg text-center border-2 border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
            >
              <motion.h3
                className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
              >
                {stat.number}
              </motion.h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Dynamic GitHub Stats Widget */}
        <GitHubStatsWidget stats={githubStats} loading={loading} />
        
        {/* Dynamic Coding Stats Widget */}
        <CodingStatsWidget stats={codingStats} loading={loading} />
      </div>
    </section>
  )
}
