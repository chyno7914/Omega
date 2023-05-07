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
          <el-col :span="7" class="leftCol">
            <el-row class="leftTop"></el-row>
            <el-row class="leftBottom"></el-row>
          </el-col>
          <el-col :span="10" class="centerCol"
            ><div class="grid-content ep-bg-purple-light"
          /></el-col>
          <el-col :span="7" class="rightCol">
            <el-row class="rightTop"></el-row>
            <el-row class="rightBottom"></el-row>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
</script>

<style scoped>
.el-header {
  background-color: skyblue;
}
.el-main {
  background-color: aquamarine;
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
  background-color: #fff;
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
  height: 50%;
}
.rightTop {
  background-color: khaki;
  height: 50%;
}
</style>
