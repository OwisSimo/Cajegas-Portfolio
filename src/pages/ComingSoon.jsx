import { motion } from 'motion/react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGithub, FaArrowLeft } from 'react-icons/fa'

const ComingSoon = () => {
  const navigate = useNavigate()

  const handleBack = (e) => {
    e.preventDefault()
    if (window.history.length > 2) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="coming-soon-page">
      <motion.div
        className="coming-soon-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Icon */}
        <motion.div
          className="coming-soon-icon"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
        >
          <FaGithub />
        </motion.div>

        {/* Text */}
        <motion.h1
          className="coming-soon-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Repository Coming Soon
        </motion.h1>

        <motion.p
          className="coming-soon-desc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          This project's source code will be made public soon.
          <br />
          Check back later or explore other projects in the meantime.
        </motion.p>

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ x: -4 }}
        >
          <Link to="/" onClick={handleBack} className="coming-soon-back">
            <FaArrowLeft /> Back to Portfolio
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ComingSoon