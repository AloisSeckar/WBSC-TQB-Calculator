export function initTQB() {
  return { tqb: '0.0000', runsFor: 0, runsAgainst: 0, ipOffense: 0, ipDefense: 0, order: 0 }
}

export function getDefaultTeams(entries?: number): Team[] {
  const result = [
    { id: 1, name: 'Team 1', tqb: initTQB() },
    { id: 2, name: 'Team 2', tqb: initTQB() },
    { id: 3, name: 'Team 3', tqb: initTQB() },
  ]
  if (entries === 4) {
    result.push(
      { id: 4, name: 'Team 4', tqb: initTQB() },
    )
  }
  return result
}

export function getDefaultGames(entries?: number): Game[] {
  const result = [
    { id: 1, awayTeam: 1, awayRuns: 0, awayIP: 7, homeTeam: 2, homeRuns: 0, homeIP: 7 },
    { id: 2, awayTeam: 2, awayRuns: 0, awayIP: 7, homeTeam: 3, homeRuns: 0, homeIP: 7 },
    { id: 3, awayTeam: 3, awayRuns: 0, awayIP: 7, homeTeam: 1, homeRuns: 0, homeIP: 7 },
  ]
  if (entries === 4) {
    result.push(
      {
        id: 4, awayTeam: 4, awayRuns: 0, awayIP: 7, homeTeam: 1, homeRuns: 0, homeIP: 7 },
      { id: 5, awayTeam: 4, awayRuns: 0, awayIP: 7, homeTeam: 2, homeRuns: 0, homeIP: 7 }, {
        id: 6, awayTeam: 4, awayRuns: 0, awayIP: 7, homeTeam: 3, homeRuns: 0, homeIP: 7 },
    )
  }
  return result
}
