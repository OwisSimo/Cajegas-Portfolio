import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="footer-content">
        <p className="footer-text">
          © 2026 <span className="footer-name">John Laurence Cajegas</span>
        </p>
      </div>
    </motion.footer>
  )
}

export default Footer