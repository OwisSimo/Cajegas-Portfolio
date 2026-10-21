import { motion, AnimatePresence } from 'motion/react'
import {
  FaCertificate,
  FaCheckCircle,
  FaSearchPlus,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaShieldAlt,
  FaAward,
} from 'react-icons/fa'
import { useState, useEffect, useCallback } from 'react'
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
    id: 'net-sec',
    title: 'Network Security',
    issuer: 'Certiport',
    category: 'certiport',
    categoryLabel: 'Certiport IT Specialist',
    date: 'July 2025',
    credentialId: 'CP-NETSEC-2025',
    description: 'Certified in network security fundamentals covering threat detection, protection strategies, and secure network design.',
    skills: ['Cybersecurity', 'Network Defense', 'Threat Analysis', 'Protocols'],
    image: NetworkSecurityCert,
  },
  {
    id: 'html-css',
    title: 'HTML and CSS',
    issuer: 'Certiport',
    category: 'certiport',
    categoryLabel: 'Certiport IT Specialist',
    date: 'May 2024',
    credentialId: 'CP-HTMLCSS-2024',
    description: 'Certified in building structured, accessible, and visually styled web pages using modern HTML5 and CSS3 standards.',
    skills: ['HTML5', 'CSS3', 'Responsive Design', 'Web Accessibility'],
    image: HtmlCssCert,
  },
  {
    id: 'databases',
    title: 'Databases',
    issuer: 'Certiport',
    category: 'certiport',
    categoryLabel: 'Certiport IT Specialist',
    date: 'February 2024',
    credentialId: 'CP-DB-2024',
    description: 'Certified in database design, querying, and management including relational database concepts and SQL operations.',
    skills: ['SQL', 'Relational DB', 'Data Modeling', 'Database Normalization'],
    image: DatabasesCert,
  },
  {
    id: 'git-github',
    title: 'Version Control with Git & GitHub',
    issuer: 'Academic Training',
    category: 'technical',
    categoryLabel: 'Technical Training',
    date: 'July 2026',
    credentialId: 'AT-GIT-2026',
    description: 'Certified in version control fundamentals, repository management, branching, pull requests, and collaborative developer workflows.',
    skills: ['Git', 'GitHub', 'Branching & Merging', 'Team Collaboration'],
    image: GithubCert,
  },
  {
    id: 'js-essentials',
    title: 'JavaScript Essentials',
    issuer: 'Academic Training',
    category: 'technical',
    categoryLabel: 'Technical Training',
    date: 'July 2026',
    credentialId: 'AT-JS-2026',
    description: 'Certified in JavaScript essentials including data types, operators, control structures, functions, and object-oriented programming concepts.',
    skills: ['JavaScript ES6+', 'DOM APIs', 'Asynchronous JS', 'OOP'],
    image: JavascriptCert,
  },
  {
    id: 'innovative-culture',
    title: 'Innovative Culture in the Office',
    issuer: 'Seminar Series',
    category: 'seminar',
    categoryLabel: 'Professional Seminar',
    date: 'April 2026',
    credentialId: 'SS-INNOV-2026',
    description: 'Seminar completion on fostering innovation, creative problem-solving, and building modern workflow structures in the office.',
    skills: ['Creative Problem Solving', 'Modern Workflow', 'Agile Mindset'],
    image: InnovativeCultureCert,
  },
  {
    id: 'office-etiquette',
    title: 'Office Etiquette & Work Ethics',
    issuer: 'Seminar Series',
    category: 'seminar',
    categoryLabel: 'Professional Seminar',
    date: 'April 2026',
    credentialId: 'SS-ETIQ-2026',
    description: 'Seminar completion on corporate etiquette, professional standards, work ethics, and collaborative team communication.',
    skills: ['Professional Standards', 'Corporate Ethics', 'Communication'],
    image: OfficeEtiquetteCert,
  },
  {
    id: 'gender-sensitivity',
    title: 'Gender Sensitivity',
    issuer: 'Seminar Series',
    category: 'seminar',
    categoryLabel: 'Professional Seminar',
    date: 'April 2026',
    credentialId: 'SS-GEND-2026',
    description: 'Seminar completion on gender awareness, inclusivity, and maintaining a respectful and diverse workspace environment.',
    skills: ['Workplace Inclusivity', 'Diversity Awareness', 'Team Respect'],
    image: GenderSensitivityCert,
  },
  {
    id: 'attendance',
    title: 'Seminar Attendance & Completion',
    issuer: 'Seminar Series',
    category: 'seminar',
    categoryLabel: 'Professional Seminar',
    date: 'April 2026',
    credentialId: 'SS-ATTEND-2026',
    description: 'Seminar completion and participation certificate demonstrating professional development and career readiness.',
    skills: ['Professional Development', 'Career Readiness', 'Lifelong Learning'],
    image: AttendanceCert,
  }
]

