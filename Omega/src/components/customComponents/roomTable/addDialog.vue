<template>
  <!-- Form -->
  <el-dialog
    v-model="dialogFormVisible"
    title="添加房间"
    width="50%"
    lock-scroll
    destroy-on-close
  >
    <el-form
      ref="roomFormRef"
      :model="roomForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :hide-required-asterisk="true"
    >
      <el-col :span="20">
        <el-form-item label="公寓" prop="flat">
          <el-select-v2
            v-model="roomForm.flat"
            v-limit-elsearch="'searchFlat:limit'"
            filterable
            :options="flatsOptions"
            placeholder=" "
            class="filter-item"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :span="20">
        <el-form-item label="楼层" prop="floor">
          <el-select-v2
            v-model="roomForm.floor"
            :disabled="!roomForm.flat"
            filterable
            :options="floorsOptions"
            placeholder=" "
            class="filter-item"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :span="20">
        <el-form-item label="床位数量" prop="tol_bed">
          <el-input-number
            v-model="roomForm.tol_bed"
            controls-position="right"
            :min="1"
            :max="10"
          >
          </el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="20">
        <el-form-item label="数量" prop="tolly">
          <el-input-number v-model="roomForm.tally" min="1" />
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item prop="gender">
          <template v-slot:label>
            <el-popover trigger="hover" placement="bottom" width="auto">
              <template #default>
                <div>
                  开启此选项后，若单层空余房间不足，<br />则自动添加至下一层
                </div>
              </template>
              <template #reference> 顺延 </template>
            </el-popover>
          </template>
          <el-switch
            class="ml-2"
            style="--el-switch-on-color: #13ce66"
            v-model="roomForm.transmitFlag"
          />
        </el-form-item>
      </el-col>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submitForm(roomFormRef)"
          >提交</el-button
        >
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useZeusStore, useDemeterStore } from "@/store";
import { ElMessage } from "element-plus";
import { addRoom, searchCeiling } from "@/api/table";
import { useRouter } from "vue-router";
defineExpose({
  addDialog: () => (dialogFormVisible.value = true),
});
const props = withDefaults(
  defineProps<{
    flatsOptions: object[];
    fetchRoom: () => void;
  }>(),
  {}
);

const dialogFormVisible = ref(false);
const roomFormRef = ref<FormInstance>();
const router = useRouter();
const Zeus = useZeusStore();
let ceiling = ref();
const disabledDate = (time: Date) => {
  return time.getTime() > Date.now();
};
const roomForm = reactive({
  flat: Zeus.flat ?? "",
  floor: "",
  tol_bed: 6,
  tally: 1,
  transmitFlag: true,
});
const rules = reactive<FormRules>({
  flat: [{ required: true, message: "请确认宿舍名", trigger: "change" }],
  floor: [{ required: true, message: "请确认楼层", trigger: "change" }],
  tol_bed: [{ required: true, message: "请确认楼层", trigger: "blur" }],
});
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  dialogFormVisible.value = false;
  formEl.resetFields();
};
const floorsOptions = computed(() =>
  Array.from({ length: ceiling.value }, (_, index) => index + 1).map(
    (_, idx) => ({
      value: _,
      label: _,
    })
  )
);
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      console.log(roomForm);

      const {
        data: { message, status },
      } = await addRoom(roomForm);
      ElMessage({
        message: message,
        type: status ? "error" : "success",
      });
      // alert(new Date(censusForm.birth));
      // census(censusForm).then((res) => {
      //
      props.fetchRoom();
      resetForm(formEl);
      dialogFormVisible.value = false;
      // });
    }
  });
};
watch(
  () => roomForm.flat,
  async (v: string | null) => {
    ({
      data: { ceiling: ceiling.value },
    } = await searchCeiling(v));
  },
  {
    immediate: true,
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
