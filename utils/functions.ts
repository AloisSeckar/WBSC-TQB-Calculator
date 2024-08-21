export function calcTQB(teams: Team[], games: Game[]) {
  teams.forEach((t) => {
    const tqb = t.tqb
    tqb.ipDefense = 0
    tqb.ipOffense = 0
    tqb.runsFor = 0
    tqb.runsAgainst = 0
  })

  games.forEach((g) => {
    const away = teams.find(t => t.id === g.awayTeam)!.tqb
    away.runsFor += g.awayRuns || 0
    away.ipOffense += g.awayIP || 0
    away.runsAgainst += g.homeRuns || 0
    away.ipDefense += g.homeIP || 0

    const home = teams.find(t => t.id === g.homeTeam)!.tqb
    home.runsFor += g.homeRuns || 0
    home.ipOffense += g.homeIP || 0
    home.runsAgainst += g.awayRuns || 0
    home.ipDefense += g.awayIP || 0
  })

  teams.forEach((t) => {
    const tqb = t.tqb
    const tqbNum = ((tqb.runsFor || 0) / (tqb.ipOffense || 1)) - ((tqb.runsAgainst || 0) / (tqb.ipDefense || 1))
    tqb.tqb = tqbNum.toFixed(4)
  })
}
