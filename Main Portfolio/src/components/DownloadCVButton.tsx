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
}: DownloadCVButtonProps) {
  const handleDownload = () => {
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a')
    link.href = '/MyCV.pdf'
    link.download = 'MyCV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getButtonStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-gray-600 hover:bg-gray-700 text-white'
      case 'outline':
        return 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent'
      default:
        return 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white'
    }
  }

  return (
    <motion.button
      onClick={handleDownload}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${getButtonStyles()} ${className}`}
    >
      <Download className="w-5 h-5" />
      Download CV
      <FileText className="w-4 h-4 opacity-75" />
    </motion.button>
  )
}
