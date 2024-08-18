export type Team = {
  id: number
  name: string
  tqb: TQB
}

export type Game = {
  id: number
  awayTeam: number
  awayRuns: number
  awayIP: number
  homeTeam: number
  homeRuns: number
  homeIP: number
}

export type TQB = {
  runsFor: number
  runsAgainst: number
  ipOffense: number
  ipDefense: number
  tqb: string
  order: number
}
