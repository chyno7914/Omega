<template>
  <div class="demo-date-picker">
    <div class="block">
      <el-date-picker
        v-model="value"
        type="daterange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
        value-format="YYYY-MM-DD"
      />
    </div>
  </div>
  {{ value }}
  <!-- <template>
  <div class="demo-date-picker">
    <div class="block">
      <el-date-picker
        v-model="value"
        type="date"
        placeholder="Pick a Date"
        value-format="YYYY-MM-DD"
      />
    </div>
  </div>
  {{ value }}
</template> -->
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

const size = ref<"default" | "large" | "small">("default");

const value = ref("");
watch(
  () => value.value,
  () => {
    console.log(value.value);
  }
);
</script>

<style scoped>
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
