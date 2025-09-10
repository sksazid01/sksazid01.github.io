'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Trophy, Code, Database, Globe, Star, Target, BookOpen } from 'lucide-react'
import GitHubStatsWidget from './GitHubStatsWidget'
import CodingStatsWidget from './CodingStatsWidget'
import CodeforcesWidget from './CodeforcesWidget'
import VJudgeWidget from './VJudgeWidget'
import CodeChefWidget from './CodeChefWidget'
import DownloadCVButton from './DownloadCVButton'
import { useDynamicPortfolio } from '@/hooks/useDynamicPortfolio'

export default function About() {
  const { githubStats, codingStats, loading } = useDynamicPortfolio()
  const highlights = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "BSc in Computer Science and Engineering",
      description: "Shahjalal University of Science and Technology, Sylhet, Bangladesh",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Competitive Programmer",
      description: "CodeForces: 1200+ rating (Pupil), solved 650+ problems using C, C++, Python, and Swift",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Multi-Platform Problem Solver",
      description: "VJudge: Solved 325+ problems. CodeChef: Achieved 1474 rating, solved 100+ problems",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Science & ML",
      description: "Python libraries: Keras, NumPy, Matplotlib, Pandas. Model training, data visualization, and predictive analytics",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Technical Skills",
      description: "Languages: C/C++, Python, Java, Kotlin, JavaScript. Web Development, Data Structures & Algorithms, Problem Solving",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Languages",
      description: "English (Native or Bilingual Proficiency), Bangla (Native or Bilingual Proficiency), Hindi (Professional Working Proficiency)",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "SUST Programming Training Camp",
      description: "Competitive Programming Training Camp participant (03/2022 - Present)",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Academic Projects",
      description: "E-commerce Marketplace (Java, Servlets), Club Management System (Kotlin, Jetpack Compose), Restaurant Management System, Word Matching Game (JavaFX)",
      color: "from-teal-500 to-green-500"
    }
  ]

  // const stats = [
  //   { number: "1230+", label: "CodeForces Problems" },
  //   { number: "325+", label: "Vjudge Problems" },
  //   { number: "1000+", label: "Total Problems Solved" },
  //   { number: "3+", label: "Years Programming" }
  // ]

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
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Professional background, technical expertise, and achievements
          </p>
          
          {/* Download CV Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4"
          >
            <DownloadCVButton />
          </motion.div>
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
        {/* <motion.div
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
        </motion.div> */}


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
            <CodeforcesWidget handle="sksazid" />

            <VJudgeWidget handle="sksazid" />

            <CodeChefWidget handle="sksazid" />
          </div>
        </motion.div>

        {/* Dynamic GitHub Stats Widget */}
        <GitHubStatsWidget stats={githubStats} loading={loading} />

        {/* Dynamic Coding Stats Widget */}
        <CodingStatsWidget stats={codingStats} loading={loading} />
      </div>
    </section>
  )
}
