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
        v-limit-search="'searchFlat:limit'"
        placeholder="公寓"
        class="filter-item"
        style="width: 160px"
        clearable
      />
      <el-input
        placeholder="房间"
        style="width: 160px"
        class="filter-item"
        v-model="searchList.room"
        v-limit-search="'searchRoom:limit'"
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
      <el-button
        class="filter-item"
        type="primary"
        v-has-show="'chum:append'"
        @click="addDialogRef?.addDialog()"
      >
        添加
      </el-button>
      <el-button class="filter-item" type="primary" @click="exportHandler">
        导出
      </el-button>
      <el-switch
        v-model="value1"
        class="mb-2"
        active-text="退寝用户"
        style="margin-left: 10px"
      />
    </div>
    <el-table
      border
      fit
      highlight-current-row
      style="width: 100%"
      max-height="800px"
      :data="chumData"
    >
      <el-table-column label="学号" prop="sid" align="center" width="150">
        <template #default="scope: any">
          <div style="align-items: center">
            <span style="text-align: center">{{ scope.row.sid }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="150px" align="center">
        <template #default="scope: any">
          <div style="align-items: center">
            <span style="text-align: center">{{ scope.row.sname }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="公寓" width="150px" align="center">
        <template #default="scope: any">
          <div style="align-items: center">
            <span style="text-align: center">{{ scope.row.tname }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="房间" width="150px" align="center">
        <template #default="scope: any">
          <div style="align-items: center">
            <span style="text-align: center">{{ scope.row.rid }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="床位" width="150px" align="center">
        <template #default="scope: any">
          <div style="align-items: center">
            <span style="text-align: center">{{ scope.row.bid }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="专业" align="center" width="150">
        <template #default="scope: any">
          <div style="align-items: center">
            <span style="text-align: center">{{ scope.row.major }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="年级" align="center" width="150">
        <template #default="scope: any">
          <div style="align-items: center">
            <span style="text-align: center">{{ scope.row.grade }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="班级" align="center" width="150">
        <template #default="scope: any">
          <div style="align-items: center">
            <span style="text-align: center">{{ scope.row.class }}</span>
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
              <div>学号: {{ scope.row.sid }}</div>
              <div>姓名: {{ scope.row.sname }}</div>
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
          <el-button size="small" @click="">信息</el-button>
          <el-button size="small" @click="" type="success">离校</el-button>
          <el-button size="small" @click="" type="success">换寝</el-button>
          <el-button size="small" @click="" type="success">退寝</el-button>
          <el-button
            size="small"
            type="danger"
            v-has-show="'delete'"
            @click="removeHandler(scope.row.sid)"
            >删除</el-button
          >
        </template>
      </el-table-column>
      <template #empty>
        <div class="flex items-center justify-center h-100%">
          <el-empty />
        </div>
      </template>
    </el-table>
    <el-pagination
      v-show="total"
      style="margin-top: 10px; margin-left: 30%"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <AddDialog :fetchChum="fetchChum" ref="addDialogRef"></AddDialog>
  </div>
</template>

<script lang="ts" setup>
import { estimate, searchTname, gatherChum, deleteChum } from "@/api/table";
import { useHermesStore, useDemeterStore, useZeusStore } from "@/store";
import { reactive, ref, h, computed } from "vue";
import { useRoute } from "vue-router";
import { exportExcel } from "@/utils/exportExcel";
import AddDialog from "custom/chumTable/addDialog.vue";
import { ElMessageBox, ElMessage } from "element-plus";
const Hermes = useHermesStore();
const Demeter = useDemeterStore();
const Zeus = useZeusStore();
const route = useRoute();
const addDialogRef = ref<InstanceType<typeof AddDialog>>();
let currentPage = ref(1);
let pageSize = ref(20);
let total = ref(0);
let flats: string[] = reactive([]);
const chumData: any[] = reactive([]);
const value1 = ref(true);
const searchList = reactive({
  sid: null,
  sname: null,
  room: Zeus.rid ?? route.query?.rid ?? null,
  major: null,
  grade: null,
  class: null,
  flat: Zeus.flat ?? route.query?.flat ?? null,
});
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
const flatsOptions = computed(() =>
  flats.map((_, idx) => ({
    value: _,
    label: _,
  }))
);

const initChum = async () => {
  const {
    data: { gross },
  } = await estimate(Hermes?.librakey);
  const {
    data: { message },
  } = await searchTname();

  total.value = gross;
  // console.log(total);
  flats.length = 0;
  flats.push(...message.slice());
};
const fetchChum = async () => {
  // console.log(searchList);
  initChum();
  const { data } = await gatherChum({
    pageSize: pageSize.value,
    currentPage: currentPage.value,
    flag: false,
    ...searchList,
  });

  // tableData.splice(0, tableData.length, ...data);
  chumData.splice(0, chumData.length, ...data.message);
};
const handleSizeChange = (val: any) => {
  pageSize.value = val;
  fetchChum();
};

const handleCurrentChange = (val: any) => {
  currentPage.value = val;
  fetchChum();
};
const removeHandler = (val: string | number) => {
  ElMessageBox({
    title: "Message",
    message: h("p", null, [
      h("span", null, "记录删除后"),
      h("i", { style: "color: red" }, "不可修复"),
      h("span", null, "请 "),
      h("i", { style: "color: red" }, "确认"),
      h("span", null, "操作"),
    ]),
    showCancelButton: true,
    cancelButtonText: "取消",
    confirmButtonText: "继续删除",
    beforeClose: (action, instance, done) => {
      if (action === "confirm") {
        instance.confirmButtonLoading = true;
        instance.confirmButtonText = "Loading...";
        deleteChum(val).then((res) => {
          ElMessage({
            message: res.data.message,
            type: res.data.status ? "error" : "success",
          });
        });
        fetchChum();
        done();
      } else {
        done();
      }
    },
  });
};
const exportHandler = () => {
  const titleArr = [
    "学号",
    "姓名",
    "公寓",
    "房间",
    "床位",
    "专业",
    "年级",
    "班级",
    "状态",
  ];
  exportExcel(
    chumData.map(({ uid, type, ...item }) => ({
      sid: item.sid,
      sname: item.sname,
      tname: item.tname,
      rid: item.rid,
      bid: item.bid,
      major: item.major,
      grade: item.grade,
      class: item.class,
      decipher: item.decipher,
    })),
    "test",
    titleArr,
    "1"
  );
};
fetchChum();
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
