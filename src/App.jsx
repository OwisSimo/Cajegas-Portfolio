import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import ProjectsSection from './components/ProjectsSection'
import ExperienceSection from './components/ExperienceSection'
import CertificatesSection from './components/CertificatesSection'
import ContactSection from './components/ContactSection'
import BackToTop from './components/BackToTop'
import Footer from './components/Footer'
import ComingSoon from './pages/ComingSoon'
import './App.css'

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