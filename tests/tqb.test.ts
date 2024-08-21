import { test, expect } from 'vitest'
import { getDefaultGames, getDefaultTeams } from '../utils/defaults'
import { calcTQB } from '../utils/functions'

// artificial example (WBSC Baseball Competitions Regulations 2024 - Scenario 3)
// T1-T2 6:4 (8/9 inn)
// TT-T3 0:2 (9/9 inn)
// T2-T3 8:2 (8/9 inn)
test('TQB artificial example', () => {
  const teams = getDefaultTeams()
  const games = getDefaultGames()

  const game1 = games[0]!
  game1.awayTeam = 2
  game1.awayRuns = 4
  game1.awayIP = 9
  game1.homeTeam = 1
  game1.homeRuns = 6
  game1.homeIP = 8

  const game2 = games[1]!
  game2.awayTeam = 3
  game2.awayRuns = 2
  game2.awayIP = 9
  game2.homeTeam = 1
  game2.homeRuns = 0
  game2.homeIP = 9

  const game3 = games[2]!
  game3.awayTeam = 3
  game3.awayRuns = 2
  game3.awayIP = 9
  game3.homeTeam = 2
  game3.homeRuns = 8
  game3.homeIP = 8

  calcTQB(teams, games)

  expect(teams[0]!.tqb.tqb).toBe('0.0196') // T1
  expect(teams[1]!.tqb.tqb).toBe('0.2353') // T2
  expect(teams[2]!.tqb.tqb).toBe('-0.2484') // T3
})

// real example (U22WSECh 2024)
// CZE-FRA 7:0 (6/6 inn)
// CZE-GBR 0:7 (5/5 inn)
// GBR-FRA 4:6 (7/7 inn)
test('TQB real example', () => {
  const teams = getDefaultTeams()
  const games = getDefaultGames()

  const game1 = games[0]!
  game1.awayTeam = 2
  game1.awayRuns = 0
  game1.awayIP = 6
  game1.homeTeam = 1
  game1.homeRuns = 7
  game1.homeIP = 6

  const game2 = games[1]!
  game2.awayTeam = 3
  game2.awayRuns = 7
  game2.awayIP = 5
  game2.homeTeam = 1
  game2.homeRuns = 0
  game2.homeIP = 5

  const game3 = games[2]!
  game3.awayTeam = 2
  game3.awayRuns = 6
  game3.awayIP = 7
  game3.homeTeam = 3
  game3.homeRuns = 4
  game3.homeIP = 7

  calcTQB(teams, games)

  expect(teams[0]!.tqb.tqb).toBe('0.0000') // CZE
  expect(teams[1]!.tqb.tqb).toBe('-0.3846') // FRA
  expect(teams[2]!.tqb.tqb).toBe('0.4167') // GBR
})

// "dead-lock" example (all teams have the same record)
// T1-T2 0:1 (7/7 inn)
// T2-T3 0:1 (7/7 inn)
// T3-T1 0:1 (7/7 inn)
test('TQB dead-lock example', () => {
  const teams = getDefaultTeams()
  const games = getDefaultGames()

  games[0]!.awayRuns = 1
  games[0]!.homeRuns = 0

  games[1]!.awayRuns = 1
  games[1]!.homeRuns = 0

  games[2]!.awayRuns = 1
  games[2]!.homeRuns = 0

  calcTQB(teams, games)

  expect(teams[0]!.tqb.tqb).toBe('0.0000')
  expect(teams[1]!.tqb.tqb).toBe('0.0000')
  expect(teams[2]!.tqb.tqb).toBe('0.0000')
})
