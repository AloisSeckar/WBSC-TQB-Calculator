<template>
  <div class="m-4">
    <h1 class="mb-4 text-2xl text-sky-500 font-bold">
      WBSC TQB Calculator
    </h1>
    <div class="mb-4">
      Online tool for qucikly calculating TQB method at WBSC tournaments
    </div>
    <div class="mb-2 flex flex-row gap-2 text-center">
      <UButton color="emerald" size="lg" @click="addTeam">
        + Team
      </UButton>
      <UButton color="red" size="lg" @click="removeTeam">
        - Team
      </UButton>
      <UButton color="yellow" size="lg" @click="resetApp">
        Reset
      </UButton>
    </div>
    <h2 class="mb-2 text-xl text-sky-500 font-bold">
      Teams
    </h2>
    <div v-for="team in teams" :key="team.id" class="mb-2 flex flex-row gap-2 items-center">
      <UInput v-model="team.name" class="w-40" />
      <div class="text-lg">
        TQB: <strong>{{ team.tqb.tqb }}</strong>
      </div>
    </div>
    <h2 class="my-2 text-xl text-sky-500 font-bold">
      Scores
    </h2>
    <div v-for="game in games" :key="game.id" class="mb-2 flex flex-row gap-8 items-center">
      <div>
        <div class="font-bold text-amber-500 pr-1 mb-1">
          {{ getTeam(game.awayTeam).name }}
        </div><section />
        <div class="flex flex-row gap-2 items-center">
          Runs: <UInput v-model="game.awayRuns" type="number" :min="0" class="w-16" />
          IP: <UInput v-model="game.awayIP" type="number" :min="1" class="w-16" />
        </div>
      </div>
      <div>
        <div class="font-bold text-amber-500 pr-1 mb-1">
          {{ getTeam(game.homeTeam).name }}
        </div>
        <div class="flex flex-row gap-2 items-center">
          Runs: <UInput v-model="game.homeRuns" type="number" :min="0" class="w-16" />
          IP: <UInput v-model="game.homeIP" type="number" :min="1" class="w-16" />
        </div>
      </div>
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

const games: Ref<Game[]> = ref(DEFAULT_GAMES)

watch(games, () => {
  teams.value.forEach((t) => {
    const tqb = t.tqb
    tqb.ipDefense = 0
    tqb.ipOffense = 0
    tqb.runsFor = 0
    tqb.runsAgainst = 0
  })

  games.value.forEach((g) => {
    const away = getTeam(g.awayTeam).tqb
    away.runsFor += g.awayRuns || 0
    away.ipOffense += g.awayIP || 0
    away.runsAgainst += g.homeRuns || 0
    away.ipDefense += g.homeIP || 0

    const home = getTeam(g.homeTeam).tqb
    home.runsFor += g.homeRuns || 0
    home.ipOffense += g.homeIP || 0
    home.runsAgainst += g.awayRuns || 0
    home.ipDefense += g.awayIP || 0
  })

  teams.value.forEach((t) => {
    const tqb = t.tqb
    const tqbNum = ((tqb.runsFor || 0) / (tqb.ipOffense || 1)) - ((tqb.runsAgainst || 0) / (tqb.ipDefense || 1))
    tqb.tqb = tqbNum.toFixed(4)
  })
}, { deep: true })

function getTeam(teamId: number) {
  return teams.value.find(t => t.id === teamId)!
}

function addTeam() {
  alert('Soon!')
}

function removeTeam() {
  alert('Soon!')
}

function resetApp() {
  return navigateTo('/', { external: true })
}
</script>
