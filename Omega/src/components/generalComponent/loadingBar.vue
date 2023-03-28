<template>
  <div class="wraps">
    <div ref="bar" class="bar" v-show="showFlag"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
let speed = ref<number>(1);
let bar = ref<HTMLElement>();
let timer = ref<number>(0);
let showFlag = ref<boolean>(false);
const startLoading = () => {
  let dom = bar.value as HTMLElement;
  window.requestAnimationFrame(function fn() {
    showFlag.value = true;
    if (speed.value < 100) {
      speed.value += 1;
      dom.style.width = speed.value + "%";
      timer.value = window.requestAnimationFrame(fn);
    } else {
      speed.value = 1;
      window.cancelAnimationFrame(timer.value);
      setTimeout(() => {
        window.requestAnimationFrame(() => {
          showFlag.value = false;
        });
      }, 500);
    }
  });
};
const endLoading = () => {
  let dom = bar.value as HTMLElement;
  setTimeout(() => {
    window.requestAnimationFrame(() => {
      speed.value = 100;
      dom.style.width = speed.value + "%";
    });
  }, 500);
};
defineExpose({
  startLoading,
  endLoading,
});
</script>

<style scoped lang="less">
.wraps {
  position: fixed;
  top: 0;
  width: 100%;
  height: 2px;
  .bar {
    height: inherit;
    width: 0;
    background-color: skyblue;
  }
}
</style>
