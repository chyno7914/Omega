<template>
  <el-table :data="dataList" border style="width: 100%; height: 100%; line-height: 100px;font-size: large; background-color: transparent; border: 4px solid #1E90FF; box-shadow: 0 2px 12px 0 rgba(53, 64, 82, 0.05);" :header-row-style="{height: '100px'}" :row-style="{height: '100px', lineHeight: '100px', textAlign: 'center'}">
    <el-table-column style="height: 100px;text-align: center; line-height:100px;" prop="inuse" label="住户" align="center" />
    <el-table-column style="height: 100px;text-align: center; line-height:100px;" prop="total" label="余量" align="center" />
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
<style scoped>

</style>
