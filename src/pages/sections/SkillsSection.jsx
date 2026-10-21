import { motion, useMotionValue, useTransform, useSpring } from 'motion/react'
import { Box, Heading } from '@chakra-ui/react'
import { useTheme } from '../../context/ThemeContext'
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
import '../../styles/skills.css'

// Official Bubble.io vector mark (.b with signature blue dot)
const SiBubble = (props) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 100 100"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Signature blue dot */}
    <circle cx="18" cy="73" r="7" fill="#0066ff" />
    {/* Geometric 'b' character */}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M 39 12 h 10 v 28 A 25 25 0 1 1 49 80 h -10 Z M 64 45 A 15 15 0 1 0 64 75 A 15 15 0 1 0 64 45 Z"
      fill="currentColor"
    />
  </svg>
)

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
  { name: 'Bubble.io', icon: SiBubble },
]

const MotionBox = motion.create(Box)
const MotionHeading = motion.create(Heading)

const TiltCard = ({ skill }) => {
  const IconComponent = skill.icon
  const { isDark } = useTheme()

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

  // Use theme-aware colors so Framer Motion inline styles always match the active theme
  const baseBg = isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff'
  const hoverBg = isDark ? 'rgba(255, 255, 255, 0.08)' : '#f1f5f9'
  const baseShadow = '0 4px 15px var(--shadow)'

  return (
    <MotionBox
      className="skill-card-carousel"
      style={{
        rotateX,
        rotateY,
        transformPerspective: 600,
        transformStyle: 'preserve-3d',
        backgroundColor: baseBg,
        boxShadow: baseShadow,
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{
        scale: 1.08,
        backgroundColor: hoverBg,
        borderColor: 'var(--color-muted-green)',
        boxShadow: isDark
          ? '0 0 20px rgba(98, 122, 92, 0.4), 0 0 30px rgba(98, 122, 92, 0.15)'
          : '0 8px 25px rgba(0, 0, 0, 0.08), 0 0 15px rgba(98, 122, 92, 0.2)',
      }}
      transition={{ duration: 0.2 }}
    >
      <Box as={IconComponent} className="skill-icon" />
      <Box as="span" className="skill-name">{skill.name}</Box>
    </MotionBox>
  )
}

const SkillsSection = () => {
  const duplicatedSkills = [...skills, ...skills, ...skills]

  return (
    <Box as="section" id="skills" className="skills section-zebra-light">
      <Box className="container">
        <Box className="section-content">
          <MotionHeading as="h2">Skills &amp; Technologies</MotionHeading>
          <Box className="skills-carousel-container">
            <Box className="skills-carousel">
              {duplicatedSkills.map((skill, index) => (
                <TiltCard key={`${skill.name}-${index}`} skill={skill} />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default SkillsSection