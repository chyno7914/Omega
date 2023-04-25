<!-- <template>
  <div>
    <input type="text" v-model="searchValue" placeholder="请输入搜索内容" />
    <button @click="search">搜索</button>
    <div
      class="box"
      v-for="(item, index) in items"
      :key="index"
      :class="{ active: index === activeIndex }"
    >
      {{ item }}
    </div>
  </div>
  <el-backtop :right="100" :bottom="100" />
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const items = ref([
      "盒子一",
      "盒子二",
      "盒子三",
      "盒子四",
      "盒子五",
      "盒子六",
    ]);

    const searchValue = ref("");
    const activeIndex = ref(-1);

    // 搜索事件处理函数
    const search = () => {
      const searchItem = items.value.find((item) =>
        item.includes(searchValue.value.trim())
      );
      if (searchItem) {
        activeIndex.value = items.value.indexOf(searchItem);
        const targetElement =
          document.querySelectorAll(".box")[activeIndex.value];
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    };

    return {
      items,
      searchValue,
      search,
      activeIndex,
    };
  },
};
</script>

<style scoped>
.box {
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.active {
  background-color: lightblue;
}
</style> -->
<template>
  <el-timeline>
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :timestamp="activity.timestamp"
    >
      {{ activity.content }}
    </el-timeline-item>
  </el-timeline>
</template>

<script lang="ts" setup>
const activities = [
  {
    content: "Event start",
    timestamp: "2018-04-15",
  },
  {
    content: "Approved",
    timestamp: "2018-04-13",
  },
  {
    content: "Success",
    timestamp: "2018-04-11",
  },
];
</script>
