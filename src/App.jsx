import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import BackToTop from './components/BackToTop'
import Footer from './components/Footer'
import ComingSoon from './pages/ComingSoon'
import './App.css'

const Home = () => (
  <div className="app">
    <Navbar />
    <Hero />
    <About />
    <Skills />
    <Projects />
    <Certificates />
    <Contact />
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