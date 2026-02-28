'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface CursorPosition {
  x: number
  y: number
  id: number
}

export default function CursorTrail() {
  const [cursors, setCursors] = useState<CursorPosition[]>([])
  const [isEnabled, setIsEnabled] = useState(true)

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsEnabled(false)
      return
    }

    let cursorId = 0

    const handleMouseMove = (e: MouseEvent) => {
      if (!isEnabled) return
      setCursors(prev => {
        const newCursor: CursorPosition = {
          x: e.clientX,
          y: e.clientY,
          id: cursorId++
        }
        // Keep only the last 8 cursor positions
        return [newCursor, ...prev].slice(0, 8)
      })
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isEnabled])

  if (!isEnabled) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {cursors.map((cursor, index) => (
        <motion.div
          key={cursor.id}
          className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-60"
          initial={{ 
            x: cursor.x - 8, 
            y: cursor.y - 8,
            scale: 1,
            opacity: 0.6
          }}
          animate={{ 
            scale: 0,
            opacity: 0
          }}
          transition={{ 
            duration: 0.6,
            delay: index * 0.05,
            ease: "easeOut"
          }}
          style={{
            left: 0,
            top: 0,
            transform: `translate(${cursor.x - 8}px, ${cursor.y - 8}px)`
          }}
        />
      ))}
    </div>
  )
}
