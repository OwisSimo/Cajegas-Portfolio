import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import ComingSoon from './components/common/ComingSoon'
import './styles/App.css'

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
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App