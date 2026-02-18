'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Github, Linkedin, Youtube, ExternalLink } from 'lucide-react'

export default function Projects() {
  const [activeProject, setActiveProject] = useState<string | null>(null)

  interface Project {
    id: string
    title: string
    description: string
    duration: string
    technologies: string[]
    category: 'Web Development' | 'Android Development' | 'Desktop Development' | 'Game Development'
    keyFeatures: string[]
    youtubeId?: string
    imageUrl?: string
    githubUrl: string
    linkedinUrl?: string
  }

  const projects: Project[] = [
    {
      id: 'buet-cse-fest-2026',
      title: 'Intelligent Learning Companion Platform — BUET CSE Fest 2026 Final Round',
      description: 'An AI-powered learning platform that turns scattered course materials into a searchable, trustworthy knowledge base with a course-aware AI assistant. Built for BUET CSE Fest 2026 Hackathon (AI & API Segment) by Team CodeOverclock.',
      duration: 'February 2026',
      technologies: ['Python', 'FastAPI', 'RAG', 'Pinecone', 'OpenAI', 'LangChain', 'Next.js', 'Docker'],
      category: 'Web Development',
      keyFeatures: [
        'Multimodal document pursing (preserves tables, code, images)',
        'AI answers grounded in actual course content with citations',
        'Auto-validation with accuracy & confidence scores',
        'Generated code is actually executed, not just syntax-checked',
        'Intelligent Search Engine with semantic understanding'
      ],
      youtubeId: 'GPdAra2zaCQ',
      githubUrl: 'https://github.com/sksazid01/Buet-CSE-FEST-FINAL',
      linkedinUrl: 'https://www.linkedin.com/posts/sksazid_hackathon-ai-rag-ugcPost-7424442823908925440-smeA?utm_source=share&utm_medium=member_desktop'
    },
    {
      id: 'smart-ielts',
      title: 'Smart IELTS — AI-Powered Test Preparation Platform',
      description: 'An AI-powered IELTS test preparation platform that creates creative questions based on past real IELTS questions and delivers intelligent tutoring and real-time feedback. 🏆 4th Place – Inter-University National Hackathon 2025 (Green University of Bangladesh).',
      duration: 'January 2025',
      technologies: ['SmythOS', 'Next.js', 'Node.js', 'Pinecone', 'Gemini API', 'ElevenLabs'],
      category: 'Web Development',
      keyFeatures: [
        'AI-Powered Chatbot for IELTS guidance',
        'Smart Document Search & Q&A',
        'Google Drive & Email Integration',
        'Real-Time Agent Dashboard',
      ],
      youtubeId: 'mgMEFtJPmYY',
      githubUrl: 'https://github.com/BadhonAhmad/Smart-IELTS',
      linkedinUrl: 'https://smart-ielts.onrender.com'
    },
    {
      id: 'sustclubs',
      title: 'SUSTclubs — Club Management System',
      description: 'A web application designed to simplify the management of club activities at SUST (Shahjalal University of Science & Technology, Sylhet). Built using the MERN stack (MongoDB, Express, React, Node.js), making tasks such as club recruitment, member tracking, online payments, and other club needs much easier.',
      duration: 'University Project',
      technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'SSLCommerz'],
      category: 'Web Development',
      keyFeatures: [
        'One place for club recruitment and member information',
        'Online payment system with transaction records',
        'SSLCommerz NodeJS Payment Gateway for payments',
        'Member profiles and public pages',
        'Event planning and reminders',
        'Automatic email notifications',
        'Different access levels for different roles'
      ],
      youtubeId: '',
      githubUrl: 'https://github.com/sksazid01/Project350_CMS'
    },
  {
  id: 'research-paper-rag',
  title: 'Research Paper RAG System — Intelligent PDF Query Platform',
  description: 'An AI-powered system for querying research papers using a Retrieval-Augmented Generation (RAG) pipeline, featuring PDF ingestion, vector search, citation-backed answers, and confidence scoring.',
  duration: 'Assessment Project',
  technologies: ['Next.js', 'FastAPI','Python', 'Docker', 'PostgreSQL', 'Qdrant', 'Ollama'],
  category: 'Web Development',
  keyFeatures: [
    'PDF upload and section-aware document processing',
    'Citation-backed question answering with confidence scoring',
    'Advanced re-ranking using cross-encoders (~10–15% accuracy improvement)',
    'Local LLM integration via Ollama',
    'Performance optimizations with caching and batch queries',
    'Real-time streaming responses using SSE'
  ],
  youtubeId: '',
  imageUrl: '/assets/rag_architecture.webp',
  githubUrl: 'https://github.com/sksazid01/RAG-on-Research-Paper',
  linkedinUrl: ''
},
    {
      id: 'collegesamaj',
      title: 'COLLEGESAMAJ — Web Development Internship Project',
      description: 'Hands-on work completed during Web Development Internship at College Samaj, focused on strengthening front-end skills through practical, real-world projects such as a Portfolio Website and a Calculator App.',
      duration: 'January 5, 2024 – February 4, 2024',
      technologies: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Git', 'GitHub'],
      category: 'Web Development',
      keyFeatures: [
        'Responsive Portfolio Website',
        'Interactive Calculator App',
        'Version control with Git/GitHub',
        'Modern front-end practices'
      ],
      youtubeId: 'yZfYxbAdTpU',
      githubUrl: 'https://github.com/sksazid01/COLLEGESAMAJ',
      linkedinUrl: 'https://www.linkedin.com/posts/sksazid_collegesamaj-webdevelopment-html-activity-7160326783383281664-EiWU'
    },
    {
      id: 'restaurant-app',
      title: 'CSE250 Team Project — Restaurant Food Ordering App',
      description: 'Android app developed as a CSE250 course project with Md. Khaled Bin. Built using Kotlin and Jetpack Compose, providing a smooth, modern experience for restaurant ordering.',
      duration: 'University Course Project',
      technologies: ['Kotlin', 'Jetpack Compose', 'Android Studio', 'Firebase'],
      category: 'Android Development',
      keyFeatures: [
        'Multiple restaurant and menu browsing',
        'QR-based table selection',
        'Secure payment integration',
        'Real-time ratings and reviews',
        'Favorites and profile section'
      ],
      youtubeId: 'VIt6AJljgrA',
      githubUrl: 'https://github.com/sksazid01/Eatery_Android_Project',
      linkedinUrl: 'https://www.linkedin.com/posts/sksazid_cse250-kotlin-androiddevelopment-activity-7218308340026683393-1nvM'
    },
    {
      id: 'word-game',
      title: 'Word Game — Desktop Word Puzzle (JavaFX)',
      description: 'JavaFX-based Desktop Game designed as a semester project for the 2-1 term under the guidance of Eamin Sir (CSE, SUST). Combines logic, UI design, and file handling with a Bangla dictionary.',
      duration: '2-1 Semester Project',
      technologies: ['Java (JavaFX)', 'FXML', 'CSS', 'Maven'],
      category: 'Desktop Development',
      keyFeatures: [
        'Multi-level gameplay',
        'Score tracking system',
        'Sound integration',
        'File I/O for dictionary management',
        'Custom CSS for UI styling',
        'Interactive event handling'
      ],
      youtubeId: 'PLnZ9Rrbi18',
      githubUrl: 'https://github.com/sksazid01/Word-Game-JavaFX',
      linkedinUrl: 'https://www.linkedin.com/posts/sksazid_word-game-by-javafx-this-is-my-2-1-semester-activity-7153740766316482562--Urb'
    },
    {
      id: 'flag-quiz',
      title: 'Flag Quiz — Guess the Flag Game (JavaFX)',
      description: 'Simple yet engaging desktop quiz game built in just one hour using JavaFX. Identify the correct country flag out of four possible options to earn points.',
      duration: '1 Hour Project',
      technologies: ['Java (JavaFX)', 'FXML', 'CSS', 'Maven'],
      category: 'Game Development',
      keyFeatures: [
        'Multiple-choice flag identification',
        'Score tracking and question counter',
        'Clean and minimal JavaFX interface',
        'Extensive collection of flag images',
        'Educational geography learning tool'
      ],
      youtubeId: '_EmwHPzKs-o',
      githubUrl: 'https://github.com/sksazid01/Flag-Quiz',
      linkedinUrl: 'https://www.linkedin.com/posts/sksazid_flag-quiz-1-hour-project-using-javafx-activity-7154130581872672768-I36r'
    },
    {
      id: 'auto-poke',
      title: 'Auto Poke Back — Facebook Automation Script',
      description: 'A Python + Selenium automation script that automatically pokes back everyone who has poked you on Facebook — safely, smartly, and with human-like randomness. A lighthearted throwback to early 2010s Facebook days!',
      duration: 'Fun Project',
      technologies: ['Python', 'Selenium', 'Web Automation'],
      category: 'Web Development',
      keyFeatures: [
        'Works on desktop Facebook (facebook.com)',
        'Manual login for maximum security (no credentials stored)',
        'Auto Poke Back with human-like delays',
        'Random scrolling & delay to mimic real user behavior',
        'Fully customizable – number of pokes, time between actions',
        'Built for fun and automation experimentation'
      ],
      youtubeId: 'rmF_8H0Mcmw',
      githubUrl: 'https://github.com/sksazid01/Facebook_Auto_Poke_Back',
      linkedinUrl: 'https://www.linkedin.com/posts/sksazid_auto-pokeback-program-python-code-activity-7170492870242553856-DLZB'
    }
  ]

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              💼 Project Portfolio
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Major projects developed during university coursework and internship experiences
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setActiveProject(project.id)}
              onHoverEnd={() => setActiveProject(null)}
              className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
            >
              {/* Full Perimeter Light Animation */}
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  className="absolute top-0 left-0 h-[2px] w-[40%] bg-gradient-to-r from-transparent via-white/80 to-transparent"
                  style={{ filter: 'blur(1px)' }}
                  animate={{ left: ['-40%', '100%'] }}
                  transition={{ duration: 8, ease: 'linear', repeat: Infinity, repeatDelay: 0 }}
                />
                <motion.div
                  className="absolute top-0 left-0 h-[4px] w-[40%] bg-gradient-to-r from-transparent via-white/40 to-transparent blur-sm"
                  animate={{ left: ['-40%', '100%'] }}
                  transition={{ duration: 8, ease: 'linear', repeat: Infinity, repeatDelay: 0 }}
                />
                <motion.div
                  className="absolute top-0 right-0 h-[2px] w-[40%] bg-gradient-to-l from-transparent via-white/80 to-transparent"
                  style={{ filter: 'blur(1px)' }}
                  animate={{ right: ['-40%', '100%'] }}
                  transition={{ duration: 8, ease: 'linear', repeat: Infinity, repeatDelay: 0, delay: 2 }}
                />
                <motion.div
                  className="absolute bottom-0 right-0 h-[2px] w-[40%] bg-gradient-to-l from-transparent via-white/80 to-transparent"
                  style={{ filter: 'blur(1px)' }}
                  animate={{ right: ['-40%', '100%'] }}
                  transition={{ duration: 8, ease: 'linear', repeat: Infinity, repeatDelay: 0, delay: 4 }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] w-[40%] bg-gradient-to-r from-transparent via-white/80 to-transparent"
                  style={{ filter: 'blur(1px)' }}
                  animate={{ left: ['-40%', '100%'] }}
                  transition={{ duration: 8, ease: 'linear', repeat: Infinity, repeatDelay: 0, delay: 6 }}
                />
              </div>

              {/* Project Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold">
                    {project.category}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{project.duration}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Grid Layout: Video on Left, Features & Links on Right */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column: Video or Image */}
                <div>
                  {/* YouTube Video Embed, Image, or Placeholder */}
                  <div className="relative rounded-xl overflow-hidden shadow-lg aspect-video">
                    {project.youtubeId ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${project.youtubeId}`}
                        title={project.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    ) : project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-contain bg-white dark:bg-gray-800"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                        <div className="text-center p-6">
                          <Youtube className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
                          <p className="text-gray-500 dark:text-gray-400 font-medium">Project Image Coming Soon</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column: Features & Links */}
                <div className="space-y-6">
                  {/* Key Features */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {project.keyFeatures.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                          <span className="text-blue-500 mt-1">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Project Links */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Project Links:</h4>
                    
                    {/* GitHub Link */}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors group"
                    >
                      <Github className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">View on GitHub</span>
                      <ExternalLink className="w-4 h-4 ml-auto text-gray-400 group-hover:text-blue-500" />
                    </a>

                    {/* LinkedIn Link - Only show if linkedinUrl exists */}
                    {project.linkedinUrl && (
                      <a
                        href={project.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
                      >
                        <Linkedin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium text-blue-700 dark:text-blue-300">LinkedIn Post</span>
                        <ExternalLink className="w-4 h-4 ml-auto text-blue-400 group-hover:text-blue-500" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
