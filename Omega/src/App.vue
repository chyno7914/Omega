<script setup lang='ts'>
  import {useTESTStore} from './store'
  const Test = useTESTStore()
  const change = ()=>{
    Test.current++
  }
</script>
<template>
  <router-view> </router-view>
</template>


<style scoped>

</style>