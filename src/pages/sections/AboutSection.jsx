import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Box, Heading, Text, Image } from '@chakra-ui/react'
import owisgrad1 from '../../assets/Profile/owisgrad1.webp'
import owisgrad2 from '../../assets/Profile/owisgrad2.webp'
import {
  FaCode,
  FaPalette,
  FaFileAlt,
  FaGraduationCap,
  FaMagic,
  FaChevronDown
} from 'react-icons/fa'
import '../../styles/about.css'

const MotionBox = motion.create(Box)
const MotionHeading = motion.create(Heading)

const AboutSection = () => {
  // Automatic cross-fade slideshow between graduation photos
  const photos = [owisgrad1, owisgrad2]
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhotoIdx((prev) => (prev + 1) % photos.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [photos.length])

  // Hover accordion state: defaults to first card (Frontend Developer)
  const [activeCard, setActiveCard] = useState(0)

  const pillars = [
    {
      icon: FaCode,
      title: 'Frontend Developer',
      content: (
        <>
          I'm a <Box as="strong" className="text-tag">4+ Years Experienced</Box> Frontend Developer with a strong eye for detail, focused on building clean, responsive, and visually engaging web interfaces that deliver seamless user experiences across all devices.
        </>
      ),
      tags: ['React', 'JavaScript', 'HTML5 / CSS3', 'Motion', 'Vite']
    },
    {
      icon: FaPalette,
      title: 'UI/UX Designer',
      content: (
        <>
          As a <Box as="strong" className="text-tag">UI/UX Designer</Box>, I bridge the gap between functionality and aesthetics — crafting intuitive layouts and design systems that put the user first, from wireframes to polished, pixel-perfect prototypes.
        </>
      ),
      tags: ['Figma', 'Design Systems', 'Wireframing', 'Prototyping', 'User Flows']
    },
    {
      icon: FaFileAlt,
      title: 'Technical Writer',
      content: (
        <>
          I also work as a <Box as="strong" className="text-tag">Technical Writer</Box>, translating complex technical concepts into clear, structured, and accessible documentation for both developers and end-users alike.
        </>
      ),
      tags: ['Developer Guides', 'API Documentation', 'System Specs', 'Markdown']
    }
  ]

  return (
    <Box as="section" id="about" className="about-section section-zebra-dark">
      {/* Subtle ambient lighting */}
      <Box className="about-ambient-glow about-ambient-glow-left" />
      <Box className="about-ambient-glow-right" />

      {/* Section Content with Standard Portfolio Measurements */}
      <Box className="container">
        <Box className="section-content">
          <MotionHeading
            as="h2"
            textAlign="center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            About Me
          </MotionHeading>

          {/* Main Split Layout */}
          <Box className="about-split-layout">
          {/* LEFT: Fade Slideshow Graduation Photo Showcase */}
          <Box className="about-photo-wrapper">
            <Box className="about-photo-card">
              {photos.map((photo, i) => (
                <div
                  key={i}
                  className="about-slide-layer"
                  style={{
                    opacity: i === currentPhotoIdx ? 1 : 0,
                    zIndex: i === currentPhotoIdx ? 1 : 0,
                  }}
                >
                  <Image
                    src={photo}
                    alt="John Laurence Cajegas"
                    className="about-grad-img"
                    loading="eager"
                  />
                </div>
              ))}

              <Box className="photo-gradient-vignette" />

              {/* Slideshow Indicator Dots */}
              <Box className="slideshow-dots-bar">
                {photos.map((_, i) => (
                  <Box
                    as="span"
                    key={i}
                    className={`slideshow-dot ${i === currentPhotoIdx ? 'active' : ''}`}
                    onClick={() => setCurrentPhotoIdx(i)}
                    title={`Graduation Photo ${i + 1}`}
                  />
                ))}
              </Box>

              {/* Floating Bottom Card: Name, Degree & Experience */}
              <Box className="floating-chip-bottom">
                <Box as="span" className="chip-name">John Laurence Cajegas</Box>
                <Box as="span" className="chip-degree">
                  <FaGraduationCap size={13} /> BS Information Technology
                </Box>
                <Box className="chip-experience-line">
                  <FaMagic className="badge-sparkle-icon" size={11} />
                  <Box as="span" className="badge-num">4+ YEARS</Box>
                  <Box as="span" className="badge-sep">•</Box>
                  <Box as="span" className="badge-sub">of Experience & Passion</Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* RIGHT: Minimalist Hover Accordion (Zero Layout Shift) */}
          <MotionBox
            className="about-labels-column"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {pillars.map((item, idx) => {
              const IconComp = item.icon
              const isExpanded = activeCard === idx

              return (
                <div
                  key={idx}
                  className={`about-label-card ${isExpanded ? 'active-card' : ''}`}
                  onMouseEnter={() => setActiveCard(idx)}
                  onClick={() => setActiveCard(idx)}
                >
                  {/* Card Header */}
                  <div className="label-card-header">
                    <div className="label-header-left">
                      <div className="label-icon-box">
                        <IconComp />
                      </div>
                      <h3 className="about-label-title">
                        {item.title}
                      </h3>
                    </div>
                    <div className={`card-chevron-box ${isExpanded ? 'expanded' : ''}`}>
                      <FaChevronDown size={12} />
                    </div>
                  </div>

                  {/* GPU-Accelerated CSS Grid Dropdown */}
                  <div className={`about-card-accordion-body ${isExpanded ? 'is-open' : ''}`}>
                    <div className="about-card-accordion-inner">
                      <p className="about-card-desc">
                        {item.content}
                      </p>
                      <div className="label-tags-row">
                        {item.tags.map((tag, tagIdx) => (
                          <span key={tagIdx} className="label-chip">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </MotionBox>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default AboutSection