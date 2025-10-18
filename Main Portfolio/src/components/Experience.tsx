'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, CheckCircle, Briefcase } from 'lucide-react'

export default function Experience() {
  const experiences = [
    {
      title: "Competitive Programmer",
      company: "CodeForces | VJudge | CodeChef — Handle: sksazid",
      duration: "03/2022 - Present",
      length: "(2+ Years)",
      type: "🏆 Active Competitor",
      achievements: [
        "CodeForces: Achieved 1200+ rating (Pupil), solved 650+ problems using C, C++, Python, and Swift",
        "VJudge: Solved 325+ problems across multiple platforms, strengthening algorithmic thinking",
        "CodeChef: Achieved 1474 max rating, solved 100+ problems",
        "Participated in SUST IUPC 2023"
      ]
    },
    {
      title: "Data Science & Machine Learning Project",
      company: "Workplace/Company",
      duration: "03/2023 - Present",
      length: "(1+ Year)",
      type: "📊 Research & Development",
      achievements: [
        "Worked with Python libraries including Keras, NumPy, Matplotlib, and Pandas",
        "Specialized in data preprocessing and feature engineering",
        "Focused on model training, data visualization, and predictive analytics"
      ]
    },
    {
      title: "AI Training for Problem Solving",
      company: "Remotasks.com",
      duration: "11/2023 - 09/2024",
      length: "(10 Months)",
      type: "🤖 AI Training Specialist",
      achievements: [
        "Contributed to creating editorials, test cases, and solutions",
        "Specialized in algorithms and code optimization",
        "Enhanced AI model performance through systematic training"
      ]
    },
    {
      title: "AI Tester and Trainer",
      company: "app.Outlier.ai",
      duration: "10/2023 - Present",
      length: "(1+ Year)",
      type: "🔬 Quality Assurance",
      achievements: [
        "Trained and tested an AI chatbot for Bangla language and English learning",
        "Conducted comprehensive evaluation of AI responses",
        "Performed API testing and validation of agent-calling functionalities"
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
