import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Box, Heading, Text, Badge, Image } from '@chakra-ui/react'
import {
  FaExternalLinkAlt,
  FaCheckCircle,
  FaGooglePlay,
  FaApple,
  FaCodeBranch,
  FaFolderOpen
} from 'react-icons/fa'
import {
  VscFiles,
  VscFileCode,
  VscMarkdown,
  VscJson,
  VscDeviceMobile,
  VscPass
} from 'react-icons/vsc'
import infinityHubLogo from '../../assets/AssetsImages/Infinity hub logo.png'
import '../../styles/experience.css'

const MotionBox = motion.create(Box)
const MotionHeading = motion.create(Heading)
const MotionText = motion.create(Text)

const files = [
  { id: 'Overview.md', label: 'Overview.md', icon: VscMarkdown, iconClass: 'file-icon-md' },
  { id: 'Contributions.tsx', label: 'Contributions.tsx', icon: VscFileCode, iconClass: 'file-icon-tsx' },
  { id: 'TechStack.json', label: 'TechStack.json', icon: VscJson, iconClass: 'file-icon-json' },
  { id: 'ManProMobile.preview', label: 'ManProMobile.preview', icon: VscDeviceMobile, iconClass: 'file-icon-preview' }
]

const contributions = [
  {
    id: 'mobile-overhaul',
    method: 'feat(mobile)',
    title: 'UI/UX Mobile Overhaul',
    desc: 'Redesigned ManPro Mobile with responsive card layouts and modernized typography.',
    tag: 'UI/UX Design',
    status: 'Shipped'
  },
  {
    id: 'peme-kpi',
    method: 'feat(modules)',
    title: 'PEME & KPI Modules',
    desc: 'Restructured medical exam records, custom evaluation forms, and role-based tracking.',
    tag: 'Frontend Dev',
    status: 'Shipped'
  },
  {
    id: 'newsfeed-onboarding',
    method: 'feat(feed)',
    title: 'Newsfeed & Onboarding',
    desc: 'Built a dynamic newsfeed screen, mentor profiles, and seamless guest onboarding.',
    tag: 'Mobile UI',
    status: 'Shipped'
  },
  {
    id: 'qa-polish',
    method: 'test(qa)',
    title: 'Quality Assurance (QA)',
    desc: 'Conducted thorough QA testing across the mobile app to fix animation glitches and refine search box responsiveness.',
    tag: 'QA Polish',
    status: 'Verified'
  }
]

const coreSkills = [
  'UI/UX Design',
  'Mobile UI',
  'Frontend Development',
  'Quality Assurance',
  'Figma',
  'Design Systems',
  'Responsive Layouts',
  'Cross-Device QA'
]

