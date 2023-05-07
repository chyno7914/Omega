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
      :model="flatForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :hide-required-asterisk="true"
    >
      <el-col :span="12">
        <el-form-item label="公寓" prop="tname">
          <el-input v-model="flatForm.tname" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="性别" prop="tgender">
          <el-radio-group v-model="genderCode" class="ml-4">
            <el-radio label="2" size="large">未定</el-radio>
            <el-radio label="1" size="large">男</el-radio>
            <el-radio label="0" size="large">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="楼高" prop="ceiling">
          <el-input-number v-model="flatForm.ceiling" :min="0" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="校验码" prop="tcode">
          <el-input v-model="flatForm.tcode" />
        </el-form-item>
      </el-col>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="pushFlat(flatForm)">提交</el-button>
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
import { addFlat } from "@/api/table";
import { useRouter } from "vue-router";
import { type } from "os";
defineExpose({
  addDialog: () => (dialogFormVisible.value = true),
});
const props = withDefaults(
  defineProps<{
    updateData: () => void;
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
let genderCode = ref("2");
const flatForm = reactive({
  tname: null,
  tgender: null as number | null,
  ceiling: 3,
  tcode: null,
});
const rules = reactive<FormRules>({
  tname: [{ required: true, message: "请输入宿舍名", trigger: "blur" }],
  tcode: [{ required: true, message: "请输入校验码", trigger: "blur" }],
});
const pushFlat = async (data: object) => {
  const {
    data: { message, status },
  } = await addFlat(data);
  ElMessage({
    message: message,
    type: status ? "error" : "success",
  });
  props.updateData();
  dialogFormVisible.value = false;
};
watch(
  () => genderCode.value,
  (k) => {
    if (k === "2") flatForm.tgender = null;
    else flatForm.tgender = Number(k);
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
