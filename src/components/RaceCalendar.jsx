import { useState, useMemo } from 'react'
import { useRaceCalendar, useRaceResults } from '../hooks/useF1Data'
import { getTeamColor, getDriverFlag, getCircuitFlag } from '../utils/constants'
import { t } from '../utils/i18n'

function RaceResultsPanel({ season, round, raceName, onClose, lang }) {
  const { data, loading } = useRaceResults(season, round)

  return (
    <div className="animate-fade-in" style={{
      background: '#15151E', border: '1px solid #2A2A35',
      borderRadius: 12, overflow: 'hidden', marginTop: 16,
    }}>
      <div className="flex items-center justify-between px-4 py-3"
        style={{ background: '#0D0D13', borderBottom: '1px solid #2A2A35' }}>
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 rounded-full" style={{ background: '#E10600' }} />
          <span className="font-barlow font-bold text-sm text-white uppercase tracking-wide">
            {t(lang, 'results_panel_title')} — {raceName}
          </span>
        </div>
        <button onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors font-barlow text-lg leading-none px-1">
          ✕
        </button>
      </div>

      {loading && (
        <div className="py-8 text-center">
          <div className="inline-block w-5 h-5 rounded-full border-2 border-gray-600 border-t-red-600 animate-spin" />
          <p className="text-gray-400 text-xs mt-2 font-body">{t(lang, 'results_loading')}</p>
        </div>
      )}

      {!loading && data && data.length > 0 && (
        <table className="data-table">
          <thead>
            <tr style={{ background: '#0D0D13' }}>
              <th className="w-10">{t(lang, 'col_pos')}</th>
              <th>{t(lang, 'col_driver')}</th>
              <th className="hidden sm:table-cell">{t(lang, 'col_team')}</th>
              <th>{t(lang, 'col_time')}</th>
              <th className="hidden sm:table-cell">{t(lang, 'col_pts')}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((result) => {
              const pos = parseInt(result.position)
              const color = getTeamColor(result.Constructor?.constructorId)
              const flag = getDriverFlag(result.Driver?.nationality)
              const time = result.Time?.time || result.status || '—'

              return (
                <tr key={result.Driver.driverId} className="standings-row">
                  <td className="px-3 py-2.5">
                    <span className={`font-barlow font-bold ${pos === 1 ? 'pos-1' : pos === 2 ? 'pos-2' : pos === 3 ? 'pos-3' : 'text-gray-400'}`}>
                      {pos <= 3 ? (pos === 1 ? '🥇' : pos === 2 ? '🥈' : '🥉') : pos}
                    </span>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-0.5 h-6 rounded-full flex-shrink-0" style={{ background: color }} />
                      <span className="flag text-sm">{flag}</span>
                      <span className="font-barlow text-sm text-white">
                        {result.Driver.givenName}{' '}
                        <strong className="font-black">{result.Driver.familyName.toUpperCase()}</strong>
                      </span>
                      {result.FastestLap?.rank === '1' && (
                        <span className="font-barlow font-bold px-1 py-0.5 rounded"
                          style={{ background: '#7B2FBE22', color: '#C084FC', border: '1px solid #7B2FBE44', fontSize: 9 }}>
                          ⚡ FL
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-2.5 hidden sm:table-cell">
                    <span className="font-barlow text-xs font-semibold px-2 py-0.5 rounded uppercase"
                      style={{ background: color + '22', color }}>
                      {result.Constructor?.name}
                    </span>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className="font-body text-xs text-gray-400">{time}</span>
                  </td>
                  <td className="px-3 py-2.5 hidden sm:table-cell">
                    <span className="font-barlow font-bold text-sm"
                      style={{ color: parseInt(result.points) > 0 ? '#fff' : '#999' }}>
                      {result.points}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}

      {!loading && (!data || data.length === 0) && (
        <div className="py-8 text-center text-gray-400">
          <div className="text-2xl mb-2">🏁</div>
          <p className="font-body text-sm">{t(lang, 'results_unavailable')}</p>
        </div>
      )}
    </div>
  )
}

function RaceCard({ race, isNext, isPast, onClick, isSelected, lang }) {
  const raceDate = new Date(race.date)
  const day = raceDate.getDate()
  const month = raceDate.toLocaleDateString('es-AR', { month: 'short' }).toUpperCase()
  const country = race.Circuit?.Location?.country
  const flag = getCircuitFlag(country)

  return (
    <div
      onClick={isPast ? onClick : undefined}
      className={`relative overflow-hidden transition-all duration-200 ${isPast ? 'cursor-pointer hover:scale-[1.01]' : ''}`}
      style={{
        background: isSelected ? '#1E1E2E' : isNext ? '#1A1A26' : '#15151E',
        border: isSelected ? '1px solid #E10600' : isNext ? '1px solid #3A3A4A' : '1px solid #2A2A35',
        borderRadius: 10,
        padding: '14px 16px',
        transform: isSelected ? 'scale(1.01)' : undefined,
      }}
    >
      {isNext && (
        <div className="absolute top-0 right-0 font-barlow font-bold text-xs px-2 py-0.5 uppercase"
          style={{ background: '#E10600', color: '#fff', borderBottomLeftRadius: 6 }}>
          {t(lang, 'next_race_badge')}
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 flex flex-col items-center justify-center rounded-lg text-center"
          style={{ background: isNext ? '#E10600' : isPast ? '#2A2A35' : '#1F1F2A', width: 52, height: 52, minWidth: 52 }}>
          <span className="font-barlow font-black text-white text-lg leading-none">{day}</span>
          <span className="font-barlow font-semibold text-xs leading-none mt-0.5"
            style={{ color: isNext ? '#ffaaaa' : '#888' }}>{month}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-sm">{flag}</span>
            <span className="font-body text-xs text-gray-400 truncate">
              {t(lang, 'race_round')} {race.round} · {country}
            </span>
          </div>
          <div className="font-barlow font-bold uppercase truncate"
            style={{ color: isNext ? '#fff' : isPast ? '#ccc' : '#888', fontSize: '0.9rem', letterSpacing: '0.02em' }}>
            {race.raceName.replace('Grand Prix', 'GP')}
          </div>
          <div className="font-body text-xs text-gray-600 mt-0.5 truncate">
            {race.Circuit?.circuitName}
          </div>
        </div>

        <div className="flex-shrink-0 self-center">
          {isPast && (
            <span className="font-barlow text-xs text-gray-600 hover:text-gray-400 transition-colors">
              {isSelected ? t(lang, 'hide_results') : t(lang, 'see_results')}
            </span>
          )}
          {!isPast && !isNext && (
            <div className="w-2 h-2 rounded-full" style={{ background: '#2A2A35' }} />
          )}
        </div>
      </div>
    </div>
  )
}

export default function RaceCalendar({ lang }) {
  const { data: races, loading, error } = useRaceCalendar('2026')
  const [selectedRound, setSelectedRound] = useState(null)
  const [filter, setFilter] = useState('all')
  const today = new Date()

  const categorized = useMemo(() => {
    if (!races) return { past: [], next: null, upcoming: [] }
    const past = [], upcoming = []
    let next = null
    races.forEach(r => {
      const d = new Date(r.date)
      if (d < today) past.push(r)
      else if (!next) next = r
      else upcoming.push(r)
    })
    return { past, next, upcoming }
  }, [races])

  const shown = useMemo(() => {
    if (!races) return []
    if (filter === 'past') return categorized.past
    if (filter === 'upcoming') return [...(categorized.next ? [categorized.next] : []), ...categorized.upcoming]
    return races
  }, [races, filter, categorized])

  return (
    <div className="animate-fade-up">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 rounded-full" style={{ background: '#E10600' }} />
          <div>
            <h2 className="font-barlow font-bold text-xl text-white uppercase tracking-wide">{t(lang, 'calendar_title')}</h2>
            <p className="text-xs text-gray-400 font-body mt-0.5">
              {races ? `${races.length} ${t(lang, 'calendar_subtitle_races')}` : '...'}
            </p>
          </div>
        </div>

        <div className="flex gap-1" style={{ background: '#15151E', border: '1px solid #2A2A35', borderRadius: 8, padding: 3 }}>
          {[
            { id: 'all', key: 'filter_all' },
            { id: 'past', key: 'filter_past' },
            { id: 'upcoming', key: 'filter_upcoming' },
          ].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)}
              className="font-barlow font-semibold text-xs uppercase px-3 py-1.5 rounded-md transition-all"
              style={filter === f.id ? { background: '#E10600', color: '#fff' } : { color: '#888', background: 'transparent' }}>
              {t(lang, f.key)}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="text-center py-12 text-gray-400">
          <div className="text-3xl mb-2">⚠️</div>
          <p className="font-body text-sm">{t(lang, 'calendar_load_error')}</p>
        </div>
      )}

      {loading && (
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton rounded-xl" style={{ height: 82 }} />
          ))}
        </div>
      )}

      {!loading && shown.length > 0 && (
        <div className="space-y-2">
          {shown.map(race => {
            const isPast = new Date(race.date) < today
            const isNext = categorized.next?.round === race.round
            const isSelected = selectedRound === race.round

            return (
              <div key={race.round}>
                <RaceCard
                  race={race} isNext={isNext} isPast={isPast}
                  isSelected={isSelected} lang={lang}
                  onClick={() => setSelectedRound(isSelected ? null : race.round)}
                />
                {isSelected && isPast && (
                  <RaceResultsPanel
                    season="2026" round={race.round} lang={lang}
                    raceName={race.raceName.replace('Grand Prix', 'GP')}
                    onClose={() => setSelectedRound(null)}
                  />
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