const ExperienceSection = () => {
  const [activeFile, setActiveFile] = useState('Overview.md')

  return (
    <Box as="section" id="experience" className="experience section-zebra-light">
      <Box className="container">
        <Box className="section-content">
          <MotionHeading
            as="h2"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Experience
          </MotionHeading>


          {/* Interactive IDE Workstation */}
          <MotionBox
            className="dev-workstation"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Titlebar */}
            <Box className="workstation-titlebar">
              <Box className="window-controls">
                <Box as="span" className="window-dot window-dot-red" />
                <Box as="span" className="window-dot window-dot-yellow" />
                <Box as="span" className="window-dot window-dot-green" />
              </Box>

              <Box className="window-title">
                <Box as="span">infinity-hub-practicum</Box>
                <Box as="span">/</Box>
                <Box as="span">src</Box>
                <Box as="span">/</Box>
                <Box as="span" className="window-title-accent">{activeFile}</Box>
              </Box>

              <Box className="window-meta">
                <Box className="git-badge">
                  <FaCodeBranch /> release/ojt-practicum
                </Box>
                <Box className="status-badge-verified">
                  <Box as="span" className="pulse-indicator" /> Verified
                </Box>
              </Box>
            </Box>

            {/* Split Workstation Body */}
            <Box className="workstation-body">
              {/* Left Sidebar (Explorer) */}
              <Box className="workstation-sidebar">
                <Box>
                  <Box className="explorer-header">
                    <VscFiles /> Workspace Explorer
                  </Box>

                  <Box className="explorer-folder">
                    <FaFolderOpen style={{ color: 'var(--color-muted-green)' }} /> infinity-hub/
                  </Box>

                  <Box className="explorer-files">
                    {files.map((file) => {
                      const Icon = file.icon
                      const isActive = activeFile === file.id
                      return (
                        <button
                          key={file.id}
                          className={`file-tree-btn ${isActive ? 'active' : ''}`}
                          onClick={() => setActiveFile(file.id)}
                        >
                          <Icon className={file.iconClass} />
                          <span>{file.label}</span>
                        </button>
                      )
                    })}
                  </Box>
                </Box>

                {/* Organization Card at Sidebar Bottom */}
                <Box className="sidebar-org-card">
                  <Box className="sidebar-org-logo-box">
                    <Image
                      src={infinityHubLogo}
                      alt="Infinity Hub Logo"
                      className="sidebar-org-logo"
                    />
                  </Box>
                  <Box className="sidebar-org-info">
                    <Text className="sidebar-org-name">Infinity Hub Agency</Text>
                    <Text className="sidebar-org-role">UI/UX & Frontend Intern</Text>
                    <Text className="sidebar-org-period">OJT Practicum</Text>
                    <Box
                      as="a"
                      href="https://infinityhub.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sidebar-org-link"
                    >
                      Visit Agency <FaExternalLinkAlt style={{ fontSize: '0.65rem' }} />
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Right Editor Canvas */}
              <Box className="workstation-editor">
                {/* Editor Tab Bar */}
                <Box className="editor-tabs-bar">
                  {files.map((file) => {
                    const Icon = file.icon
                    const isActive = activeFile === file.id
                    return (
                      <button
                        key={file.id}
                        className={`editor-tab-btn ${isActive ? 'active' : ''}`}
                        onClick={() => setActiveFile(file.id)}
                      >
                        <Icon className={file.iconClass} />
                        <span>{file.label}</span>
                      </button>
                    )
                  })}
                </Box>

                {/* Editor Content Area with Gutter */}
                <Box className="editor-canvas-wrapper">
                  <Box className="editor-gutter">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <span key={i}>{i + 1}</span>
                    ))}
                  </Box>

                  <Box className="editor-content-pane">
                    <AnimatePresence mode="wait">
                      {/* TAB 1: Overview.md */}
                      {activeFile === 'Overview.md' && (
                        <MotionBox
                          key="overview"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {/* Frontmatter meta box */}
                          <Box className="frontmatter-box">
                            <span className="frontmatter-line">---</span>
                            <span className="frontmatter-line">
                              <span className="frontmatter-key">role:</span> <span className="frontmatter-val">"UI/UX & Frontend Developer Intern"</span>
                            </span>
                            <span className="frontmatter-line">
                              <span className="frontmatter-key">company:</span> <span className="frontmatter-val">"Infinity Hub Marketing Agency"</span>
                            </span>
                            <span className="frontmatter-line">
                              <span className="frontmatter-key">program:</span> <span className="frontmatter-val">"OJT Practicum"</span>
                            </span>
                            <span className="frontmatter-line">
                              <span className="frontmatter-key">status:</span> <span className="frontmatter-val">"Completed & Verified"</span>
                            </span>
                            <span className="frontmatter-line">---</span>
                          </Box>

                          <Heading as="h3" className="doc-header-role">
                            UI/UX & Frontend Developer Intern
                          </Heading>

                          <Box className="doc-meta-pills">
                            <Box as="span" className="doc-pill doc-pill-accent">Infinity Hub</Box>
                            <Box as="span" className="doc-pill">OJT Practicum</Box>
                            <Box as="span" className="doc-pill">ManPro Mobile Focus</Box>
                          </Box>

                          <Box className="doc-quote-callout">
                            <Text className="doc-quote-text">
                              "Led the UI/UX redesign of the 'ManPro Mobile' payroll app, improving layout hierarchy, mobile workflows, and overall user engagement."
                            </Text>
                          </Box>

                          <Box className="doc-impact-grid">
                            <Box className="doc-impact-card">
                              <Heading as="h5" className="impact-card-title">
                                🎨 Mobile UI/UX Overhaul
                              </Heading>
                              <Text className="impact-card-desc">
                                Redesigned ManPro Mobile with responsive card layouts, modernized typography, and intuitive navigation patterns.
                              </Text>
                            </Box>

                            <Box className="doc-impact-card">
                              <Heading as="h5" className="impact-card-title">
                                📋 PEME & KPI Modules
                              </Heading>
                              <Text className="impact-card-desc">
                                Restructured medical exam records, custom evaluation forms, and role-based employee performance tracking.
                              </Text>
                            </Box>

                            <Box className="doc-impact-card">
                              <Heading as="h5" className="impact-card-title">
                                🚀 Newsfeed & Onboarding
                              </Heading>
                              <Text className="impact-card-desc">
                                Engineered a dynamic newsfeed screen, mentor profiles, and a streamlined onboarding flow for new users.
                              </Text>
                            </Box>

                            <Box className="doc-impact-card">
                              <Heading as="h5" className="impact-card-title">
                                🧪 Quality Assurance (QA)
                              </Heading>
                              <Text className="impact-card-desc">
                                Conducted rigorous QA testing across mobile viewports to eliminate animation glitches and optimize search responsiveness.
                              </Text>
                            </Box>
                          </Box>
                        </MotionBox>
                      )}

                      {/* TAB 2: Contributions.tsx */}
                      {activeFile === 'Contributions.tsx' && (
                        <MotionBox
                          key="contributions"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Box className="code-comment-header">
                            // Sprint Deliverables & Codebase Milestones (Infinity Hub)
                          </Box>

                          <Box className="contributions-list">
                            {contributions.map((item) => (
                              <MotionBox
                                key={item.id}
                                className="contribution-card"
                                whileHover={{ scale: 1.01 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Box className="contribution-header">
                                  <Box className="contribution-title-box">
                                    <VscPass className="contribution-icon" />
                                    <Heading as="h4" className="contribution-title">
                                      {item.title}
                                    </Heading>
                                  </Box>
                                  <Box display="flex" alignItems="center" gap="8px">
                                    <Box as="span" className="contribution-tag">
                                      {item.tag}
                                    </Box>
                                    <Badge colorScheme="green" variant="subtle" fontSize="0.7rem">
                                      {item.status}
                                    </Badge>
                                  </Box>
                                </Box>
                                <Text className="contribution-desc">
                                  {item.desc}
                                </Text>
                              </MotionBox>
                            ))}
                          </Box>
                        </MotionBox>
                      )}

                      {/* TAB 3: TechStack.json */}
                      {activeFile === 'TechStack.json' && (
                        <MotionBox
                          key="techstack"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Box className="json-viewer-box">
                            <span className="json-bracket">&#123;</span>
                            <br />
                            &nbsp;&nbsp;<span className="json-key">"role"</span>: <span className="json-string">"UI/UX & Frontend Developer Intern"</span>,
                            <br />
                            &nbsp;&nbsp;<span className="json-key">"organization"</span>: <span className="json-string">"Infinity Hub Marketing Agency"</span>,
                            <br />
                            &nbsp;&nbsp;<span className="json-key">"coreDomains"</span>: <span className="json-bracket">[</span>
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="json-string">"UI/UX Design"</span>,
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="json-string">"Mobile UI Hierarchy"</span>,
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="json-string">"Frontend Implementation"</span>,
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="json-string">"Quality Assurance & Testing"</span>
                            <br />
                            &nbsp;&nbsp;<span className="json-bracket">]</span>,
                            <br />
                            &nbsp;&nbsp;<span className="json-key">"primaryProject"</span>: <span className="json-string">"ManPro Mobile System Redesign"</span>,
                            <br />
                            &nbsp;&nbsp;<span className="json-key">"status"</span>: <span className="json-string">"100% Practicum Completed"</span>
                            <br />
                            <span className="json-bracket">&#125;</span>
                          </Box>

                          <Box className="tech-chips-tray">
                            {coreSkills.map((tech, idx) => (
                              <MotionBox
                                key={idx}
                                className="workstation-tech-chip"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {tech}
                              </MotionBox>
                            ))}
                          </Box>
                        </MotionBox>
                      )}

                      {/* TAB 4: ManProMobile.preview */}
                      {activeFile === 'ManProMobile.preview' && (
                        <MotionBox
                          key="preview"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Box className="preview-spotlight-card">
                            <Box className="preview-badge-row">
                              <Badge className="experience-type-badge">Primary Project</Badge>
                              <Badge colorScheme="green" variant="subtle">Infinity Hub Agency</Badge>
                            </Box>

                            <Heading as="h3" className="preview-title">
                              ManPro Mobile Payroll System
                            </Heading>

                            <Text className="preview-desc">
                              The centerpiece of my internship practicum at Infinity Hub. I overhauled the user interface and frontend workflows to optimize mobile experiences for enterprise payroll tracking, medical exam management, and employee evaluations.
                            </Text>

                            <Box className="preview-actions">
                              <Box
                                as="a"
                                href="https://play.google.com/store/apps/details?id=com.manpro_payroll_mobile&pcampaignid=web_share"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="preview-action-btn btn-primary"
                              >
                                <FaGooglePlay /> Google Play Store
                              </Box>

                              <Box
                                as="a"
                                href="https://apps.apple.com/ph/app/manpro/id6745999887"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="preview-action-btn btn-secondary"
                              >
                                <FaApple /> Apple App Store
                              </Box>

                              <Box
                                as="a"
                                href="https://infinityhub.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="preview-action-btn btn-secondary"
                              >
                                <FaExternalLinkAlt /> Infinity Hub
                              </Box>
                            </Box>
                          </Box>
                        </MotionBox>
                      )}
                    </AnimatePresence>
                  </Box>
                </Box>

                {/* Bottom Statusbar */}
                <Box className="workstation-statusbar">
                  <Box className="statusbar-left">
                    <Box as="span" className="statusbar-item">
                      <FaCodeBranch /> release/ojt-practicum
                    </Box>
                    <Box as="span" className="statusbar-item">
                      0 errors · 0 warnings
                    </Box>
                  </Box>

                  <Box className="statusbar-center">
                    <Box as="span" className="statusbar-item">TypeScript JSX</Box>
                    <Box as="span" className="statusbar-item">UTF-8</Box>
                    <Box as="span" className="statusbar-item">Prettier: ✓</Box>
                  </Box>

                  <Box className="statusbar-right">
                    <Box as="span" className="statusbar-item" style={{ color: 'var(--color-muted-green)' }}>
                      ● OJT Practicum: Completed
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </MotionBox>
        </Box>
      </Box>
    </Box>
  )
}

export default ExperienceSection
