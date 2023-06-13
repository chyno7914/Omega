<template>
  <el-dialog
    v-model="dialogFormVisible"
    width="40%"
    lock-scroll
    destroy-on-close
    :show-close="false"
  >
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header" style="white-space: nowrap">
        <h2 :id="titleId" :class="titleClass" style="display: inline">
          楼层管理
        </h2>
        ·{{ Zeus.flat }}
      </div>
    </template>
    <el-table
      :data="floorData"
      style="width: 100%"
      max-height="250"
      fit
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="floor" label="楼层" width="100" align="center" />
      <el-table-column
        prop="max_room"
        label="上限"
        width="100"
        align="center"
      />
      <el-table-column
        prop="use_room"
        label="已用"
        width="100"
        align="center"
      />
      <el-table-column label="状态" width="80" align="center">
        <template #default="scope: any">
          <el-tag :type="scope.row.tag_type">{{ scope.row.decipher }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="extendFloorWidth(scope.row.floor)"
          >
            追加
          </el-button>
          <el-button
            link
            type="primary"
            size="small"
            @click="reduceFloorWidth(scope.row.floor, scope.row.max_room)"
          >
            缩减
          </el-button>
          <el-button
            link
            type="danger"
            size="small"
            @click="deactFloor(scope.row.floor)"
            v-show="scope.row.decipher != '禁用'"
          >
            禁用
          </el-button>
          <el-button
            link
            type="success"
            size="small"
            @click="activeFloor(scope.row.floor)"
            v-show="scope.row.decipher == '禁用'"
          >
            激活
          </el-button>
        </template>
      </el-table-column>
      <template #empty>
        <div class="flex items-center justify-center h-100%">
          <el-empty />
        </div>
      </template>
    </el-table>
    <el-popover placement="right" :width="200" trigger="hover">
      <template #reference>
        <el-button class="mt-4" style="width: 100%" @click="addFloor">
          添加楼层
        </el-button>
      </template>
      添加单层最大房间量
      <el-input-number
        v-model="Hermes.maxFloorWidth"
        controls-position="right"
      ></el-input-number>
    </el-popover>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">退出 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useZeusStore } from "@/store";
import {
  searchFloors,
  pushFloor,
  banFloor,
  extendFloor,
  reduceFloor,
  useFloor,
} from "@/api/table";
import { ElMessage } from "element-plus";
import { useHermesStore } from "@/store";
defineExpose({
  floorDialog: () => (dialogFormVisible.value = true),
});
interface Item {
  decipher: string;
}
const props = withDefaults(
  defineProps<{
    targetFlat: string;
  }>(),
  {}
);
const Zeus = useZeusStore();
const Hermes = useHermesStore();
const tableRowClassName = ({
  row,
  rowIndex,
}: {
  row: any;
  rowIndex: number;
}) => {
  if (row.decipher === "禁用") {
    return "warning-row";
  }
  return "";
};
let floorData: any[] = reactive([]);
const onAddItem = () => {};
const dialogFormVisible = ref(false);
const fetchFloor = async () => {
  const {
    data: { message },
  } = await searchFloors(Zeus.flat);
  floorData.length = 0;
  floorData.push(...message.slice());
};
const addFloor = async () => {
  const {
    data: { message, status },
  } = await pushFloor(props.targetFlat, Hermes.maxFloorWidth);
  ElMessage({
    message: message,
    type: status ? "error" : "success",
  });
  fetchFloor();
};
const deactFloor = async (floor: number) => {
  const {
    data: { message, status },
  } = await banFloor(props.targetFlat, floor);
  ElMessage({
    message: message,
    type: status ? "error" : "success",
  });
  fetchFloor();
};
const extendFloorWidth = async (floor: number) => {
  const {
    data: { message, status },
  } = await extendFloor(props.targetFlat, floor);
  ElMessage({
    message: message,
    type: status ? "error" : "success",
  });
  fetchFloor();
};
const reduceFloorWidth = async (floor: number, target: number) => {
  const {
    data: { message, status },
  } = await reduceFloor(props.targetFlat, floor, target);
  ElMessage({
    message: message,
    type: status ? "error" : "success",
  });
  fetchFloor();
};
const activeFloor = async (floor: number) => {
  const {
    data: { message, status },
  } = await useFloor(props.targetFlat,floor);
  ElMessage({
    message: message,
    type: status ? "error" : "success",
  });
  fetchFloor();
};
fetchFloor();
</script>

<style></style>
