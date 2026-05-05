'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Database, Globe, Briefcase, Award } from 'lucide-react'
import GitHubStatsWidget from './GitHubStatsWidget'
import { useDynamicPortfolio } from '@/hooks/useDynamicPortfolio'

export default function About() {
  const { githubStats, loading } = useDynamicPortfolio()
  const highlights = [
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Software Engineer",
      description: "Contributing on Islamic Fintech Software Development at MISL, Dhaka",
      color: "green"
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Education",
      description: "BSc in CSE at SUST, Sylhet (2022–2026) with 3.50/4.00 CGPA",
      color: "blue"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Competitive Programming",
      description: "Codeforces Pupil (max 1228), 1200+ problems solved across platforms",
      color: "orange"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "AI/ML Systems",
      description: "RAG pipelines, LLM integration, and predictive analytics",
      color: "purple"
    }
  ]

  const techStack = [
    { category: "Languages", skills: "C, C++, Python, Java, JavaScript, TypeScript, Kotlin" },
    { category: "Web / Backend", skills: "React, Next.js, Node.js, Express, Spring Boot, REST APIs, JPA, JDBC" },
    { category: "AI / ML", skills: "RAG Pipelines, AI Agent Orchestration (SmythOS), YOLO-based Object Detection" },
    { category: "Databases", skills: "MySQL, PostgreSQL, MongoDB" },
    { category: "DevOps / MLOps", skills: "Docker, CI/CD (GitHub Actions), Model Evaluation Pipelines" },
    { category: "Core CS", skills: "DSA, OOP, OS, DBMS, Computer Networks, API Design, Software Testing" }
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
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto mb-8">
            Computer Science graduate and Trainee Assistant Software Engineer at
            Millennium Information Solution Ltd. Experienced in full-stack development,
            AI systems, and competitive programming. Passionate about building
            efficient and scalable software solutions.
          </p>
        </motion.div>

        {/* Main Highlights - 2x2 Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -5
              }}
              className={`group bg-white dark:bg-[#1C2331] p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden border border-gray-100 dark:border-none`}
            >
              <div className={`absolute top-0 left-0 w-1.5 h-full ${highlight.color === 'blue' ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]' :
                  highlight.color === 'green' ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]' :
                    highlight.color === 'purple' ? 'bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]' :
                      'bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]'
                }`}></div>

              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 ${highlight.color === 'blue' ? 'bg-blue-50 dark:bg-[#252D3F] text-blue-600 dark:text-blue-400' :
                  highlight.color === 'green' ? 'bg-green-50 dark:bg-[#252D3F] text-green-600 dark:text-green-400' :
                    highlight.color === 'purple' ? 'bg-purple-50 dark:bg-[#252D3F] text-purple-600 dark:text-purple-400' :
                      'bg-orange-50 dark:bg-[#252D3F] text-orange-600 dark:text-orange-400'
                } transition-transform duration-300`}>
                {highlight.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {highlight.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                {highlight.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Technical Expertise */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Technical Expertise
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300"
              >
                <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">
                  {tech.category}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {tech.skills}
                </p>
              </motion.div>
            ))}
          </div>
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


        {/* Dynamic GitHub Stats Widget */}
        <GitHubStatsWidget stats={githubStats} loading={loading} />
      </div>
    </section>
  )
}
