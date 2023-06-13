<template>
  <div id="majorRoll"></div>
</template>

<script setup lang="ts">
import { reactive, ref, watch, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import { rollSearch } from "@/api/chart";
import * as echarts from "echarts";
interface DataType {
  name: string;
  value: number;
}

interface SearchType {
  genderList?: DataType[];
  majorList?: DataType[];
}
onMounted(async () => {
  await fetchData();
  initChart();
});
const dataList = reactive<SearchType>({});
const initChart = () => {
  const chart = echarts.init(
    document.querySelector("#majorRoll") as HTMLElement
  );
  chart.setOption({
    tooltip: {
      trigger: "item",
      formatter: "{b}:<br/> {c} ({d}%)",
    },
    series: [
      {
        name: "ChynoFrom",
        type: "pie",
        selectedMode: "single",
        radius: [0, "30%"],
        label: {
          position: "inner",
          fontSize: 14,
        },
        labelLine: {
          show: false,
        },
        data: dataList.genderList,
      },
      {
        name: "ChynoFrom",
        type: "pie",
        radius: ["45%", "60%"],
        labelLine: {
          show: true,
        },
        data: dataList.majorList,
      },
    ],
  });
};
const fetchData = async () => {
  const result = (await rollSearch()).data.message;
  dataList.genderList = result.genderList;
  dataList.majorList = result.majorList;
  console.log(dataList.genderList);
};
</script>

<style scoped>
#majorRoll {
  height: 300px;
  width: 300px;
}
</style>
