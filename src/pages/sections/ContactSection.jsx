import { motion } from 'motion/react'
import { FaGithub, FaFacebook, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { Box, Heading, Text } from '@chakra-ui/react'
import '../../styles/contact.css'

const MotionBox = motion.create(Box)
const MotionHeading = motion.create(Heading)
const MotionText = motion.create(Text)

const ContactSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  }

  const contactLinks = [
    { href: 'mailto:cajegasj5@gmail.com', icon: FaEnvelope, label: 'Email' },
    { href: 'https://github.com/OwisSimo', icon: FaGithub, label: 'GitHub' },
    { href: 'https://www.facebook.com/owizz0114/', icon: FaFacebook, label: 'Facebook' },
    { href: 'https://www.linkedin.com/in/john-laurence-cajegas-ba49153b7', icon: FaLinkedin, label: 'LinkedIn' },
  ]

  return (
    <Box as="section" id="contact" className="contact section-zebra-light">
      <Box className="container">
        <MotionBox
          className="section-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <MotionHeading as="h2" variants={itemVariants}>Get In Touch</MotionHeading>

          <MotionText className="contact-tagline" variants={itemVariants}>
            Welcoming new opportunities and the thrill of exploration.
          </MotionText>

          <MotionBox className="contact-links" variants={itemVariants}>
            {contactLinks.map((link) => {
              const Icon = link.icon
              return (
                <MotionBox
                  as="a"
                  key={link.label}
                  href={link.href}
                  className="contact-link"
                  target={link.href.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  whileHover={{
                    y: -4,
                    borderColor: 'var(--color-muted-green)',
                    boxShadow: '0 0 20px rgba(98, 122, 92, 0.5), 0 0 40px rgba(98, 122, 92, 0.2)',
                    backgroundColor: 'rgba(98, 122, 92, 0.12)',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon />
                  <Box as="span">{link.label}</Box>
                </MotionBox>
              )
            })}
          </MotionBox>

        </MotionBox>
      </Box>
    </Box>
  )
}

export default ContactSection