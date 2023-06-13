<template>
  <div class="header">
    <div class="title">宿舍中台管理系统</div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="50" :src="Zeus.portrait" fit="cover" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="toSet()">个人中心</el-dropdown-item>
          <el-dropdown-item @click="toWelcome()" ><div style="text-align: center;width: 100%;">首页</div></el-dropdown-item>
          <el-dropdown-item divided @click="outWeb()">安全退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from "vue";
import router from "@/router";
import { useZeusStore } from "@/store";
import { ElMessage } from "element-plus";
const Zeus = useZeusStore();
const outWeb = () => {
  Zeus.token = "";
  router.push("/sign");
  ElMessage({
    message: "安全退出",
    type: "success",
  });
};
const toWelcome = () => {
  Zeus.token = "";
  router.push("/welcome");
};
const toSet = () => {
  Zeus.token = "";
  router.push("/set");
};
const state = reactive({
  circleUrl:
    "/images/lADPJxRxWZDJRbPNA67NAuQ_740_942.jpg_720x720q90g(1)(1).png",
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
  z-index: 1000;
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