const filterCategories = [
  { key: 'all', label: 'All Credentials', count: 9 },
  { key: 'certiport', label: 'Certiport IT Specialist', count: 3 },
  { key: 'technical', label: 'Developer Essentials', count: 2 },
  { key: 'seminar', label: 'Seminars & Workshops', count: 4 },
]

const MotionBox = motion.create(Box)
const MotionHeading = motion.create(Heading)

const CertificatesSection = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedCertIndex, setSelectedCertIndex] = useState(null)

  const filteredCertificates = certificates.filter((cert) => {
    if (activeCategory === 'all') return true
    return cert.category === activeCategory
  })

  const selectedCert = selectedCertIndex !== null ? certificates[selectedCertIndex] : null

  const handleNextCert = useCallback(() => {
    if (selectedCertIndex === null) return
    setSelectedCertIndex((prev) => (prev + 1) % certificates.length)
  }, [selectedCertIndex])

  const handlePrevCert = useCallback(() => {
    if (selectedCertIndex === null) return
    setSelectedCertIndex((prev) => (prev - 1 + certificates.length) % certificates.length)
  }, [selectedCertIndex])

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedCertIndex === null) return
      if (e.key === 'Escape') setSelectedCertIndex(null)
      if (e.key === 'ArrowRight') handleNextCert()
      if (e.key === 'ArrowLeft') handlePrevCert()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedCertIndex, handleNextCert, handlePrevCert])

  return (
    <Box as="section" id="certificates" className="certificates">
      <Box className="container">
        <Box className="section-content">
          {/* Section Header */}
          <MotionHeading
            as="h2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Certificates & Accreditations
          </MotionHeading>
          <Text className="certificates-subheading">
            Officially authenticated credentials in IT, software engineering, databases, and professional workplace standards.
          </Text>

          {/* Metrics & Credentials Summary Bar */}
          <MotionBox
            className="vault-stats-bar"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Box className="vault-stat-item">
              <Box className="vault-stat-icon-box">
                <FaCertificate />
              </Box>
              <Box>
                <Box className="vault-stat-num">9 Credentials</Box>
                <Box className="vault-stat-label">Archived & Verified</Box>
              </Box>
            </Box>

            <Box className="vault-stat-item">
              <Box className="vault-stat-icon-box">
                <FaShieldAlt />
              </Box>
              <Box>
                <Box className="vault-stat-num">3 Certiport</Box>
                <Box className="vault-stat-label">IT Specialist Certified</Box>
              </Box>
            </Box>

            <Box className="vault-stat-item">
              <Box className="vault-stat-icon-box">
                <FaAward />
              </Box>
              <Box>
                <Box className="vault-stat-num">2 Dev Tracks</Box>
                <Box className="vault-stat-label">Git & JavaScript</Box>
              </Box>
            </Box>

            <Box className="vault-stat-item">
              <Box className="vault-stat-icon-box">
                <FaCheckCircle style={{ color: '#72e06a' }} />
              </Box>
              <Box>
                <Box className="vault-stat-num" style={{ color: '#72e06a' }}>100% Authentic</Box>
                <Box className="vault-stat-label">Pearson VUE & Seminars</Box>
              </Box>
            </Box>
          </MotionBox>

          {/* Category Filter Pills */}
          <Box className="vault-filter-container">
            {filterCategories.map((category) => {
              const isActive = activeCategory === category.key

              return (
                <button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  className={`vault-filter-btn ${isActive ? 'active' : ''}`}
                >
                  {isActive && (
                    <motion.div
                      className="vault-filter-active-bg"
                      layoutId="vaultActiveFilterPill"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="vault-filter-label">{category.label}</span>
                  <span className="vault-filter-badge">{category.count}</span>
                </button>
              )
            })}
          </Box>

          {/* Credentials Vault Grid */}
          <MotionBox
            className="vault-credentials-grid"
            layout
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <AnimatePresence mode="popLayout">
              {filteredCertificates.map((cert) => {
                const certGlobalIndex = certificates.findIndex((c) => c.id === cert.id)

                return (
                  <MotionBox
                    key={cert.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="cert-vault-card"
                    onClick={() => setSelectedCertIndex(certGlobalIndex)}
                  >
                    {/* Museum Matting Frame with Uncropped Certificate */}
                    <Box className="cert-doc-frame">
                      {/* Floating Issuer Badge */}
                      <Box className="cert-issuer-badge">
                        {cert.issuer}
                      </Box>

                      {/* Verified Status Pill */}
                      <Box className="cert-verified-pill">
                        <span className="cert-verified-dot" />
                        <span>VERIFIED</span>
                      </Box>

                      {/* Matting Container */}
                      <Box className="cert-doc-matting">
                        <Image
                          src={cert.image}
                          alt={cert.title}
                          loading="lazy"
                          decoding="async"
                          className="cert-doc-img"
                        />
                      </Box>

                      {/* Hover Overlay with Inspect Chip */}
                      <Box className="cert-hover-overlay">
                        <span className="cert-inspect-chip">
                          <FaSearchPlus /> Quick Inspect
                        </span>
                      </Box>
                    </Box>

                    {/* Card Content Information (Neat, Uncovered Typography) */}
                    <Box className="cert-card-body">
                      <Box className="cert-meta-row">
                        <span className="cert-date-text">{cert.date}</span>
                        <span className="cert-id-tag">{cert.credentialId}</span>
                      </Box>

                      <Heading as="h4" className="cert-card-title">
                        {cert.title}
                      </Heading>

                      <Text className="cert-card-desc">
                        {cert.description}
                      </Text>

                      {/* Skills Covered */}
                      <Box className="cert-skill-chips">
                        {cert.skills.map((skill) => (
                          <span key={skill} className="cert-skill-chip">
                            {skill}
                          </span>
                        ))}
                      </Box>

                      {/* Card Action Link */}
                      <Box className="cert-card-action">
                        <span>Click to view certificate</span>
                        <FaSearchPlus style={{ fontSize: '0.85rem' }} />
                      </Box>
                    </Box>
                  </MotionBox>
                )
              })}
            </AnimatePresence>
          </MotionBox>
        </Box>
      </Box>

      {/* Interactive Lightbox Full-Screen Modal */}
      <AnimatePresence>
        {selectedCert && (
          <MotionBox
            className="vault-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCertIndex(null)}
          >
            <MotionBox
              className="vault-modal-container"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <Box className="vault-modal-header">
                <Box className="vault-modal-header-left">
                  <FaShieldAlt className="vault-modal-shield" />
                  <span className="vault-modal-heading-text">
                    VERIFIED CREDENTIAL ARCHIVE
                  </span>
                </Box>

                <Box className="vault-modal-header-right">
                  <span className="vault-modal-counter">
                    {selectedCertIndex + 1} of {certificates.length}
                  </span>
                  <button
                    className="vault-modal-close-btn"
                    onClick={() => setSelectedCertIndex(null)}
                    aria-label="Close certificate inspector"
                  >
                    <FaTimes />
                  </button>
                </Box>
              </Box>

              {/* Modal Stage (Uncropped Document Display with Nav Arrows) */}
              <Box className="vault-modal-stage">
                <button
                  className="vault-nav-btn vault-nav-prev"
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePrevCert()
                  }}
                  aria-label="Previous certificate"
                >
                  <FaChevronLeft />
                </button>

                <Box className="vault-modal-doc-wrapper">
                  <Image
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    decoding="async"
                    className="vault-modal-doc-img"
                  />
                </Box>

                <button
                  className="vault-nav-btn vault-nav-next"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleNextCert()
                  }}
                  aria-label="Next certificate"
                >
                  <FaChevronRight />
                </button>
              </Box>

              {/* Modal Bottom Drawer */}
              <Box className="vault-modal-info">
                <Box className="vault-modal-title-row">
                  <Heading as="h3" className="vault-modal-title">
                    {selectedCert.title}
                  </Heading>
                  <span className="vault-modal-meta">
                    {selectedCert.issuer} · {selectedCert.date} · {selectedCert.credentialId}
                  </span>
                </Box>

                <Text className="vault-modal-desc">
                  {selectedCert.description}
                </Text>

                <Box className="vault-modal-footer">
                  <Box className="vault-modal-skills">
                    {selectedCert.skills.map((skill) => (
                      <span key={skill} className="cert-skill-chip">
                        {skill}
                      </span>
                    ))}
                  </Box>
                  <span>Tip: Use ← → keys to navigate, Esc to close</span>
                </Box>
              </Box>
            </MotionBox>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  )
}

export default CertificatesSection