'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, CheckCircle, Briefcase } from 'lucide-react'

export default function Experience() {
  const experiences = [
    {
      title: "Data Science & ML Engineer",
      company: "Python-based Projects",
      duration: "March 2020 - Present",
      length: "(2+ Years)",
      type: "📊 Full-time Focus",
      achievements: [
        "Advanced proficiency in Python libraries: Keras, NumPy, Matplotlib, Pandas",
        "Specialized in data analysis and machine learning model development",
        "Created comprehensive data visualization dashboards",
        "Implemented predictive models for real-world applications"
      ]
    },
    {
      title: "Competitive Programming Specialist",
      company: "Codeforces (Handle: sksazid)",
      duration: "March 2022 - Present",
      length: "(2+ Years, 9 Months)",
      type: "🏆 Active Competitor",
      achievements: [
        "1230+ problems solved using Python, Swift, C, and C++",
        "Consistent rating improvement through regular practice",
        "Strong algorithmic thinking and problem-solving expertise",
        "Participated in multiple contests and challenges"
      ]
    },
    {
      title: "Multi-Platform Problem Solver",
      company: "Vjudge & Online Judges",
      duration: "March 2022 - Present",
      length: "(2+ Years, 9 Months)",
      type: "🌐 Cross-Platform Expert",
      achievements: [
        "590+ problems solved across multiple platforms",
        "Diversified experience with various algorithmic approaches",
        "Enhanced versatility in competitive programming",
        "Cross-platform problem-solving expertise"
      ]
    },
    {
      title: "Contest Participant & Problem Solver",
      company: "CodeChef Platform",
      duration: "March 2022 - Present",
      length: "(2+ Years, 9 Months)",
      type: "🎯 Monthly Contestant",
      achievements: [
        "235+ problems solved with contest participation",
        "Active participation in monthly programming contests",
        "Sharpened logical thinking and coding efficiency",
        "Consistent performance improvement"
      ]
    },
    {
      title: "Android Application Developer",
      company: "Native Android Development",
      duration: "January 2023 - Present",
      length: "(2+ Years)",
      type: "📱 Mobile Solutions",
      achievements: [
        "Restaurant Management System - Order processing and inventory",
        "Modern Android development practices implementation",
        "User-centric design and business solution focus",
        "Java/Kotlin proficiency with SQLite integration"
      ]
    },
    {
      title: "JavaFX Game Developer",
      company: "Desktop Game Development",
      duration: "April 2022 - Present",
      length: "(2+ Years, 8 Months)",
      type: "🎮 Game Development",
      achievements: [
        "Word Matching Game - Interactive educational game",
        "JavaFX GUI design and development",
        "Clean, maintainable code architecture",
        "User experience optimization"
      ]
    }
  ]

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Work Experience
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            My professional journey and key achievements
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="absolute left-4 md:left-8 top-0 w-1 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ x: 10 }}
                className="relative pl-12 md:pl-20"
              >
                {/* Timeline Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
                  className="absolute left-2 md:left-6 w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"
                />

                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {exp.type}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Briefcase className="w-6 h-6 text-blue-500" />
                    {exp.title}
                  </h3>

                  <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    {exp.company}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-2 mb-6">
                    <span className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                      <Calendar className="w-4 h-4" />
                      {exp.duration}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-full font-medium">
                      {exp.length}
                    </span>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      Key Achievements:
                    </h4>
                    <ul className="space-y-3">
                      {exp.achievements.map((achievement, achIndex) => (
                        <motion.li
                          key={achIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + achIndex * 0.05 }}
                          className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          <span>{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
