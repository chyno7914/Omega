<template>
  <el-drawer v-model="drawer" append-to-body size="16%">
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header" style="white-space: nowrap">
        <h2 style="display: inline">请求进程</h2>
      </div>
    </template>
    <div style="text-align: center; height: 75%; margin-left: 30%">
      <el-steps :active="homeobox" direction="vertical">
        <el-step title="请求填写" :icon="Edit" />
        <el-step title="请求上传" :icon="Upload" />
        <el-step title="请求受理" :icon="DocumentChecked" />
        <el-step title="请求注销" :icon="Position" v-if="sequence == 4" />
      </el-steps>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { reactive, ref, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAstraeaStore, useZeusStore, useDemeterStore } from "@/store";
import {
  Edit,
  Position,
  Upload,
  DocumentChecked,
} from "@element-plus/icons-vue";
defineExpose({
  showDrawer: (boundary: number, position: number) => {
    drawer.value = true;
    homeobox.value = position;
    sequence.value = boundary;
  },
});
// const props = withDefaults(
//   defineProps<{
//   }>(),
//   {}
// );
const router = useRouter();
const route = useRoute();
const Astraea = useAstraeaStore();
const Zeus = useZeusStore();
const drawer = ref(false);
const homeobox = ref<number>(1);
const sequence = ref<number>(1);
</script>

<style scoped>
.top {
  height: 50%;
  background-color: pink;
}
#censusPie {
  height: 300px;
  background-color: blue;
}
</style>
