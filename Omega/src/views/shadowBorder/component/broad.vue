<template>
  <el-table :data="dataList" border style="width: 100%; height: 100%">
    <el-table-column prop="inuse" label="住户" align="center" />
    <el-table-column prop="total" label="余量" align="center" />
  </el-table>
</template>

<script lang="ts" setup>
import { broadSearch } from "@/api/chart";
import { reactive } from "vue";
interface DataType {
  inuse: number;
  total: number;
}
const dataList = reactive<DataType[]>([]);
const fetchData = async () => {
  dataList.splice(0, dataList.length, ...(await broadSearch()).data.message);
};

fetchData();
</script>
