import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FaChevronUp, FaChevronDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import PawfectCut from '../assets/projects/PawfectCut.png'

const projects = [
  {
    title: 'PawfectCut',
    image: PawfectCut,
    description: 'A cross-platform pet grooming application designed for pet shops and groomers in Davao City.',
    technologies: ['Laravel', 'MySql', 'Expo', 'TypeScript', 'JavaScript'],
    links: { github: '/coming-soon', demo: 'https://pawfectcut.shop/' }
  },
  {
    title: 'DineFlow',
    image: null,
    description: 'Streamlines orders, reservations, inventory, and multi-method payments while using data insights to improve operational efficiency.',
    technologies: ['ASP.NET', 'SSMS', 'Bootstrap'],
    links: { github: 'https://github.com/Bepstek/DineFlow', demo: null }
  },
  {
    title: 'WaveChat',
    image: null,
    description: 'A web SMS chat app.',
    technologies: ['PHP', 'MySQL', 'AJAX'],
    links: { github: 'https://github.com/m0rPleX-16/WaveChat', demo: null }
  },
  {
    title: 'RainbowLoop',
    image: null,
    description: 'A point-of-sale and inventory management system tailored for yarn and crochet material retailers, handling stock tracking, sales transactions, and product management.',
    technologies: ['C#', 'Visual Basic'],
    links: { github: '#', demo: null }
  },
  {
    title: 'BookQuest',
    image: null,
    description: 'A library management system designed to organize books, manage borrowing records, and streamline library operations.',
    technologies: ['HTML', 'CSS', 'MySQL', 'PHP'],
    links: { github: '#', demo: null }
  }
]

const Projects = () => {
  const [active, setActive] = useState(0)
  const project = projects[active]

  const prev = () => setActive(i => (i - 1 + projects.length) % projects.length)
  const next = () => setActive(i => (i + 1) % projects.length)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  }

  return (
    <section id="projects" className="projects section-zebra-dark">
      <div className="container">
        <motion.div
          className="section-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 variants={itemVariants}>Featured Projects</motion.h2>

          <motion.div className="projects-showcase" variants={itemVariants}>

            {/* Card wrapper */}
            <div className="projects-card-wrapper">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  className="project-card"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  {/* Left: Image */}
                  <div className="project-card-image">
                    {project.image
                      ? <img src={project.image} alt={project.title} />
                      : (
                        <div className="project-card-placeholder">
                          <span>{project.title}</span>
                        </div>
                      )
                    }
                  </div>

                  {/* Right: Content */}
                  <div className="project-content">
                    <h3>{project.title}</h3>
                    <p style={{ textAlign: 'justify' }}>{project.description}</p>
                    <div className="project-tech">
                      {project.technologies.map(tech => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                    <div className="project-links">
                      <a href={project.links.github} className="project-link">
                        <i className="fab fa-github"></i> Code
                      </a>
                      {project.links.demo && (
                        <a href={project.links.demo} className="project-link" target="_blank" rel="noopener noreferrer">
                          <i className="fas fa-external-link-alt"></i> Visit
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Desktop: vertical nav (right side) */}
            <div className="projects-nav desktop-nav">
              <button
                className={`project-arrow ${active === 0 ? 'disabled' : ''}`}
                onClick={prev}
                aria-label="Previous project"
              >
                <FaChevronUp />
              </button>
              <div className="projects-dots">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    className={`project-dot ${active === i ? 'active' : ''}`}
                    onClick={() => setActive(i)}
                    aria-label={`Project ${i + 1}`}
                  />
                ))}
              </div>
              <button
                className={`project-arrow ${active === projects.length - 1 ? 'disabled' : ''}`}
                onClick={next}
                aria-label="Next project"
              >
                <FaChevronDown />
              </button>
            </div>

          </motion.div>

          {/* Mobile: horizontal nav (below card) */}
          <div className="projects-nav mobile-nav">
            <button
              className={`project-arrow ${active === 0 ? 'disabled' : ''}`}
              onClick={prev}
              aria-label="Previous project"
            >
              <FaChevronLeft />
            </button>
            <div className="projects-dots">
              {projects.map((_, i) => (
                <button
                  key={i}
                  className={`project-dot ${active === i ? 'active' : ''}`}
                  onClick={() => setActive(i)}
                  aria-label={`Project ${i + 1}`}
                />
              ))}
            </div>
            <button
              className={`project-arrow ${active === projects.length - 1 ? 'disabled' : ''}`}
              onClick={next}
              aria-label="Next project"
            >
              <FaChevronRight />
            </button>
          </div>

        </motion.div>
      </div>
    </section>
  )
}

export default Projects