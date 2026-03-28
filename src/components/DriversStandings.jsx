import { useDriverStandings } from '../hooks/useF1Data'
import { getTeamColor, getDriverFlag } from '../utils/constants'
import { t } from '../utils/i18n'

const TIRE_COLORS = {
  soft:         { color: '#E8002D', abbr: 'S' },
  medium:       { color: '#FFF200', abbr: 'M' },
  hard:         { color: '#EBEBEB', abbr: 'H' },
  intermediate: { color: '#39B54A', abbr: 'I' },
  wet:          { color: '#0067FF', abbr: 'W' },
}

export function TireBadge({ compound }) {
  if (!compound) return null
  const key = compound.toLowerCase()
  const tire = TIRE_COLORS[key]
  if (!tire) return null
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center font-barlow font-black rounded-full"
      title={compound}
      style={{
        width: 22, height: 22,
        background: tire.color + '22',
        border: `1.5px solid ${tire.color}`,
        color: tire.color,
        fontSize: 9,
      }}
    >
      {tire.abbr}
    </div>
  )
}

function SkeletonRow() {
  return (
    <tr>
      <td className="px-3 py-3"><div className="skeleton h-4 w-6" /></td>
      <td className="px-3 py-3"><div className="skeleton h-4 w-32" /></td>
      <td className="px-3 py-3"><div className="skeleton h-4 w-20" /></td>
      <td className="px-3 py-3"><div className="skeleton h-4 w-10" /></td>
      <td className="px-3 py-3 hidden sm:table-cell"><div className="skeleton h-4 w-8" /></td>
    </tr>
  )
}

function PointsBar({ points, maxPoints }) {
  const pct = maxPoints > 0 ? (points / maxPoints) * 100 : 0
  return (
    <div className="flex items-center gap-2">
      <span className="font-barlow font-bold text-base text-white w-12 text-right">{points}</span>
      <div className="flex-1 hidden sm:block" style={{ background: '#2A2A35', borderRadius: 2, height: 4, minWidth: 60 }}>
        <div style={{ width: `${pct}%`, height: '100%', background: '#E10600', borderRadius: 2, transition: 'width 0.6s ease' }} />
      </div>
    </div>
  )
}

export default function DriversStandings({ lang }) {
  const { data, loading, error } = useDriverStandings('2026')
  const maxPoints = data && data.length > 0 ? parseFloat(data[0].points) : 1

  return (
    <div className="animate-fade-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-8 w-1 rounded-full" style={{ background: '#E10600' }} />
        <div>
          <h2 className="font-barlow font-bold text-xl text-white uppercase tracking-wide">{t(lang, 'drivers_title')}</h2>
          <p className="text-xs text-gray-400 font-body mt-0.5">{t(lang, 'drivers_subtitle')}</p>
        </div>
      </div>

      {error && (
        <div className="text-center py-12 text-gray-400">
          <div className="text-3xl mb-2">⚠️</div>
          <p className="font-body text-sm">{t(lang, 'load_error')}</p>
        </div>
      )}

      <div style={{ background: '#15151E', borderRadius: 12, border: '1px solid #2A2A35', overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr style={{ background: '#0D0D13' }}>
              <th className="w-10">{t(lang, 'col_pos')}</th>
              <th>{t(lang, 'col_driver')}</th>
              <th>{t(lang, 'col_team')}</th>
              <th>{t(lang, 'col_points')}</th>
              <th className="hidden sm:table-cell">{t(lang, 'col_wins')}</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 10 }).map((_, i) => <SkeletonRow key={i} />)
              : data?.map((entry, idx) => {
                  const pos = parseInt(entry.position)
                  const color = getTeamColor(entry.Constructors[0]?.constructorId)
                  const flag = getDriverFlag(entry.Driver.nationality)
                  const wins = parseInt(entry.wins)
                  return (
                    <tr key={entry.Driver.driverId} className="standings-row" style={{ animationDelay: `${idx * 30}ms` }}>
                      <td className="px-3 py-3">
                        <span className={`font-barlow font-bold text-lg ${pos === 1 ? 'pos-1' : pos === 2 ? 'pos-2' : pos === 3 ? 'pos-3' : 'text-gray-400'}`}>{pos}</span>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-0.5 h-8 rounded-full flex-shrink-0" style={{ background: color }} />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="flag">{flag}</span>
                              <span className="font-barlow font-semibold text-white text-sm">
                                {entry.Driver.givenName} <strong className="font-black">{entry.Driver.familyName.toUpperCase()}</strong>
                              </span>
                            </div>
                            <div className="text-xs text-gray-400 mt-0.5 font-body">#{entry.Driver.permanentNumber || '—'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <span className="font-barlow text-xs font-semibold px-2 py-1 rounded uppercase tracking-wide"
                          style={{ background: color + '22', color, border: `1px solid ${color}44` }}>
                          {entry.Constructors[0]?.name || '—'}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <PointsBar points={parseFloat(entry.points)} maxPoints={maxPoints} />
                      </td>
                      <td className="px-3 py-3 hidden sm:table-cell">
                        <span className="font-barlow font-bold text-sm" style={{ color: wins > 0 ? '#FFD700' : '#999' }}>
                          {wins > 0 ? wins : '—'}
                        </span>
                      </td>
                    </tr>
                  )
                })}
          </tbody>
        </table>
        {!loading && (!data || data.length === 0) && !error && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-3xl mb-2">🏁</div>
            <p className="font-body text-sm">{t(lang, 'no_data')}</p>
          </div>
        )}
      </div>
    </div>
  )
}
