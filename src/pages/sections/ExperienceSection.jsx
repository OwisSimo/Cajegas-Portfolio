import { motion } from 'motion/react'
import { FaCalendarAlt, FaCheckCircle, FaExternalLinkAlt, FaMobileAlt, FaLayerGroup } from 'react-icons/fa'
import { Box, Heading, Text, Badge, Image } from '@chakra-ui/react'
import infinityHubLogo from '../../assets/AssetsImages/Infinity hub logo.png'
import '../../styles/experience.css'

const experiences = [
  {
    id: 1,
    role: 'UI/UX & Frontend Developer Intern',
    company: 'Infinity Hub Marketing Agency',
    website: 'https://infinityhub.com/',
    logo: infinityHubLogo,
    period: 'OJT Practicum',
    type: 'Internship',
    summary:
      'Led the UI/UX redesign of the "ManPro Mobile" app, improving layout hierarchy, mobile workflows, and overall user engagement.',
    highlights: [
      'UI/UX Mobile Overhaul: Redesigned ManPro Mobile with responsive card layouts and modernized typography.',
      'PEME & KPI Modules: Restructured medical exam records, custom evaluation forms, and role-based tracking.',
      'Newsfeed & Onboarding: Built a dynamic newsfeed screen, mentor profiles, and seamless guest onboarding.',
      'Quality Assurance (QA): Conducted thorough QA testing across the mobile app to fix animation glitches and refine search box responsiveness.'
    ],
    techStack: ['UI/UX Design', 'Mobile UI', 'Frontend Development', 'Quality Assurance']
  }
]

const MotionBox = motion.create(Box)
const MotionHeading = motion.create(Heading)
const MotionText = motion.create(Text)

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
}

const tileVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

const ExperienceSection = () => {
  return (
    <Box as="section" className="experience section-zebra-light">
      <Box className="container">
        <MotionBox
          className="section-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <MotionHeading as="h2">Experience</MotionHeading>

          <Box className="bento-exp-container">
            {experiences.map((exp) => (
              <MotionBox
                key={exp.id}
                className="bento-exp-grid"
                variants={gridVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {/* Bento Block 1: Header & Branding */}
                <MotionBox
                  className="bento-card bento-header-card"
                  variants={tileVariants}
                  whileHover={{ y: -5, scale: 1.01 }}
                  transition={{ duration: 0.25 }}
                >
                  {exp.logo && (
                    <Box
                      as="a"
                      href={exp.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bento-logo-link"
                      title={`Visit ${exp.company}`}
                    >
                      <MotionBox
                        className="bento-logo-box"
                        whileHover={{ scale: 1.06, rotate: 1 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      >
                        <Image src={exp.logo} alt={exp.company} className="bento-logo-img" />
                      </MotionBox>
                    </Box>
                  )}
                  <Box className="bento-header-info">
                    <Box className="bento-title-block">
                      <Heading as="h3" className="bento-role">{exp.role}</Heading>
                      <Heading as="h4" className="bento-company">
                        {exp.website ? (
                          <Box
                            as="a"
                            href={exp.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="company-link"
                          >
                            {exp.company} <FaExternalLinkAlt className="external-link-icon" />
                          </Box>
                        ) : (
                          exp.company
                        )}
                      </Heading>
                    </Box>
                    <Box className="bento-meta">
                      <Badge className="experience-type-badge">{exp.type}</Badge>
                      <Box as="span" className="experience-period">
                        <FaCalendarAlt /> {exp.period}
                      </Box>
                    </Box>
                  </Box>
                </MotionBox>

                {/* Bento Block 2: Project Spotlight */}
                <MotionBox
                  className="bento-card bento-spotlight-card"
                  variants={tileVariants}
                  whileHover={{ y: -5, scale: 1.01 }}
                  transition={{ duration: 0.25 }}
                >
                  <Box className="bento-card-badge">
                    <FaMobileAlt /> Project Focus
                  </Box>
                  <Heading as="h4" className="bento-spotlight-title">ManPro Mobile System Redesign</Heading>
                  <Text className="bento-summary">{exp.summary}</Text>
                </MotionBox>

                {/* Bento Block 3: Key Contributions Grid */}
                <MotionBox
                  className="bento-card bento-highlights-card"
                  variants={tileVariants}
                  whileHover={{ y: -5, scale: 1.01 }}
                  transition={{ duration: 0.25 }}
                >
                  <Heading as="h5" className="highlights-title">Key Contributions & Deliverables</Heading>
                  <Box className="bento-highlights-grid">
                    {exp.highlights.map((item, idx) => {
                      const [title, desc] = item.split(': ')
                      return (
                        <MotionBox
                          key={idx}
                          className="bento-highlight-tile"
                          whileHover={{ scale: 1.03, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                          <Box className="bento-tile-icon">
                            <FaCheckCircle />
                          </Box>
                          <Box>
                            <Heading as="h6" className="bento-tile-title">{title}</Heading>
                            <Text className="bento-tile-desc">{desc}</Text>
                          </Box>
                        </MotionBox>
                      )
                    })}
                  </Box>
                </MotionBox>

                {/* Bento Block 4: Technologies & Core Skills */}
                <MotionBox
                  className="bento-card bento-tech-card"
                  variants={tileVariants}
                  whileHover={{ y: -5, scale: 1.01 }}
                  transition={{ duration: 0.25 }}
                >
                  <Box className="bento-card-badge">
                    <FaLayerGroup /> Core Competencies
                  </Box>
                  <Box className="bento-tech-grid">
                    {exp.techStack.map((tech, idx) => (
                      <MotionBox
                        as="span"
                        key={idx}
                        className="tech-chip"
                        whileHover={{ scale: 1.08, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 15 }}
                      >
                        {tech}
                      </MotionBox>
                    ))}
                  </Box>
                </MotionBox>
              </MotionBox>
            ))}
          </Box>
        </MotionBox>
      </Box>
    </Box>
  )
}

export default ExperienceSection
