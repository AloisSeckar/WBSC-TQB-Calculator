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
      <UInput v-for="team in teams" :key="team.id" v-model="team.name" class="w-40" />
      <UButton color="emerald" class="w-8 gap-x-0">
        +
      </UButton>
      <UButton color="red" class="w-8 gap-x-0">
        -
      </UButton>
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
      <div class="font-bold text-amber-500">
        {{ tqb.team }}
      </div> = {{ tqb.tqb }} ({{ tqb.order }})
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

const teams: Ref<Team[]> = ref(DEFAULT_TEAMS)

watch(teams, async () => {
  tqbs.value.length = 0
}, { deep: true })

const games: Ref<Game[]> = ref(DEFAULT_GAMES)

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
    away.runsFor += g.awayRuns || 0
    away.ipOffense += g.awayIP || 0
    away.runsAgainst += g.homeRuns || 0
    away.ipDefense += g.homeIP || 0

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
    home.runsFor += g.homeRuns || 0
    home.ipOffense += g.homeIP || 0
    home.runsAgainst += g.awayRuns || 0
    home.ipDefense += g.awayIP || 0
  })

  tqbs.value.forEach((tqb) => {
    const tqbNum = ((tqb.runsFor || 0) / (tqb.ipOffense || 1)) - ((tqb.runsAgainst || 0) / (tqb.ipDefense || 1))
    tqb.tqb = tqbNum.toFixed(4)
  })
}, { deep: true })
</script>
