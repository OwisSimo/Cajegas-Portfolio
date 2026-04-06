import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { useTypingEffect } from '../hooks/useTypingEffect'
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa'
import { useRef, useCallback, useState, useEffect } from 'react'
import arrowDown from '../assets/ArrowDown.png'

const floatingParticles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: Math.random() * 6 + 2,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 6 + 4,
  delay: Math.random() * 4,
}))

const useTilt = () => {
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const springTiltX = useSpring(tiltX, { stiffness: 150, damping: 20 })
  const springTiltY = useSpring(tiltY, { stiffness: 150, damping: 20 })
  const rotateX = useTransform(springTiltY, [-0.5, 0.5], ['15deg', '-15deg'])
  const rotateY = useTransform(springTiltX, [-0.5, 0.5], ['-15deg', '15deg'])
  const ref = useRef(null)

  const onMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = (e.clientX - rect.left) / rect.width - 0.5
    const cy = (e.clientY - rect.top) / rect.height - 0.5
    tiltX.set(cx)
    tiltY.set(cy)
  }

  const onMouseLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  return { ref, rotateX, rotateY, onMouseMove, onMouseLeave }
}

const Hero = () => {
  const animatedName = useTypingEffect(['John Laurence', 'Juanito', 'Owis'], 100, 2000, 50)
  const sectionRef = useRef(null)
  const ctaTilt = useTilt()
  const cvTilt = useTilt()
  const [ripples, setRipples] = useState([])

  // Audio
  const audioRef = useRef(null)
  const [isMuted, setIsMuted] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const isMutedRef = useRef(false)

  useEffect(() => {
    audioRef.current = new Audio('/C418 - Subwoofer Lullaby - Minecraft Volume Alpha.mp3')
    audioRef.current.loop = true
    audioRef.current.volume = 0.3

    const playOnFirstInteract = () => {
      if (!isMutedRef.current) {
        audioRef.current?.play()
      }
      document.removeEventListener('click', playOnFirstInteract)
      document.removeEventListener('keydown', playOnFirstInteract)
      document.removeEventListener('touchstart', playOnFirstInteract)
    }

    audioRef.current.play().catch(() => {
      setIsMuted(true)
      isMutedRef.current = true
      document.addEventListener('click', playOnFirstInteract)
      document.addEventListener('keydown', playOnFirstInteract)
      document.addEventListener('touchstart', playOnFirstInteract)
    })

    return () => {
      audioRef.current?.pause()
      audioRef.current = null
      document.removeEventListener('click', playOnFirstInteract)
      document.removeEventListener('keydown', playOnFirstInteract)
      document.removeEventListener('touchstart', playOnFirstInteract)
    }
  }, [])

  const toggleMusic = () => {
    if (!hasInteracted) setHasInteracted(true)
    if (isMutedRef.current) {
      audioRef.current?.play()
      setIsMuted(false)
      isMutedRef.current = false
    } else {
      audioRef.current?.pause()
      setIsMuted(true)
      isMutedRef.current = true
    }
  }

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 800, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 800, damping: 30 })

  const cardRef = useRef(null)
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const springTiltX = useSpring(tiltX, { stiffness: 150, damping: 20 })
  const springTiltY = useSpring(tiltY, { stiffness: 150, damping: 20 })
  const rotateX = useTransform(springTiltY, [-0.5, 0.5], ['10deg', '-10deg'])
  const rotateY = useTransform(springTiltX, [-0.5, 0.5], ['-10deg', '10deg'])

  const handleMouseMove = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)

    if (cardRef.current) {
      const cardRect = cardRef.current.getBoundingClientRect()
      const cx = (e.clientX - cardRect.left) / cardRect.width - 0.5
      const cy = (e.clientY - cardRect.top) / cardRect.height - 0.5
      tiltX.set(cx)
      tiltY.set(cy)
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    tiltX.set(0)
    tiltY.set(0)
  }, [])

  const handleClick = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()
    setRipples(prev => [...prev, { id, x, y }])
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id))
    }, 800)
  }, [])

  const scrollToProjects = () => {
    const element = document.getElementById('projects')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToAbout = () => {
    const element = document.getElementById('about')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Music Toggle */}
      <motion.button
        className="music-toggle"
        onClick={(e) => { e.stopPropagation(); toggleMusic() }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={isMuted ? 'Play music' : 'Mute music'}
      >
        <motion.div
          className="music-icon-wrapper"
          animate={!isMuted ? { rotate: [0, 10, -10, 0] } : { rotate: 0 }}
          transition={{ duration: 0.5, repeat: !isMuted ? Infinity : 0, repeatDelay: 1 }}
        >
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </motion.div>
        {!isMuted && (
          <span className="music-bars">
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </span>
        )}
      </motion.button>

      {/* Mouse Spotlight */}
      <motion.div
        className="hero-spotlight"
        style={{ left: springX, top: springY }}
      />

      {/* Click Ripples */}
      <AnimatePresence>
        {ripples.map(r => (
          <motion.div
            key={r.id}
            className="hero-ripple"
            style={{ left: r.x, top: r.y }}
            initial={{ width: 0, height: 0, opacity: 0.6 }}
            animate={{ width: 300, height: 300, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>

      {/* Grid Background */}
      <div className="hero-grid" />

      {/* Glow Orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      {/* Floating Particles */}
      <div className="hero-particles">
        {floatingParticles.map(p => (
          <motion.div
            key={p.id}
            className="particle"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="hero-text">

            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="badge-dot" />
              Available for work
            </motion.div>

            <h1 className="hero-greeting">Hi, I'm</h1>
            <h2 className="hero-name">
              {animatedName}
              <span className="cursor">|</span>
            </h2>

            <p className="hero-tagline">
              Front-End Developer & Designer passionate about creating clean and engaging web experiences.
            </p>

            <div className="hero-buttons">
              <motion.button
                ref={ctaTilt.ref}
                className="cta-button"
                onClick={(e) => { e.stopPropagation(); scrollToProjects() }}
                onMouseMove={ctaTilt.onMouseMove}
                onMouseLeave={ctaTilt.onMouseLeave}
                style={{
                  rotateX: ctaTilt.rotateX,
                  rotateY: ctaTilt.rotateY,
                  transformPerspective: 600,
                }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.button>
              <motion.a
                ref={cvTilt.ref}
                href="/Cajegas Resume.pdf"
                download="John_Laurence_Cajegas_CV.pdf"
                className="cv-button"
                onMouseMove={cvTilt.onMouseMove}
                onMouseLeave={cvTilt.onMouseLeave}
                style={{
                  rotateX: cvTilt.rotateX,
                  rotateY: cvTilt.rotateY,
                  transformPerspective: 600,
                }}
                whileTap={{ scale: 0.95 }}
              >
                Download CV
              </motion.a>
            </div>

          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        onClick={(e) => { e.stopPropagation(); scrollToAbout() }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img src={arrowDown} alt="Scroll down" className="scroll-arrow-img" />
      </motion.div>

      {/* Wave Animation */}
      <div className="waves-container">
        <svg className="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none">
          <defs>
            <path id="wave-path" d="M-160,44c30,0,58-18,88-18s 58,18,88,18s 58-18,88-18s 58,18,88,18 v44h-352z" />
          </defs>
          <g className="wave-group">
            <use href="#wave-path" className="wave wave1" x="50" y="0" />
            <use href="#wave-path" className="wave wave2" x="50" y="3" />
            <use href="#wave-path" className="wave wave3" x="50" y="6" />
          </g>
        </svg>
      </div>
    </section>
  )
}

export default Hero