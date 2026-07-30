import { motion } from 'motion/react'
import owislandscape from '../../assets/Profile/owislandscape.webp'
import { FaCode, FaPalette, FaFileAlt, FaMagic } from 'react-icons/fa'

const AboutSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  }

  return (
    <section id="about" className="about-section">
      {/* Full-width Landscape Background Image (owislandscape.webp ONLY) */}
      <div className="about-landscape-bg">
        <img src={owislandscape} alt="John Laurence Cajegas" className="about-landscape-img" />
        <div className="about-landscape-overlay" />
      </div>

      <div className="container about-container">
        <motion.div
          className="about-left-text-block"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Eyebrow Accent Label */}
          <motion.div className="about-eyebrow" variants={itemVariants}>
            <span className="eyebrow-dot" />
            <span className="eyebrow-text">DISCOVER MY STORY</span>
          </motion.div>

          {/* Heading with Accent Gradient */}
          <motion.h2 className="about-heading" variants={itemVariants}>
            About <span className="text-gradient-accent">Me</span>
          </motion.h2>

          {/* Paragraph List with Decorative Icons & Styled Highlights */}
          <div className="about-paragraphs-wrapper">
            <motion.p className="about-paragraph highlight-lead" variants={itemVariants}>
              <span className="paragraph-icon"><FaCode size={16} /></span>
              <span>
                I'm a <strong className="text-tag">4+ Years Experienced</strong> Frontend Developer with a strong eye for detail, focused on building clean, responsive, and visually engaging web interfaces that deliver seamless user experiences across all devices.
              </span>
            </motion.p>

            <motion.p className="about-paragraph" variants={itemVariants}>
              <span className="paragraph-icon"><FaPalette size={16} /></span>
              <span>
                As a <strong className="text-tag">UI/UX Designer</strong>, I bridge the gap between functionality and aesthetics — crafting intuitive layouts and design systems that put the user first, from wireframes to polished, pixel-perfect prototypes.
              </span>
            </motion.p>

            <motion.p className="about-paragraph" variants={itemVariants}>
              <span className="paragraph-icon"><FaFileAlt size={16} /></span>
              <span>
                I also work as a <strong className="text-tag">Technical Writer</strong>, translating complex technical concepts into clear, structured, and accessible documentation for both developers and end-users alike.
              </span>
            </motion.p>
          </div>

          {/* Styled Pill Badge */}
          <motion.div className="about-experience-badge" variants={itemVariants}>
            <FaMagic className="badge-sparkle-icon" size={14} />
            <span className="badge-num">4+ YEARS</span>
            <span className="badge-sep">•</span>
            <span className="badge-sub">of Experience & Passion</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection