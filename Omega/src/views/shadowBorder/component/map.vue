<template>
  <div id="map"></div>
</template>

<script setup lang="ts">
import { reactive, ref, watch, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import { mapSearch } from "@/api/chart";
import * as echarts from "echarts";
import "@/assets/geo";
import "@/assets/china";
type DataType = {
  name: string;
  value: [number, number, number];
}[];
onMounted(async () => {
  await fetchData();
  initChart();
});
const initChart = () => {
  const chart = echarts.init(document.querySelector("#map") as HTMLElement);
  chart.setOption({
    geo: {
      map: "china",
      aspectScale: 0.8,
      layoutCenter: ["50%", "50%"],
      layoutSize: "100%",
      itemStyle: {
        areaColor: {
          type: "linear-gradient",
          x: 0,
          y: 1200,
          x2: 1000,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#152E6E",
            },
            {
              offset: 1,
              color: "#0673AD",
            },
          ],
          global: true,
        },
        shadowColor: "#0f5d9d",
        shadowOffsetX: 0,
        shadowOffsetY: 15,
        opacity: 0.5,
      },
      emphasis: {
        itemStyle: {
          areaColor: "#56b1da",
        },
        label: {
          show: true,
          color: "#FFFFFF",
          fontSize: 12,
        },
      },
      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(0, 10, 52, 1)",
            borderColor: "rgba(0, 10, 52, 1)",
            opacity: 0,
          },
          label: {
            show: true,
            color: "#009cc9",
            fontSize: 12,
          },
        },
      ],
    },
    series: [
      {
        type: "map",
        map: "china",
        aspectScale: 0.8,
        layoutCenter: ["50%", "50%"],
        layoutSize: "100%",
        label: {
          show: true,
          color: "#FFFFFF",
          fontSize: 12,
        },
        itemStyle: {
          areaColor: "#0c3653",
          borderColor: "#1cccff",
          borderWidth: 1.8,
        },
        emphasis: {
          itemStyle: {
            areaColor: "#56b1da",
          },
          label: {
            show: false,
            color: "#fff",
          },
          areaColor: "#123456",
        },
        data: dataList,
      },
      {
        type: "scatter",
        coordinateSystem: "geo",
        symbol: "pin",
        symbolSize: [45, 45],
        label: {
          show: true,
          color: "#fff",
          formatter(value: any) {
            return value.data.value[2];
          },
        },
        itemStyle: {
          color: "#1E90FF",
        },
        data: dataList,
        emphasis: {
          label: {
            show: true,
            color: "#fff",
          },
        },
      },
    ],
  });
};
const dataList = reactive<DataType[]>([]);
const fetchData = async () => {
  dataList.splice(0, dataList.length, ...(await mapSearch()).data.message);
};
// let data: DataType = [
//   {
//     name: "内蒙古",
//     // itemStyle: {
//     //   areaColor: "#56b1da",
//     // },
//     value: [110.3467, 41.4899, 6],
//   },
// ];
console.log(dataList);
</script>

<style scoped>
#map {
  height: 900px;
  width: 900px;
}
</style>
