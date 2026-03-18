import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaFigma,
  FaLaravel,
  FaGithub,
  FaBolt,
} from 'react-icons/fa'

const skills = [
  { name: 'HTML5', icon: FaHtml5 },
  { name: 'CSS3', icon: FaCss3Alt },
  { name: 'JavaScript', icon: FaJs },
  { name: 'React', icon: FaReact },
  { name: 'Node.js', icon: FaNodeJs },
  { name: 'Git', icon: FaGitAlt },
  { name: 'GitHub', icon: FaGithub },
  { name: 'Vite', icon: FaBolt },
  { name: 'Figma', icon: FaFigma },
  { name: 'Laravel', icon: FaLaravel },
]

const TiltCard = ({ skill }) => {
  const IconComponent = skill.icon
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const springTiltX = useSpring(tiltX, { stiffness: 150, damping: 20 })
  const springTiltY = useSpring(tiltY, { stiffness: 150, damping: 20 })
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
      className="skill-card-carousel"
      style={{
        rotateX,
        rotateY,
        transformPerspective: 600,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{
        scale: 1.08,
        borderColor: 'var(--color-muted-green)',
        boxShadow: '0 0 20px rgba(98, 122, 92, 0.5), 0 0 40px rgba(98, 122, 92, 0.2)',
        backgroundColor: 'rgba(98, 122, 92, 0.12)',
      }}
      transition={{ duration: 0.2 }}
    >
      <IconComponent className="skill-icon" />
      <span className="skill-name">{skill.name}</span>
    </motion.div>
  )
}

const Skills = () => {
  const duplicatedSkills = [...skills, ...skills, ...skills]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  return (
    <section id="skills" className="skills section-zebra-light">
      <div className="container">
        <motion.div
          className="section-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 variants={itemVariants}>Skills & Technologies</motion.h2>
          <div className="skills-carousel-container">
            <div className="skills-carousel">
              {duplicatedSkills.map((skill, index) => (
                <TiltCard key={`${skill.name}-${index}`} skill={skill} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills