import { motion } from 'framer-motion'
import { FaClock } from 'react-icons/fa'

const ExperienceSection = () => {
  return (
    <section id="experience" className="experience section-zebra-light">
      <div className="container">
        <motion.div
          className="section-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2>Experience</h2>

          <div className="experience-coming-soon-card">
            <motion.div
              className="coming-soon-icon-wrapper"
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            >
              <FaClock className="coming-soon-icon" />
            </motion.div>
            <h3 className="coming-soon-title">Coming Soon</h3>
            <p className="coming-soon-text">
              Detailed work history, professional milestones, and technical achievements will be published here soon.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ExperienceSection
