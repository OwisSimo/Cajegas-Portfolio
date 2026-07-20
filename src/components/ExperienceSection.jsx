import { motion } from 'motion/react'
import { FaClock } from 'react-icons/fa'
import { Box, Badge } from '@chakra-ui/react'

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

          <Box className="experience-coming-soon-card">
            <motion.div
              className="coming-soon-icon-wrapper"
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            >
              <FaClock className="coming-soon-icon" />
            </motion.div>

            <Badge
              bg="rgba(98, 122, 92, 0.18)"
              color="var(--color-muted-green)"
              border="1px solid rgba(98, 122, 92, 0.4)"
              px={3}
              py={1}
              borderRadius="full"
              fontSize="0.75rem"
              fontWeight="600"
              letterSpacing="1px"
              textTransform="uppercase"
            >
              In Progress
            </Badge>

            <h3 className="coming-soon-title">Coming Soon</h3>
            <p className="coming-soon-text">
              Detailed work history, professional milestones, and technical achievements will be published here soon.
            </p>
          </Box>
        </motion.div>
      </div>
    </section>
  )
}

export default ExperienceSection
