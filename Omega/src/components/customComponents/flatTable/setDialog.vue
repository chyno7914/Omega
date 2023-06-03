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
          宿舍管理
        </h2>
        ·{{ targetFlat }}
      </div>
    </template>
    <el-table
      :data="floorData"
      style="width: 100%"
      max-height="250"
      fit
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="floor" label="楼层" width="150" align="center" />
      <el-table-column
        prop="max_room"
        label="上限"
        width="150"
        align="center"
      />
      <el-table-column
        prop="use_room"
        label="已用"
        width="150"
        align="center"
      />
      <el-table-column label="状态" width="100" align="center">
        <template #default="scope: any">
          <el-tag :type="scope.row.tag_type">{{ scope.row.decipher }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="175" align="center">
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
import { reactive, ref, watch } from "vue";
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
  floorDialog: (target: string) => {
    dialogFormVisible.value = true;
    targetFlat.value = target;
  },
});
interface Item {
  decipher: string;
}
// const props = withDefaults(
//   defineProps<{
//     targetFlat: string;
//   }>(),
//   {}
// );
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
let targetFlat = ref<string>();
const onAddItem = () => {};
const dialogFormVisible = ref(false);
const fetchFloor = async () => {
  if (targetFlat.value) {
    const {
      data: { message },
    } = await searchFloors(targetFlat.value);
    floorData.length = 0;
    floorData.push(...message.slice());
  }
};
const addFloor = async () => {
  if (targetFlat.value) {
    const {
      data: { message, status },
    } = await pushFloor(targetFlat.value, Hermes.maxFloorWidth);
    ElMessage({
      message: message,
      type: status ? "error" : "success",
    });
    fetchFloor();
  }
};
const deactFloor = async (floor: number) => {
  if (targetFlat.value) {
    const {
      data: { message, status },
    } = await banFloor(targetFlat.value, floor);
    ElMessage({
      message: message,
      type: status ? "error" : "success",
    });
    fetchFloor();
  }
};
const extendFloorWidth = async (floor: number) => {
  if (targetFlat.value) {
    const {
      data: { message, status },
    } = await extendFloor(targetFlat.value, floor);
    ElMessage({
      message: message,
      type: status ? "error" : "success",
    });
    fetchFloor();
  }
};
const reduceFloorWidth = async (floor: number, target: number) => {
  if (targetFlat.value) {
    const {
      data: { message, status },
    } = await reduceFloor(targetFlat.value, floor, target);
    ElMessage({
      message: message,
      type: status ? "error" : "success",
    });
    fetchFloor();
  }
};
const activeFloor = async (floor: number) => {
  if (targetFlat.value) {
    const {
      data: { message, status },
    } = await useFloor(targetFlat.value, floor);
    ElMessage({
      message: message,
      type: status ? "error" : "success",
    });
    fetchFloor();
  }
};
watch(
  () => targetFlat.value,
  () => fetchFloor()
);
</script>

<style></style>
