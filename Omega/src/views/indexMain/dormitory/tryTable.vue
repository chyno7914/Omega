<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        placeholder="学号"
        style="width: 160px"
        class="filter-item"
        v-model="searchList.sid"
        :formatter="(value:string) => value.replace(/[^\d]/g, '')"
        clearable
      />
      <el-input
        placeholder="姓名"
        style="width: 160px"
        class="filter-item"
        v-model="searchList.sname"
        :formatter="(value:string) => value.replace(/[^\u4e00-\u9fa5a-zA-Z_]/g, '')"
        clearable
      />
      <el-select-v2
        v-model="searchList.flat"
        filterable
        :options="flatsOptions"
        placeholder="公寓"
        class="filter-item"
        style="width: 130px"
        clearable
      />
      <el-input
        placeholder="房间"
        style="width: 160px"
        class="filter-item"
        v-model="searchList.room"
        :formatter="(value:string) => value.replace(/[^\d]/g, '')"
        clearable
      />
      <el-select-v2
        v-model="searchList.major"
        filterable
        :options="majorsOptions"
        placeholder="专业"
        class="filter-item"
        style="width: 179px"
        multiple
        collapse-tags
        clearable
      />
      <el-select-v2
        v-model="searchList.grade"
        filterable
        :options="gradesOptions"
        placeholder="年级"
        class="filter-item"
        style="width: 179px"
        multiple
        collapse-tags
        clearable
      />
      <el-select-v2
        v-model="searchList.class"
        filterable
        :options="classesOptions"
        placeholder="班级"
        class="filter-item"
        style="width: 179px"
        multiple
        collapse-tags
        clearable
      />
      <el-button class="filter-item" type="primary" style="" @click="fetchChum">
        <span style="margin-left: 5px"> 查找</span>
      </el-button>
      <el-button class="filter-item" type="primary" style=""> 导出 </el-button>
    </div>
    <div
      style="
        display: inline-block;
        padding: 5px;
        background-color: #f5f5f5;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        height: 750px;
        width: 100%;
      "
    >
      <el-auto-resizer>
        <template #default="{ height, width }">
          <el-table-v2
            :columns="columns"
            :data="chumData"
            :row-height="55"
            :width="width"
            :height="height"
          >
          </el-table-v2>
        </template>
        <template #empty>
          <div class="flex items-center justify-center h-100%">
            <el-empty />
          </div>
        </template>
      </el-auto-resizer>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { estimate, searchTname, gatherChum } from "@/api/table";
import { useHermesStore, useDemeterStore } from "@/store";
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import {
  ElButton,
  ElIcon,
  ElTag,
  ElTooltip,
  TableV2FixedDir,
} from "element-plus";
import { Sort, SortUp, SortDown } from "@element-plus/icons-vue";
import type { Column } from "element-plus";
const route = useRoute();
const Hermes = useHermesStore();
const Demeter = useDemeterStore();
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const liftingFlag = ref(false);
const chumData: any[] = reactive([]);
const searchList = reactive({
  sid: null,
  sname: null,
  room: null,
  major: null,
  grade: null,
  class: null,
  flat: null,
});
const provincesOptions = Demeter.provinces.map((_, idx) => ({
  value: _,
  label: _,
}));
const majorsOptions = Demeter.majors.map((_, idx) => ({
  value: _,
  label: _,
}));
const classesOptions = Demeter.classes.map((_, idx) => ({
  value: _,
  label: _,
}));
const gradesOptions = Demeter.grades.map((_, idx) => ({
  value: _,
  label: _,
}));
const flatsOptions = Demeter.flats.map((_, idx) => ({
  value: _,
  label: _,
}));

const initChum = async () => {
  const {
    data: { gross },
  } = await estimate(Hermes?.librakey);
  const {
    data: { message },
  } = await searchTname();
  total.value = gross;
  // console.log(total);
  Demeter.flats = message.slice();
};
const fetchChum = async () => {
  // console.log(searchList);

  const { data } = await gatherChum({
    pageSize: pageSize.value,
    currentPage: currentPage.value,
    flag: false,
    ...searchList,
  });
  // tableData.splice(0, tableData.length, ...data);
  chumData.splice(0, chumData.length, ...data.message);
};
const changeLifting = () => {
  liftingFlag.value = !liftingFlag.value;
};
const handleSizeChange = (val: any) => {
  pageSize.value = val;
};

const handleCurrentChange = (val: any) => {
  currentPage.value = val;
};
const columns: Column<any>[] = [
  {
    key: "sid",
    title: "uid",
    dataKey: "sid",
    width: 230,
    align: "center",
    headerCellRenderer: () => (
      <>
        <div
          onClick={changeLifting}
          style="display: flex; align-items: center; white-space: nowrap;"
        >
          uid
          <el-icon color="#409EFC" style="margin-left: 5px;">
            {liftingFlag.value ? <SortUp /> : <SortDown />}
          </el-icon>
        </div>
      </>
    ),
    cellRenderer: ({ cellData: sid }) => <>{sid}</>,
  },

  {
    key: "sid",
    title: "头像",
    dataKey: "sid",
    width: 230,
    align: "center",
    cellRenderer: ({ cellData: data }) => <>{data}</>,
  },
  {
    key: "tname",
    title: "用户名",
    dataKey: "tname",
    width: 230,
    align: "center",
    cellRenderer: ({ cellData: tname }) => <>{tname}</>,
  },
  {
    key: "bid",
    title: "权限",
    dataKey: "bid",
    width: 230,
    align: "center",
    cellRenderer: ({ cellData: bid }) => <>{bid}</>,
  },
  {
    key: "major",
    title: "电话号码",
    dataKey: "major",
    width: 310,
    align: "center",
    cellRenderer: ({ cellData: major }) => <>{major}</>,
  },
  {
    key: "operations",
    title: "操作",
    cellRenderer: () => (
      <>
        <ElButton size="small" type="danger">
          删除
        </ElButton>
      </>
    ),
    width: 240,
    align: "center",
  },
];
initChum();
fetchChum();
// console.log(total.value);
</script>
<style scoped>
.app-container {
  padding: 0 10px;
  padding-right: 20px;
  position: fixed;
  width: 87%;
}
.filter-container {
  margin: 10px 0;
}
.filter-item {
  margin-left: 10px;
}
</style>
