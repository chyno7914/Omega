<template>
  <el-drawer v-model="drawer" :direction="direction" append-to-body>
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header" style="white-space: nowrap">
        <h2 style="display: inline">详情</h2>
        ·
        {{ props.flat }}
      </div>
    </template>

    <router-view></router-view>
  </el-drawer>
</template>

<script setup lang="ts">
import { reactive, ref, watch, onMounted } from "vue";
import * as echarts from "echarts";
import { useRouter, useRoute } from "vue-router";
import { useAstraeaStore, useZeusStore, useDemeterStore } from "@/store";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { addFlat } from "@/api/table";
import { type } from "os";
defineExpose({
  showDrawer: () => (drawer.value = true),
});
const props = withDefaults(
  defineProps<{
    flat: string | null;
  }>(),
  {}
);
const router = useRouter();
const route = useRoute();
const Astraea = useAstraeaStore();
const Zeus = useZeusStore();
let elementTop = ref<any>();
const drawer = ref(false);
const direction = ref("rtl");
watch(
  () => drawer.value,
  (e) => {
    let guidepost = route.path;
    if (e) {
      router.replace({
        path: guidepost + "/detail",
        query: {
          flat: props.flat,
        },
      });
    } else {
      router.replace({
        path: Astraea.arbiDirction(guidepost, "/detail"),
      });
    }
  },
  {
    immediate: true,
  }
);
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
