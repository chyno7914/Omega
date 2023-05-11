<template>
  <el-table border fit class="top-table" style="width: 100%">
    <el-table-column label="学号" width="" align="center">
      <template #default="scope: { row: DataType }">
        <div style="align-items: center">
          <span style="text-align: center">{{ scope.row.sid }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="姓名" width="" align="center">
      <template #default="scope: { row: DataType }">
        <div style="align-items: center">
          <span style="text-align: center">{{ scope.row.sname }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="性别" width="" align="center">
      <template #default="scope: { row: DataType }">
        <div style="align-items: center">
          <el-icon>
            <component
              :is="$icon[scope.row.icon]"
              :style="{ color: scope.row.color }"
            >
            </component>
          </el-icon>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="生源地" align="center" width="">
      <template #default="scope: { row: DataType }">
        <div style="align-items: center">
          <span style="text-align: center">{{ scope.row.census }}</span>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <vue3-seamless-scroll
    class="seamless"
    :list="dataList"
    :hover="true"
    :step="0.4"
    :wheel="true"
    :isWatch="true"
  >
    <el-table
      fit
      highlight-current-row
      style="width: 100%"
      max-height="800px"
      :data="dataList"
      class="bottom-table"
    >
      <el-table-column label="学号" width="" align="center">
        <template #default="scope: { row: DataType }">
          <div style="align-items: center">
            <span style="text-align: center">{{ scope.row.sid }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="" align="center">
        <template #default="scope: { row: DataType }">
          <div style="align-items: center">
            <span style="text-align: center">{{ scope.row.sname }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="" align="center">
        <template #default="scope: { row: DataType }">
          <div style="align-items: center">
            <el-icon>
              <component
                :is="$icon[scope.row.icon]"
                :style="{ color: scope.row.color }"
              >
              </component>
            </el-icon>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="生源地" align="center" width="">
        <template #default="scope: { row: DataType }">
          <div style="align-items: center">
            <span style="text-align: center">{{ scope.row.census }}</span>
          </div>
        </template>
      </el-table-column>
      <template #empty>
        <div class="flex items-center justify-center h-100%">
          <el-empty />
        </div>
      </template>
    </el-table>
  </vue3-seamless-scroll>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { listSearch } from "@/api/chart";
type DataType = {
  sid: number;
  sname: string;
  gender: number;
  census: string;
  icon: string;
  color: string;
};
const dataList = reactive<DataType[]>([]);
const fetchData = async () => {
  dataList.splice(0, dataList.length, ...(await listSearch()).data.message);
};
fetchData();
</script>

<style scoped>
.seamless {
  width: 100%;
  height: 220px;
  overflow: hidden;
}
.top-table >>> .el-table__body-wrapper {
  display: none;
}

.bottom-table >>> .el-table__header-wrapper {
  display: none;
  width: 100%;
}
</style>
