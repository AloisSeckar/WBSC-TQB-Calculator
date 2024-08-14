export type Team = {
  id: number
  name: string
}

export type Game = {
  id: number
  awayTeam: Team
  awayRuns: number
  awayIP: number
  homeTeam: Team
  homeRuns: number
  homeIP: number
}

export type TQB = {
  team: string
  runsFor: number
  runsAgainst: number
  ipOffense: number
  ipDefense: number
  tqb: string
  order: number
}
