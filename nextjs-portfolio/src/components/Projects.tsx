'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, ShoppingCart, Smartphone, Gamepad2, BarChart3 } from 'lucide-react'

export default function Projects() {
  const projects = [
    {
      title: "E-commerce Marketplace",
      description: "A comprehensive e-commerce platform built with modern web technologies. Features include user authentication, product catalog, shopping cart, and secure payment processing.",
      icon: <ShoppingCart className="w-12 h-12" />,
      technologies: ["Django", "Python", "JavaScript", "PostgreSQL"],
      color: "from-blue-500 to-cyan-500",
      links: {
        github: "#",
        demo: "#"
      }
    },
    {
      title: "Restaurant Management App",
      description: "Native Android application for restaurant management and order processing. Includes inventory management, order tracking, and customer management features.",
      icon: <Smartphone className="w-12 h-12" />,
      technologies: ["Android", "Java", "Kotlin", "SQLite"],
      color: "from-green-500 to-emerald-500",
      links: {
        github: "#",
        demo: "#"
      }
    },
    {
      title: "Word Matching Game",
      description: "Interactive word matching game developed using JavaFX. Features engaging UI/UX design, multiple difficulty levels, and score tracking system.",
      icon: <Gamepad2 className="w-12 h-12" />,
      technologies: ["Java", "JavaFX", "FXML", "CSS"],
      color: "from-purple-500 to-pink-500",
      links: {
        github: "#",
        demo: "#"
      }
    },
    {
      title: "Data Analysis Dashboard",
      description: "Python-based data analysis and visualization dashboard using machine learning algorithms. Provides insights through interactive charts and predictive models.",
      icon: <BarChart3 className="w-12 h-12" />,
      technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "Keras"],
      color: "from-orange-500 to-red-500",
      links: {
        github: "#"
      }
    }
  ]

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
              Featured Projects
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Some of my notable work and contributions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, rotateY: 5 }}
              className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
            >
              {/* Project Header */}
              <div className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center text-white relative overflow-hidden`}>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {project.icon}
                </motion.div>
                
                {/* Animated Background Elements */}
                <motion.div
                  className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-4 left-4 w-6 h-6 bg-white/20 rounded-full"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                />
              </div>

              {/* Project Content */}
              <div className="p-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-full"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex gap-4">
                  {project.links.github && (
                    <motion.a
                      href={project.links.github}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-full hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </motion.a>
                  )}
                  {project.links.demo && (
                    <motion.a
                      href={project.links.demo}
                      className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${project.color} text-white rounded-full hover:shadow-lg transition-all`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
