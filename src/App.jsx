import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/layout/Navbar'
import HeroSection from './pages/sections/HeroSection'
import AboutSection from './pages/sections/AboutSection'
import SkillsSection from './pages/sections/SkillsSection'
import ProjectsAndExperience from './pages/sections/ProjectsAndExperience'
import CertificatesSection from './pages/sections/CertificatesSection'
import ContactSection from './pages/sections/ContactSection'
import BackToTop from './components/ui/BackToTop'
import Footer from './components/layout/Footer'
import ComingSoon from './components/common/ComingSoon'
import LoadingScreen from './components/common/LoadingScreen'
import './styles/App.css'

const Home = () => (
  <div className="app">
    <Navbar />
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ProjectsAndExperience />
    <CertificatesSection />
    <ContactSection />
    <BackToTop />
    <Footer />
  </div>
)

function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <BrowserRouter key="app-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/coming-soon" element={<ComingSoon />} />
            </Routes>
          </BrowserRouter>
        )}
      </AnimatePresence>
    </ThemeProvider>
  )
}

export default App