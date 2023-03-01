<template>
  {{ Test.current }}
  <button @click="change"></button>
</template>

<script lang="ts" setup>
import { useTESTStore } from '../store'
const Test = useTESTStore()
const change = () => {
    Test.current++
}
</script>

<style scoped>
</style>