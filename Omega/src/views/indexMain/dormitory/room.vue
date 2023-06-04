<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select-v2
        v-model="searchList.flat"
        filterable
        :options="flatsOptions"
        placeholder="公寓"
        class="filter-item"
        style="width: 160px"
        v-limit-elsearch="'searchFlat:limit'"
        clearable
      />
      <el-select-v2
        v-model="searchList.floor"
        filterable
        :options="floorsOptions"
        placeholder="楼层"
        class="filter-item"
        style="width: 160px"
        :disabled="!searchList.flat"
        clearable
      />
      <el-input
        placeholder="房间"
        style="width: 160px"
        class="filter-item"
        v-model="searchList.rid"
        :formatter="(value:string) => value.replace(/[^\d]/g, '')"
        clearable
      />

      <el-button class="filter-item" type="primary" style="" @click="fetchRoom">
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
      <el-button
        class="filter-item"
        type="primary"
        style=""
        @click="floorDialogRef?.floorDialog()"
        v-has-show="'roomFloor:open'"
      >
        <span style="margin-left: 5px"> 层显</span>
      </el-button>
      <el-button
        class="filter-item"
        type="primary"
        style=""
        v-has-show="'roomFloor:open'"
        @click="chartDrawerRef?.showDrawer()"
      >
        <span style="margin-left: 5px"> 详情</span>
      </el-button>
      <el-button
        class="filter-item"
        type="primary"
        style=""
        @click="exportHandler()"
      >
        导出
      </el-button>
      <el-switch
        class="mb-2"
        active-text="显示禁用"
        style="margin-left: 10px"
        v-model="searchList.banFlag"
      />
    </div>
    <el-table
      border
      fit
      highlight-current-row
      style="width: 100%"
      max-height="800px"
      :data="roomData"
    >
      <el-table-column label="公寓" width="280" align="center">
        <template #default="scope: any">
          <div style="align-items: center">
            <span style="text-align: center">{{ scope.row.tname }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="房间号" width="280px" align="center">
        <template #default="scope: any">
          <div style="align-items: center">
            <span style="text-align: center">{{ scope.row.rid }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="总床位" width="280px" align="center">
        <template #default="scope: any">
          <div style="align-items: center">
            <span style="text-align: center">{{ scope.row.tol_bed }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="已用床位" align="center" width="280">
        <template #default="scope: any">
          <div style="align-items: center">
            <span style="text-align: center">{{ scope.row.use_bed }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        class-name="status-col"
        width="200"
        align="center"
      >
        <template #default="scope: any">
          <el-popover trigger="hover" placement="right" width="auto">
            <template #default>
              <!-- <div>学号: {{ scope.row.sid }}</div>
              <div>姓名: {{ scope.row.sname }}</div> -->
            </template>
            <template #reference>
              <el-tag :type="scope.row.type">{{ scope.row.decipher }}</el-tag>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <!-- <el-table-column label="Imp" width="80px">
        <template slot-scope="{ row }">
          <svg-icon icon-class="star" class="meta-item__icon" />
        </template>
      </el-table-column> -->
      <el-table-column
        label="功能"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template #default="scope: any">
          <el-button
            size="small"
            @click="
              changeDialogRef?.changeDialog(
                scope.row.tol_bed,
                scope.row.use_bed,
                scope.row.rid,
                scope.row.tid
              )
            "
            >修改</el-button
          >
          <el-button
            size="small"
            type="info"
            @click="readDetail(scope.row.rid, scope.row.tname)"
            v-show="!!scope.row.use_bed"
            >详情</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="deactRoom(scope.row.rid, scope.row.tname)"
            v-show="!scope.row.use_bed && scope.row.decipher != '禁用'"
            >禁用</el-button
          >
          <el-button
            size="small"
            type="success"
            @click="activeRoom(scope.row.rid, scope.row.tname)"
            v-show="scope.row.decipher == '禁用'"
            >激活</el-button
          >
        </template>
      </el-table-column>
      <!-- <template #overlay>
        <div
          class="el-loading-mask"
          style="display: flex; align-items: center; justify-content: center"
        >
          <el-icon
            class="is-loading"
            color="var(--el-color-primary)"
            :size="26"
          >
            <loading-icon />
          </el-icon>
        </div>
      </template> -->
      <template #empty>
        <div class="flex items-center justify-center h-100%">
          <el-empty />
        </div>
      </template>
    </el-table>
    <el-pagination
      v-if="total"
      style="margin: 10px 30%"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      v-model:currentPage="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
  <AddDialog
    :flats-options="flatsOptions"
    :fetch-room="fetchRoom"
    ref="addDialogRef"
  ></AddDialog>
  <FloorDialog :target-flat="Zeus.flat" ref="floorDialogRef"></FloorDialog>
  <ChangeDialog ref="changeDialogRef" :fetch-room="fetchRoom"></ChangeDialog>
  <ChartDrawer :flat="Zeus.flat" ref="chartDrawerRef"></ChartDrawer>
</template>

<script lang="ts" setup>
import {
  estimate,
  searchTname,
  gatherRoom,
  searchCeiling,
  banRoom,
  useRoom,
} from "@/api/table";
import { ElMessage } from "element-plus";
import { useHermesStore, useDemeterStore, useZeusStore } from "@/store";
import { reactive, ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import AddDialog from "custom/roomTable/addDialog.vue";
import FloorDialog from "custom/roomTable/floorDialog.vue";
import ChangeDialog from "custom/roomTable/changeDialog.vue";
import ChartDrawer from "custom/roomTable/chartDrawer.vue";
import { exportExcel } from "@/utils/exportExcel";
const router = useRouter();
const Hermes = useHermesStore();
const Demeter = useDemeterStore();
const Zeus = useZeusStore();
const addDialogRef = ref<InstanceType<typeof AddDialog>>();
const floorDialogRef = ref<InstanceType<typeof FloorDialog>>();
const changeDialogRef = ref<InstanceType<typeof ChangeDialog>>();
const chartDrawerRef = ref<InstanceType<typeof ChartDrawer>>();
let currentPage = ref(1);
let pageSize = ref(20);
let total = ref(0);
let ceiling = ref(0);
let roomData: any[] = reactive([]);
let flats: string[] = reactive([]);
const searchList = reactive({
  rid: Zeus.rid,
  floor: null,
  flat: Zeus.flat ? Zeus.flat : null,
  banFlag: false,
});
const flatsOptions = computed(() =>
  flats.map((_, idx) => ({
    value: _,
    label: _,
  }))
);
const floorsOptions = computed(() =>
  Array.from({ length: ceiling.value }, (_, index) => index + 1).map(
    (_, idx) => ({
      value: _,
      label: _,
    })
  )
);
const initRoom = async () => {
  const {
    data: { gross },
  } = await estimate(Hermes?.librakey);
  const {
    data: { message },
  } = await searchTname();

  total.value = gross;
  flats.length = 0;
  flats.push(...message.slice());
};
const fetchRoom = async () => {
  initRoom();
  const { data } = await gatherRoom({
    pageSize: pageSize.value,
    currentPage: currentPage.value,
    flag: false,
    ...searchList,
  });
  // tableData.splice(0, tableData.length, ...data);
  roomData.splice(0, roomData.length, ...data.message);
};
const readDetail = (num: number, flat: string) => {
  router.push({
    name: "Chum",
    query: {
      rid: num,
      flat,
    },
  });
};

const handleSizeChange = (val: any) => {
  pageSize.value = val;
  fetchRoom();
};
const handleCurrentChange = (val: any) => {
  currentPage.value = val;
  fetchRoom();
};
const deactRoom = async (target: number, flat: string) => {
  const {
    data: { message, status },
  } = await banRoom(target, flat);
  ElMessage({
    message,
    type: status ? "error" : "success",
  });
  fetchRoom();
};
const activeRoom = async (rid: number, flat: string) => {
  const {
    data: { message, status },
  } = await useRoom(rid, flat);
  ElMessage({
    message,
    type: status ? "error" : "success",
  });
  fetchRoom();
};
const exportHandler = () => {
  const titleArr = ["公寓", "房间", "总床位", "已用床位", "状态"];
  exportExcel(
    roomData.map(({ ...item }) => ({
      tname: item.tname,
      rid: item.rid,
      tolBar: item.tol_bed,
      useBed: item.use_bed,
      status: item.decipher,
    })),
    "test",
    titleArr,
    "1"
  );
};
fetchRoom();
watch(
  () => searchList.flat,
  async (v: string | null) => {
    ({
      data: { ceiling: ceiling.value },
    } = await searchCeiling(v));
  },
  {
    immediate: true,
  }
);
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
  margin: 10px auto;
  display: flex;
  justify-content: center;
}
.filter-item {
  margin-left: 10px;
}
</style>
