'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import EmailService from '../services/EmailService'

export default function DynamicContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  // Initialize EmailService
  const emailService = EmailService.getInstance()

  useEffect(() => {
    emailService.initialize()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate form data
    const validation = emailService.validateEmailData(formData)
    if (!validation.isValid) {
      setFeedback({
        type: 'error',
        message: '❌ ' + validation.errors.join(', ')
      })
      setIsSubmitting(false)
      return
    }

    try {
      // Send email using EmailService
      const result = await emailService.sendEmail({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        title: 'Portfolio Contact Form'
      })

      if (result.success) {
        setFeedback({
          type: 'success',
          message: '✅ Message sent successfully! I will get back to you soon.'
        })
        setFormData({ name: '', email: '', message: '' })
      } else {
        throw new Error(result.message)
      }

    } catch {
      // Try Formspree as backup
      try {
        const formspreeResponse = await fetch('https://formspree.io/f/xjkwpwgr', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            subject: `Portfolio Contact: Message from ${formData.name}`,
            _replyto: formData.email
          }),
        })

        if (formspreeResponse.ok) {
          setFeedback({
            type: 'success',
            message: '✅ Message sent successfully via backup service! I will get back to you soon.'
          })
          setFormData({ name: '', email: '', message: '' })
        } else {
          throw new Error(`Formspree failed with status ${formspreeResponse.status}`)
        }
      } catch {
        setFeedback({
          type: 'error',
          message: '❌ Failed to send message via both email services. Please contact me directly at ahasanulhaque20@gmail.com'
        })
      }
    }

    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  // Clear feedback after 5 seconds
  useEffect(() => {
    if (feedback.type) {
      const timer = setTimeout(() => {
        setFeedback({ type: null, message: '' })
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [feedback.type])

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Your Name"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="your.email@example.com"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
          placeholder="Tell me about your project or just say hello!"
        />
      </motion.div>

      {/* Feedback Message */}
      {feedback.type && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`p-4 rounded-lg flex items-center gap-2 ${
            feedback.type === 'success'
              ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800'
              : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span className="text-sm font-medium">{feedback.message}</span>
        </motion.div>
      )}

      <motion.button
        type="submit"
        disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? (
          <>
            <motion.div
              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Message
          </>
        )}
      </motion.button>

      {/* Additional Contact Info */}
      <motion.div
        className="text-center text-sm text-gray-600 dark:text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Or reach me directly at{' '}
        <a
          href="mailto:ahasanulhaque20@gmail.com"
          className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          ahasanulhaque20@gmail.com
        </a>
      </motion.div>
    </form>
  )
}
