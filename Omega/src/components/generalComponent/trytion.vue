<template>{{ a }}</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
const a = ref(0);
defineExpose({
  add: () => {
    a.value++;
  },
});
</script>

<style scoped></style>
