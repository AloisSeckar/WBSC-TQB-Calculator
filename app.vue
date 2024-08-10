<template>
  <div>
    <h1 class="mb-4 text-2xl font-bold">
      WBSC TQB Calculator
    </h1>
    <div class="mb-4">
      Online tool for qucikly calculating TQB method at WBSC tournaments
    </div>
    <div>
      Insert teams:
    </div>
    <div v-for="team in teams" :key="team.name" class="mb-2 flex flex-row gap-2 items-center">
      <UInput v-model="team.name" />
    </div>
    <div>
      Insert scores:
    </div>
    <div v-for="game in games" :key="game.id" class="mb-2 flex flex-row gap-2 items-center">
      Away:
      <UInput v-model="game.awayTeam" />
      Away PTS:
      <UInput v-model="game.awayScore" type="number" />
      Away IP:
      <UInput v-model="game.awayIP" type="number" />
      Home:
      <UInput v-model="game.homeTeam" />
      Home PTS:
      <UInput v-model="game.homeScore" type="number" />
      Home IP:
      <UInput v-model="game.homeIP" type="number" />
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

const games: Game[] = [
  {
    id: 1,
    awayTeam: teams.value[0]!.name,
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
]
</script>
