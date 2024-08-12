<template>
  <div class="m-4">
    <h1 class="mb-4 text-2xl text-sky-500 font-bold">
      WBSC TQB Calculator
    </h1>
    <div class="mb-4">
      Online tool for qucikly calculating TQB method at WBSC tournaments
    </div>
    <h2 class="mb-2 text-lg text-sky-500 font-bold">
      Insert teams:
    </h2>
    <div class="mb-4 flex flex-row gap-2 items-center">
      <UInput v-for="team in teams" :key="team.name" v-model="team.name" class="w-40" />
      <UButton color="emerald" class="w-8 gap-x-0">+</UButton>
      <UButton color="red" class="w-8 gap-x-0">-</UButton>
    </div>
    <h2 class="mb-2 text-lg text-sky-500 font-bold">
      Insert scores:
    </h2>
    <div v-for="game in games" :key="game.id" class="mb-2 flex flex-row gap-2 items-center">
      <div class="font-bold text-amber-500 pr-1">
        {{ game.awayTeam.name }}
      </div>
      Runs: <UInput v-model="game.awayRuns" type="number" :min="0" class="w-16" />
      IP: <UInput v-model="game.awayIP" type="number" :min="1" class="w-16" />
      <div class="w-2" />
      <div class="font-bold text-amber-500 pr-1">
        {{ game.homeTeam.name }}
      </div>
      Runs: <UInput v-model="game.homeRuns" type="number" :min="0" class="w-16" />
      IP: <UInput v-model="game.homeIP" type="number" :min="1" class="w-16" />
    </div>
    <h2 class="mb-2 text-lg text-sky-500 font-bold">
      TQB:
    </h2>
    <div v-for="tqb in tqbs" :key="tqb.team" class="mb-2 flex flex-row gap-2 items-center">
      <div class="font-bold text-amber-500">{{ tqb.team }}</div> = {{ tqb.tqb }} ({{ tqb.order }})
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'WBSC TQB Calculator',
  htmlAttrs: {
    lang: 'en',
  },
})

const teams: Ref<Team[]> = ref([{name: 'Team 1'}, {name: 'Team 2'}, {name: 'Team 3'}])
watch(teams, async () => {
  tqbs.value.length = 0
}, { deep: true })

const games: Ref<Game[]> = ref([
  {
    id: 1,
    awayTeam: teams.value[0],
    awayScore: 0,
    awayIP: 7,
    homeTeam: teams.value[1],
    homeScore: 0,
    homeIP: 7,
  }, 
  {
    id: 2,
    awayTeam: teams.value[1],
    awayScore: 0,
    awayIP: 7,
    homeTeam: teams.value[2],
    homeScore: 0,
    homeIP: 7,
  }, 
  {
    id: 3,
    awayTeam: teams.value[2],
    awayScore: 0,
    awayIP: 7,
    homeTeam: teams.value[0],
    homeScore: 0,
    homeIP: 7,
  }
])

const tqbs: Ref<TQB[]> = ref([])
watch(games, () => {
  tqbs.value.length = 0

  games.value.forEach((g) => {
    if (!tqbs.value.some(t => t.team === g.awayTeam.name)) {
      tqbs.value.push({
        team: g.awayTeam.name,
        tqb: 'N/A',
        runsFor: 0,
        runsAgainst: 0,
        ipOffense: 0,
        ipDefense: 0,
        order: 0,
      })
    }
    const away = tqbs.value.find(t => t.team === g.awayTeam.name)!
    away.runsFor += g.awayRuns
    away.ipOffense += g.awayIP
    away.runsAgainst += g.homeRuns
    away.ipDefense += g.homeIP

    if (!tqbs.value.some(t => t.team === g.homeTeam.name)) {
      tqbs.value.push({
        team: g.homeTeam.name,
        tqb: 'N/A',
        runsFor: 0,
        runsAgainst: 0,
        ipOffense: 0,
        ipDefense: 0,
        order: 0,
      })
    }
    const home = tqbs.value.find(t => t.team === g.homeTeam.name)!
    home.runsFor += g.homeRuns
    home.ipOffense += g.homeIP
    home.runsAgainst += g.awayRuns
    home.ipDefense += g.awayIP
  })

  tqbs.value.forEach((tqb) => {
    const tqbNum = (tqb.runsFor / tqb.ipOffense) - (tqb.runsAgainst / tqb.ipDefense)
    tqb.tqb = tqbNum.toFixed(4)
  })

}, { deep: true})
</script>
