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
        v-limit-search="'searchFlat:limit'"
        clearable
      />
      <el-select-v2
        v-model="searchList.floor"
        filterable
        :options="floorsOptions"
        placeholder="楼层"
        class="filter-item"
        style="width: 160px"
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
      >
        <span style="margin-left: 5px"> 层显</span>
      </el-button>
      <el-button class="filter-item" type="primary" style="" disabled>
        导出
      </el-button>
      <el-switch
        class="mb-2"
        active-text="显示禁用"
        style="margin-left: 10px"
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
      <el-table-column label="公寓" width="200" align="center">
        <template #default="scope: any">
          <div style="align-items: center">
            <span style="text-align: center">{{ scope.row.tname }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="房间号" width="200px" align="center">
        <template #default="scope: any">
          <div style="align-items: center">
            <span style="text-align: center">{{ scope.row.rid }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="总床位" width="200px" align="center">
        <template #default="scope: any">
          <div style="align-items: center">
            <span style="text-align: center">{{ scope.row.tol_bed }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="已用床位" align="center" width="200">
        <template #default="scope: any">
          <div style="align-items: center">
            <span style="text-align: center">{{ scope.row.use_bed }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        class-name="status-col"
        width="100"
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
          <el-button size="small" @click="">编辑</el-button>
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
            @click=""
            v-show="!scope.row.use_bed"
            >禁用</el-button
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
      v-show="total"
      style="margin: 10px 30%"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <AddDialog
      :floors-options="floorsOptions"
      :flats-options="flatsOptions"
      ref="addDialogRef"
    ></AddDialog>
    <FloorDialog :target-flat="Zeus.flat" ref="floorDialogRef"></FloorDialog>
  </div>
</template>

<script lang="ts" setup>
import {
  estimate,
  searchTname,
  gatherRoom,
  searchCeiling,
  banRoom,
} from "@/api/table";
import { useHermesStore, useDemeterStore, useZeusStore } from "@/store";
import { reactive, ref, computed } from "vue";
import { useRouter } from "vue-router";
import AddDialog from "custom/roomTable/addDialog.vue";
import FloorDialog from "custom/roomTable/floorDialog.vue";
const router = useRouter();
const Hermes = useHermesStore();
const Demeter = useDemeterStore();
const Zeus = useZeusStore();
const addDialogRef = ref<InstanceType<typeof AddDialog>>();
const floorDialogRef = ref<InstanceType<typeof FloorDialog>>();
let currentPage = ref(1);
let pageSize = ref(20);
let total = ref(0);
let ceiling = ref(0);
let roomData: any[] = reactive([]);
let flats: string[] = reactive([]);
const searchList = reactive({
  rid: Zeus.rid,
  floor: null,
  flat: Zeus.flat,
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
  ({
    data: { ceiling: ceiling.value },
  } = await searchCeiling(Zeus.flat));
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
};
const handleCurrentChange = (val: any) => {
  currentPage.value = val;
};
const handleDownload = () => {
  // import("@/util/Export2Excel").then((excel) => {
  //   const tHeader = ["timestamp", "title", "type", "importance", "status"];
  //   const filterVal = [
  //     "timestamp",
  //     "title",
  //     "type",
  //     "importance",
  //     "status",
  //   ];
  //   const data = [];
  //   console.log(data);
  //   excel.export_json_to_excel({
  //     header: tHeader,
  //     data,
  //     filename: "table-list",
  //   });
  // });
};
const deactRoom = (rid: number) => {
  banRoom(rid);
  fetchRoom();
};
fetchRoom();
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
