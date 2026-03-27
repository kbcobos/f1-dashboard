import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import DriversStandings from './components/DriversStandings'
import ConstructorsStandings from './components/ConstructorsStandings'
import RaceCalendar from './components/RaceCalendar'
import HelpPage from './components/HelpPage'
import LiveDashboard from './components/LiveDashboard'

export default function App() {
  const [activeTab, setActiveTab] = useState('live')
  const [lang, setLang] = useState('es')

  function toggleLang() {
    setLang(l => l === 'es' ? 'en' : 'es')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D13' }}>
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        lang={lang}
        onLangToggle={toggleLang}
      />
      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'live'         && <LiveDashboard lang={lang} />}
        {activeTab === 'drivers'      && <DriversStandings lang={lang} />}
        {activeTab === 'constructors' && <ConstructorsStandings lang={lang} />}
        {activeTab === 'calendar'     && <RaceCalendar lang={lang} />}
        {activeTab === 'help'         && <HelpPage lang={lang} />}
      </main>
      <Footer lang={lang} onTabChange={setActiveTab} />
    </div>
  )
}
