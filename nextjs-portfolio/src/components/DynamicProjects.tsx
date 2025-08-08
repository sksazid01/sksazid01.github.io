'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Star, GitFork, Clock } from 'lucide-react'

interface GitHubRepo {
  id: number
  name: string
  description: string
  html_url: string
  language: string
  stargazers_count: number
  forks_count: number
  updated_at: string
  topics: string[]
}

interface DynamicProjectsProps {
  repos: GitHubRepo[]
  loading: boolean
}

export default function DynamicProjects({ repos, loading }: DynamicProjectsProps) {
  if (loading) {
    return (
      <div className="col-span-full mt-12">
        <h3 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          🔥 Live GitHub Projects
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg animate-pulse">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="flex gap-2 mb-4">
                <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (repos.length === 0) {
    return null
  }

  return (
    <motion.div 
      id="github-projects"
      className="col-span-full mt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        🔥 Live GitHub Projects
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo, index) => (
          <motion.div
            key={repo.id}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
          >
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {repo.name}
              </h4>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="w-3 h-3" />
                  {repo.forks_count}
                </span>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
              {repo.description || 'No description available'}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {repo.language && (
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
                  {repo.language}
                </span>
              )}
              {repo.topics?.slice(0, 2).map(topic => (
                <span key={topic} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                  {topic}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
              </div>
              <motion.a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:shadow-md transition-all flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-3 h-3" />
                View Code
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
