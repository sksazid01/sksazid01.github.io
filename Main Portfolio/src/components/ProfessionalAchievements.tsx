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
  Briefcase,
  Target,
  Star,
  ChevronRight
} from 'lucide-react'

interface Achievement {
  id: string
  title: string
  event: string
  organizer: string
  location: string
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
  teamName?: string
  teamMembers?: {
    name: string
    role: string
    linkedin: string
  }[]
  category: 'hackathon' | 'competition' | 'participation'
  icon: React.ReactNode
  color: string
}

export default function ProfessionalAchievements() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'HackTheAI Hackathon - Grand Final',
      event: 'Inter-University National Hackathon 2025',
      organizer: 'Green University of Bangladesh',
      location: 'Powered by SmythOS',
      date: 'September 2025',
      category: 'hackathon',
      icon: <Trophy className="w-8 h-8" />,
      color: 'from-yellow-500 via-orange-500 to-red-500',
      teamName: 'SUST_Prompt_Storm',
      results: [
        {
          stage: 'Grand Final',
          position: '4th',
          participants: '50 Finalist Teams',
          highlight: true
        }
      ],
      description: 'Developed Smart-IELTS, an AI-powered IELTS preparation platform using SmythOS agents. Secured 4th position in the grand final, competing against 50 top teams from universities across Bangladesh.',
      images: [
        '/assets/HackTheAI Hackathon/4th at final.png',
        '/assets/HackTheAI Hackathon/presentation/final photo.jpg',
        '/assets/HackTheAI Hackathon/presentation/IMG_20250927_192434.jpg',
        '/assets/HackTheAI Hackathon/competition_time/IMG_20250927_191805.jpg',
        '/assets/HackTheAI Hackathon/competition_time/IMG_20250927_192742.jpg',
        '/assets/HackTheAI Hackathon/presentation/IMG_20250927_192629.jpg'
      ],
      technologies: ['SmythOS', 'AI Agents', 'React', 'Node.js', 'Machine Learning'],
      projectLink: 'https://github.com/sksazid01/Smart-IELTS',
      teamMembers: [
        {
          name: 'Abhishek Dash',
          role: 'Team Leader & Frontend Developer',
          linkedin: 'https://www.linkedin.com/in/abhishek-dash-60762322a/'
        },
        {
          name: 'Badhon Ahmad',
          role: 'Full Stack Developer & System Architect',
          linkedin: 'https://www.linkedin.com/in/badhon-ahmad-5a5894225/'
        },
        {
          name: 'Md Ahasanul Haque Sazid',
          role: 'Backend Developer & SmythOS Integration',
          linkedin: 'https://www.linkedin.com/in/sksazid/'
        }
      ]
    },
    {
      id: '2',
      title: 'HackTheAI Hackathon - Preliminary Round',
      event: 'Inter-University National Hackathon 2025',
      organizer: 'Green University of Bangladesh',
      location: 'Powered by SmythOS',
      date: 'September 2025',
      category: 'hackathon',
      icon: <Star className="w-8 h-8" />,
      color: 'from-purple-500 via-pink-500 to-rose-500',
      teamName: 'SUST_Prompt_Storm',
      results: [
        {
          stage: 'Preliminary Round',
          position: '6th',
          participants: '~250 Teams',
          highlight: true
        }
      ],
      description: 'Qualified for the grand final by securing 6th position in the preliminary round, competing against approximately 250 teams from universities nationwide. This achievement secured our spot among the top 50 teams.',
      images: [
        '/assets/HackTheAI Hackathon/6th at prili.png',
        '/assets/HackTheAI Hackathon/competition_time/IMG_20250927_192712.jpg',
        '/assets/HackTheAI Hackathon/competition_time/IMG_20250927_192816.jpg',
        '/assets/HackTheAI Hackathon/presentation/IMG20250925082451.jpg'
      ],
      technologies: ['SmythOS', 'AI Agents', 'React', 'Node.js', 'Machine Learning'],
      projectLink: 'https://github.com/sksazid01/sust_prompt_storm_preliminary',
      teamMembers: [
        {
          name: 'Abhishek Dash',
          role: 'Team Leader & Frontend Developer',
          linkedin: 'https://www.linkedin.com/in/abhishek-dash-60762322a/'
        },
        {
          name: 'Badhon Ahmad',
          role: 'Full Stack Developer & System Architect',
          linkedin: 'https://www.linkedin.com/in/badhon-ahmad-5a5894225/'
        },
        {
          name: 'Md Ahasanul Haque Sazid',
          role: 'Backend Developer & SmythOS Integration',
          linkedin: 'https://www.linkedin.com/in/sksazid/'
        }
      ]
    },
    {
      id: '3',
      title: 'SUST Inter-University Programming Contest (IUPC)',
      event: 'SUST IUPC Participation',
      organizer: 'Shahjalal University of Science & Technology',
      location: 'SUST Campus, Sylhet',
      date: 'February 2024',
      category: 'competition',
      icon: <Code className="w-8 h-8" />,
      color: 'from-blue-500 via-cyan-500 to-teal-500',
      teamName: 'SUST Team',
      results: [
        {
          stage: 'Inter-University Programming Contest',
          position: 'Top Selected Team',
          participants: 'Among all participants in SUST',
          highlight: true
        }
      ],
      description: 'Selected as the top team among all participants in SUST to represent the university at the Inter-University Programming Contest, competing with leading teams from universities across the country.',
      images: [
        '/assets/SUST IUPC Participation/IMG_20240219_234316.jpg',
        '/assets/SUST IUPC Participation/photo_1_2025-10-18_23-11-14.jpg',
        '/assets/SUST IUPC Participation/photo_2_2025-10-18_23-11-14.jpg',
        '/assets/SUST IUPC Participation/photo_3_2025-10-18_23-11-14.jpg'
      ],
      technologies: ['C++', 'Data Structures', 'Algorithms', 'Problem Solving']
    }
  ]

  const categories = [
    { id: 'all', name: 'All Achievements', count: achievements.length },
    { id: 'hackathon', name: 'Hackathons', count: achievements.filter(a => a.category === 'hackathon').length },
    { id: 'competition', name: 'Competitions', count: achievements.filter(a => a.category === 'competition').length }
  ]

  const filteredAchievements = activeCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === activeCategory)

  return (
    <section id="achievement" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6 shadow-lg"
          >
            <Trophy className="w-8 h-8 text-white" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Notable Achievements
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Recognition and accomplishments in competitive programming and hackathons
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name} ({category.count})
            </motion.button>
          ))}
        </motion.div>

        {/* Achievements List */}
        <div className="space-y-12">
          {filteredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden"
            >
              {/* Achievement Header */}
              <div className={`bg-gradient-to-r ${achievement.color} p-8 text-white`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                        {achievement.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-1">
                          {achievement.title}
                        </h3>
                        <p className="text-white/90 text-sm md:text-base">
                          {achievement.event}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm md:text-base text-white/90 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{achievement.organizer}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{achievement.date}</span>
                      </div>
                    </div>

                    {achievement.location && (
                      <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                        {achievement.location}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="p-8">
                <div className={`grid gap-6 mb-8 ${
                  achievement.results.length === 1 
                    ? 'grid-cols-1 max-w-2xl mx-auto' 
                    : 'grid-cols-1 md:grid-cols-2'
                }`}>
                  {achievement.results.map((result, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className={`relative p-6 rounded-2xl border-2 ${
                        result.highlight 
                          ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-400 dark:border-yellow-600' 
                          : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600'
                      }`}
                    >
                      {result.highlight && (
                        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          🏆 Achievement
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-lg text-gray-900 dark:text-white">
                          {result.stage}
                        </h4>
                        <Medal className={`w-6 h-6 ${result.highlight ? 'text-yellow-500' : 'text-gray-400'}`} />
                      </div>
                      
                      <div className="text-3xl font-bold mb-2">
                        <span className={result.highlight 
                          ? 'bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent' 
                          : 'text-gray-700 dark:text-gray-300'
                        }>
                          {result.position}
                        </span>
                      </div>
                      
                      {result.participants && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {result.participants}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Description */}
                <div className="mb-8">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {achievement.description}
                  </p>
                </div>

                {/* Technologies */}
                {achievement.technologies && (
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {achievement.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Team Members */}
                {achievement.teamMembers && achievement.teamMembers.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                      Team {achievement.teamName && `• ${achievement.teamName}`}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {achievement.teamMembers.map((member, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                          className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                        >
                          <h5 className="font-bold text-gray-900 dark:text-white mb-1">
                            {member.name}
                          </h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {member.role}
                          </p>
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" />
                            LinkedIn
                          </a>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Image Gallery */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 text-center">
                    Gallery
                  </h4>
                  <div className="flex justify-center items-center">
                    <div className="flex flex-wrap justify-center gap-4 w-full max-w-7xl mx-auto">
                      {achievement.images.map((image, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: idx * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                          className="aspect-square relative rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.67rem)] lg:w-[calc(16.666%-0.84rem)]"
                          onClick={() => setSelectedImage(image)}
                        >
                          <img
                            src={image}
                            alt={`Achievement ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center p-2">
                            <ExternalLink className="w-5 h-5 text-white" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Project Link */}
                {achievement.projectLink && (
                  <div className="flex justify-center">
                    <motion.a
                      href={achievement.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-full font-semibold hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors shadow-lg"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-5 h-5" />
                      View Project on GitHub
                    </motion.a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="relative max-w-5xl w-full"
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
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
