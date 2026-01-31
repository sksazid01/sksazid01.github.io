'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TypingEffectProps {
  skills: string[]
  typingSpeed?: number
  deletingSpeed?: number
  delayBetweenWords?: number
  className?: string
}

export default function TypingEffect({
  skills,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenWords = 2000,
  className = ''
}: TypingEffectProps) {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    // Cursor blink effect
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    const currentSkill = skills[currentSkillIndex]

    const handleTyping = () => {
      if (!isDeleting && currentText === currentSkill) {
        // Finished typing, wait before deleting
        return setTimeout(() => {
          setIsDeleting(true)
        }, delayBetweenWords)
      }

      if (isDeleting && currentText === '') {
        // Finished deleting, move to next skill
        setIsDeleting(false)
        setCurrentSkillIndex((prev) => (prev + 1) % skills.length)
        return
      }

      // Typing or deleting animation
      return setTimeout(
        () => {
          if (isDeleting) {
            // Remove one character
            setCurrentText((prev) => currentSkill.substring(0, prev.length - 1))
          } else {
            // Add one character
            setCurrentText((prev) => currentSkill.substring(0, prev.length + 1))
          }
        },
        isDeleting ? deletingSpeed : typingSpeed
      )
    }

    const timeout = handleTyping()
    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [currentText, isDeleting, currentSkillIndex, skills, typingSpeed, deletingSpeed, delayBetweenWords])

  return (
    <div className={`inline-flex items-center ${className}`}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium"
      >
        {currentText}
      </motion.span>
      <motion.span
        animate={{ opacity: showCursor ? 1 : 0 }}
        transition={{ duration: 0.1 }}
        className="ml-1 font-bold text-blue-600 dark:text-blue-400"
      >
        |
      </motion.span>
    </div>
  )
}
