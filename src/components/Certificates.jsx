import { motion, AnimatePresence } from 'framer-motion'
import { FaCertificate, FaExternalLinkAlt, FaTimes } from 'react-icons/fa'
import { useState } from 'react'

import NetworkSecurityCert from '../assets/Network-Security-Cert.jpg'
import DatabasesCert from '../assets/Databases-Cert.jpg'
import HtmlCssCert from '../assets/HTML-CSS-Cert.jpg'

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

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null)

  return (
    <section id="certificates" className="certificates section-zebra-light">
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
              <motion.div
                key={cert.title}
                className="cert-card"
                variants={itemVariants}
                onClick={() => setSelectedCert(cert)}
                whileHover={{
                  y: -8,
                  borderColor: 'var(--color-muted-green)',
                  boxShadow: '0 0 20px rgba(98, 122, 92, 0.5), 0 0 40px rgba(98, 122, 92, 0.2)',
                  backgroundColor: 'rgba(98, 122, 92, 0.08)',
                }}
                transition={{ duration: 0.3 }}
                style={{ cursor: 'pointer' }}
              >
                {/* Certificate Preview Image */}
                <div className="cert-preview">
                  <img src={cert.image} alt={cert.title} className="cert-preview-img" />
                  <div className="cert-preview-overlay">
                    <span>Click to view</span>
                  </div>
                </div>

                <div className="cert-header">
                  <div className="cert-icon">
                    <FaCertificate />
                  </div>
                  <div className="cert-meta">
                    <span className="cert-issuer">{cert.issuer}</span>
                    <span className="cert-date">{cert.date}</span>
                  </div>
                </div>
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-description">{cert.description}</p>
                <div className="cert-link">
                  <FaExternalLinkAlt />
                  <span>View Certificate</span>
                </div>
              </motion.div>
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

export default Certificates