'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Trophy, 
  Users, 
  Award,
  Calendar,
  MapPin,
  Github,
  ExternalLink,
  Medal,
  TrendingUp,
  Code,
  Briefcase
} from 'lucide-react'

interface Achievement {
  id: string
  title: string
  event: string
  organizer: string
  date: string
  results: {
    stage: string
    position: string
    participants?: string
    highlight?: boolean
  }[]
  description: string
  images: string[]
  technologies?: string[]
  projectLink?: string
  teamMembers?: {
    name: string
    role: string
    linkedin: string
  }[]
  category: 'hackathon' | 'competition' | 'participation'
  icon: React.ReactNode
  color: string
}

export default function HackathonAchievement() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const teamMembers = [
    {
      name: 'Abhishek Dash',
      role: 'Team Leader',
      specialization: 'Frontend Developer & UI/UX',
      linkedin: 'https://www.linkedin.com/in/abhishek-dash-60762322a/',
      avatar: '👨‍💻'
    },
    {
      name: 'Badhon Ahmad',
      role: 'Technical Architect',
      specialization: 'Full Stack Developer & System Architecture',
      linkedin: 'https://www.linkedin.com/in/badhon-ahmad-5a5894225/',
      avatar: '👨‍💼'
    },
    {
      name: 'Md Ahasanul Haque Sazid',
      role: 'Backend Lead',
      specialization: 'Backend Developer & SmythOS Agent Integration',
      linkedin: 'https://www.linkedin.com/in/sksazid/',
      avatar: '👨‍🔬'
    }
  ]

  const journey = [
    {
      stage: 'Registration',
      participants: '~250 Teams',
      result: 'Selected',
      icon: <Target className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      stage: 'Selection Round',
      participants: '250 Teams Competing',
      result: '6th Position',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      stage: 'Final Round',
      participants: '50 Finalist Teams',
      result: 'Qualified',
      icon: <Star className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      stage: 'Grand Final',
      participants: 'Top 50 Teams',
      result: '🏆 4th Position',
      icon: <Trophy className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-500'
    }
  ]

  const images = [
    {
      src: '/assets/HackTheAI Hackathon/4th at final.png',
      alt: '4th Position Achievement',
      title: 'Final Position Announcement',
      description: 'Official announcement of our 4th place finish'
    },
    {
      src: '/assets/HackTheAI Hackathon/6th at prili.png',
      alt: 'Selection Round Achievement',
      title: '6th in Selection Round',
      description: 'Ranked 6th out of ~250 teams in the selection round'
    },
    {
      src: '/assets/HackTheAI Hackathon/competition_time/IMG_20250927_191805.jpg',
      alt: 'Competition Time',
      title: 'During Competition',
      description: 'Team working intensively during the hackathon'
    },
    {
      src: '/assets/HackTheAI Hackathon/presentation/IMG_20250927_192434.jpg',
      alt: 'Presentation Moment',
      title: 'Project Presentation',
      description: 'Presenting our Smart-IELTS solution to judges'
    },
    {
      src: '/assets/HackTheAI Hackathon/presentation/final photo.jpg',
      alt: 'Team Photo',
      title: 'Team SUST_Prompt_Storm',
      description: 'Team photo at the Grand Final'
    },
    {
      src: '/assets/HackTheAI Hackathon/competition_time/IMG_20250927_192742.jpg',
      alt: 'Competition Setup',
      title: 'Competition Venue',
      description: 'The exciting atmosphere during the final round'
    }
  ]

  const technologies = [
    'SmythOS',
    'AI Agents',
    'React',
    'Node.js',
    'Machine Learning',
    'System Architecture',
    'Full Stack Development'
  ]

  return (
    <section id="achievement" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-block mb-6"
          >
            <div className="text-6xl">🏆</div>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-600 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Hackathon Champion
            </span>
          </h2>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              4th Position at Inter-University National Hackathon 2025
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Team SUST_Prompt_Storm • Green University of Bangladesh
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>Powered by SmythOS</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Achievement Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-3xl p-1 mb-16 shadow-2xl"
        >
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12">
            <div className="text-center">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="inline-block text-7xl mb-4"
              >
                🎉
              </motion.div>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-transparent bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text">
                  Alhamdulillah!
                </strong>{' '}
                We are super excited to share that our team secured{' '}
                <strong className="text-yellow-600 dark:text-yellow-400">4th position</strong> 🎉 
                in the Inter-University National Hackathon 2025, competing against{' '}
                <strong className="text-orange-600 dark:text-orange-400">250+ teams</strong> 
                {' '}from across the nation 🚀
              </p>
            </div>
          </div>
        </motion.div>

        {/* Journey Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Our Journey to Success
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {journey.map((stage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative"
              >
                <div className={`bg-gradient-to-br ${stage.color} rounded-2xl p-6 text-white shadow-lg h-full`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                      {stage.icon}
                    </div>
                    <div className="text-3xl font-bold opacity-20">
                      {index + 1}
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-bold mb-2">{stage.stage}</h4>
                  <p className="text-sm opacity-90 mb-2">{stage.participants}</p>
                  <div className="mt-4 pt-4 border-t border-white/30">
                    <p className="text-lg font-bold">✨ {stage.result}</p>
                  </div>
                </div>

                {index < journey.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ChevronRight className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Captured Moments
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                onClick={() => setSelectedImage(image.src)}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {image.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {image.description}
                  </p>
                </div>

                <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Members */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-green-600 to-cyan-600 bg-clip-text text-transparent">
              Team SUST_Prompt_Storm
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="text-6xl mb-4"
                >
                  {member.avatar}
                </motion.div>
                
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h4>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {member.specialization}
                </p>
                
                <motion.a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="w-4 h-4" />
                  LinkedIn
                </motion.a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technologies & Project */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-1 shadow-2xl"
        >
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Smart-IELTS Project
                </span>
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Our innovative solution leveraging SmythOS AI agents to revolutionize IELTS preparation
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {technologies.map((tech, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium shadow-lg"
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <motion.a
                href="https://github.com/sksazid01/Smart-IELTS"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Event Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg">
            <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">September 27, 2025</span>
          </div>
        </motion.div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="relative max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full p-3 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

function X({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}
