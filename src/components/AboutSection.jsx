import { motion } from 'motion/react'
import owis1 from '../assets/Profile/owis1.webp'
import owis2 from '../assets/Profile/owis2.webp'

const AboutSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  }

  return (
    <section id="about" className="about-section">
      {/* Background Image on Right with Theme-Aware Gradient Overlay */}
      <div className="about-bg-wrapper">
        <div className="about-img-container">
          <img src={owis2} alt="John Laurence Cajegas Dark" className="about-bg-img dark-img" />
          <img src={owis1} alt="John Laurence Cajegas Light" className="about-bg-img light-img" />
        </div>
        <div className="about-bg-overlay" />
      </div>

      <div className="container">
        <motion.div
          className="about-hero-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 className="about-hero-heading" variants={itemVariants}>
            About Me
          </motion.h2>

          <motion.p className="about-hero-text" variants={itemVariants}>
            I'm a <strong>4+ Years Experienced</strong> Frontend Developer with a strong eye for detail, focused on building
            clean, responsive, and visually engaging web interfaces that deliver
            seamless user experiences across all devices.
          </motion.p>

          <motion.p className="about-hero-text" variants={itemVariants}>
            As a <strong>UI/UX Designer</strong>, I bridge the gap between functionality and aesthetics —
            crafting intuitive layouts and design systems that put the user first,
            from wireframes to polished, pixel-perfect prototypes.
          </motion.p>

          <motion.p className="about-hero-text" variants={itemVariants}>
            I also work as a <strong>Technical Writer</strong>, translating complex technical concepts
            into clear, structured, and accessible documentation for both developers
            and end-users alike.
          </motion.p>

          {/* Experience Pill Badge */}
          <motion.div className="about-hero-badge" variants={itemVariants}>
            <span className="badge-highlight">4+ YEARS</span>
            <span className="badge-text">of Experience & Passion</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection