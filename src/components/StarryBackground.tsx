'use client'

import { useEffect, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from './ThemeProvider'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  twinkleSpeed: number
  vx: number
  vy: number
  depth: number // 0 (far) .. 1 (near)
  speedMul: number
  offsetX?: number
  offsetY?: number
}

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
}

interface ShootingStar {
  x: number
  y: number
  vx: number
  vy: number
  life: number // ms elapsed
  maxLife: number // ms total
  length: number
  brightness: number
}

export default function StarryBackground() {
  const { theme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const particlesRef = useRef<Particle[]>([])
  const shootingRef = useRef<ShootingStar[]>([])
  const animationRef = useRef<number | null>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 })
  const nextShootTimeout = useRef<number | null>(null)
  const burstTimeoutsRef = useRef<number[]>([])

  // Stable random positions — computed once, never reshuffled on re-render
  const darkOrbPositions = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        left: Math.floor(Math.random() * 86), // 0–85%
        top: Math.floor(Math.random() * 86),
        size: 80 + i * 20,
      })),
    [],
  )
  const lightShapePositions = useMemo(
    () =>
      Array.from({ length: 8 }, () => ({
        left: Math.floor(Math.random() * 86),
        top: Math.floor(Math.random() * 86),
      })),
    [],
  )
  const enableFollow = true // attraction (non-destructive)

  // mouse move listener (normalized 0..1)
  useEffect(() => {
    if (!enableFollow) return
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth  // normalize range into 0 → 1.
      mouseRef.current.y = e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [enableFollow])

  useEffect(() => {
    const canvas = canvasRef.current // HTMLCanvasElement
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createStars = () => {
      const stars: Star[] = []
      const numStars = Math.floor((canvas.width * canvas.height) / 9000)

      for (let i = 0; i < numStars; i++) {
        // depth controls size, brightness, speed
        const depth = Math.random() ** 1.5 // bias towards far layers
        // base speed scaled by depth (nearer = faster)
        const baseSpeed = 0.08 + depth * 0.35 // ~0.08..0.43
        let vx = (Math.random() - 0.5) * baseSpeed
        let vy = (Math.random() - 0.5) * baseSpeed
        if (Math.abs(vx) < 0.01 && Math.abs(vy) < 0.01) {
          vx = (Math.random() < 0.5 ? 1 : -1) * baseSpeed * 0.4
          vy = (Math.random() < 0.5 ? 1 : -1) * baseSpeed * 0.4
        }
        const size = 0.6 + depth * 2.4 // nearer stars larger
        const opacity = 0.2 + depth * 0.9
        const twinkleSpeed = 0.008 + Math.random() * 0.2 + depth * 0.015
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          opacity,
          twinkleSpeed,
          vx,
          vy,
          depth,
          speedMul: 0.5 + depth * 1.2,
          offsetX: 0,
          offsetY: 0,
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

  const MIN_DELAY = 2000 // 2s
  const MAX_DELAY = 6000 // 6s
  const INITIAL_BURST_COUNT = 3 // how many shooting stars appear immediately when dark mode starts.
  const INITIAL_BURST_SPREAD = 450 // ms between initial burst stars

  const spawnShootingStar = () => {
      if (theme !== 'dark') return
      const fromLeft = Math.random() < 0.5
      const startX = fromLeft ? -50 : canvas.width + 50
      const startY = Math.random() * canvas.height * 0.5 // upper half mostly
      const angle = (Math.random() * 20 + 25) * (Math.PI / 180) // 25-45 degrees
      const speed = 6 + Math.random() * 4 // pixels per frame baseline
      const vx = (fromLeft ? 1 : -1) * Math.cos(angle) * speed
      const vy = Math.sin(angle) * speed * (Math.random() < 0.7 ? 1 : 0.6)
      shootingRef.current.push({
        x: startX,
        y: startY,
        vx,
        vy,
        life: 0,
        maxLife: 900 + Math.random() * 500, // ms
        length: 80 + Math.random() * 120,
        brightness: 0.7 + Math.random() * 0.3,
      })
      scheduleNext()
    }

    const scheduleNext = () => {
      if (nextShootTimeout.current) window.clearTimeout(nextShootTimeout.current)
      const delay = MIN_DELAY + Math.random() * (MAX_DELAY - MIN_DELAY)
      nextShootTimeout.current = window.setTimeout(spawnShootingStar, delay)
    }
    // Initial burst (staggered)
    if (theme === 'dark') {
      for (let i = 0; i < INITIAL_BURST_COUNT; i++) {
        const t = window.setTimeout(() => spawnShootingStar(), i * (INITIAL_BURST_SPREAD / INITIAL_BURST_COUNT))
        burstTimeoutsRef.current.push(t)
      }
    }
    scheduleNext()

  const ATTRACTION_RADIUS = 250
  const ATTRACTION_STRENGTH = 0.3 // how strongly stars shift toward cursor inside radius
  const RETURN_EASING = 0.99 // 0-1; closer to 1 = slower return
  const MAX_OFFSET = 120 // clamp displacement

  const handleVisibilityChange = () => {
    if (document.hidden) {
      // Tab hidden: cancel scheduled spawns so they don't pile up
      if (nextShootTimeout.current) {
        window.clearTimeout(nextShootTimeout.current)
        nextShootTimeout.current = null
      }
    } else {
      // Tab visible again: discard all accumulated stars and restart cleanly
      shootingRef.current = []
      scheduleNext()
    }
  }
  document.addEventListener('visibilitychange', handleVisibilityChange)

  let lastFrameTime = 0
  const animate = (time: number) => { //  render loop
    const delta = lastFrameTime > 0 ? Math.min(time - lastFrameTime, 100) : 16.67 // cap delta to avoid huge jumps
    lastFrameTime = time

    // Lerp smoothMouse toward real mouse — frame-rate independent (decays ~12% per frame @60fps)
    const lerpAlpha = 1 - Math.pow(0.88, delta / 16.67)
    smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * lerpAlpha
    smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * lerpAlpha
    const smx = smoothMouseRef.current.x
    const smy = smoothMouseRef.current.y

      ctx.clearRect(0, 0, canvas.width, canvas.height) // clears the entire canvas before drawing the next frame

      if (theme === 'dark') {
        // Stars for dark mode
       starsRef.current.forEach((star: Star) => {
          // update position (depth scaled)
          if (enableFollow) {
            const cursorX = smx * canvas.width
            const cursorY = smy * canvas.height
            const dx = cursorX - star.x
            const dy = cursorY - star.y
            const dist = Math.hypot(dx, dy) // dist = otivuj
            if (dist < ATTRACTION_RADIUS) {
              const influence = (1 - dist / ATTRACTION_RADIUS) ** 2 // ease near edge
              const shiftX = dx * influence * ATTRACTION_STRENGTH * (0.3 + star.depth)
              const shiftY = dy * influence * ATTRACTION_STRENGTH * (0.3 + star.depth)
              star.offsetX = (star.offsetX || 0) + shiftX
              star.offsetY = (star.offsetY || 0) + shiftY
              // clamp
              const mag = Math.hypot(star.offsetX, star.offsetY)
              if (mag > MAX_OFFSET) {
                const k = MAX_OFFSET / mag
                star.offsetX *= k
                star.offsetY *= k
              }
            } else {
              // ease back to origin
              star.offsetX = (star.offsetX || 0) * RETURN_EASING
              star.offsetY = (star.offsetY || 0) * RETURN_EASING
              if (Math.abs(star.offsetX) < 0.05) star.offsetX = 0
              if (Math.abs(star.offsetY) < 0.05) star.offsetY = 0
            }
          }
          // baseline drift remains
          star.x += star.vx * star.speedMul
          star.y += star.vy * star.speedMul

          // wrap around edges for seamless infinite field
          if (star.x > canvas.width) star.x = 0
          if (star.x < 0) star.x = canvas.width
          if (star.y > canvas.height) star.y = 0
          if (star.y < 0) star.y = canvas.height

          star.opacity += Math.sin(time * star.twinkleSpeed) * 0.01
          star.opacity = Math.max(0.1, Math.min(1, star.opacity))

          ctx.beginPath()
          // only apply per-star local attraction offset — no global parallax
          const px = star.x + (star.offsetX || 0)
          const py = star.y + (star.offsetY || 0)

          ctx.arc(px, py, star.size, 0, Math.PI * 2)
          
          const gradient = ctx.createRadialGradient(
            px, py, 0,
            px, py, star.size * 3
          )
          gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`)
          gradient.addColorStop(0.5, `rgba(147, 197, 253, ${star.opacity * 0.5})`)
          gradient.addColorStop(1, 'rgba(147, 197, 253, 0)')
          
          ctx.fillStyle = gradient
          ctx.fill()
        })

        // Shooting stars
        const now = performance.now()
        shootingRef.current = shootingRef.current.filter((s) => s.life < s.maxLife)
        shootingRef.current.forEach((s) => {
          // advance
            s.x += s.vx * (delta / 16.67)
            s.y += s.vy * (delta / 16.67)
            s.life += delta

            // fade in then out
            const half = s.maxLife / 2
            const fade = s.life < half ? (s.life / half) : (1 - (s.life - half) / half)
            const alpha = Math.max(0, fade) * s.brightness

            // tail direction opposite velocity
            const tailX = s.x - s.vx * (s.length / 10)
            const tailY = s.y - s.vy * (s.length / 10)

            const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY)
            grad.addColorStop(0, `rgba(255,255,255,${alpha})`)
            grad.addColorStop(0.3, `rgba(180,220,255,${alpha * 0.6})`)
            grad.addColorStop(1, 'rgba(180,220,255,0)')

            ctx.strokeStyle = grad
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(s.x, s.y)
            ctx.lineTo(tailX, tailY)
            ctx.stroke()

            // head glow
            const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 6)
            glow.addColorStop(0, `rgba(255,255,255,${alpha})`)
            glow.addColorStop(1, 'rgba(255,255,255,0)')
            ctx.fillStyle = glow
            ctx.beginPath()
            ctx.arc(s.x, s.y, 6, 0, Math.PI * 2)
            ctx.fill()
        })
      } else {
        // Floating particles for light mode
  particlesRef.current.forEach((particle: Particle) => {
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
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  if (nextShootTimeout.current) window.clearTimeout(nextShootTimeout.current)
  burstTimeoutsRef.current.forEach((id) => window.clearTimeout(id))
  burstTimeoutsRef.current = []
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
          darkOrbPositions.map((pos, i) => (
            <motion.div
              key={`dark-${i}`}
              className="absolute rounded-full bg-gradient-to-r from-blue-400/10 to-cyan-400/10"
              style={{
                width: `${pos.size}px`,
                height: `${pos.size}px`,
                left: `${pos.left}%`,
                top: `${pos.top}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 25 + i * 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))
        ) : (
          // Light mode: Geometric shapes
          <>
            {lightShapePositions.map((pos, i) => (
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
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
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
