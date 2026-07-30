import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react'
import { FaCertificate, FaExternalLinkAlt, FaTimes } from 'react-icons/fa'
import { useState } from 'react'
import { Box, Heading, Text, Image } from '@chakra-ui/react'

import NetworkSecurityCert from '../../assets/Certificates/Network-Security.webp'
import DatabasesCert from '../../assets/Certificates/Databases.webp'
import HtmlCssCert from '../../assets/Certificates/HTML-CSS.webp'
import AttendanceCert from '../../assets/Certificates/Attendance.webp'
import GenderSensitivityCert from '../../assets/Certificates/Gender-Sensitivity.webp'
import InnovativeCultureCert from '../../assets/Certificates/Innovative-Culture.webp'
import OfficeEtiquetteCert from '../../assets/Certificates/Office-Etiquette.webp'
import GithubCert from '../../assets/Certificates/Github.webp'
import JavascriptCert from '../../assets/Certificates/Javascript.webp'
import '../../styles/certificates.css'

const certificates = [
  {
    title: 'Network Security',
    issuer: 'Certiport',
    date: 'July 2025',
    description: 'Certified in network security fundamentals covering threat detection, protection strategies, and secure network design.',
    image: NetworkSecurityCert,
    link: '#'
  },
  {
    title: 'HTML and CSS',
    issuer: 'Certiport',
    date: 'May 2024',
    description: 'Certified in building structured, accessible, and visually styled web pages using modern HTML5 and CSS3 standards.',
    image: HtmlCssCert,
    link: '#'
  },
  {
    title: 'Databases',
    issuer: 'Certiport',
    date: 'February 2024',
    description: 'Certified in database design, querying, and management including relational database concepts and SQL operations.',
    image: DatabasesCert,
    link: '#'
  },
  {
    title: 'Version Control with Git & GitHub',
    issuer: 'Academic Training',
    date: 'July 2026',
    description: 'Certified in version control fundamentals, repository management, branching, pull requests, and collaborative developer workflows.',
    image: GithubCert,
    link: '#'
  },
  {
    title: 'JavaScript Essentials',
    issuer: 'Academic Training',
    date: 'July 2026',
    description: 'Certified in JavaScript essentials including data types, operators, control structures, functions, and object-oriented programming concepts.',
    image: JavascriptCert,
    link: '#'
  },
  {
    title: 'Innovative Culture in the Office',
    issuer: 'Seminar Series',
    date: 'April 2026',
    description: 'Seminar completion on fostering innovation, creative problem-solving, and building modern workflow structures in the office.',
    image: InnovativeCultureCert,
    link: '#'
  },
  {
    title: 'Office Etiquette & Work Ethics',
    issuer: 'Seminar Series',
    date: 'April 2026',
    description: 'Seminar completion on corporate etiquette, professional standards, work ethics, and collaborative team communication.',
    image: OfficeEtiquetteCert,
    link: '#'
  },
  {
    title: 'Gender Sensitivity',
    issuer: 'Seminar Series',
    date: 'April 2026',
    description: 'Seminar completion on gender awareness, inclusivity, and maintaining a respectful and diverse workspace environment.',
    image: GenderSensitivityCert,
    link: '#'
  },
  {
    title: 'Seminar Attendance & Completion',
    issuer: 'Seminar Series',
    date: 'April 2026',
    description: 'Seminar completion and participation certificate demonstrating professional development and career readiness.',
    image: AttendanceCert,
    link: '#'
  }
]

const MotionBox = motion.create(Box)
const MotionHeading = motion.create(Heading)
const MotionText = motion.create(Text)

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

const TiltCertCard = ({ cert, onSelect }) => {
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

  return (
    <MotionBox
      className="cert-mini-card"
      variants={itemVariants}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 600,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={() => onSelect(cert)}
      whileHover={{
        scale: 1.08,
        borderColor: 'var(--color-muted-green)',
        boxShadow: '0 0 20px rgba(98, 122, 92, 0.5), 0 0 40px rgba(98, 122, 92, 0.2)',
      }}
      transition={{ duration: 0.2 }}
      title="Click to view certificate"
    >
      {/* Full Background Banner & Certificate Image */}
      <Box className="cert-card-banner">
        <Image src={cert.image} alt={cert.title} />
        <Box className="cert-card-gradient" />
        <Box as="span" className="cert-cat-badge">{cert.issuer}</Box>
      </Box>

      {/* Overlaid Title & Metadata Tags */}
      <Box className="cert-card-overlay">
        <Heading as="h4">{cert.title}</Heading>
        <Box className="cert-meta-tags">
          <Box as="span" className="cert-badge-sm">{cert.date}</Box>
          <Box as="span" className="cert-badge-sm">{cert.issuer}</Box>
        </Box>
      </Box>
    </MotionBox>
  )
}

const CertificatesSection = () => {
  const [selectedCert, setSelectedCert] = useState(null)

  return (
    <Box as="section" id="certificates" className="certificates section-zebra-dark">
      <Box className="container">
        <MotionBox
          className="section-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <MotionHeading as="h2" variants={itemVariants}>Certificates</MotionHeading>
          <MotionBox className="certificates-grid" variants={itemVariants}>
            {certificates.map((cert) => (
              <TiltCertCard key={cert.title} cert={cert} onSelect={setSelectedCert} />
            ))}
          </MotionBox>
        </MotionBox>
      </Box>

      {/* Modal */}
      <AnimatePresence>
        {selectedCert && (
          <MotionBox
            className="cert-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            <MotionBox
              className="cert-modal"
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedCert.image}
                alt={selectedCert.title}
                className="cert-modal-img"
              />
              <Box className="cert-modal-info">
                <Box as="span" className="cert-modal-issuer">
                  {selectedCert.issuer} · {selectedCert.date}
                </Box>
                <Heading as="h3" className="cert-modal-title">{selectedCert.title}</Heading>
                <MotionText className="cert-modal-desc">{selectedCert.description}</MotionText>
              </Box>
              <Box
                as="button"
                className="cert-modal-close"
                onClick={() => setSelectedCert(null)}
              >
                <FaTimes />
              </Box>
            </MotionBox>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  )
}

export default CertificatesSection