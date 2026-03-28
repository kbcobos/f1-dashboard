import { useState, useEffect } from 'react'
import { useLatestSession, useLivePositions, useLiveWeather, useLiveRaceControl, isSessionLive } from '../hooks/useLiveData'
import { useRaceCalendar } from '../hooks/useF1Data'
import { getTeamColor } from '../utils/constants'
import { t } from '../utils/i18n'

const TIRE_STYLES = {
  SOFT:         { color: '#E8002D', abbr: 'S' },
  MEDIUM:       { color: '#FFF200', abbr: 'M' },
  HARD:         { color: '#EBEBEB', abbr: 'H' },
  INTERMEDIATE: { color: '#39B54A', abbr: 'I' },
  WET:          { color: '#0067FF', abbr: 'W' },
  UNKNOWN:      { color: '#888888', abbr: '?' },
}

function TireCircle({ compound }) {
  const key = compound?.toUpperCase() || 'UNKNOWN'
  const style = TIRE_STYLES[key] || TIRE_STYLES.UNKNOWN
  return (
    <div title={compound} style={{
      width: 24, height: 24, borderRadius: '50%',
      background: style.color + '22',
      border: `1.5px solid ${style.color}`,
      color: style.color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 9,
      flexShrink: 0,
    }}>{style.abbr}</div>
  )
}

function DRSBadge({ value }) {
  const active = value === 10 || value === 12 || value === 14
  const eligible = value === 8
  return (
    <div style={{
      fontSize: 9, fontFamily: 'Barlow Condensed', fontWeight: 700,
      padding: '1px 5px', borderRadius: 3, letterSpacing: '0.05em',
      background: active ? '#00aa4422' : eligible ? '#ffaa0022' : '#1A1A25',
      color: active ? '#00dd55' : eligible ? '#ffaa00' : '#888',
      border: `1px solid ${active ? '#00aa44' : eligible ? '#ffaa00' : '#2A2A35'}`,
    }}>DRS</div>
  )
}

function getFlagStyle(flag) {
  const map = {
    'GREEN':      { bg: '#00aa4422', border: '#00aa44', color: '#00dd55', icon: '🟢' },
    'YELLOW':     { bg: '#ffaa0022', border: '#ffaa00', color: '#ffcc44', icon: '🟡' },
    'DOUBLE YELLOW': { bg: '#ffaa0033', border: '#ffaa00', color: '#ffcc44', icon: '🟡🟡' },
    'RED':        { bg: '#E1060022', border: '#E10600', color: '#ff4444', icon: '🔴' },
    'SAFETY CAR': { bg: '#ffdd0022', border: '#ffdd00', color: '#ffee55', icon: '🚗' },
    'VIRTUAL SAFETY CAR': { bg: '#ffdd0022', border: '#ffdd00', color: '#ffee55', icon: '🚕' },
    'CHEQUERED':  { bg: '#ffffff22', border: '#ffffff', color: '#ffffff', icon: '🏁' },
  }
  return map[flag?.toUpperCase()] || { bg: '#2A2A3522', border: '#3A3A45', color: '#888', icon: 'ℹ️' }
}

function useCountdown(targetDate) {
  const [diff, setDiff] = useState(null)

  useEffect(() => {
    if (!targetDate) return

    function update() {
      const now = Date.now()
      const target = new Date(targetDate).getTime()
      const ms = target - now
      if (ms <= 0) { setDiff(null); return }
      const d = Math.floor(ms / 86400000)
      const h = Math.floor((ms % 86400000) / 3600000)
      const m = Math.floor((ms % 3600000) / 60000)
      const s = Math.floor((ms % 60000) / 1000)
      setDiff({ d, h, m, s })
    }

    update()
    const t = setInterval(update, 1000)
    return () => clearInterval(t)
  }, [targetDate])

  return diff
}

