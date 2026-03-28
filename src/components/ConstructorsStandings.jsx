import { useConstructorStandings } from '../hooks/useF1Data'
import { getTeamColor } from '../utils/constants'
import { t } from '../utils/i18n'

function SkeletonRow() {
  return (
    <tr>
      <td className="px-3 py-4"><div className="skeleton h-4 w-6" /></td>
      <td className="px-3 py-4"><div className="skeleton h-4 w-36" /></td>
      <td className="px-3 py-4"><div className="skeleton h-4 w-12" /></td>
      <td className="px-3 py-4 hidden sm:table-cell"><div className="skeleton h-4 w-8" /></td>
    </tr>
  )
}

function TeamBar({ points, maxPoints, color }) {
  const pct = maxPoints > 0 ? (points / maxPoints) * 100 : 0
  return (
    <div className="flex items-center gap-3">
      <span className="font-barlow font-bold text-lg text-white w-14 text-right">{points}</span>
      <div className="flex-1 hidden sm:block" style={{ background: '#2A2A35', borderRadius: 2, height: 5, minWidth: 80 }}>
        <div style={{
          width: `${pct}%`, height: '100%', background: color,
          borderRadius: 2, transition: 'width 0.7s ease',
          boxShadow: `0 0 8px ${color}66`,
        }} />
      </div>
    </div>
  )
}

export default function ConstructorsStandings({ lang }) {
  const { data, loading, error } = useConstructorStandings('2026')
  const maxPoints = data && data.length > 0 ? parseFloat(data[0].points) : 1

  return (
    <div className="animate-fade-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-8 w-1 rounded-full" style={{ background: '#E10600' }} />
        <div>
          <h2 className="font-barlow font-bold text-xl text-white uppercase tracking-wide">{t(lang, 'constructors_title')}</h2>
          <p className="text-xs text-gray-400 font-body mt-0.5">{t(lang, 'constructors_subtitle')}</p>
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
              <th>{lang === 'es' ? 'Escudería' : 'Team'}</th>
              <th>{t(lang, 'col_points')}</th>
              <th className="hidden sm:table-cell">{t(lang, 'col_wins')}</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 10 }).map((_, i) => <SkeletonRow key={i} />)
              : data?.map((entry) => {
                  const pos = parseInt(entry.position)
                  const color = getTeamColor(entry.Constructor.constructorId)
                  const wins = parseInt(entry.wins)
                  return (
                    <tr key={entry.Constructor.constructorId} className="standings-row">
                      <td className="px-3 py-4">
                        <span className={`font-barlow font-bold text-lg ${pos === 1 ? 'pos-1' : pos === 2 ? 'pos-2' : pos === 3 ? 'pos-3' : 'text-gray-400'}`}>{pos}</span>
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-1 rounded-full flex-shrink-0"
                            style={{ background: color, height: 36, boxShadow: `0 0 10px ${color}55` }} />
                          <div>
                            <div className="font-barlow font-black text-white uppercase tracking-wide" style={{ fontSize: '0.95rem' }}>
                              {entry.Constructor.name}
                            </div>
                            <div className="text-xs text-gray-400 font-body mt-0.5">{entry.Constructor.nationality}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        <TeamBar points={parseFloat(entry.points)} maxPoints={maxPoints} color={color} />
                      </td>
                      <td className="px-3 py-4 hidden sm:table-cell">
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
