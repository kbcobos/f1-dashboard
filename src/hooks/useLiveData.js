import { useState, useEffect, useRef, useCallback } from 'react'

const BASE = 'https://api.openf1.org/v1'

async function fetchOpenF1(endpoint) {
  const res = await fetch(`${BASE}${endpoint}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export function useLatestSession() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchOpenF1('/sessions?session_key=latest')
      .then(data => setSession(data[0] || null))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { session, loading, error }
}

export function isSessionLive(session) {
  if (!session) return false
  const now = new Date()
  const start = new Date(session.date_start)
  const end = new Date(session.date_end)
  const bufferEnd = new Date(end.getTime() + 30 * 60 * 1000)
  return now >= start && now <= bufferEnd
}

export function useLivePositions(isLive, intervalMs = 5000) {
  const [data, setData] = useState([])
  const [lastUpdate, setLastUpdate] = useState(null)
  const timerRef = useRef(null)

  const fetch_ = useCallback(async () => {
    try {
      const [positions, intervals, stints, drivers] = await Promise.all([
        fetchOpenF1('/position?session_key=latest&date>=' + new Date(Date.now() - 120000).toISOString()),
        fetchOpenF1('/intervals?session_key=latest'),
        fetchOpenF1('/stints?session_key=latest'),
        fetchOpenF1('/drivers?session_key=latest'),
      ])

      const posMap = {}
      positions.forEach(p => {
        if (!posMap[p.driver_number] || p.date > posMap[p.driver_number].date) {
          posMap[p.driver_number] = p
        }
      })

      const intMap = {}
      intervals.forEach(i => {
        if (!intMap[i.driver_number] || i.date > intMap[i.driver_number].date) {
          intMap[i.driver_number] = i
        }
      })

      const stintMap = {}
      stints.forEach(s => {
        if (!stintMap[s.driver_number] || s.stint_number > stintMap[s.driver_number].stint_number) {
          stintMap[s.driver_number] = s
        }
      })

      const driverMap = {}
      drivers.forEach(d => { driverMap[d.driver_number] = d })

      const merged = Object.values(posMap)
        .map(p => ({
          driver_number: p.driver_number,
          position: p.position,
          driver: driverMap[p.driver_number] || {},
          interval: intMap[p.driver_number]?.interval ?? null,
          gap_to_leader: intMap[p.driver_number]?.gap_to_leader ?? null,
          compound: stintMap[p.driver_number]?.compound || null,
          tyre_age: stintMap[p.driver_number]?.tyre_age_at_start != null
            ? stintMap[p.driver_number].tyre_age_at_start
            : null,
          pit_count: stintMap[p.driver_number]?.stint_number
            ? stintMap[p.driver_number].stint_number - 1
            : 0,
        }))
        .sort((a, b) => a.position - b.position)

      setData(merged)
      setLastUpdate(new Date())
    } catch (e) {
      console.warn('Live fetch error:', e.message)
    }
  }, [])

  useEffect(() => {
    if (!isLive) { setData([]); return }
    fetch_()
    timerRef.current = setInterval(fetch_, intervalMs)
    return () => clearInterval(timerRef.current)
  }, [isLive, fetch_, intervalMs])

  return { data, lastUpdate }
}

export function useLiveWeather(isLive, intervalMs = 15000) {
  const [weather, setWeather] = useState(null)

  const fetch_ = useCallback(async () => {
    try {
      const data = await fetchOpenF1('/weather?session_key=latest')
      if (data.length > 0) setWeather(data[data.length - 1])
    } catch (e) {}
  }, [])

  useEffect(() => {
    if (!isLive) return
    fetch_()
    const t = setInterval(fetch_, intervalMs)
    return () => clearInterval(t)
  }, [isLive, fetch_, intervalMs])

  return weather
}

export function useLiveRaceControl(isLive, intervalMs = 8000) {
  const [messages, setMessages] = useState([])

  const fetch_ = useCallback(async () => {
    try {
      const data = await fetchOpenF1('/race_control?session_key=latest')
      setMessages(data.slice(-20).reverse()) // last 20, newest first
    } catch (e) {}
  }, [])

  useEffect(() => {
    if (!isLive) return
    fetch_()
    const t = setInterval(fetch_, intervalMs)
    return () => clearInterval(t)
  }, [isLive, fetch_, intervalMs])

  return messages
}
