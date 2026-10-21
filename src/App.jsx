import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, lazy, Suspense } from 'react'
import { AnimatePresence } from 'motion/react'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/layout/Navbar'
import HeroSection from './pages/sections/HeroSection'
import AboutSection from './pages/sections/AboutSection'
import SkillsSection from './pages/sections/SkillsSection'
import ProjectsSection from './pages/sections/ProjectsSection'
import ExperienceSection from './pages/sections/ExperienceSection'
import CertificatesSection from './pages/sections/CertificatesSection'
import ContactSection from './pages/sections/ContactSection'
import BackToTop from './components/ui/BackToTop'
import Footer from './components/layout/Footer'
import LoadingScreen from './components/common/LoadingScreen'
import './styles/App.css'

const ComingSoon = lazy(() => import('./components/common/ComingSoon'))

const Home = () => (
  <div className="app">
    <Navbar />
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ProjectsSection />
    <ExperienceSection />
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
              <Route
                path="/coming-soon"
                element={
                  <Suspense fallback={null}>
                    <ComingSoon />
                  </Suspense>
                }
              />
            </Routes>
          </BrowserRouter>
        )}
      </AnimatePresence>
    </ThemeProvider>
  )
}

export default App