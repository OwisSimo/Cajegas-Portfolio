import { motion } from 'framer-motion'
import profileImg from '../assets/Profile.jpg'

const About = () => {
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

          {/* Right: Image + Badge */}
          <motion.div className="about-image-wrapper" variants={itemVariants}>
            <div className="about-image-frame">
              <div className="profile-container">
                <img
                  src={profileImg}
                  alt="John Laurence - Front-End Developer"
                  className="profile-img"
                />

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

export default About