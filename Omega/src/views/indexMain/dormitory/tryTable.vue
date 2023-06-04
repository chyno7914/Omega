<template>
  <div class="app-container">
    <el-page-header
      @back="goBack"
      style="margin-top: 1%; margin-bottom: 1%"
      title="返回"
    >
      <template #content>
        <span class="text-large font-600 mr-3"> 用户操作 </span>
      </template>
    </el-page-header>
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
            :columns="column"
            :data="userData"
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
import { orderUser, deleteUser } from "@/api/table";
import { useHermesStore, useDemeterStore, useZeusStore } from "@/store";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import {
  ElButton,
  ElIcon,
  ElTag,
  ElTooltip,
  TableV2FixedDir,
  ElAvatar,
  ElMessage,
} from "element-plus";
import { Sort, SortUp, SortDown } from "@element-plus/icons-vue";
import type { Column } from "element-plus";
const Zeus = useZeusStore();
const liftingFlag = ref(false);
const router = useRouter();
const userData: any[] = reactive([]);
const goBack = () => {
  router.push("/welcome");
};
const userToDelete = async (target: number) => {
  const {
    data: { message, status },
  } = await deleteUser(target);
  ElMessage({
    message,
    type: status ? "error" : "success",
  });
  fetchUser();
};
const publish = (data: number) => {
  console.log(data);
};
const fetchUser = async () => {
  const {
    data: { message },
  } = await orderUser();
  userData.splice(0, userData.length, ...message);
};
const changeLifting = () => {
  liftingFlag.value = !liftingFlag.value;
};
const column: Column<any>[] = [
  {
    key: "user_pic",
    title: "头像",
    dataKey: "user_pic",
    width: 230,
    align: "center",
    cellRenderer: ({ cellData: user_pic }) => (
      <>
        <ElAvatar src={Zeus.setPortrait(user_pic)} size={50}></ElAvatar>
      </>
    ),
  },
  {
    key: "uid",
    title: "uid",
    dataKey: "uid",
    width: 230,
    align: "center",
    headerCellRenderer: () => (
      <>
        <div
          onClick={changeLifting}
          style="display: flex; align-items: center; white-space: nowrap;"
        >
          uid
          {/* <el-icon color="#409EFC" style="margin-left: 5px;">
            {liftingFlag.value ? <SortUp /> : <SortDown />}
          </el-icon> */}
        </div>
      </>
    ),
    cellRenderer: ({ cellData: uid }) => <>{uid}</>,
  },

  {
    key: "username",
    title: "用户名",
    dataKey: "username",
    width: 230,
    align: "center",
    cellRenderer: ({ cellData: username }) => <>{username}</>,
  },
  {
    key: "call",
    title: "权限",
    dataKey: "call",
    width: 230,
    align: "center",
    cellRenderer: ({ cellData: call }) => <ElTag>{call}</ElTag>,
  },
  {
    key: "telephone",
    title: "电话号码",
    dataKey: "telephone",
    width: 310,
    align: "center",
    cellRenderer: ({ cellData: telephone }) => <>{telephone}</>,
  },
  {
    key: "operation",
    title: "操作",
    cellRenderer: (row) => (
      <>
        <ElButton
          size="small"
          type="danger"
          onClick={(event) => userToDelete(row.rowData.uid)}
        >
          删除
        </ElButton>
      </>
    ),
    width: 240,
    align: "center",
  },
];
fetchUser();
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
