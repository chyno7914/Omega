<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4"><div class="grid-content one" /> </el-col>
          <el-col :span="8"
            ><div class="grid-content two" />
            2</el-col
          >
        </el-row>
      </el-header>
      <el-main>
        <el-row class="borderMain">
          <el-col :span="6" class="leftCol">
            <el-row class="leftTop">
              <Broad></Broad>
            </el-row>
            <el-row class="leftBottom">
              <MajorRoll></MajorRoll>
            </el-row>
          </el-col>
          <el-col :span="12" class="centerCol">
            <Map></Map>
          </el-col>
          <el-col :span="6" class="rightCol">
            <UserList></UserList>
            <el-row class="rightBottom"></el-row>
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
</script>

<style scoped>
.el-header {
  background-color: skyblue;
}
.el-main {
  background-color: aquamarine;
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
  background-color: bisque;
  height: 100%;
}
.leftCol {
  background-color: violet;
  height: 100%;
}
.borderMain {
  height: 100%;
}
.centerCol {
  background-color: darkgray;
  height: 100%;
}
.rightCol {
  background-color: burlywood;
  height: 100%;
}
.leftTop {
  background-color: crimson;
  height: 30%;
}
.rightTop {
  background-color: khaki;
  height: 50%;
}
</style>
