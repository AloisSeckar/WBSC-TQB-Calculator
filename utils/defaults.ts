function initTQB() {
  return { tqb: 'N/A', runsFor: 0, runsAgainst: 0, ipOffense: 0, ipDefense: 0, order: 0 }
}

export function getDefaultTeams(): Team[] {
  return [
    { id: 1, name: 'Team 1', tqb: initTQB() },
    { id: 2, name: 'Team 2', tqb: initTQB() },
    { id: 3, name: 'Team 3', tqb: initTQB() },
  ]
}

export function getDefaultGames(): Game[] {
  return [
    { id: 1, awayTeam: 1, awayRuns: 0, awayIP: 7, homeTeam: 2, homeRuns: 0, homeIP: 7 },
    { id: 2, awayTeam: 2, awayRuns: 0, awayIP: 7, homeTeam: 3, homeRuns: 0, homeIP: 7 },
    { id: 3, awayTeam: 3, awayRuns: 0, awayIP: 7, homeTeam: 1, homeRuns: 0, homeIP: 7 },
  ]
}
