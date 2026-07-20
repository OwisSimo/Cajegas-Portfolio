import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react'
import { FaCertificate, FaExternalLinkAlt, FaTimes } from 'react-icons/fa'
import { useState } from 'react'

import NetworkSecurityCert from '../assets/Certificates/Network-Security-Cert.webp'
import DatabasesCert from '../assets/Certificates/Databases-Cert.webp'
import HtmlCssCert from '../assets/Certificates/HTML-CSS-Cert.webp'

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
  }
]

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
    <motion.div
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
      <div className="cert-card-banner">
        <img src={cert.image} alt={cert.title} />
        <div className="cert-card-gradient" />
        <span className="cert-cat-badge">{cert.issuer}</span>
      </div>

      {/* Overlaid Title & Metadata Tags */}
      <div className="cert-card-overlay">
        <h4>{cert.title}</h4>
        <div className="cert-meta-tags">
          <span className="cert-badge-sm">{cert.date}</span>
          <span className="cert-badge-sm">{cert.issuer}</span>
        </div>
      </div>
    </motion.div>
  )
}

const CertificatesSection = () => {
  const [selectedCert, setSelectedCert] = useState(null)

  return (
    <section id="certificates" className="certificates section-zebra-dark">
      <div className="container">
        <motion.div
          className="section-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 variants={itemVariants}>Certificates</motion.h2>
          <motion.div className="certificates-grid" variants={itemVariants}>
            {certificates.map((cert) => (
              <TiltCertCard key={cert.title} cert={cert} onSelect={setSelectedCert} />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="cert-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              className="cert-modal"
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="cert-modal-img"
              />
              <div className="cert-modal-info">
                <span className="cert-modal-issuer">
                  {selectedCert.issuer} · {selectedCert.date}
                </span>
                <h3 className="cert-modal-title">{selectedCert.title}</h3>
                <p className="cert-modal-desc">{selectedCert.description}</p>
              </div>
              <button
                className="cert-modal-close"
                onClick={() => setSelectedCert(null)}
              >
                <FaTimes />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default CertificatesSection