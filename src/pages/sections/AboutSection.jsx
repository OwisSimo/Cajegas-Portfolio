import { motion } from 'motion/react'
import { Box, Heading, Text, Image } from '@chakra-ui/react'
import owislandscape from '../../assets/Profile/owislandscape.webp'
import { FaCode, FaPalette, FaFileAlt, FaMagic } from 'react-icons/fa'
import '../../styles/about.css'

const MotionBox = motion.create(Box)
const MotionHeading = motion.create(Heading)
const MotionText = motion.create(Text)

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
    <Box as="section" id="about" className="about-section" style={{ flexDirection: 'column', justifyContent: 'center' }}>
      {/* Full-width Landscape Background Image (owislandscape.webp ONLY) */}
      <Box className="about-landscape-bg">
        <Image src={owislandscape} alt="John Laurence Cajegas" className="about-landscape-img" />
        <Box className="about-landscape-overlay" />
      </Box>

      {/* Centered Heading */}
      <Box className="container">
        <Box className="section-content" style={{ padding: '0px', position: 'relative', zIndex: 10 }}>
          <MotionHeading as="h2" style={{ color: '#ffffff' }} mb="20px !important">About Me</MotionHeading>
        </Box>
      </Box>

      <Box className="container about-container">
        <MotionBox
          className="about-left-text-block"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Eyebrow Accent Label */}
          <MotionBox className="about-eyebrow" variants={itemVariants}>
            <Box as="span" className="eyebrow-dot" />
            <Box as="span" className="eyebrow-text">DISCOVER MY STORY</Box>
          </MotionBox>

          {/* Paragraph List with Decorative Icons & Styled Highlights */}
          <Box className="about-paragraphs-wrapper">
            <MotionText as="p" className="about-paragraph highlight-lead" variants={itemVariants}>
              <Box as="span" className="paragraph-icon"><FaCode size={16} /></Box>
              <Box as="span">
                I'm a <Box as="strong" className="text-tag">4+ Years Experienced</Box> Frontend Developer with a strong eye for detail, focused on building clean, responsive, and visually engaging web interfaces that deliver seamless user experiences across all devices.
              </Box>
            </MotionText>

            <MotionText as="p" className="about-paragraph" variants={itemVariants}>
              <Box as="span" className="paragraph-icon"><FaPalette size={16} /></Box>
              <Box as="span">
                As a <Box as="strong" className="text-tag">UI/UX Designer</Box>, I bridge the gap between functionality and aesthetics — crafting intuitive layouts and design systems that put the user first, from wireframes to polished, pixel-perfect prototypes.
              </Box>
            </MotionText>

            <MotionText as="p" className="about-paragraph" variants={itemVariants}>
              <Box as="span" className="paragraph-icon"><FaFileAlt size={16} /></Box>
              <Box as="span">
                I also work as a <Box as="strong" className="text-tag">Technical Writer</Box>, translating complex technical concepts into clear, structured, and accessible documentation for both developers and end-users alike.
              </Box>
            </MotionText>
          </Box>

          {/* Styled Pill Badge */}
          <MotionBox className="about-experience-badge" variants={itemVariants}>
            <FaMagic className="badge-sparkle-icon" size={14} />
            <Box as="span" className="badge-num">4+ YEARS</Box>
            <Box as="span" className="badge-sep">•</Box>
            <Box as="span" className="badge-sub">of Experience & Passion</Box>
          </MotionBox>
        </MotionBox>
      </Box>
    </Box>
  )
}

export default AboutSection