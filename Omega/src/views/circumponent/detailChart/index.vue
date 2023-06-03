<template>
  <div class="top" ref="elementTop">
    <div v-if="detailData.length" id="censusPie"></div>
    <div v-if="!detailData.length">
      <el-empty description="description" />
    </div>
  </div>
  <div></div>
</template>

<script setup lang="ts">
import { reactive, ref, watch, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import { detailSearch } from "@/api/chart";
import * as echarts from "echarts";
type DetailData = {
  name: string;
  value: number;
};
onMounted(async () => {
  await fetchDetail();
  initChart();
});
const route = useRoute();
const { flat: tname } = route.query;
const detailData: DetailData[] = reactive([]);
const initChart = () => {
  const chart = echarts.init(
    document.querySelector("#censusPie") as HTMLElement
  );
  chart.setOption({
    title: {
      text: "专业分布一览",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "详情",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        title: {
          text: "Customized Pie",
          left: "center",
          top: 20,
          textStyle: {
            color: "#ccc",
          },
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: detailData,
      },
    ],
  });
};
const fetchDetail = async () => {
  const {
    data: { data },
  } = await detailSearch(tname as string);
  detailData.length = 0;
  detailData.push(...data.slice());
};
</script>

<style scoped>
#censusPie {
  height: 700px;
}
</style>
