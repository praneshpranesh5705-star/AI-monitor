import { useState } from 'react'
import {
  BookOpen, Bot, ChartNoAxesColumnIncreasing, CheckCircle2, ChevronRight,
  CircleHelp, Code2, Compass, FolderKanban, GraduationCap, LayoutDashboard,
  Menu, MessageCircle, Plus, Search, Settings, Sparkles, Target, X
} from 'lucide-react'

type Page = 'Overview' | 'Learning paths' | 'My projects' | 'AI Mentor' | 'Settings'

const lessons = [
  { title: 'How websites work', detail: 'Understand browsers, servers and the web', time: '12 min', done: true },
  { title: 'HTML foundations', detail: 'Build the structure of your first page', time: '25 min', done: true },
  { title: 'CSS styling basics', detail: 'Add colour, spacing and layouts', time: '30 min', done: false },
  { title: 'Make it responsive', detail: 'Design for mobile, tablet and desktop', time: '20 min', done: false },
]

function App() {
  const [page, setPage] = useState<Page>('Overview')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [projects, setProjects] = useState(['My first website', 'AgriBot AI'])
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState<string[]>(['Hi! I’m your AI Mentor. Ask me anything about planning, designing or building a website.'])

  const nav = [
    { label: 'Overview' as Page, icon: LayoutDashboard },
    { label: 'Learning paths' as Page, icon: Compass },
    { label: 'My projects' as Page, icon: FolderKanban },
    { label: 'AI Mentor' as Page, icon: Bot },
    { label: 'Settings' as Page, icon: Settings },
  ]

  function askMentor() {
    const trimmed = question.trim()
    if (!trimmed) return
    setMessages(current => [...current, trimmed, 'This is a demo mentor response. Start by breaking your idea into small steps: define the goal, sketch the pages, choose your tools, then build and test one feature at a time.'])
    setQuestion('')
  }

  function createProject() {
    if (!projectName.trim()) return
    setProjects(current => [...current, projectName.trim()])
    setProjectName('')
    setShowCreate(false)
    setPage('My projects')
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        <div className="brand"><div className="brand-mark"><Code2 size={21}/></div><span>WebMentor<span className="brand-ai"> AI</span></span><button className="close-menu" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={19}/></button></div>
        <div className="workspace-label">WORKSPACE</div>
        <nav>{nav.map(item => { const Icon = item.icon; return <button key={item.label} className={`nav-item ${page === item.label ? 'active' : ''}`} onClick={() => { setPage(item.label); setMobileOpen(false) }}><Icon size={18}/><span>{item.label}</span>{item.label === 'AI Mentor' && <span className="new-dot"/>}</button> })}</nav>
        <div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><CircleHelp size={18}/></div><strong>Need a hand?</strong><p>Your next step is always easier with a little guidance.</p><button onClick={() => setPage('AI Mentor')}>Ask your mentor <ChevronRight size={15}/></button></div><div className="profile"><div className="avatar">P</div><div><strong>My workspace</strong><small>Free learner</small></div><Settings size={17}/></div></div>
      </aside>

      {mobileOpen && <button className="mobile-backdrop" onClick={() => setMobileOpen(false)} aria-label="Close navigation"/>}
      <main className="main-area">
        <header className="topbar"><button className="menu-button" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu/></button><div className="breadcrumb">Workspace <ChevronRight size={15}/> <strong>{page}</strong></div><div className="top-actions"><button className="icon-button" aria-label="Search"><Search size={18}/></button><div className="top-avatar">P</div></div></header>
        <div className="page-content">
          {page === 'Overview' && <>
            <div className="welcome-row"><div><div className="eyebrow"><Sparkles size={14}/> YOUR LEARNING SPACE</div><h1>Build something <span>great.</span></h1><p className="subheading">Learn the skills. Bring your ideas to life. One step at a time.</p></div><button className="primary-button" onClick={() => setPage('Learning paths')}><BookOpen size={17}/> Continue learning</button></div>
            <section className="stats-grid"><div className="stat-card"><div className="stat-icon purple"><Target/></div><div className="stat-label">Learning progress</div><div className="stat-value">35%</div><div className="stat-note">Keep your momentum going</div></div><div className="stat-card"><div className="stat-icon blue"><BookOpen/></div><div className="stat-label">Lessons completed</div><div className="stat-value">2 <small>/ 8</small></div><div className="stat-note">You're off to a good start</div></div><div className="stat-card"><div className="stat-icon orange"><FolderKanban/></div><div className="stat-label">Your projects</div><div className="stat-value">{projects.length}</div><div className="stat-note">Ideas becoming reality</div></div></section>
            <div className="content-grid"><section className="panel learning-panel"><div className="section-heading"><div><span className="eyebrow">PICK UP WHERE YOU LEFT OFF</span><h2>Your learning path</h2></div><button className="text-button" onClick={() => setPage('Learning paths')}>View all <ChevronRight size={15}/></button></div><div className="course-banner"><div className="course-art"><GraduationCap size={38}/><span>01</span></div><div className="course-info"><span className="course-tag">BEGINNER · WEB DEVELOPMENT</span><h3>Build your first website</h3><p>From your first HTML tag to a live website.</p><div className="progress-track"><span style={{width:'35%'}}/></div><small>2 of 8 lessons completed</small></div></div><div className="lesson-list">{lessons.slice(0,3).map((lesson,i)=><div className="lesson-row" key={lesson.title}><div className={`lesson-check ${lesson.done?'complete':''}`}>{lesson.done?<CheckCircle2 size={17}/>:i+1}</div><div className="lesson-copy"><strong>{lesson.title}</strong><small>{lesson.detail}</small></div><span className="lesson-time">{lesson.time}</span><ChevronRight size={16} className="muted-icon"/></div>)}</div></section>
            <section className="panel mentor-panel"><div className="mentor-orb"><Bot size={29}/><Sparkles size={15}/></div><span className="eyebrow">YOUR PERSONAL GUIDE</span><h2>Meet your AI Mentor</h2><p>Stuck on an idea or a line of code? Get friendly, step-by-step guidance whenever you need it.</p><button className="primary-button full-button" onClick={() => setPage('AI Mentor')}>Chat with mentor <ChevronRight size={16}/></button><div className="mentor-foot"><span className="online-dot"/> Ready to help you learn</div></section></div>
            <section className="panel projects-panel"><div className="section-heading"><div><span className="eyebrow">MAKE IT REAL</span><h2>Recent projects</h2></div><button className="text-button" onClick={() => setPage('My projects')}>All projects <ChevronRight size={15}/></button></div><div className="project-grid">{projects.slice(0,3).map((name,i)=><div className="project-card" key={name}><div className={`project-icon project-${i%3}`}><Code2 size={20}/></div><div><strong>{name}</strong><small>Website project · In progress</small></div><ChevronRight size={17}/></div>)}<button className="add-project" onClick={() => setShowCreate(true)}><Plus size={19}/> Create a project</button></div></section>
          </>}
          {page === 'Learning paths' && <section className="page-section"><div className="eyebrow">LEARN BY DOING</div><h1>Learning paths</h1><p className="subheading">Follow a clear path from beginner to confident builder.</p><div className="panel path-card"><div className="course-art"><GraduationCap size={38}/></div><div className="course-info"><span className="course-tag">BEGINNER · 8 LESSONS</span><h2>Build your first website</h2><p>Learn HTML, CSS and responsive design through small practical lessons.</p><div className="progress-track"><span style={{width:'35%'}}/></div></div></div><div className="panel lesson-list">{lessons.map((lesson,i)=><div className="lesson-row" key={lesson.title}><div className={`lesson-check ${lesson.done?'complete':''}`}>{lesson.done?<CheckCircle2 size={17}/>:i+1}</div><div className="lesson-copy"><strong>{lesson.title}</strong><small>{lesson.detail}</small></div><span className="lesson-time">{lesson.time}</span><ChevronRight size={16}/></div>)}</div></section>}
          {page === 'My projects' && <section className="page-section"><div className="section-heading"><div><div className="eyebrow">YOUR WORKSPACE</div><h1>My projects</h1><p className="subheading">Keep all your website ideas in one place.</p></div><button className="primary-button" onClick={() => setShowCreate(true)}><Plus size={17}/> New project</button></div><div className="project-grid large">{projects.map((name,i)=><div className="project-card" key={name}><div className={`project-icon project-${i%3}`}><Code2 size={20}/></div><div><strong>{name}</strong><small>Website project · In progress</small></div><ChevronRight size={17}/></div>)}</div></section>}
          {page === 'AI Mentor' && <section className="page-section mentor-page"><div className="eyebrow">LEARN WITH CONFIDENCE</div><h1>Your AI Mentor</h1><p className="subheading">Ask questions and get a clear next step.</p><div className="panel chat-panel"><div className="chat-header"><div className="mentor-small"><Bot/></div><div><strong>WebMentor AI</strong><small><span className="online-dot"/> Demo mentor · Sample responses</small></div></div><div className="chat-messages">{messages.map((message,i)=><div className={`chat-message ${i%2===1?'user-message':''}`} key={i}>{message}</div>)}</div><div className="chat-input"><input value={question} onChange={e=>setQuestion(e.target.value)} onKeyDown={e=>e.key==='Enter'&&askMentor()} placeholder="Ask how to build a website..."/><button className="primary-button" onClick={askMentor}>Send <MessageCircle size={16}/></button></div><small className="demo-note">Demo mode: responses are examples, not generated by a live AI service.</small></div></section>}
          {page === 'Settings' && <section className="page-section"><div className="eyebrow">PREFERENCES</div><h1>Settings</h1><p className="subheading">Manage your learning workspace.</p><div className="panel settings-panel"><div><strong>Workspace profile</strong><p>My workspace</p></div><div><strong>Learning goal</strong><p>Learn to design and build websites</p></div><div><strong>AI Mentor</strong><p>Demo responses are enabled. Connect an AI provider to enable live answers.</p></div></div></section>}
        </div>
      </main>
      {showCreate && <div className="modal-backdrop" onClick={() => setShowCreate(false)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={() => setShowCreate(false)}><X size={18}/></button><div className="stat-icon purple"><Plus/></div><h2>Create a project</h2><p>Give your next website idea a name.</p><input autoFocus value={projectName} onChange={e=>setProjectName(e.target.value)} onKeyDown={e=>e.key==='Enter'&&createProject()} placeholder="e.g. My portfolio website"/><button className="primary-button full-button" onClick={createProject}>Create project</button></div></div>}
    </div>
  )
}

export default App