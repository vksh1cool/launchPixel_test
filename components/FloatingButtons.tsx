"use client"

import { Phone, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

const FloatingButtons = () => {
  const phoneNumber = "+918085149514" // Replace with actual phone number
  const [showCallTooltip, setShowCallTooltip] = useState(false)
  const [showWhatsAppTooltip, setShowWhatsAppTooltip] = useState(false)

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`
  }

  const handleWhatsApp = () => {
    window.location.href = `https://wa.me/${phoneNumber}`
  }

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      <div className="relative group">
        <motion.button
          className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white p-3 rounded-full shadow-lg hover:from-indigo-500 hover:to-indigo-400 transition-colors"
          onClick={handleCall}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onMouseEnter={() => setShowCallTooltip(true)}
          onMouseLeave={() => setShowCallTooltip(false)}
        >
          <Phone className="w-6 h-6" />
          <span className="sr-only">Call us</span>
        </motion.button>
        {showCallTooltip && (
          <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-white text-[#800000] px-3 py-1 rounded shadow-lg text-sm whitespace-nowrap">
            Call us now
          </div>
        )}
      </div>

      <div className="relative group">
        <motion.button
          className="bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:bg-[#128C7E] transition-colors"
          onClick={handleWhatsApp}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          onMouseEnter={() => setShowWhatsAppTooltip(true)}
          onMouseLeave={() => setShowWhatsAppTooltip(false)}
        >
          <MessageCircle className="w-6 h-6" />
          <span className="sr-only">Message on WhatsApp</span>
        </motion.button>
        {showWhatsAppTooltip && (
          <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-white text-[#25D366] px-3 py-1 rounded shadow-lg text-sm whitespace-nowrap">
            Chat on WhatsApp
          </div>
        )}
      </div>
    </div>
  )
}

export default FloatingButtons