function NextRaceCard({ lang }) {
  const { data: races } = useRaceCalendar('2026')
  const today = new Date()
  const next = races?.find(r => new Date(r.date) > today)
  const countdown = useCountdown(next?.date)

  if (!next) return null

  const raceDate = new Date(next.date)
  const dateStr = raceDate.toLocaleDateString(lang === 'es' ? 'es-AR' : 'en-US', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })

  const units = [
    { value: countdown?.d ?? 0, label: lang === 'es' ? 'Días' : 'Days' },
    { value: countdown?.h ?? 0, label: lang === 'es' ? 'Horas' : 'Hours' },
    { value: countdown?.m ?? 0, label: lang === 'es' ? 'Minutos' : 'Minutes' },
    { value: countdown?.s ?? 0, label: lang === 'es' ? 'Segundos' : 'Seconds' },
  ]

  return (
    <div className="animate-fade-up" style={{ textAlign: 'center', padding: '32px 16px' }}>

      <div className="flex items-center justify-center gap-2 mb-6">
        <div className="h-px flex-1" style={{ background: '#2A2A35', maxWidth: 80 }} />
        <span className="font-barlow font-bold text-xs uppercase tracking-widest" style={{ color: '#ff6b6b' }}>
          {lang === 'es' ? 'Próxima Carrera' : 'Next Race'}
        </span>
        <div className="h-px flex-1" style={{ background: '#2A2A35', maxWidth: 80 }} />
      </div>

      <div className="font-barlow font-black text-white uppercase mb-1"
        style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
        {next.raceName.replace('Grand Prix', 'GP')}
      </div>

      <div className="font-body text-sm mb-10" style={{ color: '#999' }}>
        {next.Circuit?.circuitName} · {next.Circuit?.Location?.country}
      </div>
      <div className="font-barlow text-sm mb-10 capitalize" style={{ color: '#999' }}>
        {dateStr}
      </div>

      <div className="flex justify-center gap-3 flex-wrap">
        {units.map(({ value, label }, i) => (
          <div key={label}>
            <div style={{
              background: '#15151E',
              border: '1px solid #2A2A35',
              borderRadius: 12,
              padding: '20px 0',
              width: 'clamp(72px, 18vw, 110px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
            }}>
              <span className="font-barlow font-black text-white"
                style={{ fontSize: 'clamp(2rem, 6vw, 3.2rem)', lineHeight: 1, letterSpacing: '-0.02em' }}>
                {String(value).padStart(2, '0')}
              </span>
              <span className="font-barlow font-semibold uppercase tracking-widest"
                style={{ fontSize: '0.75rem', color: '#999' }}>
                {label}
              </span>
            </div>
            {i < 3 && (
              <span className="font-barlow font-black text-2xl" style={{ color: '#333', display: 'none' }}>:</span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8">
        <span className="font-barlow font-bold text-xs px-3 py-1.5 rounded-full uppercase tracking-wider"
          style={{ background: '#E1060015', color: '#ff4444', border: '1px solid #ff444460' }}>
          {lang === 'es' ? `Ronda ${next.round} de 22` : `Round ${next.round} of 22`}
        </span>
      </div>
    </div>
  )
}

export default function LiveDashboard({ lang }) {
  const { session, loading: sessionLoading } = useLatestSession()
  const live = isSessionLive(session)
  const { data: drivers, lastUpdate } = useLivePositions(live)
  const weather = useLiveWeather(live)
  const raceMessages = useLiveRaceControl(live)

  if (sessionLoading) {
    return (
      <div className="animate-fade-up">
        <SectionHeader lang={lang} />
        <div className="flex items-center justify-center py-20 gap-3">
          <div className="w-5 h-5 rounded-full border-2 border-gray-600 border-t-red-600 animate-spin" />
          <span className="font-body text-sm text-gray-400">
            {lang === 'es' ? 'Conectando con OpenF1...' : 'Connecting to OpenF1...'}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-up space-y-6">
      <SectionHeader lang={lang} session={session} live={live} lastUpdate={lastUpdate} />

      {!live && (
        <div className="space-y-4">
          <div className="rounded-xl p-4 flex items-start gap-3"
            style={{ background: '#15151E', border: '1px solid #2A2A35' }}>
            <span className="text-xl flex-shrink-0">📡</span>
            <div>
              <p className="font-barlow font-bold text-sm text-white mb-1">
                {lang === 'es' ? 'Sin sesión activa' : 'No active session'}
              </p>
              <p className="font-body text-xs text-gray-400 leading-relaxed">
                {lang === 'es'
                  ? 'El timing en vivo se activa automáticamente cuando hay una sesión de F1 en curso (práctica, clasificación o carrera). Los datos se actualizan cada 5 segundos vía OpenF1 API.'
                  : 'Live timing activates automatically when an F1 session is in progress (practice, qualifying or race). Data updates every 5 seconds via OpenF1 API.'}
              </p>
              {session && (
                <p className="font-body text-xs mt-2" style={{ color: '#999' }}>
                  {lang === 'es' ? 'Última sesión:' : 'Last session:'}{' '}
                  <span style={{ color: '#888' }}>{session.session_name} — {session.meeting_name}</span>
                </p>
              )}
            </div>
          </div>
          <NextRaceCard lang={lang} />
        </div>
      )}

      {live && (
        <div className="space-y-4">
          {weather && <WeatherStrip weather={weather} lang={lang} />}

          {raceMessages.length > 0 && <RaceControlPanel messages={raceMessages} lang={lang} />}

          <LiveLeaderboard drivers={drivers} lang={lang} />
        </div>
      )}
    </div>
  )
}

function SectionHeader({ lang, session, live, lastUpdate }) {
  return (
    <div className="flex items-start justify-between flex-wrap gap-3">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 rounded-full" style={{ background: '#E10600' }} />
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-barlow font-bold text-xl text-white uppercase tracking-wide">
              {lang === 'es' ? 'En Vivo' : 'Live'}
            </h2>
            {live && (
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full"
                style={{ background: '#E1060022', border: '1px solid #E10600' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                <span className="font-barlow font-bold text-xs" style={{ color: '#E10600' }}>LIVE</span>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-400 font-body mt-0.5">
            {session
              ? `${session.session_name} · ${session.meeting_name}`
              : lang === 'es' ? 'Sin sesión activa' : 'No active session'}
          </p>
        </div>
      </div>
      {lastUpdate && (
        <span className="font-body text-xs" style={{ color: '#999' }}>
          {lang === 'es' ? 'Actualizado:' : 'Updated:'}{' '}
          {lastUpdate.toLocaleTimeString()}
        </span>
      )}
    </div>
  )
}

function WeatherStrip({ weather, lang }) {
  const items = [
    { icon: '🌡️', value: `${weather.air_temperature}°C`, label: lang === 'es' ? 'Aire' : 'Air' },
    { icon: '🏎️', value: `${weather.track_temperature}°C`, label: lang === 'es' ? 'Pista' : 'Track' },
    { icon: '💧', value: `${weather.humidity}%`, label: lang === 'es' ? 'Humedad' : 'Humidity' },
    { icon: '💨', value: `${weather.wind_speed} m/s`, label: lang === 'es' ? 'Viento' : 'Wind' },
    { icon: weather.rainfall ? '🌧️' : '☀️', value: weather.rainfall ? (lang === 'es' ? 'Lluvia' : 'Rain') : (lang === 'es' ? 'Seco' : 'Dry'), label: lang === 'es' ? 'Clima' : 'Weather' },
  ]

  return (
    <div className="flex flex-wrap gap-3 rounded-xl p-4"
      style={{ background: '#15151E', border: '1px solid #2A2A35' }}>
      {items.map(({ icon, value, label }) => (
        <div key={label} className="flex items-center gap-2">
          <span className="text-sm">{icon}</span>
          <div>
            <div className="font-barlow font-bold text-sm text-white">{value}</div>
            <div className="font-body text-xs" style={{ color: '#999' }}>{label}</div>
          </div>
          <div className="w-px h-6 mx-1" style={{ background: '#2A2A35' }} />
        </div>
      ))}
    </div>
  )
}

function RaceControlPanel({ messages, lang }) {
  const [open, setOpen] = useState(true)
  return (
    <div style={{ background: '#15151E', border: '1px solid #2A2A35', borderRadius: 12, overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors"
        style={{ background: '#0D0D13', borderBottom: open ? '1px solid #2A2A35' : 'none' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 rounded-full" style={{ background: '#E10600' }} />
          <span className="font-barlow font-bold text-sm text-white uppercase tracking-wide">
            {lang === 'es' ? 'Control de Carrera' : 'Race Control'}
          </span>
          <span className="font-barlow text-xs px-1.5 py-0.5 rounded-full"
            style={{ background: '#E1060022', color: '#E10600' }}>
            {messages.length}
          </span>
        </div>
        <span className="text-gray-600 text-xs">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="max-h-48 overflow-y-auto">
          {messages.map((msg, i) => {
            const flagStyle = getFlagStyle(msg.flag)
            return (
              <div key={i} className="flex items-start gap-3 px-4 py-2.5"
                style={{ borderBottom: '1px solid #1A1A25' }}>
                <span className="text-sm flex-shrink-0 mt-0.5">{flagStyle.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-xs leading-relaxed" style={{ color: flagStyle.color }}>
                    {msg.message}
                  </p>
                  <p className="font-barlow text-xs mt-0.5" style={{ color: '#888' }}>
                    {msg.category} · {new Date(msg.date).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function LiveLeaderboard({ drivers, lang }) {
  if (!drivers.length) {
    return (
      <div className="text-center py-12"
        style={{ background: '#15151E', border: '1px solid #2A2A35', borderRadius: 12 }}>
        <div className="inline-block w-6 h-6 rounded-full border-2 border-gray-600 border-t-red-600 animate-spin mb-3" />
        <p className="font-body text-sm text-gray-400">
          {lang === 'es' ? 'Esperando datos de posición...' : 'Waiting for position data...'}
        </p>
      </div>
    )
  }

  return (
    <div style={{ background: '#15151E', borderRadius: 12, border: '1px solid #2A2A35', overflow: 'hidden' }}>
      <div className="px-4 py-3 flex items-center gap-2"
        style={{ background: '#0D0D13', borderBottom: '1px solid #2A2A35' }}>
        <div className="w-1 h-5 rounded-full" style={{ background: '#E10600' }} />
        <span className="font-barlow font-bold text-sm text-white uppercase tracking-wide">
          {lang === 'es' ? 'Posiciones en Vivo' : 'Live Positions'}
        </span>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#0D0D13' }}>
            {['Pos', lang === 'es' ? 'Piloto' : 'Driver', lang === 'es' ? 'Equipo' : 'Team',
              'GAP', lang === 'es' ? 'Neu.' : 'Tyre', 'DRS', 'PIT'].map(h => (
              <th key={h} style={{
                fontFamily: 'Barlow Condensed', fontSize: '0.7rem', letterSpacing: '0.12em',
                textTransform: 'uppercase', color: '#888', padding: '10px 12px', textAlign: 'left',
                borderBottom: '1px solid #2A2A35', fontWeight: 600,
              }} className={h === 'DRS' || h === 'PIT' ? 'hidden md:table-cell' : ''}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {drivers.map((d, idx) => {
            const pos = d.position
            const color = getTeamColor(d.driver?.team_name?.toLowerCase().replace(/\s+/g, '_'))
            const name = d.driver?.full_name || `Driver ${d.driver_number}`
            const nameParts = name.split(' ')
            const lastName = nameParts.slice(1).join(' ') || nameParts[0]
            const firstName = nameParts.length > 1 ? nameParts[0] : ''

            return (
              <tr key={d.driver_number} className="standings-row"
                style={{ animationDelay: `${idx * 20}ms` }}>
                <td style={{ padding: '10px 12px' }}>
                  <span style={{
                    fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '1.1rem',
                    color: pos === 1 ? '#FFD700' : pos === 2 ? '#C0C0C0' : pos === 3 ? '#CD7F32' : '#888',
                  }}>{pos}</span>
                </td>
                <td style={{ padding: '10px 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 2, height: 28, borderRadius: 2, background: color, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontFamily: 'Barlow Condensed', fontSize: '0.88rem', color: '#fff' }}>
                        {firstName} <strong style={{ fontWeight: 900 }}>{lastName.toUpperCase()}</strong>
                      </div>
                      <div style={{ fontFamily: 'Barlow', fontSize: '0.7rem', color: '#999' }}>
                        #{d.driver_number}
                      </div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '10px 12px' }}>
                  <span style={{
                    fontFamily: 'Barlow Condensed', fontSize: '0.7rem', fontWeight: 600,
                    padding: '2px 7px', borderRadius: 4, textTransform: 'uppercase',
                    background: color + '22', color, border: `1px solid ${color}44`,
                  }}>
                    {d.driver?.team_name || '—'}
                  </span>
                </td>
                <td style={{ padding: '10px 12px' }}>
                  <span style={{ fontFamily: 'Barlow', fontSize: '0.82rem', color: pos === 1 ? '#FFD700' : '#ccc' }}>
                    {pos === 1 ? 'LEADER' : d.gap_to_leader ? `+${d.gap_to_leader}` : d.interval ?? '—'}
                  </span>
                </td>
                <td style={{ padding: '10px 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <TireCircle compound={d.compound} />
                    {d.tyre_age != null && (
                      <span style={{ fontFamily: 'Barlow', fontSize: '0.72rem', color: '#999' }}>
                        L{d.tyre_age}
                      </span>
                    )}
                  </div>
                </td>
                <td style={{ padding: '10px 12px' }} className="hidden md:table-cell">
                  <DRSBadge value={d.drs} />
                </td>
                <td style={{ padding: '10px 12px' }} className="hidden md:table-cell">
                  <span style={{ fontFamily: 'Barlow Condensed', fontSize: '0.82rem', color: d.pit_count > 0 ? '#ccc' : '#888' }}>
                    {d.pit_count > 0 ? `${d.pit_count}x` : '—'}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
