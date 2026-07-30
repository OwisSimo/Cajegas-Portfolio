import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Heading, Text, Image, SimpleGrid } from '@chakra-ui/react'
import { FaGithub, FaExternalLinkAlt, FaCode, FaLaptopCode, FaMobileAlt, FaDesktop, FaGooglePlay, FaApple } from 'react-icons/fa'
import PawfectCut from '../../assets/projects/PawfectCut.webp'
import RainbowLoop from '../../assets/projects/RainbowLoop.webp'
import BookQuest from '../../assets/projects/BookQuest.webp'
import ManPro from '../../assets/projects/ManPro.webp'
import '../../styles/projects.css'

const projects = [
  {
    id: 'manpro-mobile',
    title: 'ManPro Mobile',
    category: 'Mobile App',
    image: ManPro,
    description: 'Led the UI/UX redesign and optimization of the ManPro Mobile payroll app for Infinity Hub. Restructured PEME records, KPI tracking modules, and onboarding layouts to improve user flow.',
    technologies: ['UI/UX Design', 'Mobile UI', 'Quality Assurance'],
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=com.manpro_payroll_mobile&pcampaignid=web_share',
      appStore: 'https://apps.apple.com/ph/app/manpro/id6745999887'
    },
    icon: FaMobileAlt
  },
  {
    id: 'pawfectcut',
    title: 'PawfectCut',
    category: 'Mobile & Web App',
    image: PawfectCut,
    description: 'A cross-platform pet grooming application designed for pet shops and groomers in Davao City. Features real-time appointment scheduling, service tracking, and automated client management.',
    technologies: ['Laravel', 'MySQL', 'Expo', 'TypeScript', 'JavaScript'],
    links: { github: '/coming-soon', demo: 'https://pawfectcut.shop/' },
    icon: FaMobileAlt
  },
  {
    id: 'dineflow',
    title: 'DineFlow',
    category: 'Web App',
    image: null,
    description: 'Streamlines orders, reservations, inventory, and multi-method payments while using data insights to improve operational efficiency.',
    technologies: ['ASP.NET', 'SSMS', 'Bootstrap'],
    links: { github: 'https://github.com/Bepstek/DineFlow', demo: null },
    icon: FaLaptopCode
  },
  {
    id: 'wavechat',
    title: 'WaveChat',
    category: 'Web App',
    image: null,
    description: 'A real-time web SMS chat application enabling instant messaging with smooth background updates.',
    technologies: ['PHP', 'MySQL', 'AJAX'],
    links: { github: 'https://github.com/m0rPleX-16/WaveChat', demo: null },
    icon: FaLaptopCode
  },
  {
    id: 'rainbowloop',
    title: 'RainbowLoop',
    category: 'Desktop / System',
    image: RainbowLoop,
    description: 'A point-of-sale and inventory management system tailored for yarn and crochet material retailers, handling stock tracking and sales transactions.',
    technologies: ['C#', 'Visual Basic'],
    links: { github: '/coming-soon', demo: null },
    icon: FaDesktop
  },
  {
    id: 'bookquest',
    title: 'BookQuest',
    category: 'Web App',
    image: BookQuest,
    description: 'A library management system designed to organize books, manage borrowing records, and streamline library operations.',
    technologies: ['HTML', 'CSS', 'MySQL', 'PHP'],
    links: { github: '/coming-soon', demo: null },
    icon: FaLaptopCode
  }
]

const MotionBox = motion.create(Box)
const MotionHeading = motion.create(Heading)
const MotionText = motion.create(Text)

const filterCategories = ['All', 'Web Apps', 'Mobile', 'Desktop']

