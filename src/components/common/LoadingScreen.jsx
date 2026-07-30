import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import '../../styles/loading-screen.css'

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let currentProgress = 0
    // Dynamic progress ticking simulating resources loading
    const interval = setInterval(() => {
      const remaining = 100 - currentProgress
      // Increment faster at first, then slow down near the end
      let increment = 1
      if (remaining > 50) {
        increment = Math.floor(Math.random() * 12) + 6
      } else if (remaining > 15) {
        increment = Math.floor(Math.random() * 6) + 2
      } else {
        increment = Math.floor(Math.random() * 2) + 1
      }

      currentProgress = Math.min(currentProgress + increment, 100)
      setProgress(currentProgress)

      if (currentProgress >= 100) {
        clearInterval(interval)
        // Keep screen visible for a moment at 100%
        const delay = setTimeout(() => {
          onComplete()
        }, 500)
        return () => clearTimeout(delay)
      }
    }, 80)

    return () => clearInterval(interval)
  }, [onComplete])

  // Format progress to always show 3 characters (e.g. 000, 045, 100)
  const formatProgress = (num) => {
    if (num < 10) return `00${num}`
    if (num < 100) return `0${num}`
    return `${num}`
  }

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <motion.div
        className="loader-box-wrapper"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Monogram Box matching user reference layout */}
        <div className="loader-box">
          {/* Plus Sign Corner Markers */}
          <span className="corner-plus top-left">+</span>
          <span className="corner-plus top-right">+</span>
          <span className="corner-plus bottom-left">+</span>
          <span className="corner-plus bottom-right">+</span>

          {/* Styled Monogram Monospace/Outfit Logo */}
          <div className="loader-logo-container">
            <span className="loader-logo-text">JLC</span>
          </div>
        </div>

        {/* Motto Text below the monogram box */}
        <div className="loader-motto">
          i believe in magic
        </div>
      </motion.div>

      {/* Progress counter at the bottom center */}
      <div className="loader-counter">
        {formatProgress(progress)}
      </div>
    </motion.div>
  )
}

export default LoadingScreen
