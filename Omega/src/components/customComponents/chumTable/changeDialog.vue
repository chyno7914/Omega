<template>
  <!-- Form -->
  <el-dialog v-model="dialogFormVisible" title="换寝" width="50%" lock-scroll>
    <el-form ref="searchFormRef" :model="searchList" :rules="rules">
      <el-row style="height: 40px">
        <el-col :span="5">
          <el-form-item prop="flat">
            <el-select-v2
              v-model="searchList.flat"
              filterable
              :options="flatsOption"
              placeholder="公寓"
              class="filter-item"
              v-limit-elsearch="'searchFlat:limit'"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-form-item prop="floor">
            <el-select-v2
              v-model="searchList.floor"
              filterable
              :disabled="!searchList.flat"
              :options="floorsOption"
              placeholder="楼层"
              class="filter-item"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-form-item prop="rid">
            <el-select-v2
              v-model="searchList.rid"
              filterable
              :disabled="!searchList.floor"
              :options="roomsOption"
              placeholder="房间"
              class="filter-item"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-form-item prop="bid">
            <el-select-v2
              v-model="searchList.bid"
              filterable
              :options="bedsOption"
              :disabled="!searchList.rid"
              placeholder="床位"
              class="filter-item"
              clearable
            >
              <template #default="{ item }">
                <span>{{ item.value }}</span>
                <span
                  style="
                    color: var(--el-text-color-secondary);
                    margin-left: 7px;
                  "
                >
                  {{ item.ultra }}
                </span>
              </template>
            </el-select-v2>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submitForm(searchFormRef)"
          >提交</el-button
        >
        <el-button @click="resetForm(searchFormRef)">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useZeusStore, useDemeterStore } from "@/store";
import { ElMessage } from "element-plus";
import { FullScreen, Aim } from "@element-plus/icons-vue";
import {
  searchTname,
  searchCeiling,
  gatherRoomByFloor,
  gatherBedByRoom,
  changeOrder,
} from "@/api/table";
import { useRouter } from "vue-router";
defineExpose({
  showDialog: async (target: number) => {
    dialogFormVisible.value = true;
    sid.value = target;
    const {
      data: { message },
    } = await searchTname();
    flatsOption.splice(
      0,
      flatsOption.length,
      ...message.map((item: string) => ({
        value: item,
        label: item,
      }))
    );
  },
});
const props = withDefaults(
  defineProps<{
    fetchChum: () => void;
  }>(),
  {}
);
const dialogFormVisible = ref(false);
const searchFormRef = ref<FormInstance>();
const router = useRouter();
const Zeus = useZeusStore();
const Demeter = useDemeterStore();
const disabledDate = (time: Date) => {
  return time.getTime() > Date.now();
};
const sid = ref<number>();
const flatsOption: Array<{ value: string; label: string }> = reactive([]);
const floorsOption: Array<{ value: number; label: number }> = reactive([]);
const roomsOption: Array<{ value: number; label: number }> = reactive([]);
const bedsOption: Array<{ value: number; label: number }> = reactive([]);
const searchList = reactive({
  flat: Zeus.flat ?? "",
  floor: "",
  rid: "",
  bid: "",
});
const rules = reactive<FormRules>({
  flat: [{ required: true, message: "请输入目标宿舍", trigger: "change" }],
  floor: [{ required: true, message: "请输入目标楼层", trigger: "change" }],
  rid: [{ required: true, message: "请输入目标房间", trigger: "change" }],
  bid: [{ required: true, message: "请输入目标床位", trigger: "change" }],
});
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  dialogFormVisible.value = false;
  formEl.resetFields();
};
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      if (sid.value) {
        const {
          data: { message, status },
        } = await changeOrder(sid.value, searchList);
        ElMessage({
          message: message,
          type: !status ? "success" : "error",
        });
        props.fetchChum();
        resetForm(formEl);
      } else
        ElMessage({
          message: "参数异常，请联系管理员",
          type: "error",
        });
    }
  });
};
watch(
  () => searchList.flat,
  async (v: string) => {
    searchList.floor = "";
    if (searchList.flat == "") return;
    const {
      data: { ceiling },
    } = await searchCeiling(v);
    if (!ceiling) {
      ElMessage({
        message: "目标未开放寝室，请联系管理员",
        type: "error",
      });
    } else {
      floorsOption.splice(
        0,
        flatsOption.length,
        ...Array.from({ length: ceiling }, (_, index) => index + 1).map(
          (_, idx) => ({
            value: _,
            label: _,
          })
        )
      );
    }
  },
  {
    immediate: true,
  }
);
watch(
  () => searchList.floor,
  async (v: string) => {
    searchList.rid = "";
    const {
      data: { message },
    } = await gatherRoomByFloor(searchList.flat, v);
    if (!message.length)
      ElMessage({
        message: "目标未开放寝室，请联系管理员",
        type: "error",
      });
    else {
      roomsOption.splice(
        0,
        roomsOption.length,
        ...message.map((item: { rid: number }) => ({
          value: item.rid,
          label: item.rid,
        }))
      );
    }
  }
);
watch(
  () => searchList.rid,
  async (v: string) => {
    searchList.bid = "";
    const {
      data: { message },
    } = await gatherBedByRoom(searchList.flat, v);
    if (!message.length)
      ElMessage({
        message: "目标未开放寝室，请联系管理员",
        type: "error",
      });
    else
      bedsOption.splice(
        0,
        bedsOption.length,
        ...message.map((item: { bid: number; sid: number }) => ({
          value: item.bid,
          label: item.bid,
          ultra: item.sid,
        }))
      );
  }
);
</script>
<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer {
  text-align: center;
}
.el-form {
  margin-left: 100px;
}
</style>
