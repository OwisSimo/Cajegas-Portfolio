import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'motion/react'
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Button,
  Badge,
  HStack,
  VStack,
  Circle,
} from '@chakra-ui/react'
import { useTypingEffect } from '../hooks/useTypingEffect'
import { FaVolumeUp, FaVolumeMute, FaDownload, FaArrowRight, FaStar } from 'react-icons/fa'
import { useRef, useState, useEffect } from 'react'
import arrowDown from '../assets/AssetsImages/ArrowDown.webp'

// Create motion-wrapped Chakra UI components
const MotionBox = motion.create(Box)
const MotionFlex = motion.create(Flex)
const MotionHeading = motion.create(Heading)
const MotionText = motion.create(Text)
const MotionButton = motion.create(Button)
const MotionBadge = motion.create(Badge)

const floatingParticles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: Math.random() * 6 + 2,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 6 + 4,
  delay: Math.random() * 4,
}))

const useTilt = () => {
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const springTiltX = useSpring(tiltX, { stiffness: 150, damping: 20 })
  const springTiltY = useSpring(tiltY, { stiffness: 150, damping: 20 })
  const rotateX = useTransform(springTiltY, [-0.5, 0.5], ['15deg', '-15deg'])
  const rotateY = useTransform(springTiltX, [-0.5, 0.5], ['-15deg', '15deg'])

  const onMouseMove = (e) => {
    const el = e.currentTarget
    if (!el) return
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

  return { rotateX, rotateY, onMouseMove, onMouseLeave }
}

const HeroSection = () => {
  const animatedName = useTypingEffect(['John Laurence', 'Juanito', 'Owis'], 100, 2000, 50)
  const sectionRef = useRef(null)
  const ctaTilt = useTilt()
  const cvTilt = useTilt()
  const [ripples, setRipples] = useState([])

  // Audio state
  const audioRef = useRef(null)
  const [isMuted, setIsMuted] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const isMutedRef = useRef(false)

  useEffect(() => {
    audioRef.current = new Audio('/C418 - Subwoofer Lullaby - Minecraft Volume Alpha.mp3')
    audioRef.current.loop = true
    audioRef.current.volume = 0.3

    const playOnFirstInteract = () => {
      if (!isMutedRef.current) {
        audioRef.current?.play().catch(() => {})
      }
      document.removeEventListener('click', playOnFirstInteract)
      document.removeEventListener('keydown', playOnFirstInteract)
      document.removeEventListener('touchstart', playOnFirstInteract)
    }

    audioRef.current.play().catch(() => {
      setIsMuted(true)
      isMutedRef.current = true
      document.addEventListener('click', playOnFirstInteract)
      document.addEventListener('keydown', playOnFirstInteract)
      document.addEventListener('touchstart', playOnFirstInteract)
    })

    return () => {
      audioRef.current?.pause()
      audioRef.current = null
      document.removeEventListener('click', playOnFirstInteract)
      document.removeEventListener('keydown', playOnFirstInteract)
      document.removeEventListener('touchstart', playOnFirstInteract)
    }
  }, [])

  const toggleMusic = () => {
    if (!hasInteracted) setHasInteracted(true)
    if (isMutedRef.current) {
      audioRef.current?.play().catch(() => {})
      setIsMuted(false)
      isMutedRef.current = false
    } else {
      audioRef.current?.pause()
      setIsMuted(true)
      isMutedRef.current = true
    }
  }

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 800, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 800, damping: 30 })

  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const handleClick = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()
    setRipples((prev) => [...prev, { id, x, y }])
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id))
    }, 800)
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navHeight = 70
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - navHeight
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const scrollToProjects = () => scrollToSection('projects')

  const scrollToAbout = () => scrollToSection('about')

  return (
    <Box
      as="section"
      id="hero"
      className="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      position="relative"
      overflow="hidden"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="full"
    >
      {/* Music Toggle Floating Action Button */}
      <MotionButton
        className="music-toggle"
        onClick={(e) => {
          e.stopPropagation()
          toggleMusic()
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        title={isMuted ? 'Play music' : 'Mute music'}
        aria-label={isMuted ? 'Play music' : 'Mute music'}
      >
        <MotionBox
          className="music-icon-wrapper"
          animate={!isMuted ? { rotate: [0, 10, -10, 0] } : { rotate: 0 }}
          transition={{ duration: 0.5, repeat: !isMuted ? Infinity : 0, repeatDelay: 1 }}
        >
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </MotionBox>
        {!isMuted && (
          <Box as="span" className="music-bars">
            <Box as="span" className="bar" />
            <Box as="span" className="bar" />
            <Box as="span" className="bar" />
          </Box>
        )}
      </MotionButton>

      {/* Mouse Spotlight */}
      <MotionBox
        className="hero-spotlight"
        style={{ left: springX, top: springY }}
      />

      {/* Click Ripples */}
      <AnimatePresence>
        {ripples.map((r) => (
          <MotionBox
            key={r.id}
            className="hero-ripple"
            style={{ left: r.x, top: r.y }}
            initial={{ width: 0, height: 0, opacity: 0.6 }}
            animate={{ width: 300, height: 300, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>

      {/* Grid Background & Glow Orbs */}
      <Box className="hero-grid" />
      <Box className="hero-orb hero-orb-1" />
      <Box className="hero-orb hero-orb-2" />
      <Box className="hero-orb hero-orb-3" />

      {/* Floating Background Particles */}
      <Box className="hero-particles">
        {floatingParticles.map((p) => (
          <MotionBox
            key={p.id}
            className="particle"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </Box>

      {/* Centered Main Hero Container */}
      <Container
        maxW="1200px"
        px={{ base: 4, sm: 6, md: 8 }}
        pt={{ base: "110px", md: "130px" }}
        pb={{ base: "80px", md: "100px" }}
        zIndex={2}
        position="relative"
      >
        <MotionFlex
          direction="column"
          align="center"
          justify="center"
          textAlign="center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <VStack align="center" textAlign="center" gap={{ base: 4, md: 6 }} maxW="850px" mx="auto">
            
            {/* Available for Work Status Badge */}
            <MotionBadge
              className="hero-badge"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              px={4}
              py={2}
              borderRadius="full"
              display="inline-flex"
              alignItems="center"
              gap={2}
              mx="auto"
            >
              <Circle size="8px" bg="var(--color-muted-green)" className="badge-dot" />
              <HStack gap={1.5}>
                <FaStar style={{ fontSize: '0.75rem', color: 'var(--color-muted-green)' }} />
                <Text as="span" fontSize="sm" fontWeight="600" color="whiteAlpha.900">
                  Available for work
                </Text>
              </HStack>
            </MotionBadge>

            {/* Greetings & Animated Name Header */}
            <VStack align="center" gap={1} w="full">
              <Text
                as="h1"
                className="hero-greeting"
                fontSize={{ base: 'xl', md: '2xl' }}
                fontWeight="500"
                color="whiteAlpha.900"
                mb={1}
                textAlign="center"
              >
                Hi, I'm
              </Text>
              <Heading
                as="h2"
                className="hero-name"
                fontSize={{ base: '2.5rem', sm: '3.8rem', md: '4.8rem', lg: '5.5rem' }}
                fontWeight="800"
                lineHeight="1.1"
                letterSpacing="-0.02em"
                color="var(--color-off-white, #fcfcfc)"
                minH={{ base: "65px", sm: "85px", md: "105px" }}
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                w="full"
                textAlign="center"
              >
                {animatedName}
                <Box as="span" className="cursor" color="var(--color-muted-green)">
                  |
                </Box>
              </Heading>
            </VStack>

            {/* Description Tagline */}
            <Text
              className="hero-tagline"
              fontSize={{ base: 'md', sm: 'lg', md: 'xl' }}
              color="whiteAlpha.800"
              maxW="600px"
              lineHeight="1.6"
              textAlign="center"
              mx="auto"
            >
              Front-End Developer & Designer passionate about creating clean, highly interactive, and visually engaging web experiences.
            </Text>

            {/* Call To Action Buttons */}
            <HStack gap={{ base: 4, md: 6 }} pt={2} flexWrap="wrap" justify="center" align="center" w="full">
              <MotionButton
                className="cta-button"
                onClick={(e) => {
                  e.stopPropagation()
                  scrollToProjects()
                }}
                onMouseMove={ctaTilt.onMouseMove}
                onMouseLeave={ctaTilt.onMouseLeave}
                style={{
                  rotateX: ctaTilt.rotateX,
                  rotateY: ctaTilt.rotateY,
                  transformPerspective: 600,
                }}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                display="inline-flex"
                alignItems="center"
                gap={2}
              >
                <Text as="span">View My Work</Text>
                <FaArrowRight />
              </MotionButton>

              <MotionButton
                as="a"
                href="/Cajegas Resume.pdf"
                download="John_Laurence_Cajegas_CV.pdf"
                className="cv-button"
                onMouseMove={cvTilt.onMouseMove}
                onMouseLeave={cvTilt.onMouseLeave}
                style={{
                  rotateX: cvTilt.rotateX,
                  rotateY: cvTilt.rotateY,
                  transformPerspective: 600,
                }}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                display="inline-flex"
                alignItems="center"
                gap={2}
              >
                <FaDownload />
                <Text as="span">Download CV</Text>
              </MotionButton>
            </HStack>

            {/* Bouncing Scroll Down Arrow (Transparent & Enlarged) */}
            <MotionButton
              className="scroll-indicator-button"
              onClick={(e) => {
                e.stopPropagation()
                scrollToAbout()
              }}
              mt={{ base: 6, md: 9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 10, 0] }}
              transition={{
                y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
                opacity: { duration: 0.5 }
              }}
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Scroll to About section"
              title="Scroll down"
              bg="transparent"
              _hover={{ bg: "transparent" }}
              _active={{ bg: "transparent" }}
              p={0}
              h="auto"
              minW="auto"
            >
              <Box
                as="img"
                src={arrowDown}
                alt="Scroll down"
                className="scroll-arrow-img"
                w={{ base: "42px", sm: "48px", md: "54px" }}
                h="auto"
                filter="drop-shadow(0 4px 12px rgba(0, 0, 0, 0.6))"
              />
            </MotionButton>

          </VStack>
        </MotionFlex>
      </Container>
    </Box>
  )
}

export default HeroSection