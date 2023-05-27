<template>
  <!-- Form -->
  <el-dialog
    v-model="dialogFormVisible"
    title="添加数据"
    width="40%"
    lock-scroll
    destroy-on-close
  >
    <el-form
      ref="censusFormRef"
      :model="roomForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :hide-required-asterisk="true"
    >
      <el-col :span="12">
        <el-form-item label="公寓" prop="flat">
          <el-select-v2
            v-model="roomForm.flat"
            filterable
            :options="flatsOptions"
            placeholder=" "
            class="filter-item"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="楼层">
          <el-select-v2
            v-model="roomForm.floor"
            filterable
            :options="floorsOptions"
            placeholder=" "
            class="filter-item"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="数量">
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
        <el-button type="primary" @click="">提交</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useZeusStore, useDemeterStore } from "@/store";
import { ElMessage } from "element-plus";
import { census } from "@/api/user";
import { useRouter } from "vue-router";
defineExpose({
  addDialog: () => (dialogFormVisible.value = true),
});
withDefaults(
  defineProps<{
    flatsOptions: object[];
    floorsOptions: object[];
  }>(),
  {}
);

const dialogFormVisible = ref(false);
const roomFormRef = ref<FormInstance>();
const router = useRouter();
const Zeus = useZeusStore();
const Demeter = useDemeterStore();
const disabledDate = (time: Date) => {
  return time.getTime() > Date.now();
};
const roomForm = reactive({
  flat: "",
  floor: "",
  tally: 1,
  transmitFlag: true,
});
const rules = reactive<FormRules>({
  flat: [{ required: true, message: "请确认宿舍名", trigger: "blur" }],
});
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  dialogFormVisible.value = false;
  formEl.resetFields();
};
// const submitCensus = async (formEl: FormInstance | undefined) => {
//   if (!formEl) return;
//   await formEl.validate((valid) => {
//     if (valid) {
//       // alert(new Date(censusForm.birth));
//       census(censusForm).then((res) => {
//         ElMessage({
//           message: res.data.status
//             ? res.data.message
//             : `${censusForm.sname},${res.data.message}`,
//           type: res.data.status ? "error" : "success",
//         });
//         resetForm(formEl);
//         dialogFormVisible.value = false;
//       });
//     } else {
//       console.log("error submit!");
//       return false;
//     }
//   });
// };
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
