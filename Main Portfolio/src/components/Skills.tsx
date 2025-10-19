'use client'

import { motion } from 'framer-motion'
import { Code, Globe, BarChart3, Smartphone, Wrench, Languages } from 'lucide-react'

export default function Skills() {
  const skillCategories = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Programming Languages",
      skills: ["Python", "Java", "C++", "JavaScript", "Kotlin"],
      color: "blue"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Web Development",
      skills: ["Django", "Prompt/Query Generation", "Response Debugging", "Web Development"],
      color: "blue"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Data Science",
      skills: ["Data Science", "Data Structure and Algorithm", "Machine Learning", "Problem Solving"],
      color: "blue"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Development",
      skills: ["Native Android Development", "GUI(JavaFX)", "Cyber Security"],
      color: "blue"
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Tools & Others",
      skills: ["Git", "GitHub", "VS Code", "IntelliJ IDEA", "Android Studio"],
      color: "blue"
    },
    {
      icon: <Languages className="w-8 h-8" />,
      title: "Languages",
      skills: ["English (Professional)", "Bangla (Native)", "Hindi (Professional)"],
      color: "blue"
    }
  ]

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
            <span className="text-blue-600 dark:text-blue-400">
              Skills & Technologies
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, rotateY: 5 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
            >
              <div className="inline-flex p-4 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-6">
                {category.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                {category.title}
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index * 0.1) + (skillIndex * 0.05) }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
