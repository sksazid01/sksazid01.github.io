'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from './ThemeProvider'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  twinkleSpeed: number
}

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
}

export default function StarryBackground() {
  const { theme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createStars = () => {
      const stars: Star[] = []
      const numStars = Math.floor((canvas.width * canvas.height) / 15000)

      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
        })
      }

      starsRef.current = stars
    }

    const createParticles = () => {
      const particles: Particle[] = []
      const numParticles = Math.floor((canvas.width * canvas.height) / 20000)

      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.6 + 0.2,
        })
      }

      particlesRef.current = particles
    }

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (theme === 'dark') {
        // Stars for dark mode
        starsRef.current.forEach((star) => {
          star.opacity += Math.sin(time * star.twinkleSpeed) * 0.01
          star.opacity = Math.max(0.1, Math.min(1, star.opacity))

          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
          
          const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.size * 3
          )
          gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`)
          gradient.addColorStop(0.5, `rgba(147, 197, 253, ${star.opacity * 0.5})`)
          gradient.addColorStop(1, 'rgba(147, 197, 253, 0)')
          
          ctx.fillStyle = gradient
          ctx.fill()
        })
      } else {
        // Floating particles for light mode
        particlesRef.current.forEach((particle) => {
          // Update position
          particle.x += particle.speedX
          particle.y += particle.speedY

          // Wrap around screen
          if (particle.x > canvas.width) particle.x = 0
          if (particle.x < 0) particle.x = canvas.width
          if (particle.y > canvas.height) particle.y = 0
          if (particle.y < 0) particle.y = canvas.height

          // Update opacity
          particle.opacity += Math.sin(time * 0.001) * 0.01
          particle.opacity = Math.max(0.1, Math.min(0.6, particle.opacity))

          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 2
          )
          gradient.addColorStop(0, `rgba(59, 130, 246, ${particle.opacity})`)
          gradient.addColorStop(0.5, `rgba(147, 197, 253, ${particle.opacity * 0.5})`)
          gradient.addColorStop(1, 'rgba(147, 197, 253, 0)')
          
          ctx.fillStyle = gradient
          ctx.fill()
        })
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    createStars()
    createParticles()
    animate(0)

    const handleResize = () => {
      resizeCanvas()
      createStars()
      createParticles()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [theme])

  return (
    <>
      <motion.canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
      
      {/* Floating Shapes - Different for light/dark */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {theme === 'dark' ? (
          // Dark mode: Cosmic orbs
          [...Array(5)].map((_, i) => (
            <motion.div
              key={`dark-${i}`}
              className="absolute rounded-full bg-gradient-to-r from-blue-400/10 to-cyan-400/10"
              style={{
                width: `${80 + i * 20}px`,
                height: `${80 + i * 20}px`,
                left: `${10 + i * 15}%`,
                top: `${20 + i * 15}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))
        ) : (
          // Light mode: Geometric shapes
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`light-${i}`}
                className={`absolute ${
                  i % 3 === 0 ? 'rounded-full' : 
                  i % 3 === 1 ? 'rounded-lg rotate-45' : 
                  'rounded-full'
                } ${
                  i % 4 === 0 ? 'bg-gradient-to-br from-blue-100/30 to-cyan-100/30' :
                  i % 4 === 1 ? 'bg-gradient-to-br from-purple-100/30 to-pink-100/30' :
                  i % 4 === 2 ? 'bg-gradient-to-br from-green-100/30 to-emerald-100/30' :
                  'bg-gradient-to-br from-orange-100/30 to-yellow-100/30'
                }`}
                style={{
                  width: `${40 + i * 15}px`,
                  height: `${40 + i * 15}px`,
                  left: `${5 + i * 11}%`,
                  top: `${10 + i * 10}%`,
                }}
                animate={{
                  y: [-15, 15, -15],
                  x: [-10, 10, -10],
                  rotate: [0, 180, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 15 + i * 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.5,
                }}
              />
            ))}
            
            {/* Additional light mode elements */}
            <motion.div
              className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-blue-50/40 to-purple-50/40 blur-xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute bottom-1/3 left-1/3 w-24 h-24 rounded-full bg-gradient-to-br from-cyan-50/40 to-blue-50/40 blur-xl"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2,
              }}
            />
          </>
        )}
      </div>
    </>
  )
}
