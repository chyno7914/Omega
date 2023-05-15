<template>
  <PhotoCut ref="photoCutRef"></PhotoCut>
  <el-button @click="photoCutRef?.uploadImage()" @update="showData"></el-button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PhotoCut from "components/generalComponent/photoCut.vue";
const photoCutRef = ref<InstanceType<typeof PhotoCut>>();
const showData = (data: any) => {
  console.log(data, 1);
};
</script>

<style scoped lang="scss"></style>
