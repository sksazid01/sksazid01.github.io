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
      title: "BSc in Engineering",
      description: "Shahjalal University of Engineering and Technology (Computer Science and Engineering)",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Problem Solving Expert",
      description: "650+ problems solved in CodeForces, 325+ in Vjudge platform using C, C++, Python, and Swift",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Multi-Platform Developer",
      description: "325+ good problems solved in Vjudge platform with diverse programming challenges",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Science & ML",
      description: "Working with Python libraries like Keras, NumPy, Matplotlib for long-term projects",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Technical Proficiency",
      description: "Python, Java, JavaScript, Kotlin, C++, Android Development, UI: Jetpack Compose, Data Science, Machine Learning",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Language Skills",
      description: "Native Bangla, Professional Working Proficiency in English and Hindi",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "SUST Programming Camp",
      description: "Competitive Programming Training Camp participant (03/2022 - Present)",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Academic Projects",
      description: "E-commerce Marketplace, Club Management System, JavaFX Game Development",
      color: "from-teal-500 to-green-500"
    }
  ]

  const stats = [
    { number: "650+", label: "CodeForces Problems" },
    { number: "325+", label: "Vjudge Problems" },
    { number: "1000+", label: "Total Problems Solved" },
    { number: "3+", label: "Years Programming" }
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
        
        {/* Competitive Programming Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50"
        >
          <h3 className="text-2xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              🏆 Competitive Programming Profiles
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.a
              href="https://codeforces.com/profile/sksazid"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-r from-red-500 to-orange-500 p-6 rounded-xl text-white text-center hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-3xl font-bold mb-2">650+</div>
              <div className="text-sm opacity-90 mb-2">Problems Solved</div>
              <div className="font-semibold">CodeForces</div>
              <div className="text-xs opacity-75 mt-1">@sksazid</div>
            </motion.a>
            
            <motion.a
              href="https://vjudge.net/user/sksazid"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-xl text-white text-center hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-3xl font-bold mb-2">325+</div>
              <div className="text-sm opacity-90 mb-2">Good Problems</div>
              <div className="font-semibold">VJudge</div>
              <div className="text-xs opacity-75 mt-1">@sksazid</div>
            </motion.a>
            
            <motion.a
              href="https://www.codechef.com/users/sksazid"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-xl text-white text-center hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-3xl font-bold mb-2">⭐</div>
              <div className="text-sm opacity-90 mb-2">Active Profile</div>
              <div className="font-semibold">CodeChef</div>
              <div className="text-xs opacity-75 mt-1">@sksazid</div>
            </motion.a>
          </div>
        </motion.div>
        
        {/* Dynamic Coding Stats Widget */}
        <CodingStatsWidget stats={codingStats} loading={loading} />
      </div>
    </section>
  )
}
