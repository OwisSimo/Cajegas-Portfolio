import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Box, Heading, Text, Image } from '@chakra-ui/react'
import {
  FaGithub,
  FaExternalLinkAlt,
  FaCode,
  FaLaptopCode,
  FaMobileAlt,
  FaDesktop,
  FaGooglePlay,
  FaApple,
  FaChevronRight,
  FaGlobe
} from 'react-icons/fa'
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

const filterCategories = ['All', 'Web Apps', 'Mobile', 'Desktop']

const ProjectsSection = () => {
  const [filter, setFilter] = useState('All')

  // Filter projects by category
  const filteredProjects = projects.filter((proj) => {
    if (filter === 'All') return true
    if (filter === 'Web Apps') return proj.category.toLowerCase().includes('web')
    if (filter === 'Mobile') return proj.category.toLowerCase().includes('mobile')
    if (filter === 'Desktop') return proj.category.toLowerCase().includes('desktop')
    return true
  })

  // Selected project state for the interactive inspector
  const [selectedProject, setSelectedProject] = useState(projects[0])

  // Sync selected project if it was filtered out
  useEffect(() => {
    const isStillVisible = filteredProjects.some((p) => p.id === selectedProject?.id)
    if (!isStillVisible && filteredProjects.length > 0) {
      setSelectedProject(filteredProjects[0])
    }
  }, [filter, filteredProjects, selectedProject])

  const activeProj = selectedProject || filteredProjects[0] || projects[0]
  const InspectorIcon = activeProj.icon || FaCode

  // Derive a readable URL for the inspector's address bar
  const getDisplayUrl = (proj) => {
    if (proj.links.demo) return proj.links.demo.replace(/^https?:\/\//, '')
    if (proj.links.playStore) return 'play.google.com/store/apps/manpro'
    if (proj.links.github && proj.links.github.startsWith('http')) {
      return proj.links.github.replace(/^https?:\/\//, '')
    }
    return `cajegas.dev/projects/${proj.id}`
  }

  // Derive status label
  const getStatusLabel = (proj) => {
    if (proj.links.demo) return 'Live Production'
    if (proj.links.playStore || proj.links.appStore) return 'Production App'
    return 'Source Repository'
  }

  return (
    <Box as="section" id="projects" className="projects-section section-zebra-dark">
      <Box className="container">
        <Box className="section-content">
          <MotionHeading
            as="h2"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Featured Projects
          </MotionHeading>

          {/* Category Filter Pills */}
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

          {/* Interactive Split-View Studio */}
          <Box className="projects-studio-layout">
            {/* Left Column: Interactive Project Selector List */}
            <Box className="studio-selector-panel">
              <Box className="studio-selector-header">
                <span>PROJECT DIRECTORY</span>
                <span className="studio-count-badge">
                  {filteredProjects.length} {filteredProjects.length === 1 ? 'item' : 'items'}
                </span>
              </Box>

              <Box className="studio-project-list">
                {filteredProjects.map((proj, idx) => {
                  const isSelected = activeProj.id === proj.id
                  const formattedIdx = String(idx + 1).padStart(2, '0')

                  return (
                    <Box
                      as="button"
                      key={proj.id}
                      onClick={() => setSelectedProject(proj)}
                      className={`studio-project-item ${isSelected ? 'active' : ''}`}
                    >
                      {isSelected && (
                        <MotionBox
                          className="studio-active-glow"
                          layoutId="activeStudioProjectGlow"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}

                      <span className="studio-project-num">{formattedIdx}</span>

                      <Box className="studio-project-info">
                        <Text className="studio-project-name">{proj.title}</Text>
                        <Box className="studio-project-meta">
                          <span className="studio-project-category">{proj.category}</span>
                          <span>·</span>
                          <span>{proj.technologies.slice(0, 2).join(', ')}</span>
                        </Box>
                      </Box>

                      <FaChevronRight className="studio-project-chevron" />
                    </Box>
                  )
                })}
              </Box>
            </Box>

            {/* Right Column: Immersive Device Inspector */}
            <Box className="studio-inspector-panel">
              <AnimatePresence mode="wait">
                <MotionBox
                  key={activeProj.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                >
                  {/* Top Viewport Header */}
                  <Box className="inspector-top-chrome">
                    <Box className="inspector-window-dots">
                      <span className="inspector-window-dot dot-red" />
                      <span className="inspector-window-dot dot-yellow" />
                      <span className="inspector-window-dot dot-green" />
                    </Box>

                    <Box className="inspector-url-bar">
                      <FaGlobe style={{ fontSize: '0.72rem', flexShrink: 0 }} />
                      <span className="inspector-url-text">{getDisplayUrl(activeProj)}</span>
                    </Box>

                    <Box className="inspector-status-badge">
                      <span className="inspector-status-dot" />
                      <span>{getStatusLabel(activeProj)}</span>
                    </Box>
                  </Box>

                  {/* Media Viewport Canvas */}
                  <Box className="inspector-media-box">
                    {activeProj.image ? (
                      <Image
                        src={activeProj.image}
                        alt={activeProj.title}
                        loading="lazy"
                        decoding="async"
                        className="inspector-media-img"
                      />
                    ) : (
                      <Box className="inspector-placeholder">
                        <Box className="inspector-placeholder-pattern" />
                        <Box as={InspectorIcon} className="inspector-placeholder-icon" />
                        <span className="inspector-placeholder-title">{activeProj.title}</span>
                        <span className="inspector-placeholder-tag">System Architecture</span>
                      </Box>
                    )}
                  </Box>

                  {/* Inspector Body Info */}
                  <Box className="inspector-body">
                    <Box className="inspector-title-row">
                      <Heading as="h3" className="inspector-title">{activeProj.title}</Heading>
                      <Box as="span" className="inspector-category-badge">{activeProj.category}</Box>
                    </Box>

                    <Text className="inspector-desc">{activeProj.description}</Text>

                    {/* Tech Badges */}
                    <Box className="inspector-tech-tags">
                      {activeProj.technologies.map((tech) => (
                        <Box as="span" key={tech} className="inspector-tech-chip">
                          {tech}
                        </Box>
                      ))}
                    </Box>

                    {/* Actions CTAs */}
                    <Box className="inspector-actions">
                      {activeProj.links.demo && (
                        <Box
                          as="a"
                          href={activeProj.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inspector-btn btn-primary"
                        >
                          <FaExternalLinkAlt /> <span>Live Demo</span>
                        </Box>
                      )}

                      {activeProj.links.playStore && (
                        <Box
                          as="a"
                          href={activeProj.links.playStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inspector-btn btn-primary"
                        >
                          <FaGooglePlay /> <span>Google Play</span>
                        </Box>
                      )}

                      {activeProj.links.appStore && (
                        <Box
                          as="a"
                          href={activeProj.links.appStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inspector-btn btn-primary"
                        >
                          <FaApple /> <span>App Store</span>
                        </Box>
                      )}

                      {activeProj.links.github && (
                        activeProj.links.github.startsWith('http') ? (
                          <Box
                            as="a"
                            href={activeProj.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inspector-btn btn-secondary"
                          >
                            <FaGithub /> <span>Source Code</span>
                          </Box>
                        ) : (
                          <Box
                            as={Link}
                            to={activeProj.links.github}
                            className="inspector-btn btn-secondary"
                          >
                            <FaGithub /> <span>Source Code</span>
                          </Box>
                        )
                      )}
                    </Box>
                  </Box>
                </MotionBox>
              </AnimatePresence>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ProjectsSection