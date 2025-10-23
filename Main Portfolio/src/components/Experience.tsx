'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, CheckCircle, Briefcase, Clock } from 'lucide-react'

export default function Experience() {
  const experiences = [
    {
      title: "Web Development Intern",
      company: "College Samaj",
      duration: "01/2024 - 02/2024",
      length: "(1 Month)",
      type: "💼 Internship",
      achievements: [
        "Developed a fully functional JavaScript-based Calculator App with modern UI/UX design",
        "Built a responsive Personal Portfolio Website using HTML5, CSS3, and JavaScript",
        "Gained hands-on experience with Git/GitHub for version control and project collaboration",
        "Worked under guidance of experienced mentors (H. Yadav, Gaurav Rai, Bunty Prasad)",
        "Successfully completed internship program and received completion certificate"
      ]
    },
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
              Work Experience
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            My professional journey throughout undergraduate studies
          </p>
        </motion.div>

        <div className="relative pb-8">
          {/* Timeline Line - Vertical center */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: 'calc(100% - 80px)' }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="absolute left-8 md:left-1/2 top-12 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-purple-500 rounded-full transform md:-translate-x-1/2 z-0"
          />

          <div className="space-y-24 md:space-y-32">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                {/* Desktop Layout */}
                <div className={`hidden md:flex items-start gap-8 ${
                  index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'
                }`}>
                  {/* Content Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`w-[calc(50%-100px)] bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 backdrop-blur-sm p-8 rounded-2xl shadow-xl border-2 border-gray-200 dark:border-gray-700 relative z-10 ${
                      index % 2 === 0 ? 'text-right' : 'text-left'
                    }`}
                  >
                    {/* Type Badge */}
                    <div className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'} mb-3`}>
                      <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md">
                        {exp.type}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className={`text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2 ${
                      index % 2 === 0 ? 'flex-row-reverse' : ''
                    }`}>
                      <Briefcase className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <span>{exp.title}</span>
                    </h3>

                    {/* Company */}
                    <p className={`text-base font-semibold text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-2 ${
                      index % 2 === 0 ? 'flex-row-reverse justify-end' : ''
                    }`}>
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm md:text-base">{exp.company}</span>
                    </p>

                    {/* Achievements */}
                    <div className={`bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-800/50 p-5 rounded-xl border border-gray-200 dark:border-gray-700/50 ${
                      index % 2 === 0 ? 'text-right' : 'text-left'
                    }`}>
                      <h4 className={`text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2 ${
                        index % 2 === 0 ? 'flex-row-reverse justify-end' : ''
                      }`}>
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>Key Achievements</span>
                      </h4>
                      <ul className="space-y-2.5">
                        {exp.achievements.map((achievement, achIndex) => (
                          <motion.li
                            key={achIndex}
                            initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 + achIndex * 0.08 }}
                            className={`flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 ${
                              index % 2 === 0 ? 'flex-row-reverse text-right' : ''
                            }`}
                          >
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="leading-relaxed">{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  {/* Center Timeline Badge */}
                  <div className="flex-shrink-0 w-[120px] flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.3, type: 'spring', stiffness: 200 }}
                      className="relative z-20"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white dark:border-gray-900">
                        <Calendar className="w-8 h-8 text-white" />
                      </div>
                      <div className="mt-4 px-5 py-3 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-gray-200 dark:border-gray-700 min-w-[160px]">
                        <p className="text-sm font-bold text-gray-900 dark:text-white text-center whitespace-nowrap">
                          {exp.duration}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                          {exp.length}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Spacer */}
                  <div className="w-[calc(50%-100px)]" />
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden relative pl-24">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3, type: 'spring', stiffness: 200 }}
                    className="absolute left-0 top-0 flex flex-col items-center z-20"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white dark:border-gray-900">
                      <Calendar className="w-7 h-7 text-white" />
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 backdrop-blur-sm p-6 rounded-2xl shadow-xl border-2 border-gray-200 dark:border-gray-700"
                  >
                    {/* Type Badge */}
                    <div className="flex justify-start mb-3">
                      <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md">
                        {exp.type}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <span>{exp.title}</span>
                    </h3>

                    {/* Company */}
                    <p className="text-base font-semibold text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">{exp.company}</span>
                    </p>

                    {/* Duration - Mobile */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-full">
                        <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          {exp.duration}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full">
                        {exp.length}
                      </span>
                    </div>

                    {/* Achievements */}
                    <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-800/50 p-5 rounded-xl border border-gray-200 dark:border-gray-700/50">
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>Key Achievements</span>
                      </h4>
                      <ul className="space-y-2.5">
                        {exp.achievements.map((achievement, achIndex) => (
                          <motion.li
                            key={achIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 + achIndex * 0.08 }}
                            className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300"
                          >
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="leading-relaxed">{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 px-6 py-3 rounded-full border border-blue-200 dark:border-gray-600 shadow-md">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
              <span>Timeline flows from <strong>March 2022</strong> to <strong>Present</strong></span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
