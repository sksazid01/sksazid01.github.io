'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, Github, Facebook } from 'lucide-react'
import DynamicContactForm from './DynamicContactForm'

export default function Contact() {

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "ahasanulhaque20@gmail.com",
      href: "mailto:ahasanulhaque20@gmail.com",
      color: "blue"
    },
    // {
    //   icon: <Phone className="w-6 h-6" />,
    //   title: "Phone",
    //   value: "+880 9697001667",
    //   href: "tel:+8809697001667",
    //   color: "blue"
    // },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      value: "Sylhet, Bangladesh",
      href: "#",
      color: "blue"
    },
    {
      icon: <Github className="w-6 h-6" />,
      title: "GitHub",
      value: "sksazid01",
      href: "https://github.com/sksazid01",
      color: "gray"
    },
    {
      icon: <Facebook className="w-6 h-6" />,
      title: "Facebook",
      value: "sksazid01",
      href: "https://www.facebook.com/sksazid01",
      color: "blue"
    }
  ]

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-blue-600 dark:text-blue-400">
              Get In Touch
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Let&apos;s discuss opportunities and collaborate on exciting projects
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.href}
                target={info.href.startsWith('http') ? '_blank' : undefined}
                rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="flex items-center gap-6 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
              >
                <div className={`p-4 rounded-xl ${
                  info.color === 'blue' 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {info.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {info.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {info.value}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50"
          >
            <DynamicContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
