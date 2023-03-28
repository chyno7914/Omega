<template>
  <div class="header">
    <div class="title">宿舍管理系统</div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="50" :src="circleUrl" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item>修改头像</el-dropdown-item>
          <el-dropdown-item divided @click="outWeb">安全退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from "vue";
import router from "@/router";
import { useHorkesStore } from "@/store";
import { ElMessage } from "element-plus";
const Horkes = useHorkesStore();
const outWeb = () => {
  Horkes.token = "";
  router.push("/sign");
  ElMessage({
    message: "安全退出",
    type: "success",
  });
};
const state = reactive({
  circleUrl:
    "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  sizeList: ["small", "", "large"] as const,
});

const { circleUrl } = toRefs(state);
</script>

<style scoped>
.el-dropdown {
  margin-top: 5px;
  margin-right: 13.1%;
  float: right;
}

.header {
  height: 100%;
  color: #c58282;
  text-align: center;
  background-image: url("assets/img/headBar.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: 0 -190px;
}
.title {
  position: absolute;
  font-weight: 700;
  margin-top: 5px;
  right: 50%;
  transform: translate(50%);
  font-size: 200%;
}
</style>
