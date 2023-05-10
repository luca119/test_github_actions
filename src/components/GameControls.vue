<script setup lang="ts">
import { useGameStore } from '~/stores/game'

const props = defineProps<{score:number}>();

const game = useGameStore()
</script>

<template>
  <div flex max-w="600px" w-full mx-auto>
    <div text-left self-end>
      <div v-if="score < 128" class="lt-md:text-7xl text-8xl font-black font-mono text-light-800 leading-18" data-test="score">
        {{ score.toFixed(0) }}
      </div>
      <div v-else class="lt-md:text-7xl text-8xl font-black font-mono text-orange-500 leading-18" data-test="score">
        {{ score.toFixed(0) }}
      </div>
      <div text-3xl font-mono op50>
        Score
      </div>
      <div op50>
        Join the tiles, get to 2048!
      </div>
    </div>

    <span flex-1 />
    <div flex flex-col>
      <div text-right op50 font-medium font-mono text-xl>
        <div text-3xl>
          {{ game.highScore }}
        </div>
        <div text-base op70>
          High Score
        </div>
      </div>
      <span flex-1 />
      <div flex flex-row lt-md:flex-col lt-md:pt-2 gap-2>
        <Button @click="game.isMultiplayerGameOpen ? game.closeMultiplayerGame() : game.openMultiplayerGame()">
          {{ game.isMultiplayerGameOpen ? 'Leave' : 'Multiplayer' }}
        </Button>
        <Button primary @click="game.startNewGame()">
          New Game
        </Button>
      </div>
    </div>
  </div>
</template>