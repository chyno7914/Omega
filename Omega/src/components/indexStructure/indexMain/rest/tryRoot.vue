<template></template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useAstraeaStore } from "@/store";
import { getCurrentInstance } from "vue";
import { useRouter, useRoute } from "vue-router";
const Astraea = useAstraeaStore();
const route = useRoute();
const router = useRouter();
const arr = ["value1", "value2", "value3"];
const sql = `SELECT * FROM mytable WHERE mycolumn IN ('${arr.join("','")}')`;
const toDisperse = (value: any) => {
  return `('${arr.join("','")}')`;
};
console.log(route.fullPath);
</script>
