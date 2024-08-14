const TEAM_1 = { id: 1, name: 'Team 1' }
const TEAM_2 = { id: 2, name: 'Team 2' }
const TEAM_3 = { id: 3, name: 'Team 3' }

export const DEFAULT_TEAMS = [
  TEAM_1, TEAM_2, TEAM_3,
]

export const DEFAULT_GAMES = [
  {
    id: 1,
    awayTeam: TEAM_1,
    awayRuns: 0,
    awayIP: 7,
    homeTeam: TEAM_2,
    homeRuns: 0,
    homeIP: 7,
  },
  {
    id: 2,
    awayTeam: TEAM_2,
    awayRuns: 0,
    awayIP: 7,
    homeTeam: TEAM_3,
    homeRuns: 0,
    homeIP: 7,
  },
  {
    id: 3,
    awayTeam: TEAM_3,
    awayRuns: 0,
    awayIP: 7,
    homeTeam: TEAM_1,
    homeRuns: 0,
    homeIP: 7,
  },
]
