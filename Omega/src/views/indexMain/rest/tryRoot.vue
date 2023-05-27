<template>
  <form @submit.prevent="onSubmit">
    <input v-model="value" />
    <button type="submit" :disabled="isLoading">Submit</button>
    <div>{{ data }}</div>
  </form>
</template>

<script setup lang="ts">
import { socket } from "@/socket";
import { ref, computed, reactive } from "vue";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import "animate.css";
let isLoading = ref<boolean>(false);
let value = ref("");
let data = ref("");
const onSubmit = () => {
  isLoading.value = true;

  socket.timeout(5000).emit("create-something", value.value, () => {
    isLoading.value = false;
  });
};
socket.on("have some success", (msg: string) => {
  data.value = msg;
});
</script>
<!-- <template>
  <div style="height: 333px">
    <el-steps :active="1" direction="vertical">
      <el-step title="Step 1" :icon="Edit" />
      <el-step title="Step 2" :icon="Upload" />
      <el-step title="Step 3" :icon="Picture" v-if="false" />
    </el-steps>
  </div>
</template>

<script lang="ts" setup>
import { Edit, Picture, Upload } from "@element-plus/icons-vue";
</script> -->
