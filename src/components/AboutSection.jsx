import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import owis1 from '../assets/Profile/owis1.webp'
import owis2 from '../assets/Profile/owis2.webp'
import owis3 from '../assets/Profile/owis3.webp'
import owis4 from '../assets/Profile/owis4.webp'

const photos = [
  { src: owis1, alt: 'John Laurence - Photo 1' },
  { src: owis2, alt: 'John Laurence - Photo 2' },
  { src: owis3, alt: 'John Laurence - Photo 3' },
  { src: owis4, alt: 'John Laurence - Photo 4' }
]

const AboutSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Continuous auto slideshow every 3.5 seconds without needing user interaction
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }

  const slideVariants = {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: { duration: 1.2, ease: 'easeInOut' }
    },
    exit: {
      opacity: 0,
      transition: { duration: 1.2, ease: 'easeInOut' }
    }
  }

  return (
    <section id="about" className="about section-zebra-dark">
      <div className="container">
        <motion.div
          className="about-layout"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left: Text */}
          <motion.div className="about-text" variants={itemVariants}>
            <h2>About Me</h2>
            <p>
              I'm a Frontend Developer with a strong eye for detail, focused on building
              clean, responsive, and visually engaging web interfaces that deliver
              seamless user experiences across all devices.
            </p>
            <p>
              As a UI/UX Designer, I bridge the gap between functionality and aesthetics —
              crafting intuitive layouts and design systems that put the user first,
              from wireframes to polished, pixel-perfect prototypes.
            </p>
            <p>
              I also work as a Technical Writer, translating complex technical concepts
              into clear, structured, and accessible documentation for both developers
              and end-users alike.
            </p>
          </motion.div>

          {/* Right: Automated Crossfade Image Slideshow + Badge */}
          <motion.div className="about-image-wrapper" variants={itemVariants}>
            <div className="about-image-frame">
              <div className="profile-container auto-slideshow-container">
                <AnimatePresence>
                  <motion.img
                    key={currentIndex}
                    src={photos[currentIndex].src}
                    alt={photos[currentIndex].alt}
                    className="profile-img"
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  />
                </AnimatePresence>

                {/* Hover Overlay */}
                <motion.div
                  className="profile-overlay"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="profile-fullname">John Laurence A. Cajegas</p>
                </motion.div>
              </div>

              <div className="about-badge">
                <span className="badge-number">4+</span>
                <span className="badge-label">YEARS EXP</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection