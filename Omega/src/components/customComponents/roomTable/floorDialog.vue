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
    <el-table :data="floorData" style="width: 100%" max-height="250" fit>
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
          <el-tag :type="scope.row.type">{{ scope.row.decipher }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="175" align="center">
        <template #default="scope">
          <el-button link type="primary" size="small"> 追加 </el-button>
          <el-button link type="primary" size="small"> 缩减 </el-button>
          <el-button link type="danger" size="small"> 禁用 </el-button>
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
        <el-button class="mt-4" style="width: 100%" @click="onAddItem">
          添加楼层
        </el-button>
      </template>
      添加单层最大房间量 <el-input v-model="Hermes.maxFloorWidth"></el-input>
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
import { searchFloors } from "@/api/table";
import { useHermesStore } from "@/store";
defineExpose({
  floorDialog: () => (dialogFormVisible.value = true),
});
withDefaults(
  defineProps<{
    targetFlat: string;
  }>(),
  {}
);
const Zeus = useZeusStore();
const Hermes = useHermesStore();
let floorData = reactive([]);
const onAddItem = () => {};
const dialogFormVisible = ref(false);
const fetchFloor = async () => {
  ({
    data: { message: floorData },
  } = await searchFloors(Zeus.flat));
};
fetchFloor();
</script>

<style scoped></style>
