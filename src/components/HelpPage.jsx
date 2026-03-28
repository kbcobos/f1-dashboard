import { t } from '../utils/i18n'

function Section({ title, children }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-5 w-1 rounded-full" style={{ background: '#E10600' }} />
        <h2 className="font-barlow font-bold text-lg text-white uppercase tracking-wide">{title}</h2>
      </div>
      {children}
    </div>
  )
}

function InfoBox({ children }) {
  return (
    <div
      className="flex gap-3 rounded-lg p-4 mt-3"
      style={{ background: '#1A1A2A', border: '1px solid #2A2A45' }}
    >
      <span className="text-blue-400 flex-shrink-0 mt-0.5">ℹ️</span>
      <p className="font-body text-sm" style={{ color: '#8888aa', lineHeight: 1.7 }}>{children}</p>
    </div>
  )
}

function ColorRow({ color, label }) {
  return (
    <div className="flex items-center gap-3 py-2" style={{ borderBottom: '1px solid #1A1A25' }}>
      <div className="w-4 h-4 rounded-sm flex-shrink-0" style={{ background: color }} />
      <span className="font-body text-sm" style={{ color: '#ccc' }}>{label}</span>
    </div>
  )
}

function TireCompound({ color, label, abbr }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center font-barlow font-black text-sm"
        style={{
          background: color + '22',
          border: `2px solid ${color}`,
          color: color,
        }}
      >
        {abbr}
      </div>
      <span className="font-body text-xs" style={{ color: '#888' }}>{label}</span>
    </div>
  )
}