const ProjectsSection = ({ x, filter, setFilter }) => {

  // Filter projects by category
  const filteredProjects = projects.filter((proj) => {
    if (filter === 'All') return true
    if (filter === 'Web Apps') return proj.category.toLowerCase().includes('web')
    if (filter === 'Mobile') return proj.category.toLowerCase().includes('mobile')
    if (filter === 'Desktop') return proj.category.toLowerCase().includes('desktop')
    return true
  })

  return (
    <Box className="projects-section-wrapper" py="80px" bg="var(--bg-primary)">
      {/* Section Header */}
      <Box className="container">
        <Box className="section-content" style={{ paddingBottom: '30px' }}>
          <MotionHeading as="h2">Featured Projects</MotionHeading>
          <MotionText className="projects-subheading" style={{ marginTop: '25px', marginBottom: '20px' }}>
            A curated selection of my digital creations and designs
          </MotionText>

          {/* Filter Pills */}
          <Box className="projects-filter-container">
            {filterCategories.map((cat) => {
              const isActive = filter === cat
              return (
                <Box
                  as="button"
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`filter-pill-btn ${isActive ? 'active' : ''}`}
                >
                  {isActive && (
                    <MotionBox
                      className="filter-active-bg"
                      layoutId="activeFilterPill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Box as="span" className="filter-pill-text">{cat}</Box>
                </Box>
              )
            })}
          </Box>
        </Box>
      </Box>

      {/* Horizontal Scrolling Gallery */}
      <Box style={{ overflow: 'visible', width: '100%', marginTop: '30px' }} className="projects-track-outer">
        <MotionBox
          style={{ x }}
          display="flex"
          gap="32px"
          pl="12vw"
          pr="12vw"
          width="max-content"
          className="projects-track-inner"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => {
              const CardIcon = proj.icon || FaCode
              return (
                <MotionBox
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={proj.id}
                  className="scroll-project-card"
                  style={{
                    width: '380px',
                    flexShrink: 0,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {/* Card Media Header */}
                  <Box className="card-media-box">
                    {proj.image ? (
                      <Image src={proj.image} alt={proj.title} className="project-card-image" />
                    ) : (
                      <Box className="project-card-placeholder">
                        <Box className="placeholder-pattern" />
                        <Box as={CardIcon} className="placeholder-center-icon" />
                        <Box as="span" className="placeholder-watermark-text">{proj.title}</Box>
                      </Box>
                    )}
                    <Box className="card-media-overlay" />
                    <Box as="span" className="card-category-badge">{proj.category}</Box>
                  </Box>

                  {/* Card Content Body */}
                  <Box className="card-content-body" display="flex" flexDirection="column" flex="1">
                    <Heading as="h3">{proj.title}</Heading>
                    <Text mb="20px" flex="1">{proj.description}</Text>

                    <Box className="tech-tags-list" mt="auto">
                      {proj.technologies.map((tech) => (
                        <Box as="span" key={tech} className="tech-card-badge">
                          {tech}
                        </Box>
                      ))}
                    </Box>

                    <Box className="project-action-links">
                      {proj.links.github && (
                        proj.links.github.startsWith('http') ? (
                          <Box
                            as="a"
                            href={proj.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="action-link-btn code-btn"
                          >
                            <FaGithub /> <Box as="span">Code</Box>
                          </Box>
                        ) : (
                          <Box as={Link} to={proj.links.github} className="action-link-btn code-btn">
                            <FaGithub /> <Box as="span">Code</Box>
                          </Box>
                        )
                      )}

                      {proj.links.demo && (
                        <Box
                          as="a"
                          href={proj.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="action-link-btn demo-btn"
                        >
                          <FaExternalLinkAlt /> <Box as="span">Live Demo</Box>
                        </Box>
                      )}

                      {proj.links.playStore && (
                        <Box
                          as="a"
                          href={proj.links.playStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="action-link-btn demo-btn"
                        >
                          <FaGooglePlay /> <Box as="span">Play Store</Box>
                        </Box>
                      )}

                      {proj.links.appStore && (
                        <Box
                          as="a"
                          href={proj.links.appStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="action-link-btn demo-btn"
                        >
                          <FaApple /> <Box as="span">App Store</Box>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </MotionBox>
              )
            })}
          </AnimatePresence>
        </MotionBox>
      </Box>
    </Box>
  )
}

export default ProjectsSection