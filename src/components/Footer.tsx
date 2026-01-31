'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart, ArrowUp, Eye } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useDynamicPortfolio } from '@/hooks/useDynamicPortfolio'

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { visitorCount, loading } = useDynamicPortfolio()

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <Github className="w-6 h-6" />,
      href: 'https://github.com/sksazid01',
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-6 h-6" />,
      href: 'https://www.linkedin.com/in/sksazid/',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Email',
      icon: <Mail className="w-6 h-6" />,
      href: 'mailto:ahasanulhaque20@gmail.com',
      color: 'hover:text-red-500'
    }
  ]

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Live GitHub', href: '#github-projects' },
    { name: 'Contact', href: '#contact' }
  ]

  return (
    <footer className="relative bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: showScrollTop ? 1 : 0, 
          scale: showScrollTop ? 1 : 0 
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-1 md:col-span-1"
          >
            <motion.h3 
              className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Ahasanul Haque
            </motion.h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Passionate Full Stack Developer crafting digital experiences with modern technologies.
              Always eager to learn, grow, and contribute to meaningful projects.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-gray-600 dark:text-gray-400 ${link.color} border border-gray-200 dark:border-gray-700`}
                  aria-label={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-1"
          >
            <h4 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-blue-600 rounded-full group-hover:w-2 transition-all duration-200"></span>
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="col-span-1"
          >
            <h4 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
              Let&apos;s Connect
            </h4>
            <div className="space-y-4">
              <motion.div
                whileHover={{ x: 5 }}
                className="text-gray-600 dark:text-gray-400"
              >
                <p className="font-medium mb-1">Email</p>
                <a 
                  href="mailto:ahasanulhaque20@gmail.com"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  ahasanulhaque20@gmail.com
                </a>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="text-gray-600 dark:text-gray-400"
              >
                <p className="font-medium mb-1">Location</p>
                <p>Sylhet, Bangladesh</p>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="text-gray-600 dark:text-gray-400"
              >
                <p className="font-medium mb-1">Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Available for opportunities</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p 
              className="text-gray-600 dark:text-gray-400 text-center md:text-left flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              © {new Date().getFullYear()} Made with 
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                className="text-red-500"
              >
                <Heart className="w-4 h-4 fill-current" />
              </motion.span>
              by Ahasanul Haque
            </motion.p>
            
            {/* Visitor Counter */}
            {!loading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
              >
                <Eye className="w-4 h-4" />
                <span>
                  Portfolio Views: 
                  <motion.span 
                    className="font-medium text-blue-600 dark:text-blue-400 ml-1"
                    key={visitorCount}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {visitorCount.toLocaleString()}
                  </motion.span>
                </span>
              </motion.div>
            )}
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500"
            >
              <span>Built with Next.js & Tailwind CSS</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
