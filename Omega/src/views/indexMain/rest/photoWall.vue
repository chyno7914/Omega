<template>
  <div>
    <el-scrollbar hight="99vh">
      <div>
        <img v-lazy="item" width="500" v-for="item in imgList" />
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { useTESTStore, useAstraeaStore } from "@/store";
import { Directive } from "vue";
let imges: Record<string, { default: string }> = import.meta.glob(
  "assets/img/!(枫.*)",
  { eager: true }
);
let imgList = Object.values(imges).map((v) => v.default);
let vLazy: Directive<HTMLImageElement, string> = async (el, binding) => {
  const def = await import("assets/img/枫.png");
  el.src = def.default;
  const observer = new IntersectionObserver((enr) => {
    if (enr[0].intersectionRatio > 0) {
      el.src = binding.value;
      observer.unobserve(el);
    }
  });
  observer.observe(el);
};
console.log(import.meta.glob("assets/img/!(枫.*)", { eager: true }));
</script>

<style scoped></style>
