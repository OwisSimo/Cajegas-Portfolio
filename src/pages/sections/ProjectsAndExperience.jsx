import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'
import { Box } from '@chakra-ui/react'
import ProjectsSection from './ProjectsSection'
import ExperienceSection from './ExperienceSection'

const MotionBox = motion.create(Box)

const ProjectsAndExperience = () => {
  const containerRef = useRef(null)
  const [filter, setFilter] = useState('All')
  const [maxScroll, setMaxScroll] = useState(1000)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Smooth scroll progression using spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 25,
    restDelta: 0.001
  })

  // Recalculate max horizontal scroll distance based on track width vs viewport width
  useEffect(() => {
    const handleRecalculate = () => {
      const track = document.querySelector('.projects-track-inner')
      if (track) {
        const trackWidth = track.scrollWidth
        const viewportWidth = window.innerWidth
        // Calculate the maximum translate distance so the last card aligns exactly
        const scrollDistance = Math.max(0, trackWidth - viewportWidth)
        setMaxScroll(scrollDistance)
      }
    }

    // Run calculation after DOM renders and whenever filter or window size changes
    const timer = setTimeout(handleRecalculate, 150)
    window.addEventListener('resize', handleRecalculate)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleRecalculate)
    }
  }, [filter])

  // Phase 1: Horizontal scrolling of Projects (from scroll 0.0 to 0.7)
  const projectsX = useTransform(smoothProgress, [0, 0.7], [0, -maxScroll])

  // Phase 2: Page transition (from scroll 0.7 to 0.9)
  // Projects container (on top) slides left and fades out
  const projectsContainerX = useTransform(smoothProgress, [0.7, 0.9], ['0vw', '-100vw'])
  const projectsOpacity = useTransform(smoothProgress, [0.7, 0.88], [1, 0])

  // Experience container (underneath) fades in as Projects slides away
  const experienceOpacity = useTransform(smoothProgress, [0.7, 0.9], [0, 1])

  return (
    <Box ref={containerRef} id="projects" style={{ position: 'relative', height: '420vh' }}>
      {/* Scroll anchor for Experience reveal alignment */}
      <div id="experience" style={{ position: 'absolute', top: '78%', left: 0, height: '1px', width: '1px', pointerEvents: 'none' }} />
      <Box style={{ position: 'sticky', top: 0, height: '100vh', width: '100vw', overflow: 'hidden' }}>
        {/* Experience Layer (Underneath) */}
        <MotionBox
          style={{
            opacity: experienceOpacity,
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            width: '100%',
            height: '100%',
            overflowY: 'auto'
          }}
        >
          <ExperienceSection />
        </MotionBox>

        {/* Projects Layer (On Top) */}
        <MotionBox
          style={{
            x: projectsContainerX,
            opacity: projectsOpacity,
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            width: '100%',
            height: '100%'
          }}
        >
          <ProjectsSection x={projectsX} filter={filter} setFilter={setFilter} />
        </MotionBox>
      </Box>
    </Box>
  )
}

export default ProjectsAndExperience
