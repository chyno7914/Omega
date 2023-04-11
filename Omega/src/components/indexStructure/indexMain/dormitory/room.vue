<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column prop="age" label="Age"></el-table-column>
      <el-table-column prop="address" label="Address"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { ref, reactive } from "vue";
import { getTableData } from "./api"; // 模拟异步请求数据

export default {
  name: "PaginationTable",
  setup() {
    const currentPage = ref(1);
    const pageSize = ref(10);
    const total = ref(0);
    const tableData = reactive([]);

    const fetchData = async () => {
      const { data } = await getTableData(currentPage.value, pageSize.value);
      tableData.splice(0, tableData.length, ...data);
      total.value = 100; // 设置表格数据总条数（模拟数据）
    };

    const handleSizeChange = (val: any) => {
      pageSize.value = val;
      fetchData();
    };

    const handleCurrentChange = (val: any) => {
      currentPage.value = val;
      fetchData();
    };

    fetchData(); // 初始化时获取表格数据

    return {
      currentPage,
      pageSize,
      total,
      tableData,
      handleSizeChange,
      handleCurrentChange,
    };
  },
};
</script>
