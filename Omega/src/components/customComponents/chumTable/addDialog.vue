<template>
  <!-- Form -->
  <el-dialog
    v-model="dialogFormVisible"
    title="添加数据"
    width="50%"
    lock-scroll
  >
    <el-form
      ref="censusFormRef"
      :model="censusForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :hide-required-asterisk="true"
    >
      <el-col :span="12">
        <el-form-item label="学号" prop="sid">
          <el-input v-model="censusForm.sid" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="姓名" prop="sname">
          <el-input v-model="censusForm.sname" />
        </el-form-item>
      </el-col>

      <el-col>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="censusForm.gender" class="ml-4">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="censusForm.birth"
            type="date"
            placeholder="选择日期"
            :disabled-date="disabledDate"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="户籍" prop="census">
          <el-select-v2
            v-model="censusForm.census"
            filterable
            :options="provincesOptions"
            placeholder="请确认户籍"
            style="width: 240px"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="专业" prop="major">
          <el-select-v2
            v-model="censusForm.major"
            filterable
            :options="majorsOptions"
            placeholder="请输入专业"
            style="width: 240px"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="年级" prop="grade">
          <el-select-v2
            v-model="censusForm.grade"
            filterable
            :options="gradesOptions"
            placeholder="请输入年级"
            style="width: 240px"
            :disabled="!censusForm.major"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="班级" prop="class">
          <el-select-v2
            v-model="censusForm.class"
            filterable
            :options="classesOptions"
            placeholder="请输入班级"
            style="width: 240px"
            :disabled="!censusForm.grade"
          />
        </el-form-item>
      </el-col>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submitCensus(censusFormRef)"
          >提交</el-button
        >
        <el-button @click="resetForm(censusFormRef)">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useZeusStore, useDemeterStore } from "@/store";
import { ElMessage } from "element-plus";
import { census } from "@/api/user";
import { useRouter } from "vue-router";
defineExpose({
  addDialog: () => (dialogFormVisible.value = true),
});
const props = withDefaults(
  defineProps<{
    fetchChum: () => void;
  }>(),
  {}
);
const dialogFormVisible = ref(false);
const censusFormRef = ref<FormInstance>();
const router = useRouter();
const Zeus = useZeusStore();
const Demeter = useDemeterStore();
const disabledDate = (time: Date) => {
  return time.getTime() > Date.now();
};
const censusForm = reactive({
  sid: <number | null>null,
  sname: "",
  gender: "",
  birth: "Sat Jan 01 2000 00:00:00 GMT+0800 (中国标准时间)",
  census: null,
  major: null,
  grade: null,
  class: null,
});
const rules = reactive<FormRules>({
  sid: [
    { required: true, message: "请输入学号", trigger: "blur" },
    {
      pattern: "^[0-9]*$",
      message: "学号仅支持输入数字",
      trigger: "blur",
    },
    {
      min: 5,
      max: 12,
      message: "学号长度于5至12位之间",
      trigger: "blur",
    },
  ],
  sname: [
    { required: true, message: "请输入姓名", trigger: "blur" },
    {
      pattern: /^[\u4e00-\u9fa5a-zA-Z_]+$/,
      message: "该字段只能由汉字、字母和下划线组成",
      trigger: "blur",
    },
    {
      max: 12,
      message: "字符串长度越界",
      trigger: "blur",
    },
  ],
  gender: [{ required: true, message: "请输入性别", trigger: "change" }],
  birth: [{ required: true, message: "请输入出生日期", trigger: "change" }],
  census: [
    { required: true, message: "请输入户籍所在省份", trigger: "change" },
  ],
  major: [{ required: true, message: "请输入专业", trigger: "change" }],
  grade: [{ required: true, message: "请输入专业", trigger: "change" }],
  class: [{ required: true, message: "请输入专业", trigger: "change" }],
});
const provincesOptions = Demeter.provinces.map((_, idx) => ({
  value: _,
  label: _,
}));
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
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  dialogFormVisible.value = false;
  formEl.resetFields();
};
const submitCensus = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      // alert(new Date(censusForm.birth));
      census(censusForm).then((res) => {
        ElMessage({
          message: res.data.status
            ? res.data.message
            : `${censusForm.sname},${res.data.message}`,
          type: res.data.status ? "error" : "success",
        });
        resetForm(formEl);
        props.fetchChum();
        dialogFormVisible.value = false;
      });
    } else {
      console.log("error submit!");
      return false;
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
