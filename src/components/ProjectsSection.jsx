import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaGithub,
  FaExternalLinkAlt,
  FaMobileAlt,
  FaLaptopCode,
  FaDesktop,
  FaCode,
  FaStar,
  FaArrowRight
} from 'react-icons/fa'
import PawfectCut from '../assets/projects/PawfectCut.webp'
import RainbowLoop from '../assets/projects/RainbowLoop.webp'
import BookQuest from '../assets/projects/BookQuest.webp'

const TiltProjectCard = ({ proj, onSelect }) => {
  const CardIcon = proj.icon || FaCode
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const springTiltX = useSpring(tiltX, { stiffness: 300, damping: 20 })
  const springTiltY = useSpring(tiltY, { stiffness: 300, damping: 20 })
  const rotateX = useTransform(springTiltY, [-0.5, 0.5], ['15deg', '-15deg'])
  const rotateY = useTransform(springTiltX, [-0.5, 0.5], ['-15deg', '15deg'])

  const onMouseMove = (e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const cx = (e.clientX - rect.left) / rect.width - 0.5
    const cy = (e.clientY - rect.top) / rect.height - 0.5
    tiltX.set(cx)
    tiltY.set(cy)
  }

  const onMouseLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  return (
    <motion.div
      key={proj.id}
      className="project-mini-card"
      style={{
        rotateX,
        rotateY,
        transformPerspective: 600,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={() => onSelect(proj.id)}
      whileHover={{
        scale: 1.05,
        borderColor: 'var(--color-muted-green)',
        boxShadow: '0 0 20px rgba(98, 122, 92, 0.5), 0 0 40px rgba(98, 122, 92, 0.2)',
      }}
      transition={{ duration: 0.2 }}
      title="Click to showcase on left"
    >
      {/* Full Background Banner & Logo */}
      <div className="mini-card-banner">
        {proj.image ? (
          <img src={proj.image} alt={proj.title} />
        ) : (
          <div className="mini-banner-placeholder">
            <CardIcon className="mini-icon" />
          </div>
        )}
        <div className="mini-card-gradient" />
        <span className="mini-cat-badge">{proj.category}</span>
      </div>

      {/* Overlaid Title & Tech Stacks */}
      <div className="mini-card-overlay">
        <h4>{proj.title}</h4>
        <div className="mini-tech-tags">
          {proj.technologies.map(tech => (
            <span key={tech} className="tech-badge-sm">{tech}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const projects = [
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

const ProjectsSection = () => {
  const [featuredId, setFeaturedId] = useState('pawfectcut')

  const featuredProject = projects.find(p => p.id === featuredId) || projects[0]
  const otherProjects = projects.filter(p => p.id !== featuredId)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  }

  const FeaturedIcon = featuredProject.icon || FaCode

  return (
    <section id="projects" className="projects section-zebra-dark">
      <div className="container">
        <motion.div
          className="section-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.h2 variants={itemVariants}>Featured Projects</motion.h2>

          <motion.div className="split-projects-layout" variants={itemVariants}>

            {/* LEFT SIDE: Big Featured Project Hero Card */}
            <div className="featured-hero-card">
              <AnimatePresence mode="wait">
                <motion.div
                  key={featuredProject.id}
                  className="featured-hero-inner"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {/* Image Header */}
                  <div className="featured-hero-image">
                    {featuredProject.image ? (
                      <img src={featuredProject.image} alt={featuredProject.title} />
                    ) : (
                      <div className="featured-banner-placeholder">
                        <div className="banner-grid-overlay" />
                        <FeaturedIcon className="banner-center-icon" />
                        <span className="banner-watermark">{featuredProject.title}</span>
                      </div>
                    )}
                    <div className="featured-badge-group">
                      <span className="star-badge"><FaStar /> Featured</span>
                      <span className="category-badge">{featuredProject.category}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="featured-hero-body">
                    <h3>{featuredProject.title}</h3>
                    <p>{featuredProject.description}</p>

                    <div className="featured-tech-tags">
                      {featuredProject.technologies.map(tech => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                    </div>

                    <div className="featured-hero-actions">
                      {featuredProject.links.github.startsWith('http') ? (
                        <a
                          href={featuredProject.links.github}
                          className="project-btn code-btn"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaGithub /> <span>Code</span>
                        </a>
                      ) : (
                        <Link to={featuredProject.links.github} className="project-btn code-btn">
                          <FaGithub /> <span>Code</span>
                        </Link>
                      )}

                      {featuredProject.links.demo && (
                        <a
                          href={featuredProject.links.demo}
                          className="project-btn demo-btn"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaExternalLinkAlt /> <span>Visit</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT SIDE: 2x2 Grid of Other Projects */}
            <div className="grid-projects-container">
              <div className="grid-label-bar">
                <span>More Projects (Click to Showcase)</span>
                <Link to="/coming-soon" className="see-more-header-btn">
                  See More <FaArrowRight />
                </Link>
              </div>

              <div className="projects-mini-grid">
                {otherProjects.map((proj) => (
                  <TiltProjectCard key={proj.id} proj={proj} onSelect={setFeaturedId} />
                ))}
              </div>
            </div>

          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsSection