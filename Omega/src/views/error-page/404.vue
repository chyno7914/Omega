<template>
  <div class="box">
    <div bgcolor="#494949">
      <div class="head404"></div>

      <div class="txtbg404">
        <div class="txtbox">
          <p>对不起，您请求的页面不存在、或已被删除、或暂时不可用</p>

          <p class="paddingbox">请点击以下链接继续浏览网页</p>

          <p @click="moveHome"><a href="javascript:;">》返回网站首页</a></p>
          <p>》<a style="cursor: pointer" @click="moveSign">返回登录</a></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const moveHome = () => {
  router.push("/");
};
const moveSign = () => {
  router.replace("/sign");
};
</script>
<style type="text/css" scoped>
.box {
  position: relative;
  height: 100%;
  width: 100%;
  padding-top: 50px;
  background-image: url("assets/img/stars.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: -390px 0;
}
.head404 {
  width: 580px;
  height: 234px;
  margin: 0 auto 0 auto;
  background: url(https://www.daixiaorui.com/Public/images/head404.png)
    no-repeat;
}

.txtbg404 {
  width: 499px;
  height: 169px;
  margin: 10px auto 0 auto;
  background: url(https://www.daixiaorui.com/Public/images/txtbg404.png)
    no-repeat;
}

.txtbg404 .txtbox {
  width: 390px;
  position: relative;
  top: 30px;
  left: 60px;
  color: #eee;
  font-size: 13px;
}

.txtbg404 .txtbox p {
  margin: 5px 0;
  line-height: 18px;
}

.txtbg404 .txtbox .paddingbox {
  padding-top: 15px;
}

.txtbg404 .txtbox p a {
  color: #eee;
  text-decoration: none;
}

.txtbg404 .txtbox p a:hover {
  color: #fc9d1d;
  text-decoration: underline;
}
</style>
