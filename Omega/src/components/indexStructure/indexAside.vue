<template>
  <el-scrollbar>
    <el-menu
      :default-active="uniqueRoute"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      unique-opened
      router
    >
      <el-sub-menu
        v-for="item in Astraea.menu"
        :key="item.mid"
        :index="item.mid + ''"
      >
        <template #title>
          <el-icon>
            <component :is="$icon[item.icon]" style="color: #123456">
            </component>
          </el-icon>
          <span>{{ item.sign }}</span>
        </template>
        <el-menu-item
          v-for="leaf in Astraea.retrieleaves(item.mid)"
          :key="leaf.path"
          :index="leaf.path"
        >
          {{ leaf.sign }}
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useAstraeaStore } from "@/store";
import { useRouter } from "vue-router";
const router = useRouter();
const isCollapse = ref(false);
const Astraea = useAstraeaStore();
const uniqueRoute = ref(router.currentRoute.value.path);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
watch(
  () => router.currentRoute.value.path,
  (newVal, OldVal) => {
    uniqueRoute.value = newVal;
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>

<style scoped>
.el-menu {
  outline: none;
  height: 95vh;
}
.el-sub-menu {
  text-align: center;
}
</style>
