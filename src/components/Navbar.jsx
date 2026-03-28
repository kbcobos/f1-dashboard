import { t } from '../utils/i18n'

export default function Navbar({ activeTab, onTabChange, lang, onLangToggle }) {
  const tabs = [
    { id: 'live',         labelKey: 'nav_live' },
    { id: 'drivers',      labelKey: 'nav_drivers' },
    { id: 'constructors', labelKey: 'nav_constructors' },
    { id: 'calendar',     labelKey: 'nav_calendar' },
    { id: 'help',         labelKey: 'nav_help' },
  ]

  return (
    <header style={{ background: '#15151E', borderBottom: '1px solid #2A2A35' }} className="sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <div className="font-barlow font-black text-white text-2xl" style={{ letterSpacing: '-0.02em' }}>
              F<span style={{ color: '#E10600' }}>1</span>
            </div>
            <div className="h-6 w-px bg-gray-600" />
            <span className="font-barlow font-semibold text-sm text-gray-400 uppercase tracking-widest">
              Dashboard
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onLangToggle}
              className="font-barlow font-bold text-xs px-3 py-1.5 rounded transition-all"
              style={{ background: '#2A2A35', color: '#ccc', border: '1px solid #3A3A4A', letterSpacing: '0.08em' }}
              title="Cambiar idioma / Switch language"
            >
              {lang === 'es' ? '🌐 EN' : '🌐 ES'}
            </button>
            <span className="font-barlow font-bold text-xs px-2 py-1 rounded"
              style={{ background: '#E10600', color: '#fff', letterSpacing: '0.05em' }}>
              {t(lang, 'season_badge').toUpperCase()}
            </span>
          </div>
        </div>

        <nav className="flex gap-1 -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`tab-btn px-4 py-2 font-barlow font-semibold text-sm uppercase tracking-wider transition-colors whitespace-nowrap ${
                activeTab === tab.id ? 'active text-white' : 'text-gray-400 hover:text-white'
              }`}
              style={tab.id === 'live' ? { position: 'relative' } : {}}
            >
              {tab.id === 'live' && (
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-600 mr-1.5 animate-pulse align-middle" />
              )}
              {t(lang, tab.labelKey)}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
