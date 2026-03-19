export const TEAM_COLORS = {
  'mercedes':        '#27F4D2',
  'ferrari':         '#E8002D',
  'mclaren':         '#FF8000',
  'haas':            '#E8E4E1',
  'red_bull':        '#3671C6',
  'rb':              '#6692FF',
  'alpine':          '#FF87BC',
  'audi':            '#BB0A21',
  'williams':        '#1E6FE0',
  'cadillac':        '#DADADA',
  'aston_martin':    '#229971',
}

export const DRIVERS_2026 = {
  63:  { firstName: 'George',   lastName: 'Russell',   nationality: 'British',    team: 'mercedes',     number: 63 },
  12:  { firstName: 'Kimi',     lastName: 'Antonelli', nationality: 'Italian',    team: 'mercedes',     number: 12 },
  16:  { firstName: 'Charles',  lastName: 'Leclerc',   nationality: 'Monegasque', team: 'ferrari',      number: 16 },
  44:  { firstName: 'Lewis',    lastName: 'Hamilton',  nationality: 'British',    team: 'ferrari',      number: 44 },
  4:   { firstName: 'Lando',    lastName: 'Norris',    nationality: 'British',    team: 'mclaren',      number: 4  },
  81:  { firstName: 'Oscar',    lastName: 'Piastri',   nationality: 'Australian', team: 'mclaren',      number: 81 },
  31:  { firstName: 'Esteban',  lastName: 'Ocon',      nationality: 'French',     team: 'haas',         number: 31 },
  87:  { firstName: 'Oliver',   lastName: 'Bearman',   nationality: 'British',    team: 'haas',         number: 87 },
  1:   { firstName: 'Max',      lastName: 'Verstappen',nationality: 'Dutch',      team: 'red_bull',     number: 1  },
  6:   { firstName: 'Isack',    lastName: 'Hadjar',    nationality: 'French',     team: 'red_bull',     number: 6  },
  30:  { firstName: 'Liam',     lastName: 'Lawson',    nationality: 'New Zealander', team: 'rb',        number: 30 },
  5:   { firstName: 'Arvid',    lastName: 'Lindblad',  nationality: 'British',    team: 'rb',           number: 5  },
  10:  { firstName: 'Pierre',   lastName: 'Gasly',     nationality: 'French',     team: 'alpine',       number: 10 },
  43:  { firstName: 'Franco',   lastName: 'Colapinto', nationality: 'Argentine',  team: 'alpine',       number: 43 },
  27:  { firstName: 'Nico',     lastName: 'Hulkenberg', nationality: 'German',    team: 'sauber',       number: 27 },
  11:  { firstName: 'Gabriel',  lastName: 'Bortoleto', nationality: 'Brazilian',  team: 'sauber',       number: 11 },
  55:  { firstName: 'Carlos',   lastName: 'Sainz',     nationality: 'Spanish',    team: 'williams',     number: 55 },
  23:  { firstName: 'Alexander',lastName: 'Albon',     nationality: 'Thai',       team: 'williams',     number: 23 },
  11:  { firstName: 'Sergio',   lastName: 'Perez',     nationality: 'Mexican',    team: 'cadillac',     number: 11 },
  77:  { firstName: 'Valtteri', lastName: 'Bottas',    nationality: 'Finnish',    team: 'cadillac',     number: 77 },
  14:  { firstName: 'Fernando', lastName: 'Alonso',    nationality: 'Spanish',    team: 'aston_martin', number: 14 },
  18:  { firstName: 'Lance',    lastName: 'Stroll',    nationality: 'Canadian',   team: 'aston_martin', number: 18 },
}

