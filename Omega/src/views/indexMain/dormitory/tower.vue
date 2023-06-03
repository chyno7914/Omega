<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        placeholder="编号"
        style="width: 160px"
        class="filter-item"
        v-model="searchList.tid"
        :formatter="(value:string) => value.replace(/[^\d]/g, '')"
        clearable
      />
      <el-input
        placeholder="公寓"
        style="width: 160px"
        class="filter-item"
        v-model="searchList.flat"
        :formatter="(value:string) => value.replace(/[^\u4e00-\u9fa5a-zA-Z_]/g, '')"
        clearable
      />
      <el-button
        class="filter-item"
        type="primary"
        style=""
        @click="fetchTower"
      >
        <span style="margin-left: 5px"> 查找</span>
      </el-button>
      <el-button
        class="filter-item"
        type="primary"
        style=""
        @click="addDialogRef?.addDialog()"
      >
        添加
      </el-button>
    </div>
    <el-row>
      <transition-group move-class="mmm">
        <el-col
          v-for="(o, index) in flatData"
          :key="o.tid"
          :span="5"
          :offset="2"
          style="margin-top: 10px"
        >
          <el-card
            :body-style="{ padding: '0px' }"
            shadow="hover"
            v-triangle="o.tgender"
          >
            <div style="" class="card-header">
              <div class="title">{{ o.tname }}</div>
              <div class="tid">
                <el-tag :type="o.tag_type" size="small"
                  >&nbsp; {{ o.tid }} &nbsp;</el-tag
                >
              </div>

              <!-- <el-tag :type="scope.row.tag_type">{{ scope.row.decipher }}</el-tag> -->
            </div>

            <el-popover
              placement="right"
              title="详情"
              :width="150"
              trigger="hover"
            >
              <p>总量：{{ o.tolly }}</p>
              <p>已用：{{ o.inuse }}</p>
              <template #reference>
                <div>
                  <el-progress
                    :percentage="
                      o.tolly
                        ? parseFloat(((o.inuse / o.tolly) * 100).toFixed(2))
                        : 0
                    "
                    :color="customColors"
                    style="margin: 12px"
                    @click="handleClick"
                  />
                </div>
              </template>
            </el-popover>

            <div style="padding: 14px; float: right">
              <div class="bottom">
                <el-button
                  text
                  class="button"
                  @click="setDialogRef?.floorDialog(o.tname)"
                  >详情</el-button
                >
                <el-button
                  text
                  class="button"
                  @click="setDialogRef?.floorDialog(o.tname)"
                  >编辑</el-button
                >
              </div>
            </div>
          </el-card>
        </el-col>
      </transition-group>
    </el-row>
  </div>
  <AddDialog ref="addDialogRef" :update-data="fetchTower"></AddDialog>
  <SetDialog ref="setDialogRef"></SetDialog>
</template>

<script lang="tsx" setup>
import { searchFlat } from "@/api/table";
import { useHermesStore, useDemeterStore } from "@/store";
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import AddDialog from "custom/flatTable/addDialog.vue";
import SetDialog from "custom/flatTable/setDialog.vue";
import ChartDrawer from "custom/roomTable/chartDrawer.vue";
import type { Column, ElRow } from "element-plus";
const addDialogRef = ref<InstanceType<typeof AddDialog>>();
const setDialogRef = ref<InstanceType<typeof SetDialog>>();
const chartDrawerRef = ref<InstanceType<typeof ChartDrawer>>();
function handleClick() {
  console.log("Popover clicked");
}
const route = useRoute();
const Hermes = useHermesStore();
const Demeter = useDemeterStore();
const liftingFlag = ref(false);
const flatData: any[] = reactive([]);
const searchList = reactive({
  tid: null,
  flat: null,
});
const customColors = [
  { color: "#5cb87a", percentage: 20 },
  { color: "#1989fa", percentage: 40 },
  { color: "#6f7ad3", percentage: 50 },
  { color: "#e6a23c", percentage: 70 },
  { color: "#f56c6c", percentage: 90 },
];
const fetchTower = async () => {
  // console.log(searchList);
  const {
    data: { message: data },
  } = await searchFlat(searchList.tid, searchList.tid);
  flatData.length = 0;
  flatData.push(...data.slice());
  // tableData.splice(0, tableData.length, ...data);
};
// const readDetail = (num: number, flat: string) => {
//   router.push({
//     name: "Chum",
//     query: {
//       rid: num,
//       flat,
//     },
//   });
// };
fetchTower();
</script>
<style scoped>
.mmm {
  transition: all 0.7s;
}
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
