'use client'

import { motion } from 'framer-motion'
import { Download, FileText } from 'lucide-react'

interface DownloadCVButtonProps {
  className?: string
  variant?: 'primary' | 'secondary' | 'outline'
}

export default function DownloadCVButton({ 
  className = '', 
  variant = 'primary' 
}: DownloadCVButtonProps) { // defines the props type using interface
  const handleDownload = () => {
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a')
    link.href = "/cv.pdf"
    link.download = "Md_Ahasanul_Haque_Sazid's_Resume.pdf" // Download the file instead of opening my CV
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getButtonStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-gray-600 hover:bg-gray-700 text-white'
      case 'outline':
        return 'border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 bg-transparent'
      default:
        return 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white'
    }
  }

  return (
    <motion.button
      onClick={handleDownload}
      className={`group px-8 py-4 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${getButtonStyles()} ${className}`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="flex items-center justify-center gap-2">
        <Download className="w-5 h-5" />
        Download CV
      </span>
    </motion.button>
  )
}
