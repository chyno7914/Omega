<template>
  <!-- Form -->
  <el-dialog
    v-model="dialogFormVisible"
    title="修改密码"
    width="35%"
    lock-scroll
    align-center
    :before-close="handleClose"
  >
    <el-form
      ref="duplicateFormRef"
      :model="duplicateForm"
      label-width="100px"
      label-position="right"
      :rules="rules"
      :hide-required-asterisk="true"
    >
      <el-form-item label="旧密码：" prop="password">
        <el-input v-model="duplicateForm.password" type="password" />
      </el-form-item>
      <el-form-item label="新密码：" prop="reset">
        <el-input v-model="duplicateForm.reset" type="password" />
      </el-form-item>
      <el-form-item label="确认密码：" prop="confirm">
        <el-input v-model="duplicateForm.confirm" type="password" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submitForm(duplicateFormRef)"
          >提交</el-button
        >
        <el-button @click="resetForm(duplicateFormRef)">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useZeusStore, useDemeterStore } from "@/store";
import { ElMessage } from "element-plus";
import { setPassword } from "@/api/user";
import { useRouter } from "vue-router";
defineExpose({
  showDialog: () => (dialogFormVisible.value = true),
});
// const props = withDefaults(
//   defineProps<{
//     fetchChum: () => void;
//   }>(),
//   {}
// );
const dialogFormVisible = ref(false);
const duplicateFormRef = ref<FormInstance>();
const router = useRouter();
const Zeus = useZeusStore();
const Demeter = useDemeterStore();
const disabledDate = (time: Date) => {
  return time.getTime() > Date.now();
};
const duplicateForm = reactive({
  password: "",
  reset: "",
  confirm: "",
});
const passwordCheck = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请确认密码"));
  } else if (value !== duplicateForm.reset) {
    callback(new Error("密码确认失败"));
  } else {
    callback();
  }
};
const passwordReburn = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入新密码"));
  } else if (value == duplicateForm.password) {
    callback(new Error("新密码不能同旧密码相同"));
  } else {
    callback();
  }
};
const rules = reactive<FormRules>({
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 18, message: "密码须在6至18位之间", trigger: "blur" },
  ],
  confirm: [
    { validator: passwordCheck, trigger: "blur" },
    { min: 6, max: 18, message: "密码须在6至18位之间", trigger: "blur" },
  ],
  reset: [{ validator: passwordReburn, trigger: "blur" }],
});
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  dialogFormVisible.value = false;
  formEl.resetFields();
};
const handleClose = (done: () => void) => {
  duplicateFormRef.value?.resetFields();
  done();
};
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      const {
        data: { message, status },
      } = await setPassword(duplicateForm.password, duplicateForm.confirm);
      // alert(new Date(censusForm.birth));
      //     census(censusForm).then((res) => {
      ElMessage({
        message: message,
        type: status ? "error" : "success",
      });
      resetForm(formEl);
      //       props.fetchChum();
      //       dialogFormVisible.value = false;
      //     });
      //   } else {
      //     console.log("error submit!");
      //     return false;
    }
  });
};
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
