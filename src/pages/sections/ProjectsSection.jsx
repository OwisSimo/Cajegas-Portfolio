import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaGithub, FaExternalLinkAlt, FaCode, FaLaptopCode, FaMobileAlt, FaDesktop } from 'react-icons/fa'
import PawfectCut from '../../assets/projects/PawfectCut.webp'
import RainbowLoop from '../../assets/projects/RainbowLoop.webp'
import BookQuest from '../../assets/projects/BookQuest.webp'

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
  const targetRef = useRef(null)

  // Track scroll progress of the wrapper container
  const { scrollYProgress } = useScroll({
    target: targetRef
  })

  // Map vertical scroll progress to horizontal translation
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-65%'])

  return (
    <div className="projects-carousel-wrapper" id="projects">
      {/* Section Header above the horizontal carousel */}
      <div className="projects-carousel-header container">
        <span className="section-eyebrow">     </span>
        <h2 className="projects-heading">Featured Projects</h2>
        <p className="projects-subheading">Scroll down to explore my work</p>
      </div>

      {/* Interactive Sticky Scroll Carousel */}
      <section ref={targetRef} className="projects-scroll-carousel-section">
        <div className="projects-scroll-carousel-sticky">
          <motion.div style={{ x }} className="projects-scroll-carousel-track">
            {projects.map((proj) => {
              const CardIcon = proj.icon || FaCode
              return (
                <div key={proj.id} className="scroll-project-card">
                  {/* Card Media Header */}
                  <div className="card-media-box">
                    {proj.image ? (
                      <img src={proj.image} alt={proj.title} className="project-card-image" />
                    ) : (
                      <div className="project-card-placeholder">
                        <div className="placeholder-pattern" />
                        <CardIcon className="placeholder-center-icon" />
                        <span className="placeholder-watermark-text">{proj.title}</span>
                      </div>
                    )}
                    <div className="card-media-overlay" />
                    <span className="card-category-badge">{proj.category}</span>
                  </div>

                  {/* Card Content Body */}
                  <div className="card-content-body">
                    <h3>{proj.title}</h3>
                    <p>{proj.description}</p>

                    <div className="tech-tags-list">
                      {proj.technologies.map((tech) => (
                        <span key={tech} className="tech-card-badge">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="project-action-links">
                      {proj.links.github && (
                        proj.links.github.startsWith('http') ? (
                          <a
                            href={proj.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="action-link-btn code-btn"
                          >
                            <FaGithub /> <span>Code</span>
                          </a>
                        ) : (
                          <Link to={proj.links.github} className="action-link-btn code-btn">
                            <FaGithub /> <span>Code</span>
                          </Link>
                        )
                      )}

                      {proj.links.demo && (
                        <a
                          href={proj.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="action-link-btn demo-btn"
                        >
                          <FaExternalLinkAlt /> <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ProjectsSection