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
        {{ game.awayTeam }}
      </div>
      Runs: <UInput v-model="game.awayRuns" type="number" :min="0" class="w-16" />
      IP: <UInput v-model="game.awayIP" type="number" :min="0" class="w-16" />
      <div class="w-2" />
      <div class="font-bold text-amber-500 pr-1">
        {{ game.homeTeam }}
      </div>
      Runs: <UInput v-model="game.homeRuns" type="number" :min="0" class="w-16" />
      IP: <UInput v-model="game.homeIP" type="number" :min="0" class="w-16" />
    </div>
    <h2 class="mb-2 text-lg text-sky-500 font-bold">
      TQB:
    </h2>
    <div v-for="team in teams" :key="team.name" class="mb-2 flex flex-row gap-2 items-center">
      {{ team.name }}
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

// TODO can be achieved in better way?
watch(teams, () => {
  games.value[0]!.awayTeam = teams.value[0]!.name
  games.value[0]!.homeTeam = teams.value[1]!.name
  games.value[1]!.awayTeam = teams.value[1]!.name
  games.value[1]!.homeTeam = teams.value[2]!.name
  games.value[2]!.awayTeam = teams.value[2]!.name
  games.value[2]!.homeTeam = teams.value[0]!.name
}, { deep: true})

const games: Ref<Game[]> = ref([
  {
    id: 1,
    awayTeam: teams.value[0]!.name, // TODO is this a good way of referencing the team name?
    awayScore: 0,
    awayIP: 0,
    homeTeam: teams.value[1]!.name,
    homeScore: 0,
    homeIP: 0,
  }, 
  {
    id: 2,
    awayTeam: teams.value[1]!.name,
    awayScore: 0,
    awayIP: 0,
    homeTeam: teams.value[2]!.name,
    homeScore: 0,
    homeIP: 0,
  }, 
  {
    id: 3,
    awayTeam: teams.value[2]!.name,
    awayScore: 0,
    awayIP: 0,
    homeTeam: teams.value[0]!.name,
    homeScore: 0,
    homeIP: 0,
  }
])
</script>