export const TEAMS_2026 = {
  'mercedes':     { name: 'Mercedes',       drivers: ['George Russell', 'Kimi Antonelli'],        engine: 'Mercedes' },
  'ferrari':      { name: 'Ferrari',        drivers: ['Charles Leclerc', 'Lewis Hamilton'],        engine: 'Ferrari' },
  'mclaren':      { name: 'McLaren',        drivers: ['Lando Norris', 'Oscar Piastri'],            engine: 'Mercedes' },
  'haas':         { name: 'Haas F1 Team',   drivers: ['Esteban Ocon', 'Oliver Bearman'],           engine: 'Ferrari' },
  'red_bull':     { name: 'Red Bull Racing',drivers: ['Max Verstappen', 'Isack Hadjar'],           engine: 'Red Bull-Ford' },
  'rb':           { name: 'Racing Bulls',   drivers: ['Liam Lawson', 'Arvid Lindblad'],            engine: 'Red Bull-Ford' },
  'alpine':       { name: 'Alpine',         drivers: ['Pierre Gasly', 'Franco Colapinto'],         engine: 'Mercedes' },
  'sauber':       { name: 'Audi',           drivers: ['Nico Hulkenberg', 'Gabriel Bortoleto'],     engine: 'Audi' },
  'williams':     { name: 'Williams',       drivers: ['Carlos Sainz', 'Alexander Albon'],          engine: 'Mercedes' },
  'cadillac':     { name: 'Cadillac',       drivers: ['Sergio Pérez', 'Valtteri Bottas'],          engine: 'Ferrari' },
  'aston_martin': { name: 'Aston Martin',   drivers: ['Fernando Alonso', 'Lance Stroll'],          engine: 'Honda' },
}

export const COUNTRY_FLAGS = {
  'British':         '🇬🇧',
  'Dutch':           '🇳🇱',
  'Spanish':         '🇪🇸',
  'Monegasque':      '🇲🇨',
  'German':          '🇩🇪',
  'French':          '🇫🇷',
  'Australian':      '🇦🇺',
  'Finnish':         '🇫🇮',
  'Mexican':         '🇲🇽',
  'Canadian':        '🇨🇦',
  'Japanese':        '🇯🇵',
  'Danish':          '🇩🇰',
  'Thai':            '🇹🇭',
  'American':        '🇺🇸',
  'Chinese':         '🇨🇳',
  'Italian':         '🇮🇹',
  'Brazilian':       '🇧🇷',
  'Argentine':       '🇦🇷',
  'New Zealander':   '🇳🇿',
  'Austrian':        '🇦🇹',
  'Belgian':         '🇧🇪',
  'Swiss':           '🇨🇭',
  'Swedish':         '🇸🇪',
  'South African':   '🇿🇦',
}

export const CIRCUIT_FLAGS = {
  'Australia':             '🇦🇺',
  'China':                 '🇨🇳',
  'Japan':                 '🇯🇵',
  'Bahrain':               '🇧🇭',
  'Saudi Arabia':          '🇸🇦',
  'USA':                   '🇺🇸',
  'United States':         '🇺🇸',
  'Italy':                 '🇮🇹',
  'Monaco':                '🇲🇨',
  'Spain':                 '🇪🇸',
  'Canada':                '🇨🇦',
  'Austria':               '🇦🇹',
  'UK':                    '🇬🇧',
  'Great Britain':         '🇬🇧',
  'United Kingdom':        '🇬🇧',
  'Hungary':               '🇭🇺',
  'Belgium':               '🇧🇪',
  'Netherlands':           '🇳🇱',
  'Singapore':             '🇸🇬',
  'Brazil':                '🇧🇷',
  'Mexico':                '🇲🇽',
  'UAE':                   '🇦🇪',
  'United Arab Emirates':  '🇦🇪',
  'Azerbaijan':            '🇦🇿',
  'Qatar':                 '🇶🇦',
  'Germany':               '🇩🇪',
  'France':                '🇫🇷',
  'Portugal':              '🇵🇹',
  'Turkey':                '🇹🇷',
  'Las Vegas':             '🇺🇸',
}

export function getTeamColor(constructorId) {
  if (!constructorId) return '#888888'
  return TEAM_COLORS[constructorId.toLowerCase().replace(/\s+/g, '_')] || '#888888'
}

export function getDriverFlag(nationality) {
  return COUNTRY_FLAGS[nationality] || '🏳️'
}

export function getCircuitFlag(country) {
  if (!country) return '🏁'
  return CIRCUIT_FLAGS[country] || CIRCUIT_FLAGS[country.trim()] || '🏁'
}

export function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })
}

export function formatRaceName(name) {
  return (name || '').replace('Grand Prix', 'GP').replace('Formula 1', '').trim()
}
