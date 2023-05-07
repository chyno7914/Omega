<template>
  <!-- Form -->
  <el-dialog
    v-model="dialogFormVisible"
    title="修改数据"
    width="30%"
    lock-scroll
    destroy-on-close
  >
    <el-form
      ref="changeFormRef"
      :model="changeForm"
      label-width="100px"
      class="demo-ruleForm"
      status-icon
      :hide-required-asterisk="true"
    >
      <el-form-item label="使用床位：" prop="useBed">
        <el-input v-model="changeForm.useBed" disabled />
      </el-form-item>
      <el-form-item label="房间容量：" prop="tolBed">
        <el-input-number v-model="changeForm.tolBed" :min="changeForm.useBed" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="changeRoom()">确定</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useZeusStore, useDemeterStore } from "@/store";
import { ElMessage } from "element-plus";
import { editRoom } from "@/api/table";
import { useRouter } from "vue-router";
defineExpose({
  changeDialog: (
    tol_bed: number,
    use_bed: number,
    rid: number,
    tid: number
  ) => {
    dialogFormVisible.value = true;
    changeForm.tolBed = tol_bed;
    changeForm.useBed = use_bed;
    changeForm.rid = rid;
    changeForm.tid = tid;
  },
});
const props = withDefaults(
  defineProps<{
    fetchRoom: () => void;
  }>(),
  {}
);
const dialogFormVisible = ref(false);
const roomFormRef = ref<FormInstance>();
const changeFormRef = ref<FormInstance>();
const changeForm = reactive({
  useBed: 0,
  tolBed: 0,
  rid: 0,
  tid: 1,
});
const changeRoom = async () => {
  const {
    data: { message, status },
  } = await editRoom(changeForm);
  ElMessage({
    message: message,
    type: status ? "error" : "success",
  });
  props.fetchRoom();
  if (!status) dialogFormVisible.value = false;
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
