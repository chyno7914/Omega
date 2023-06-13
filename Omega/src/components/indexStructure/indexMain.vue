<template>
  <div class="box">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" v-if="$route.meta.stayAlive" />
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.stayAlive" />
    </router-view>
  </div>
</template>
<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box {
  position: relative;
  min-height: 95vh;
  width: 100%;
  margin-left: 9px;
  background-color: #fff;
  overflow: hidden;
}
</style>
