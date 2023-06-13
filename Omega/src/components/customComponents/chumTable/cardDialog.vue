<template>
  <!-- Form -->
  <el-dialog
    v-model="dialogFormVisible"
    title="身份名片"
    width="40%"
    lock-scroll
    destroy-on-close
    align-center
  >
  <el-row>
    <el-col :offset="4" :span="8">
    <el-avatar :size="100" :src="Zeus.setPortrait(cardData.user_pic)" />
  </el-col>
  <el-col :span="10" :offset="1">
    <el-row>用户名：{{ cardData.username }}</el-row>
    <el-row style="margin-top: 20px;">UID：{{ cardData.uid }}</el-row>
    <el-row style="margin-top: 20px;">电话：{{ cardData.telephone }}</el-row>
  </el-col>
  </el-row>
  
    <template #footer>
      <span class="dialog-footer">
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useZeusStore, useDemeterStore } from "@/store";
import { ElMessage } from "element-plus";
import { editRoom ,linkUser} from "@/api/table";
import { useRouter } from "vue-router";
defineExpose({
  showDialog: async(target:number) => {
    dialogFormVisible.value = true
    let {data:{message}}=await linkUser(target)
    if (!message)message = {}
    cardData.telephone = message.telephone
    cardData.uid = message.uid
    cardData.user_pic= message.user_pic
    cardData.username = message.username?message.username:"用户暂未绑定"
    
  },
});
const Zeus = useZeusStore()
const dialogFormVisible = ref(false);
const roomFormRef = ref<FormInstance>();
const changeFormRef = ref<FormInstance>();
const changeForm = reactive({
  useBed: 0,
  tolBed: 0,
  rid: 0,
  tid: 1,
});
const cardData = reactive({
  uid:"",
  username:"",
  user_pic:"",
  telephone:""
})
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
