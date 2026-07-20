import { motion } from 'framer-motion'
import { FaGithub, FaFacebook, FaLinkedin, FaEnvelope } from 'react-icons/fa'

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
    <section id="contact" className="contact section-zebra-light">
      <div className="container">
        <motion.div
          className="section-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 variants={itemVariants}>Get In Touch</motion.h2>

          <motion.p className="contact-tagline" variants={itemVariants}>
            Welcoming new opportunities and the thrill of exploration.
          </motion.p>

          <motion.div className="contact-links" variants={itemVariants}>
            {contactLinks.map((link) => {
              const Icon = link.icon
              return (
                <motion.a
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
                  <span>{link.label}</span>
                </motion.a>
              )
            })}
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}

export default ContactSection