import { test, expect } from 'vitest'
import { DEFAULT_GAMES, DEFAULT_TEAMS } from '../utils/defaults'
import { calcTQB } from '../utils/functions'

// real example (U22WSECh 2024)
// CZE-FRA 7:0 (6/6 inn)
// CZE-GBR 0:7 (5/5 inn)
// GBR-FRA 4:6 (7/7 inn)
test('TQB real example', () => {
  const teams = DEFAULT_TEAMS
  const games = DEFAULT_GAMES

  teams[0]!.name = 'CZE'
  teams[1]!.name = 'FRA'
  teams[2]!.name = 'GBR'

  const game1 = games[0]!
  game1.awayTeam = 1
  game1.awayRuns = 0
  game1.awayIP = 6
  game1.homeTeam = 0
  game1.homeRuns = 7
  game1.homeIP = 6

  const game2 = games[0]!
  game2.awayTeam = 2
  game2.awayRuns = 7
  game2.awayIP = 5
  game2.homeTeam = 0
  game2.homeRuns = 0
  game2.homeIP = 5

  const game3 = games[0]!
  game3.awayTeam = 1
  game3.awayRuns = 6
  game3.awayIP = 7
  game3.homeTeam = 2
  game3.homeRuns = 4
  game3.homeIP = 7

  calcTQB(teams, games)

  expect(teams[0]!.tqb.tqb === '0.0000') // CZE
  expect(teams[1]!.tqb.tqb === '-0.3847') // FRA
  expect(teams[2]!.tqb.tqb === '0.4167') // GBR
})
