<template>
  <div>
    <el-table
      :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      style="width: 100%"
    >
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="gender" label="性别"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[10, 30]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { ElTableColumn, ElPagination } from "element-plus";

interface TableItem {
  name: string;
  age: number;
  gender: string;
  address: string;
}

const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(30);

const tableData = reactive<TableItem[]>([
  { name: "张三", age: 25, gender: "男", address: "北京市海淀区" },
  { name: "李四", age: 32, gender: "女", address: "上海市松江区" },
  { name: "王五", age: 18, gender: "女", address: "广东省深圳市南山区" },
  { name: "赵六", age: 41, gender: "男", address: "湖南省长沙市岳麓区" },
  { name: "刘七", age: 27, gender: "男", address: "浙江省杭州市滨江区" },
  { name: "陈八", age: 36, gender: "女", address: "江苏省南京市玄武区" },
  { name: "朱九", age: 29, gender: "女", address: "四川省成都市双流区" },
  { name: "林十", age: 22, gender: "男", address: "福建省厦门市思明区" },
  { name: "张十一", age: 31, gender: "女", address: "北京市海淀区" },
  { name: "李十二", age: 24, gender: "女", address: "上海市松江区" },
  { name: "王十三", age: 19, gender: "男", address: "广东省深圳市南山区" },
  { name: "赵十四", age: 42, gender: "女", address: "湖南省长沙市岳麓区" },
  { name: "刘十五", age: 28, gender: "男", address: "浙江省杭州市滨江区" },
  { name: "陈十六", age: 35, gender: "男", address: "江苏省南京市玄武区" },
  { name: "朱十七", age: 23, gender: "女", address: "四川省成都市双流区" },
  { name: "林十八", age: 26, gender: "女", address: "福建省厦门市思明区" },
  { name: "张十九", age: 33, gender: "男", address: "北京市海淀区" },
  { name: "李二十", age: 30, gender: "男", address: "上海市松江区" },
  { name: "王二十一", age: 20, gender: "女", address: "广东省深圳市南山区" },
  { name: "赵二十二", age: 39, gender: "女", address: "湖南省长沙市岳麓区" },
  { name: "刘二十三", age: 26, gender: "男", address: "浙江省杭州市滨江区" },
  { name: "陈二十四", age: 38, gender: "女", address: "江苏省南京市玄武区" },
  { name: "朱二十五", age: 28, gender: "女", address: "四川省成都市双流区" },
  { name: "林二十六", age: 21, gender: "男", address: "福建省厦门市思明区" },
  { name: "张二十七", age: 30, gender: "女", address: "北京市海淀区" },
  { name: "李二十八", age: 23, gender: "男", address: "上海市松江区" },
  { name: "王二十九", age: 35, gender: "女", address: "广东省深圳市南山区" },
  { name: "赵三十", age: 43, gender: "女", address: "湖南省长沙市岳麓区" },
  { name: "刘三十一", age: 33, gender: "男", address: "浙江省杭州市滨江区" },
]);

const handleSizeChange = (val: number) => {
  pageSize.value = val;
  currentPage.value = 1;
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
};
</script>
