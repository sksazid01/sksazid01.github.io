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
      color: "blue"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Competitive Programmer",
      description: "Codeforces: 1200+ rating (Pupil), solved 650+ problems across platforms using C/C++ and Python",
      color: "blue"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Multi-Platform Problem Solver",
      description: "VJudge: solved 330+ problems. CodeChef: 1474 rating, 100+ problems solved",
      color: "blue"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Science & ML",
      description: "Python libraries: Keras, NumPy, Matplotlib, Pandas. Model training, data visualization, and predictive analytics",
      color: "blue"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Technical Skills",
      description: "Languages: C/C++, Python, Java, Kotlin, JavaScript. Web Development, Data Structures & Algorithms, Problem Solving",
      color: "blue"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Languages",
      description: "English (Native or Bilingual Proficiency), Bangla (Native or Bilingual Proficiency), Hindi (Professional Working Proficiency)",
      color: "blue"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "SUST Programming Training Camp",
      description: "Competitive Programming Training Camp participant (03/2022 - Present)",
      color: "blue"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Academic Projects",
      description: "E-commerce Marketplace (Java, Servlets), Club Management System (Kotlin, Jetpack Compose), Restaurant Management System, Word Matching Game (JavaFX)",
      color: "blue"
    }
  ]

  // const stats = [
  //   { number: "1230+", label: "Codeforces Problems" },
  //   { number: "330+", label: "VJudge Problems" },
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
            <span className="text-blue-600 dark:text-blue-400">
              About Me
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Professional background, technical expertise, and achievements
          </p>
        </motion.div>

        {/* Download CV Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 flex justify-center"
        >
          <DownloadCVButton />
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
              className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden"
              style={{ perspective: '1000px' }}
            >
              {/* Perimeter Border Light Animation */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Top Edge */}
                <motion.div
                  className="absolute top-0 left-0 h-[2px] w-[40%] bg-gradient-to-r from-transparent via-white/80 to-transparent"
                  style={{ filter: 'blur(1px)' }}
                  animate={{
                    left: ['-40%', '100%']
                  }}
                  transition={{
                    duration: 8,
                    ease: 'linear',
                    repeat: Infinity,
                    repeatDelay: 0,
                    delay: index * 0.2
                  }}
                />
                {/* Right Edge */}
                <motion.div
                  className="absolute top-0 right-0 w-[2px] h-[40%] bg-gradient-to-b from-transparent via-white/80 to-transparent"
                  style={{ filter: 'blur(1px)' }}
                  animate={{
                    top: ['-40%', '100%']
                  }}
                  transition={{
                    duration: 8,
                    ease: 'linear',
                    repeat: Infinity,
                    repeatDelay: 0,
                    delay: 2 + index * 0.2
                  }}
                />
                {/* Bottom Edge */}
                <motion.div
                  className="absolute bottom-0 right-0 h-[2px] w-[40%] bg-gradient-to-l from-transparent via-white/80 to-transparent"
                  style={{ filter: 'blur(1px)' }}
                  animate={{
                    right: ['-40%', '100%']
                  }}
                  transition={{
                    duration: 8,
                    ease: 'linear',
                    repeat: Infinity,
                    repeatDelay: 0,
                    delay: 4 + index * 0.2
                  }}
                />
                {/* Left Edge */}
                <motion.div
                  className="absolute bottom-0 left-0 w-[2px] h-[40%] bg-gradient-to-t from-transparent via-white/80 to-transparent"
                  style={{ filter: 'blur(1px)' }}
                  animate={{
                    bottom: ['-40%', '100%']
                  }}
                  transition={{
                    duration: 8,
                    ease: 'linear',
                    repeat: Infinity,
                    repeatDelay: 0,
                    delay: 6 + index * 0.2
                  }}
                />
              </div>
              
              <div className="inline-flex p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10">
                {highlight.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors relative z-10">
                {highlight.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed relative z-10">
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
          className="mt-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden"
        >
          {/* Perimeter Border Light Animation */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Top Edge */}
            <motion.div
              className="absolute top-0 left-0 h-[2px] w-[40%] bg-gradient-to-r from-transparent via-white/80 to-transparent"
              style={{ filter: 'blur(1px)' }}
              animate={{
                left: ['-40%', '100%']
              }}
              transition={{
                duration: 8,
                ease: 'linear',
                repeat: Infinity,
                repeatDelay: 0
              }}
            />
            {/* Right Edge */}
            <motion.div
              className="absolute top-0 right-0 w-[2px] h-[40%] bg-gradient-to-b from-transparent via-white/80 to-transparent"
              style={{ filter: 'blur(1px)' }}
              animate={{
                top: ['-40%', '100%']
              }}
              transition={{
                duration: 8,
                ease: 'linear',
                repeat: Infinity,
                repeatDelay: 0,
                delay: 2
              }}
            />
            {/* Bottom Edge */}
            <motion.div
              className="absolute bottom-0 right-0 h-[2px] w-[40%] bg-gradient-to-l from-transparent via-white/80 to-transparent"
              style={{ filter: 'blur(1px)' }}
              animate={{
                right: ['-40%', '100%']
              }}
              transition={{
                duration: 8,
                ease: 'linear',
                repeat: Infinity,
                repeatDelay: 0,
                delay: 4
              }}
            />
            {/* Left Edge */}
            <motion.div
              className="absolute bottom-0 left-0 w-[2px] h-[40%] bg-gradient-to-t from-transparent via-white/80 to-transparent"
              style={{ filter: 'blur(1px)' }}
              animate={{
                bottom: ['-40%', '100%']
              }}
              transition={{
                duration: 8,
                ease: 'linear',
                repeat: Infinity,
                repeatDelay: 0,
                delay: 6
              }}
            />
          </div>
          
          <h3 className="text-2xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400 relative z-10">
            🏆 Competitive Programming Profiles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
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
