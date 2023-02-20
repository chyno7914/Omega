<script setup lang='ts'>
  import {useTESTStore} from './store'
  const Test = useTESTStore()
  const change = ()=>{
    Test.current++
  }
</script>
<template>
{{ Test.name }} -- {{ Test.current}}
<button @click="change">+</button>
</template>

<style scoped>

</style>