export default function HelpPage({ lang }) {
  return (
    <div className="animate-fade-up max-w-3xl mx-auto">

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-1 rounded-full" style={{ background: '#E10600' }} />
          <h1 className="font-barlow font-black text-3xl text-white uppercase tracking-wide">
            {t(lang, 'help_title')}
          </h1>
        </div>
        <p className="font-body text-sm ml-4" style={{ color: '#999', lineHeight: 1.7 }}>
          {t(lang, 'help_intro')}
        </p>
      </div>

      <Section title={t(lang, 'help_standings_title')}>
        <p className="font-body text-sm" style={{ color: '#999', lineHeight: 1.7 }}>
          {t(lang, 'help_standings_desc')}
        </p>

        <div className="mt-4">
          <p className="font-barlow font-semibold text-xs uppercase tracking-wider mb-3" style={{ color: '#999' }}>
            {t(lang, 'help_medals_title')}
          </p>
          <div className="flex flex-col gap-2">
            {[
              { medal: '🥇', color: '#FFD700', label: t(lang, 'help_pos1') },
              { medal: '🥈', color: '#C0C0C0', label: t(lang, 'help_pos2') },
              { medal: '🥉', color: '#CD7F32', label: t(lang, 'help_pos3') },
            ].map(({ medal, color, label }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-lg w-8">{medal}</span>
                <span className="font-barlow font-bold text-sm" style={{ color }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title={t(lang, 'help_calendar_title')}>
        <p className="font-body text-sm" style={{ color: '#999', lineHeight: 1.7 }}>
          {t(lang, 'help_calendar_desc')}
        </p>

        <div
          className="mt-4 rounded-lg overflow-hidden"
          style={{ border: '1px solid #2A2A35' }}
        >
          {[
            { bg: '#E10600', label: lang === 'es' ? 'Próximo Gran Premio' : 'Next Grand Prix' },
            { bg: '#2A2A35', label: lang === 'es' ? 'Carrera pasada (clic para resultados)' : 'Past race (click for results)' },
            { bg: '#1F1F2A', label: lang === 'es' ? 'Carrera futura' : 'Future race' },
          ].map(({ bg, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 px-4 py-3"
              style={{ borderBottom: '1px solid #1A1A25' }}
            >
              <div
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-barlow font-black text-xs text-white"
                style={{ background: bg }}
              >
                16
              </div>
              <span className="font-body text-sm" style={{ color: '#888' }}>{label}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title={t(lang, 'help_results_title')}>
        <p className="font-body text-sm" style={{ color: '#999', lineHeight: 1.7 }}>
          {t(lang, 'help_results_desc')}
        </p>
      </Section>

      <Section title={lang === 'es' ? 'Compuestos de Neumáticos' : 'Tire Compounds'}>
        <p className="font-body text-sm mb-5" style={{ color: '#999', lineHeight: 1.7 }}>
          {lang === 'es'
            ? 'Los resultados de carrera muestran el compuesto con el que terminó cada piloto.'
            : 'Race results show the compound each driver finished on.'}
        </p>
        <div className="flex flex-wrap gap-6">
          <TireCompound color="#E8002D" abbr="S" label={t(lang, 'tire_soft')} />
          <TireCompound color="#FFF200" abbr="M" label={t(lang, 'tire_medium')} />
          <TireCompound color="#FFFFFF" abbr="H" label={t(lang, 'tire_hard')} />
          <TireCompound color="#39B54A" abbr="I" label={t(lang, 'tire_inter')} />
          <TireCompound color="#0067FF" abbr="W" label={t(lang, 'tire_wet')} />
        </div>
      </Section>

      <Section title={t(lang, 'help_colors_title')}>
        <p className="font-body text-sm mb-4" style={{ color: '#999', lineHeight: 1.7 }}>
          {t(lang, 'help_colors_desc')}
        </p>
        <div
          className="rounded-lg overflow-hidden"
          style={{ border: '1px solid #2A2A35' }}
        >
          {[
            { color: '#27F4D2', name: 'Mercedes' },
            { color: '#E8002D', name: 'Ferrari' },
            { color: '#FF8000', name: 'McLaren' },
            { color: '#3671C6', name: 'Red Bull Racing' },
            { color: '#229971', name: 'Aston Martin' },
            { color: '#FF87BC', name: 'Alpine' },
            { color: '#1E6FE0', name: 'Williams' },
            { color: '#E8E4E1', name: 'Haas F1 Team' },
            { color: '#6692FF', name: 'Racing Bulls' },
            { color: '#BB0A21', name: 'Audi' },
            { color: '#DADADA', name: 'Cadillac' },
          ].map(({ color, name }) => (
            <ColorRow key={name} color={color} label={name} />
          ))}
        </div>
      </Section>

      <Section title={t(lang, 'help_api_title')}>
        <p className="font-body text-sm" style={{ color: '#999', lineHeight: 1.7 }}>
          {t(lang, 'help_api_desc')}
        </p>
        <InfoBox>{t(lang, 'help_api_limit')}</InfoBox>
        <div
          className="mt-4 rounded-lg p-4"
          style={{ background: '#0D0D13', border: '1px solid #2A2A35' }}
        >
          <p className="font-barlow font-semibold text-xs uppercase tracking-wider mb-3" style={{ color: '#999' }}>
            Endpoints
          </p>
          {[
            '/ergast/f1/2026/driverStandings.json',
            '/ergast/f1/2026/constructorStandings.json',
            '/ergast/f1/2026.json',
            '/ergast/f1/2026/{round}/results.json',
          ].map(ep => (
            <div key={ep} className="mb-1.5">
              <code
                className="font-mono text-xs px-2 py-0.5 rounded"
                style={{ background: '#1A1A28', color: '#7878ee' }}
              >
                {ep}
              </code>
            </div>
          ))}
        </div>
      </Section>

      <Section title={t(lang, 'help_lang_title')}>
        <p className="font-body text-sm" style={{ color: '#999', lineHeight: 1.7 }}>
          {t(lang, 'help_lang_desc')}
        </p>
        <div className="flex items-center gap-3 mt-4">
          {['🌐 ES', '🌐 EN'].map(btn => (
            <div
              key={btn}
              className="font-barlow font-bold text-xs px-3 py-1.5 rounded"
              style={{ background: '#2A2A35', color: '#ccc', border: '1px solid #3A3A4A' }}
            >
              {btn}
            </div>
          ))}
        </div>
      </Section>

      <Section title={t(lang, 'help_disclaimer_title')}>
        <p
          className="font-body text-xs rounded-lg p-4"
          style={{
            color: '#999',
            lineHeight: 1.7,
            background: '#0D0D13',
            border: '1px solid #1A1A25',
          }}
        >
          {t(lang, 'footer_disclaimer')}
        </p>
      </Section>

    </div>
  )
}
