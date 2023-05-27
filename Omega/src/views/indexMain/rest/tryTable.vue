<template>
  <div class="">
    <el-container>
      <el-main style="" class="main">
        {{ searchKey }}
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { gatherAttribution } from "@/api/apply";

type KeySearch = {
  state: string[];
  type: string[];
};

const searchKey = reactive<KeySearch>({
  type: [],
  state: [],
});

const fetchAttribute = async () => {
  console.log("函数内");

  const {
    data: { message },
  } = await gatherAttribution();

  console.log(message);
  searchKey.type = message.type;
  searchKey.state = message.status;

  console.log(searchKey.state);
  console.log(searchKey.state.length);
};
console.log("setup");
(async () => {
  await fetchAttribute();
  console.log(searchKey);
  console.log(searchKey.state.length);
})();
</script>
<style scoped>
.aside {
  height: 100%;
  color: #c58282;
  text-align: center;
  background-image: url("assets/img/backgrund4.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: -140px 60px;
}
.inactive {
  background-color: #ccc;
}
.common-layout {
  height: 100%;
}
.el-container {
  height: 94vh;
}
/* .active {
} */
</style>
