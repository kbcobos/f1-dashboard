import { useState, useEffect } from 'react'

const BASE_URL = 'https://api.jolpi.ca/ergast/f1'
const CACHE = {}

async function fetchF1(endpoint) {
  if (CACHE[endpoint]) return CACHE[endpoint]
  const res = await fetch(`${BASE_URL}${endpoint}`)
  if (!res.ok) throw new Error(`Error ${res.status}`)
  const data = await res.json()
  CACHE[endpoint] = data
  return data
}

export function useDriverStandings(season = '2026') {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetchF1(`/${season}/driverStandings.json`)
      .then(res => {
        const list = res.MRData.StandingsTable.StandingsLists[0]
        setData(list ? list.DriverStandings : [])
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [season])

  return { data, loading, error }
}

export function useConstructorStandings(season = '2026') {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetchF1(`/${season}/constructorStandings.json`)
      .then(res => {
        const list = res.MRData.StandingsTable.StandingsLists[0]
        setData(list ? list.ConstructorStandings : [])
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [season])

  return { data, loading, error }
}

export function useRaceCalendar(season = '2026') {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetchF1(`/${season}.json`)
      .then(res => {
        setData(res.MRData.RaceTable.Races)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [season])

  return { data, loading, error }
}

export function useRaceResults(season = '2026', round) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!round) return
    setLoading(true)
    setData(null)
    fetchF1(`/${season}/${round}/results.json`)
      .then(res => {
        const races = res.MRData.RaceTable.Races
        setData(races.length ? races[0].Results : [])
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [season, round])

  return { data, loading, error }
}
