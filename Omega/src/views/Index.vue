<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <indexHeader></indexHeader>
      </el-header>
      <el-container>
        <el-aside width="200">
          <indexAside></indexAside>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import indexHeader from "structure/indexHeader.vue";
import indexAside from "structure/indexAside.vue";
</script>

<style scoped lang="less">
.el-header {
  background-color: #ffffff;
  margin: 0;
  padding: 0;
}
.el-main {
  background-color: #e4e9f7;
  flex-grow: 1;
  margin: 0;
  padding: 0;
}
</style>
