<template>
  {{ Test.current }}
  {{ Astraea.route }}
  b:{{ b }}
  <button @click="change"></button>
</template>

<script setup lang="ts">
import { useTESTStore, useAstraeaStore } from "@/store";
// import { __piniaKey__ } from "@/store/store-information";
// import("@/store/store-information").then((msg) => {
//   const a = "a";
//   msg[a]();
//   let arr = "['sd']";
//   console.log(eval(arr));
// });
const a = import("@/utils/routeGuide");

const Test = useTESTStore();
const Astraea = useAstraeaStore();
const change = () => {
  Test.setCurrent();
};
let b = eval(Test.clue);
// console.log(Astraea.route);
// if (Astraea.hasAccretionFlag) {
// Astraea.route.forEach((track: any) => {
//   console.log(track.name);
// });
// }

// async () => {
//   console.log(await import("@/store/store-information"));
// };
</script>

<style scoped></style>
