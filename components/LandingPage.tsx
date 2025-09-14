"use client"
import { useEffect, useState } from "react"
import {
  Code2,
  Smartphone,
  Brain,
  Book,
  IdCard,
  LayoutDashboard,
  PenTool,
  BarChart2,
  Twitter,
  Linkedin,
  Github,
  DiscIcon as Discord,
  ChevronRight,
  MessageSquare,
  Menu,
  X,
} from "lucide-react"
import { motion } from 'framer-motion'
import Image from "next/image"

function LandingPage() {
  // Animated counters for stats
  const [clientCount, setClientCount] = useState(1);
  const [projectCount, setProjectCount] = useState(1);

  useEffect(() => {
    let clientTarget = 50;
    let projectTarget = 100;
    // Make animation 5x slower by multiplying intervals by 5
    let clientInterval = setInterval(() => {
      setClientCount((prev) => {
        if (prev < clientTarget) return prev + 1;
        clearInterval(clientInterval);
        return clientTarget;
      });
    }, 90); // 18 * 5 = 90ms
    let projectInterval = setInterval(() => {
      setProjectCount((prev) => {
        if (prev < projectTarget) return prev + 1;
        clearInterval(projectInterval);
        return projectTarget;
      });
    }, 50); // 10 * 5 = 50ms
    return () => {
      clearInterval(clientInterval);
      clearInterval(projectInterval);
    };
  }, []);
  const [isVisible, setIsVisible] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isSuccess, setIsSuccess] = useState(false); // Success state
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateStep = () => {
    const newErrors = {};
      if (!formData.name.trim()) {newErrors.name = 'Name is required.';
        alert('Name is required.');
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required.';
        alert('Email is required.');
      } else if (!/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,7}$/.test(formData.email)) {
        newErrors.email = 'Enter a valid email.';
        alert('Enter a valid email.');
      }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
      // Formsubmit action URL
      if (validateStep()) {
        setIsLoading(true);  // Set loading to true when the submit is clicked
  
      const formActionURL = 'https://formsubmit.co/viveksharma.network@gmail.com'; // Replace with your email
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('_captcha', 'false');
  
      try {
        // Use await to send data to Formsubmit
        const response = await fetch(formActionURL, {
          method: 'POST',
          body: formDataToSend,
        });
  
        if (response.ok) {
          setIsSuccess(true);
          alert('Your message has been sent successfully!');
          setFormData({
            name: '',
            email: '',
            message: ''
          });
        } else {
          alert('There was an error. Please try again.');
        }
      } catch (error) {
        alert('There was an error. Please try again.');
        console.error('Error in form submission:', error);
      }finally {
         setIsLoading(false);  // Set loading to false after the process is done
          setIsSuccess(false)  
    }}
    }


  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const options = {
      threshold: 0.5, // Trigger when 30% of the section is visible
      rootMargin: '-80px 0px 0px 0px' // Offset for the fixed header
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    // Observe all sections
    const sections = ['home', 'services', 'portfolio', 'testimonials', 'blog', 'contact'];
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  }

  const NavLink = ({ section, label }: { section: string; label: string }) => (
    <span
      onClick={() => scrollToSection(section)}
      className={`cursor-pointer transition-colors duration-300 ${
        activeSection === section ? "text-indigo-400" : "text-gray-400 hover:text-indigo-400"
      }`}
      style={{ padding: '0 8px', fontWeight: 500 }}
    >
      {label}
    </span>
  )

  return (
  <div className="min-h-screen bg-gray-950 w-full max-w-full overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-2000"></div>

        {/* Pulsating Grid Beam Effect */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 animate-beam"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950 backdrop-blur-lg border-b border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Image
              src="/logo.gif"
              alt="LaunchPixel Logo"
              width={90}
              height={90}
              className="rounded-full"
            />
            <div className="hidden lg:flex items-center gap-2 justify-end">
              <NavLink section="home" label="Home" />
              <NavLink section="services" label="Services" />
              <NavLink section="portfolio" label="Portfolio" />
              <NavLink section="testimonials" label="Testimonials" />
               {/*<NavLink section="blog" label="Blog" /> */}
              <button
                onClick={() => scrollToSection("contact")}
                className="ml-4 px-6 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-full hover:from-indigo-500 hover:to-indigo-400 transition-all duration-300"
              >
                Contact Us
              </button>
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-gray-400 hover:text-white z-[101] relative"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && (
    <motion.div
    className="fixed top-[50px] md:top-[60px] left-0 w-full h-[calc(100vh-50px)] md:h-[calc(100vh-60px)] bg-gray-50 z-40 flex items-center justify-center overflow-y-auto shadow-lg"
    initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >            <div className="flex flex-col items-center w-full justify-center min-h-screen px-6 bg-gray-950  blur-50 backdrop-blur-lg">
                <nav className="container mx-auto flex flex-col items-center space-y-6 transform -translate-y-12 backdrop-blur-lg">
                {["home", "services", "portfolio", "testimonials"/*, "blog"*/].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`text-2xl font-semibold ${
                      activeSection === section ? "text-indigo-400" : "text-gray-400 hover:text-indigo-400"
                    } transition-colors duration-300`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
                <button
                  onClick={() => scrollToSection("contact")}
                  className="mt-8 px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-full hover:from-indigo-500 hover:to-indigo-400 transition-all duration-300 text-xl font-semibold"
                >
                  Contact Us
                </button>
              </nav>
            </div>
            </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <div id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">
    <div className="container mx-auto w-full max-w-full px-0 md:px-6 py-16 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-8 transform transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"} text-center md:text-left`}
            >
              <div className="inline-block">
                <div className="flex items-center gap-2 text-indigo-400 bg-indigo-950/50 rounded-full px-4 py-2 mb-6 backdrop-blur-sm border border-indigo-800/50">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                  </span>
                  Innovating the Future of Software
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                Innovating{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  Software
                </span>{" "}
                Solutions
              </h1>
              <p className="text-xl text-gray-300">
                Transform Your Ideas Into Digital Reality. We help businesses transform their ideas into powerful
                digital solutions through innovative software development and strategic consulting.
              </p>
              <div className="flex gap-4 items-center justify-center md:justify-start">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="group px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-full hover:from-indigo-500 hover:to-indigo-400 transition-all duration-300 flex items-center gap-2"
                >
                  Contact us
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            <div
              className={`transform transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl blur-2xl"></div>
                <video
                src="/launch_hero.mp4"
                autoPlay
                loop
                muted
                playsInline
                width={800}
                height={450}
                className="rounded-2xl shadow-2xl relative z-10 border border-gray-800"
                  >
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 gap-8 text-center">
            <div className="p-8 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-800 relative group hover:border-indigo-500/50 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
              <div className="relative z-10">
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  {clientCount}+
                </div>
                <div className="text-gray-400 mt-2">Happy Clients</div>
              </div>
            </div>
            <div className="p-8 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-800 relative group hover:border-indigo-500/50 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
              <div className="relative z-10">
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  {projectCount}+
                </div>
                <div className="text-gray-400 mt-2">Projects Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rotating Logos Section */}
      <div className="relative py-16 flex flex-col items-center justify-center">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/20 rounded-full blur-[100px] z-0"></div>
        <h3 className="text-xl font-semibold text-white mb-8 z-10">Our Backings & Affiliations</h3>
        <div className="w-full flex items-center justify-center overflow-hidden z-10">
          {/* Logo paths array for 10 different logos */}
          {(() => {
            const logoPaths = [
              "/logo1.png",
              "/logo2.png",
              "/logo3.png",
              "/logo4.png",
              "/logo5.png",
              "/logo6.png",
              "/logo7.png",
              "/logo8.png",
              "/logo9.png",
              "/logo10.png"
            ];
            // Repeat logos 4 times for seamless infinite scroll
            const logos = [...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths, ...logoPaths];
            return (
              <div className="logo-carousel flex gap-12 animate-logo-spin">
                {logos.map((src, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-gray-900/80 rounded-xl flex items-center justify-center shadow-lg border border-gray-800">
                      <img src={src} alt={`Logo ${i % logoPaths.length + 1}`} className="w-12 h-12 object-contain opacity-80" />
                    </div>
                    <span className="text-gray-400 text-xs mt-2">Logo {i % logoPaths.length + 1}</span>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
        <style jsx>{`
          .logo-carousel {
            min-width: 400%;
            will-change: transform;
          }
          @keyframes logo-spin {
            0% { transform: translateX(0); }
            100% { transform: translateX(-75%); }
          }
          .animate-logo-spin {
            animation: logo-spin 36s linear infinite;
          }
        `}</style>
      </div>

      {/* Services Section */}
      <div id="services" className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 text-white">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800 hover:border-indigo-500/50 transition-colors relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-indigo-950 flex items-center justify-center mb-4">
                  <Code2 className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Web/App Development</h3>
                <p className="text-gray-400">
                  Custom applications built with modern technologies and best practices.
                </p>
              </div>
            </div>
            <div className="p-8 bg-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800 hover:border-indigo-500/50 transition-colors relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-indigo-950 flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Brand Stratergy</h3>
                <p className="text-gray-400">Native and cross-platform mobile applications for iOS and Android.</p>
              </div>
            </div>
            <div className="p-8 bg-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800 hover:border-indigo-500/50 transition-colors relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-indigo-950 flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">AI Apps</h3>
                <p className="text-gray-400">
                  Intelligent applications powered by cutting-edge AI and machine learning.
                </p>
              </div>
            </div>
            <div className="p-8 bg-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800 hover:border-indigo-500/50 transition-colors relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-indigo-950 flex items-center justify-center mb-4">
                  <Book className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Guidelines & Systems</h3>
                <p className="text-gray-400">
                  Intelligent applications powered by cutting-edge AI and machine learning.
                </p>
              </div>
            </div>
            <div className="p-8 bg-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800 hover:border-indigo-500/50 transition-colors relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-indigo-950 flex items-center justify-center mb-4">
                  <IdCard className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Identity Design</h3>
                <p className="text-gray-400">
                  Intelligent applications powered by cutting-edge AI and machine learning.
                </p>
              </div>
            </div>
            <div className="p-8 bg-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800 hover:border-indigo-500/50 transition-colors relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-indigo-950 flex items-center justify-center mb-4">
                  <LayoutDashboard className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">UI Design & UX stratergy</h3>
                <p className="text-gray-400">
                  Intelligent applications powered by cutting-edge AI and machine learning.
                </p>
              </div>
            </div>
            <div className="p-8 bg-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800 hover:border-indigo-500/50 transition-colors relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-indigo-950 flex items-center justify-center mb-4">
                  <PenTool className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Prototyping</h3>
                <p className="text-gray-400">
                  Intelligent applications powered by cutting-edge AI and machine learning.
                </p>
              </div>
            </div>
            <div className="p-8 bg-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800 hover:border-indigo-500/50 transition-colors relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-indigo-950 flex items-center justify-center mb-4">
                  <BarChart2 className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">SEO Strategies</h3>
                <p className="text-gray-400">
                  Intelligent applications powered by cutting-edge AI and machine learning.
                </p>
              </div>
            </div>
            <div className="p-8 bg-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800 hover:border-indigo-500/50 transition-colors relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-indigo-950 flex items-center justify-center mb-4">
                  <IdCard className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Identity & Branding</h3>
                <p className="text-gray-400">
                  Intelligent applications powered by cutting-edge AI and machine learning.
                </p>
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* Portfolio Section */}
      <div id="portfolio" className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 text-white">Our Top Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Portfolio Cards with Popups */}
            {(() => {
              const portfolioItems = [
                {
                  title: "EaseLearn.ai",
                  displayName: "EaseLearn AI",
                  type: "AI App",
                  description: "AI-powered personalized learning platform. Developed and animated interactive elements and unique user experiences throughout EaseLearn.ai's site, an AI-powered education platform.",
                  image: "/easelearnai.png",
                  video: "/easelearn.mp4",
                  link: "https://easelearn.ai",
                },
                {
                  title: "LiverCure.org",
                  displayName: "LiverCure",
                  type: "Web App",
                  description: "Healthcare platform for liver disease awareness and treatment.",
                  image: "/livercure.png",
                  video: "/livercure.mp4",
                  link: "https://livercure.org",
                },
                {
                  title: "MadhavFabrication.in",
                  displayName: "Madhav Fabrication",
                  type: "Ecommerce",
                  description: "A Clothing Ecommerce platform for Women.",
                  image: "/madhavfabrications.png",
                  video: "/madhavfabrication.mp4",
                  link: "https://madhavfabrication.in",
                },
                {
                  title: "VibeCast.in",
                  displayName: "VibeCast Innovations",
                  type: "Startup",
                  description: "VibeCast Innovations PVT LTD Deals in Digital Signages.",
                  image: "/vibecast.png",
                  video: "/vibecast.mp4",
                  link: "https://vibecast.in",
                },
                {
                  title: "VaranasionWheels.com",
                  displayName: "Varanasi on Wheels",
                  type: "Tours & Travels Agency",
                  description: "A Comprehensive Tours & Travel Agency based in Varanasi.",
                  image: "/varanasionwheels.png",
                  video: "/varanasionwheels.mp4",
                  link: "https://varanasionwheels.com",
                },
                {
                  title: "SunilBookStore.store",
                  displayName: "Sunil Book Store",
                  type: "Portfolio",
                  description: "Portfolio for Sunil Book Store making their presence on the internet and making them reach wider audience.",
                  image: "/sunilbookstore.png",
                  link: "https://sunilbookstore.store",
                },
                {
                  title: "PowerPlayCricketAcademy.com",
                  displayName: "PowerPlay Cricket Academy",
                  type: "Cricket Academy",
                  description: "Built the website for Power Play Cricket Academy, showcasing all of their Faculty and a Registration form so new candidates can directly register.",
                  image: "/cricketacademy.png",
                  link: "https://powerplaycricketacademy.com",
                },
                {
                  title: "AyushmaanHospitalKorba.net.in",
                  displayName: "Ayushmaan Hospital",
                  type: "Hospital Management System",
                  description: "Built a Hospital Management System for Ayushmaan Hospital Korba to manage their patients and staff efficiently, Proper call to action buttons for ease of booking.",
                  image: "/ayushmaan.png",
                  link: "https://ayushman-hospital2.vercel.app/",
                },
                {
                  title: "sharansmusicacademy.com",
                  displayName: "Sharans Music Academy",
                  type: "Music Academy",
                  description: "Built a Music Academy Management System for Sharans Music Academy to manage their Students and staff efficiently, Proper call to action buttons for ease of booking.",
                  image: "/sharansmusicacademy.png",
                  link: "https://sharansmusicacademy.com",
                },
              ];
              const [openIndex, setOpenIndex] = useState(-1);
              return (
                <>
                  {portfolioItems.map((item, idx) => (
                    <div
                      key={item.title}
                      className="group relative overflow-hidden rounded-xl cursor-pointer"
                      onClick={() => setOpenIndex(idx)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={800}
                        height={600}
                        className="w-full h-64 object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                        <h3 className="text-xl font-semibold text-white mb-2">
                          <span className="hover:text-indigo-400 transition-colors">
                            {item.title}
                          </span>
                        </h3>
                        <p className="text-gray-300 text-sm">{item.type}</p>
                      </div>
                    </div>
                  ))}
                  {/* Modal Popup */}
                  {openIndex !== -1 && (
                    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
                      <div className="portfolio-modal relative bg-gray-950 rounded-2xl shadow-2xl flex flex-col md:flex-row w-full mx-2 md:mx-4 overflow-hidden animate-fade-in border border-indigo-900/40"
                        style={{ width: '100%', maxWidth: '95vw', boxSizing: 'border-box', maxWidth: '900px' }}>
                        <style>{`
                          @media (max-width: 600px) {
                            .portfolio-modal {
                              max-width: 95vw !important;
                              margin: 0 auto !important;
                              flex-direction: column !important;
                              padding: 0 !important;
                            }
                            .portfolio-modal-media {
                              padding: 1rem !important;
                              max-height: 30vh !important;
                            }
                            .portfolio-modal-details {
                              padding: 1rem !important;
                            }
                          }
                        `}</style>
                        {/* Close Button */}
                        <button
                          className="absolute top-4 right-4 md:top-6 md:right-6 text-white bg-gray-900/80 rounded-full p-3 hover:bg-indigo-500 transition-colors z-10 shadow-lg"
                          onClick={() => setOpenIndex(-1)}
                          aria-label="Close"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        {/* Left: Expanded Media (70%) */}
                        <div className="w-full md:w-[70%] flex items-center justify-center bg-gradient-to-br from-indigo-900/60 to-purple-900/60 p-4 md:p-12">
                          {portfolioItems[openIndex].video ? (
                            <video
                              src={portfolioItems[openIndex].video}
                              autoPlay
                              loop
                              muted
                              playsInline
                              width={900}
                              height={900}
                              className="rounded-2xl shadow-2xl object-contain w-full h-auto border border-indigo-800/30"
                              style={{ pointerEvents: 'none', maxHeight: '40vh', maxWidth: '100%' }}
                            />
                          ) : (
                            <Image
                              src={portfolioItems[openIndex].image}
                              alt={portfolioItems[openIndex].title}
                              width={900}
                              height={900}
                              className="rounded-2xl shadow-2xl object-contain w-full h-auto border border-indigo-800/30"
                              style={{ maxHeight: '40vh', maxWidth: '100%' }}
                            />
                          )}
                        </div>
                        {/* Right: Details (30%) */}
                        <div className="w-full md:w-[30%] flex flex-col justify-center bg-gradient-to-br from-indigo-500/40 to-purple-500/40 p-4 md:p-10">
                          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4 md:mb-6 leading-tight">{portfolioItems[openIndex].displayName}</h2>
                          <h4 className="text-lg md:text-xl font-semibold text-indigo-400 mb-2 md:mb-4">{portfolioItems[openIndex].type}</h4>
                          <p className="text-gray-300 mb-4 md:mb-8 text-base md:text-lg">{portfolioItems[openIndex].description}</p>
                          <a
                            href={portfolioItems[openIndex].link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-full font-bold text-base md:text-lg hover:from-indigo-500 hover:to-indigo-400 transition-all duration-300 shadow-xl"
                          >
                            Visit Website
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                  <style jsx>{`
                    .animate-fade-in {
                      animation: fadeInModal 0.3s ease;
                    }
                    @keyframes fadeInModal {
                      from { opacity: 0; transform: scale(0.98); }
                      to { opacity: 1; transform: scale(1); }
                    }
                  `}</style>
                </>
              );
            })()}
            

          </div>
        </div>
        
        
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 text-white">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Akansh Gupta",
                role: "CEO, Varanasi on Wheels",
                text: "Working with LaunchPixel has been an incredible experience. They delivered our project on time and exceeded our expectations. we are working closely for marketing and SEO strategies.",
                image: "/Akansh.png",
              },
              {
                name: "Aryan Raj Singh",
                role: "Founder, EaseLearnAI",
                text: "LaunchPixel's technical expertise and attention to detail made our complex project a success.",
                image: "/Aryan.png",
              },
              {
                name: "Shivanshu Tripathi",
                role: "Owner, VibeCast Innovations",
                text: "Outstanding service and support. They truly understand modern software development. I recommend LaunchPixel and am definately coming back to them for more projects.",
                image: "/Shivanshu.png",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="p-8 bg-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800 hover:border-indigo-500/50 transition-colors relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-md opacity-50"></div>
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full object-cover relative z-10 border-2 border-indigo-500/50"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-indigo-400 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-gray-400">{testimonial.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-white">Let's Talk</h2>
              <p className="text-gray-400 mb-8">Ready to start your next project? Get in touch with us today.</p>
              <form className="space-y-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-full bg-gray-900/50 backdrop-blur-lg border border-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-full bg-gray-900/50 backdrop-blur-lg border border-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                <input
                  type="text"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  className="w-full px-4 py-3 rounded-full bg-gray-900/50 backdrop-blur-lg border border-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                <button 
                  onClick={handleSubmit}
                  disabled={isLoading} // Disable button while loading
                  className="group px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-full hover:from-indigo-500 hover:to-indigo-400 transition-all duration-300 flex items-center gap-2"
                >
                  {isLoading ? (
      <div className="spinner-border animate-spin border-t-2 border-b-2 border-white w-6 h-6 border-solid rounded-full"></div> // You can replace this with a spinner of your choice
    ) : (
     <>Send Message
      <MessageSquare size={20} className="group-hover:translate-x-1 transition-transform" /></>
    )}
          
                </button>
              </form>
            </div>
            <div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl blur-2xl"></div>
                <video
                  src="/contact2.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  width={800}
                  height={400}
                  className="rounded-2xl shadow-2xl relative z-10 border border-gray-800"
                  aria-label="Contact illustration"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative bg-gray-950/80 backdrop-blur-lg text-white py-12 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                LaunchPixel
              </h3>
              <p className="text-gray-400">Transforming ideas into powerful digital solutions.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white"> </h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-indigo-400 transition-colors cursor-pointer"></li>
                <li className="hover:text-indigo-400 transition-colors cursor-pointer">  </li>
                <li className="hover:text-indigo-400 transition-colors cursor-pointer"></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/hiring" className="hover:text-indigo-400 transition-colors cursor-pointer">We are Hiring</a>
                </li>
                <li>
                  <a href="#services" className="hover:text-indigo-400 transition-colors cursor-pointer">Our Services</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Connect</h4>
              <div className="flex gap-4">
                <Twitter className="w-6 h-6 text-gray-400 hover:text-indigo-400 transition-colors cursor-pointer" />
                <Linkedin className="w-6 h-6 text-gray-400 hover:text-indigo-400 transition-colors cursor-pointer" />
                <Github className="w-6 h-6 text-gray-400 hover:text-indigo-400 transition-colors cursor-pointer" />
                <Discord className="w-6 h-6 text-gray-400 hover:text-indigo-400 transition-colors cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            © 2025 LaunchPixel. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

