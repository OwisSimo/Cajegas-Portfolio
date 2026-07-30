import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa'
import { useTheme } from '../../context/ThemeContext'

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' }
]

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(null)
  const { isDark, toggleTheme } = useTheme()

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY
          setIsScrolled(scrollY > 40)

          const windowHeight = window.innerHeight
          const documentHeight = document.documentElement.scrollHeight
          const isAtBottom = scrollY + windowHeight >= documentHeight - 80

          if (isAtBottom) {
            setActiveSection('contact')
            ticking = false
            return
          }

          const aboutSection = document.getElementById('about')
          const aboutOffset = aboutSection ? aboutSection.offsetTop - 180 : 300
          if (scrollY < aboutOffset) {
            setActiveSection(null)
            ticking = false
            return
          }

          for (let i = navItems.length - 1; i >= 0; i--) {
            const section = document.getElementById(navItems[i].id)
            if (section && section.offsetTop <= scrollY + 250) {
              setActiveSection(navItems[i].id)
              break
            }
          }

          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      const navHeight = 85
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - navHeight
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setIsMenuOpen(false)
  }

  return (
    <motion.header
      className={`floating-pill-nav-wrapper ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="floating-pill-nav">
        {/* Logo Badge */}
        <motion.div
          className="pill-logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="pill-logo-text">JLC</span>
          <span className="pill-status-dot" title="Available for work" />
        </motion.div>

        {/* Desktop Nav Items */}
        <nav className="pill-links">
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                className={`pill-link-btn ${isActive ? 'active' : ''}`}
                onClick={() => scrollToSection(item.id)}
              >
                {isActive && (
                  <motion.div
                    className="pill-active-bg"
                    layoutId="activeNavPill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="pill-link-text">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Actions & Theme Switcher */}
        <div className="pill-actions">
          <motion.button
            className="pill-theme-toggle"
            onClick={toggleTheme}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isDark ? 'sun' : 'moon'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {isDark ? <FaSun /> : <FaMoon />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          <button className="pill-mobile-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="pill-mobile-menu"
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`pill-mobile-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar