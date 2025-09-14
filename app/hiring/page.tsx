"use client"

import React, { useState } from 'react'
import { Sparkles, ArrowRight, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CampusAmbassadorForm() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    college: '',
    department: '',
    year: '',
    why: ''
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  // Track mouse position for background effects
  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const error = validateField(field, formData[field])
    setErrors(prev => ({ ...prev, [field]: error }))
  }

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required'
        if (value.trim().length < 3) return 'Name must be at least 3 characters'
        if (!/^[a-zA-Z\s]*$/.test(value)) return 'Name should only contain letters'
        return ''
      
      case 'phone':
        if (!value.trim()) return 'Phone number is required'
        if (!/^[0-9]{10}$/.test(value.replace(/\D/g, ''))) 
          return 'Please enter a valid 10-digit phone number'
        return ''
      
      case 'college':
        if (!value.trim()) return 'College/University is required'
        if (value.trim().length < 3) return 'Please enter full college name'
        return ''
      
      case 'department':
        if (!value.trim()) return 'Department is required'
        if (value.trim().length < 2) return 'Please enter valid department'
        return ''
      
      case 'year':
        if (!value) return 'Year of study is required'
        return ''
      
      case 'why':
        if (!value.trim()) return 'Please tell us why you want to join'
        if (value.trim().length < 50) return 'Please provide at least 50 characters'
        return ''
      
      default:
        return ''
    }
  }

  const validateForm = () => {
    const newErrors = {}
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key])
      if (error) newErrors[key] = error
    })
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    const formActionURL = 'https://formsubmit.co/viveksharma.network@gmail.com' // Replace with your actual email
    const formDataToSend = new FormData()
    
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value)
    })
    formDataToSend.append('_captcha', 'false')

    try {
      const response = await fetch(formActionURL, {
        method: 'POST',
        body: formDataToSend,
      })

      if (response.ok) {
        setIsSuccess(true)
        setFormData({
          name: '',
          phone: '',
          college: '',
          department: '',
          year: '',
          why: ''
        })
        setErrors({})
      } else {
        alert('There was an error. Please try again.')
      }
    } catch (error) {
      alert('There was an error. Please try again.')
      console.error('Error in form submission:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
        <div className="min-h-screen bg-gray-950">

        {/* Animated Background */}
        <div className="fixed inset-0 z-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-2000"></div>

        {/* Pulsating Grid Beam Effect */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 animate-beam"></div>
      </div>
      {/* Header Section */}
      <div className="backdrop-blur-sm top-0 z-10 p-4 pb-2">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold text-white mb-2 inline-flex items-center">
            Welcome to&nbsp;
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Launch Pixel
            </span>
          </h1>
        </div>
      </div>
        
        <div className="flex items-center justify-center px-4 py-40">
          <div className="max-w-md w-full text-center p-8 rounded-2xl bg-indigo-900/20 backdrop-blur-sm border border-indigo-700/30">
            <h2 className="text-2xl font-bold text-white mb-4">Thank You for Your Application!</h2>
            <p className="text-gray-300 mb-6">Our team will review your information and reach out to you soon about the Campus Ambassador position.</p>
            <button
              onClick={() => {
                router.push("/")
              }}
              className="group px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl 
                font-medium hover:opacity-90 transition-all duration-300 shadow-lg shadow-indigo-600/20 
                flex items-center gap-2 mx-auto"
            >
              Back to Homepage
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div> 
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950">

        {/* Animated Background */}
        <div className="fixed inset-0 z-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-2000"></div>

        {/* Pulsating Grid Beam Effect */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 animate-beam"></div>
      </div>
      {/* Header Section */}
      <div className="backdrop-blur-sm top-0 z-10 p-4 pb-2">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold text-white mb-2 inline-flex items-center">
            Welcome to&nbsp;
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Launch Pixel
            </span>
          </h1>
        </div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-6">
              Join Launch Pixel as a
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 ml-2">
                Campus Ambassador
              </span>
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Gain valuable experience, expand your professional network, and earn commissions while representing Launch Pixel!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="p-6 rounded-xl bg-indigo-800/20 backdrop-blur-sm border border-indigo-700/30">
                <h3 className="text-xl font-bold text-white mb-4">Your Responsibilities</h3>
                <ul className="text-gray-300 space-y-3 text-left">
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
                    <span>Lead Generation & Outreach to US-based clients</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
                    <span>Networking & Awareness in professional communities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
                    <span>Client Engagement & Nurturing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
                    <span>Execute targeted marketing campaigns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
                    <span>Drive referral-based growth</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
                    <span>Collect client feedback & insights</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-6 rounded-xl bg-indigo-800/20 backdrop-blur-sm border border-indigo-700/30">
                <h3 className="text-xl font-bold text-white mb-4">What You Get</h3>
                <ul className="text-gray-300 space-y-3 text-left">
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
                    <span>Work from Anywhere – 100% remote, flexible hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
                    <span>Paid Internship – Earn commissions per referral</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
                    <span>Prestigious Internship Certificate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
                    <span>Exclusive Rewards & Bonuses for top performers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
                    <span>Valuable networking opportunities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                onBlur={() => handleBlur('name')}
                className="w-full px-6 py-4 rounded-xl bg-indigo-800/50 text-gray-100 placeholder-gray-500 
                  border border-indigo-700/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 
                  transition-all duration-200 backdrop-blur-xl"
              />
              {errors.name && touched.name && <p className="mt-2 text-red-400 text-sm">{errors.name}</p>}
            </div>

            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                onBlur={() => handleBlur('phone')}
                className="w-full px-6 py-4 rounded-xl bg-indigo-800/50 text-gray-100 placeholder-gray-500 
                  border border-indigo-700/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 
                  transition-all duration-200 backdrop-blur-xl"
              />
              {errors.phone && touched.phone && <p className="mt-2 text-red-400 text-sm">{errors.phone}</p>}
            </div>

            <div>
              <input
                type="text"
                placeholder="College / University"
                value={formData.college}
                onChange={(e) => setFormData({...formData, college: e.target.value})}
                onBlur={() => handleBlur('college')}
                className="w-full px-6 py-4 rounded-xl bg-indigo-800/50 text-gray-100 placeholder-gray-500 
                  border border-indigo-700/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 
                  transition-all duration-200 backdrop-blur-xl"
              />
              {errors.college && touched.college && <p className="mt-2 text-red-400 text-sm">{errors.college}</p>}
            </div>

            <div>
              <input
                type="text"
                placeholder="Department"
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                onBlur={() => handleBlur('department')}
                className="w-full px-6 py-4 rounded-xl bg-indigo-800/50 text-gray-100 placeholder-gray-500 
                  border border-indigo-700/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 
                  transition-all duration-200 backdrop-blur-xl"
              />
              {errors.department && touched.department && <p className="mt-2 text-red-400 text-sm">{errors.department}</p>}
            </div>

            <div>
              <select
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: e.target.value})}
                onBlur={() => handleBlur('year')}
                className="w-full px-6 py-4 rounded-xl bg-indigo-800/50 text-gray-100 
                  border border-indigo-700/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 
                  transition-all duration-200 backdrop-blur-xl"
              >
                <option value="">Select Year of Study</option>
                <option value="1st">1st Year</option>
                <option value="2nd">2nd Year</option>
                <option value="3rd">3rd Year</option>
                <option value="4th">4th Year</option>
                <option value="Graduate">Graduate Student</option>
              </select>
              {errors.year && touched.year && <p className="mt-2 text-red-400 text-sm">{errors.year}</p>}
            </div>

            <div>
              <textarea
                placeholder="Why do you want to be a Campus Ambassador for Launch Pixel?"
                value={formData.why}
                onChange={(e) => setFormData({...formData, why: e.target.value})}
                onBlur={() => handleBlur('why')}
                rows={4}
                className="w-full px-6 py-4 rounded-xl bg-indigo-800/50 text-gray-100 placeholder-gray-500 
                  border border-indigo-700/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 
                  transition-all duration-200 backdrop-blur-xl"
              />
              {errors.why && touched.why && <p className="mt-2 text-red-400 text-sm">{errors.why}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl 
                font-medium hover:opacity-90 transition-all shadow-lg shadow-indigo-600/20 
                flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Submit Application
                </>
              )}
            </button>
          </form>
          
          <div className="mt-12 text-center">
            <p className="text-gray-400">
              Questions about the program? Email us at <span className="text-indigo-400">team@launchpixel.in</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}