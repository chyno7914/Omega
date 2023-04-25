<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        placeholder="编号"
        style="width: 160px"
        class="filter-item"
        v-model="searchList.sid"
        :formatter="(value:string) => value.replace(/[^\d]/g, '')"
        clearable
      />
      <el-input
        placeholder="公寓"
        style="width: 160px"
        class="filter-item"
        v-model="searchList.sname"
        :formatter="(value:string) => value.replace(/[^\u4e00-\u9fa5a-zA-Z_]/g, '')"
        clearable
      />
      <el-button class="filter-item" type="primary" style="" @click="fetchChum">
        <span style="margin-left: 5px"> 查找</span>
      </el-button>
      <el-button class="filter-item" type="primary" style=""> 添加 </el-button>
      <el-button class="filter-item" type="primary" style=""> 导出 </el-button>
    </div>
    <el-row>
      <el-col
        v-for="(o, index) in 4"
        :key="o"
        :span="5"
        :offset="2"
        style="margin-top: 10px"
      >
        <el-card :body-style="{ padding: '0px' }" shadow="hover" v-triangle="1">
          <div style="" class="card-header">
            <div class="title">兴海阁</div>
            <div class="tid">{{ o }}</div>
          </div>

          <el-popover
            placement="right"
            title="详情"
            :width="200"
            trigger="hover"
            content="this is content, this is content, this is content"
          >
            <template #reference>
              <div>
                <el-progress
                  :percentage="percentage"
                  :color="customColors"
                  style="margin: 12px"
                />
              </div>
            </template>
          </el-popover>

          <div style="padding: 14px; float: right">
            <div class="bottom">
              <el-button text class="button">编辑</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="tsx" setup>
import { estimate, searchTname, gatherChum } from "@/api/table";
import { useHermesStore, useDemeterStore } from "@/store";
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
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
const percentage = ref(30);
const customColors = [
  { color: "#5cb87a", percentage: 20 },
  { color: "#1989fa", percentage: 40 },
  { color: "#6f7ad3", percentage: 50 },
  { color: "#e6a23c", percentage: 70 },
  { color: "#f56c6c", percentage: 90 },
];
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
initChum();
fetchChum();
// console.log(total.value);
</script>
<style scoped>
.app-container {
  padding: 0 10px;
  padding-right: 20px;
  text-align: center;
  position: fixed;
  width: 87%;
}
.filter-container {
  margin: 10px auto;
  display: inline-block;
  padding: 5px;
  background-color: #f5f5f5;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}
.filter-item {
  margin-left: 10px;
}
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
}

.image {
  width: 100%;
  display: block;
}
.title {
  text-align: center;
  line-height: 24px;
  font-size: 24px;
  font-weight: bold;
  color: #333333;
}
.tid {
  text-align: center;
  line-height: 50px;
  font-size: 12px;
  font-weight: bold;
  color: #ccc;
}
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
.card-header {
  width: 100%;
  padding-top: 10px;
  display: block;
}
</style>
