'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Terminal, X, Minus, Square, ChevronRight } from 'lucide-react'

export default function InteractiveTerminal() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<{ command: string; output: string; type: 'success' | 'error' | 'info' }[]>([])
  const [currentPath, setCurrentPath] = useState('~/portfolio')

  const commands = {
    help: {
      output: `Available commands:
• about - Display information about me
• skills - List my technical skills  
• projects - Show my recent projects
• github - Show live GitHub repositories
• contact - Get my contact information
• clear - Clear the terminal
• pwd - Show current directory
• ls - List directory contents
• whoami - Display current user
• date - Show current date and time
• echo [text] - Display text
• cat [file] - Display file contents`,
      type: 'info' as const
    },
    about: {
      output: `Name: Md Ahasanul Haque
Role: Full Stack Developer & Computer Science Student
University: Shahjalal University of Engineering and Technology
Location: Sylhet, Bangladesh
Experience: 5+ years in programming, 2+ years in web development
Specialties: Competitive Programming, Data Science, Mobile Development`,
      type: 'success' as const
    },
    skills: {
      output: `Technical Skills:
Programming Languages: Python (95%), JavaScript/TypeScript (90%), Java (85%), C++ (80%)
Web Development: React, Next.js, Django, HTML/CSS
Mobile Development: Native Android, Kotlin
Data Science: Pandas, NumPy, Matplotlib, Keras
Tools: Git, VS Code, IntelliJ IDEA, Android Studio
Databases: SQLite, PostgreSQL
Languages: English, Bangla, Hindi`,
      type: 'success' as const
    },
    projects: {
      output: `Recent Projects:
1. Portfolio Website - Modern React portfolio with animations
2. Restaurant Management App - Native Android application
3. Word Matching Game - JavaFX desktop game
4. Data Analysis Dashboard - Python-based ML dashboard
5. E-commerce Platform - Full-stack web application

GitHub: github.com/sksazid01`,
      type: 'success' as const
    },
    github: {
      output: `🔥 Live GitHub Repositories:

Real-time repositories from github.com/sksazid01:
• Portfolio Website - Modern React portfolio with advanced features
• Restaurant Management App - Native Android application
• Word Matching Game - JavaFX desktop game  
• Data Analysis Dashboard - Python ML dashboard
• Competitive Programming Solutions - 1230+ solved problems

📊 GitHub Stats:
• Total Public Repos: 15+
• Total Stars: 25+
• Total Forks: 8+
• Most Used Language: Python

View live projects: Navigate to "🔥 Live GitHub Projects" section`,
      type: 'success' as const
    },
    contact: {
      output: `Contact Information:
Email: ahasanulhaque20@gmail.com
GitHub: github.com/sksazid01
LinkedIn: linkedin.com/in/ahasanul-haque
Location: Sylhet, Bangladesh
Status: Open to opportunities`,
      type: 'success' as const
    },
    pwd: {
      output: currentPath,
      type: 'info' as const
    },
    ls: {
      output: `about.txt  skills.json  projects/  github/  contact.md  resume.pdf`,
      type: 'info' as const
    },
    whoami: {
      output: 'sksazid',
      type: 'info' as const
    },
    date: {
      output: new Date().toString(),
      type: 'info' as const
    },
    clear: {
      output: '',
      type: 'info' as const
    }
  }

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    const [baseCmd, ...args] = trimmedCmd.split(' ')

    if (baseCmd === 'clear') {
      setHistory([])
      return
    }

    if (baseCmd === 'echo') {
      const text = args.join(' ')
      setHistory(prev => [...prev, {
        command: cmd,
        output: text || '',
        type: 'info'
      }])
      return
    }

    if (baseCmd === 'cat') {
      const filename = args[0]
      const fileOutputs: { [key: string]: string } = {
        'about.txt': 'Passionate developer with 5+ years of experience in competitive programming and full-stack development.',
        'contact.md': '# Contact\nEmail: ahasanulhaque20@gmail.com\nGitHub: sksazid01',
        'resume.pdf': 'Binary file (use download command to get resume)',
      }
      
      const output = fileOutputs[filename] || `cat: ${filename}: No such file or directory`
      const type = fileOutputs[filename] ? 'success' : 'error'
      
      setHistory(prev => [...prev, {
        command: cmd,
        output,
        type
      }])
      return
    }

    if (commands[baseCmd as keyof typeof commands]) {
      const result = commands[baseCmd as keyof typeof commands]
      setHistory(prev => [...prev, {
        command: cmd,
        output: result.output,
        type: result.type
      }])
    } else {
      setHistory(prev => [...prev, {
        command: cmd,
        output: `Command not found: ${baseCmd}. Type 'help' for available commands.`,
        type: 'error'
      }])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      executeCommand(input)
      setInput('')
    }
  }

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && history.length === 0) {
      setHistory([{
        command: '',
        output: `Welcome to Ahasanul's Interactive Terminal!
Type 'help' to see available commands.
        
╭─────────────────────────────────────╮
│   🚀 Portfolio Terminal v1.0       │
│   Made with ❤️ by Ahasanul Haque   │
╰─────────────────────────────────────╯`,
        type: 'info'
      }])
    }
  }, [isOpen])

  return (
    <>
      {/* Terminal Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-24 z-50 bg-gray-900 dark:bg-gray-700 text-green-400 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700 dark:border-gray-600"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <Terminal className="w-6 h-6" />
      </motion.button>

      {/* Terminal Window */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed bottom-4 right-4 w-[600px] max-w-[90vw] h-[500px] max-h-[80vh] bg-gray-900 rounded-lg shadow-2xl border border-gray-700 z-50 flex flex-col overflow-hidden"
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between bg-gray-800 px-4 py-3 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <button className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors"></button>
                <button className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors"></button>
                <button className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors"></button>
              </div>
              <span className="text-gray-300 text-sm font-medium flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                Terminal - Portfolio
              </span>
            </div>
            <motion.button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white p-1 hover:bg-gray-700 rounded transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Terminal Content */}
          <div className="flex-1 bg-gray-900 p-4 overflow-y-auto font-mono text-sm">
            {/* Command History */}
            <div className="space-y-2">
              {history.map((entry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {entry.command && (
                    <div className="flex items-center gap-2 text-green-400">
                      <span className="text-blue-400">sksazid@portfolio</span>
                      <span className="text-yellow-400">{currentPath}</span>
                      <ChevronRight className="w-3 h-3" />
                      <span>{entry.command}</span>
                    </div>
                  )}
                  <pre className={`whitespace-pre-wrap ${
                    entry.type === 'error' ? 'text-red-400' :
                    entry.type === 'success' ? 'text-green-300' :
                    'text-gray-300'
                  } ${!entry.command ? 'mb-4' : ''}`}>
                    {entry.output}
                  </pre>
                </motion.div>
              ))}
            </div>

            {/* Current Input Line */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4">
              <span className="text-blue-400">sksazid@portfolio</span>
              <span className="text-yellow-400">{currentPath}</span>
              <ChevronRight className="w-3 h-3 text-green-400" />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-green-400 outline-none caret-green-400 font-mono"
                placeholder="Type 'help' for commands..."
                autoFocus
              />
            </form>
          </div>

          {/* Terminal Footer */}
          <div className="bg-gray-800 px-4 py-2 border-t border-gray-700">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Interactive Portfolio Terminal</span>
              <span>Press 'help' for commands</span>
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}
