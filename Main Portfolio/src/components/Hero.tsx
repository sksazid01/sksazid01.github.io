'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Mail, ExternalLink, Github, Linkedin } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import DownloadCVButton from './DownloadCVButton'

export default function Hero() {
  // React Hook - this is component memory!
  const [greeting, setGreeting] = useState<string>('Hello')
  const [clickCount, setClickCount] = useState<number>(0)
  const [timeBasedGreeting, setTimeBasedGreeting] = useState<string>('')
  const [currentTime, setCurrentTime] = useState<string>('')
  
  // useEffect runs when component loads!
  useEffect(() => {
    const hour = new Date().getHours()
    let timeGreeting: string
    
    if (hour < 12) { 
      timeGreeting = '🌅 Good Morning'
    } else if (hour < 16) {
      timeGreeting = '☀️ Good Afternoon'  
    } else if(hour < 19){
    // Set up interval to update every second
      timeGreeting = '🌄 Good Evening'
    }
    else {
      timeGreeting = '🌙 Good Night'
    }
    
    setTimeBasedGreeting(timeGreeting)
    
    // This runs only once when component loads
  }, []) // Empty array means "run once"
  
  // useEffect for live clock - runs every second!
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      })
      setCurrentTime(timeString)
    }
    
    // Update immediately
    updateTime()
    
    // Set up interval to update every second
    const interval = setInterval(updateTime, 1000)
    
    // Cleanup function - very important!
    return () => {
      clearInterval(interval)
    }
  }, []) // Run once and set up the interval
  
  // This function makes smooth scrolling when you click buttons.
  const scrollToSection = (href: string): void => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Our new interactive function using React state!
  const changeGreeting = (): void => {
    const greetings: string[] = ['Hello', 'Hi there', 'Hey', 'Greetings', 'Welcome', '¡Hola']
    const randomGreeting: string = greetings[Math.floor(Math.random() * greetings.length)]
    setGreeting(randomGreeting) // This updates the component's memory
    setClickCount(prevCount => prevCount + 1) // Better way to update state!
  }

  return (
    <>
      {/* Floating Time & Greeting Widget */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="fixed top-20 right-4 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3 max-w-xs sm:max-w-sm"
      >
        <div className="space-y-1.5">
          {/* Time-based Greeting */}
          {timeBasedGreeting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400"
            >
              {timeBasedGreeting}
            </motion.div>
          )}
          
          {/* Live Clock */}
          {currentTime && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="flex items-center gap-1.5"
            >
              <span className="text-sm">🕐</span>
              <span className="text-xs font-mono font-medium text-gray-700 dark:text-gray-300">
                {currentTime}
              </span>
            </motion.div>
          )}
          
          {/* Interactive Greeting */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.9 }}
            className="pt-1.5 border-t border-gray-200 dark:border-gray-600"
          >
            <button
              onClick={changeGreeting}
              className="text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 cursor-pointer leading-tight"
              title={`Clicked ${clickCount} times! Click to change greeting.`}
            >
              {greeting}, I'm Sazid {clickCount > 0 && `(${clickCount}!)`}
            </button>
          </motion.div> */}
        </div>
      </motion.div>

      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <motion.p
              id="greeting-text"
              className="text-lg text-gray-600 dark:text-gray-300 mb-2 cursor-pointer hover:text-blue-500 transition-colors duration-300"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, type: "spring", bounce: 0.4 }}
              onClick={changeGreeting}
              title={`Clicked ${clickCount} times! Click to change greeting.`}
            >
              {greeting}, I&apos;m {clickCount > 0 && `(${clickCount} clicks!)`}
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 whitespace-nowrap"
            >
              <span className="text-blue-600 dark:text-blue-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 cursor-pointer">
              Sazid
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 mb-8 font-medium"
            >
              A dedicated Problem Solver and Quick learner
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                onClick={() => scrollToSection('#contact')}
                className="group relative px-8 py-4 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                  Get In Touch
                </span>
              </motion.button>
              
              <motion.button
                onClick={() => scrollToSection('#projects')}
                className="group px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-semibold rounded-full hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center justify-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  View My Work
                </span>
              </motion.button>

              {/* Download CV Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <DownloadCVButton variant="outline" />
              </motion.div>
            </motion.div>

            {/* Social Media Links - Highlighted */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Connect with me:
              </div>
              <div className="flex gap-3">
                {/* LinkedIn */}
                <motion.a
                  href="https://www.linkedin.com/in/sksazid/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-5 py-3 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300"
                  whileHover={{ scale: 1.08, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </motion.a>

                {/* GitHub */}
                <motion.a
                  href="https://github.com/sksazid01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-5 py-3 bg-gray-800 dark:bg-gray-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:bg-gray-900 dark:hover:bg-gray-600 transition-all duration-300"
                  whileHover={{ scale: 1.08, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              className="relative"
              animate={{ 
                y: [0, -20, 0],
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <motion.div
                className="relative w-80 h-80 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 p-1 shadow-2xl"
                whileHover={{ 
                  scale: 1.05,
                  rotate: 360,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 255, 0.25)"
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/sksazid.png"
                    alt="Md Ahasanul Haque - Problem Solver and Quick Learner"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                
                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-500/20 blur-xl"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          onClick={() => scrollToSection('#about')}
          className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm mb-2">Scroll down</span>
          <ChevronDown className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </section>
    </>
  )
}
