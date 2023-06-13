<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row :gutter="20" align="middle">
  <el-col :span="8">
    <el-page-header
      @back="router.back()"
      style="margin: auto"
      title="返回"
    >
      <template #content>
        <span class="text-large font-600 mr-3"> 数据面板 </span>
      </template>
    </el-page-header>
  </el-col>
  <el-col :span="8">
    <div class="grid-content two"/>
  </el-col>
</el-row>
      </el-header>
      <el-main>
        <el-row class="borderMain">
          <el-col :span="5" class="leftCol">
            <el-row class="leftTop">
              <Broad></Broad>
            </el-row>
            <el-row class="leftBottom">
              
            </el-row>
          </el-col>
          <el-col :span="12" class="centerCol">
            <Map></Map>
          </el-col>
          <el-col :span="6" class="rightCol">
            <el-row class="rightTop"><MajorRoll></MajorRoll></el-row>
            <el-row>
              
            </el-row>
            <UserList></UserList>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Broad from "./component/broad.vue";
import MajorRoll from "./component/majorRoll.vue";
import Map from "./component/map.vue";
import UserList from "./component/userList.vue";
import { useRouter } from "vue-router";
const router = useRouter()
</script>

<style scoped>
.common-layout {
  background-image: url("assets/img/border.webp");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: 0 -28px;
}
.el-header {
  color: skyblue;
}
.el-main {
  height: 100%;
  overflow: hidden;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.el-container {
  height: 100vh;
}
.one {
  height: 100%;
}
.leftCol {
  height: 100%;
}
.borderMain {
  height: 100%;
}
.centerCol {
  height: 100%;
}
.rightCol {
  height: 100%;
}
.leftTop {
  height: 30%;
}
.rightTop {
  height: 50%;
}
</style>
