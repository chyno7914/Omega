<template>
  <div class="container">
    <el-table class="top-table" :data="tableData" border style="width: 100%">
      <el-table-column prop="type" label="类型" width="120" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="content" label="内容" />
    </el-table>
    <vue3-seamless-scroll
      class="seamless"
      :list="tableData"
      :hover="true"
      :step="0.4"
      :wheel="true"
      :isWatch="true"
    >
      <el-table
        class="bottom-table"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column prop="type" label="类型" width="120" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="content" label="内容" />
      </el-table>
    </vue3-seamless-scroll>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const tableData: any = ref([]);

const getData = () => {
  for (let i = 0; i < 6; i++) {
    tableData.value.push({
      type: `家常菜${i + 1}`,
      name: `洋茄子炒鸡蛋${i + 1}`,
      content: `多情键客无情键${i + 1}`,
    });
  }
};
getData();
</script>

<style scoped>
.container {
  width: 500px;
  height: 300px;
}
.seamless {
  width: 100%;
  height: 220px;
  overflow: hidden;
}
:deep .top-table .el-table__body-wrapper {
  display: none;
}
:deep .bottom-table .el-table__header-wrapper {
  display: none;
  width: 100%;
}
</style>
