<template>
  <div class="welcome">
    <el-row :gutter="24">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <div class="cards fade-in">
            <div class="card-1">
              <i class="iconfont icon-ar-view"></i>
              <div class="card1-description">🧐欢</div>
            </div>
            <div class="card-2">
              <i class="iconfont icon-ar-xiezuo"></i>
              <div class="card2-description">😎迎</div>
            </div>
            <div class="card-3">
              <i class="iconfont icon-ar-tuijian"></i>
              <div class="card3-description">🥰登</div>
            </div>
            <div class="card-4">
              <i class="iconfont icon-ar-algertMsg"></i>
              <div class="card4-description">🥳录</div>
            </div>
          </div>
          <el-col :span="8"> </el-col>
          <el-col :span="8"> </el-col>
          <!-- <el-container class="statistic" direction="vertical">
            <div class="chart">
              <div></div>
              <div id="main"></div>
            </div>
            <div v-if="this.show" class="none-info"></div>
          </el-container> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style lang="less" scoped>
@card1-bg: #bec4e7af;
@card2-bg: #fadfacbf;
@card3-bg: #bad0d3af;
@card4-bg: #f5bba8af;
.welcome {
  height: 95vh;
  background-image: url("assets/img/bakcgrund6.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: 0 -52;
  margin-left: -9px;
}
.welcome-info {
  margin-left: 3rem;
}
#main {
  width: 45rem;
  height: 25rem;
}
.cards {
  float: left;
  width: 400px;
  height: 100%;
  margin-right: 30px;
  /* /deep/ .el-card {
    display: flex;
  } */
  div[class*="card-"] {
    display: flex;
    border-radius: 15px;
    width: 375px;
    height: 120px;
    align-items: center;
    justify-content: space-evenly;
    margin: 1rem 0;
    margin-left: 3rem;
    cursor: pointer;
    box-shadow: 0 0 0 1px hsla(240, 0%, 100%, 0.8) inset,
      0 0.2em 0.5em rgba(199, 198, 198, 0.795);
  }
  div[class*="description"] {
    font-size: 1.2rem;
    text-shadow: 0 1px 1px hsla(240, 0%, 100%, 0.5);
    -webkit-box-reflect: below 10px -webkit-gradient(linear, left top, left
          bottom, from(transparent), to(rgba(255, 255, 255, 0.11)));
    /* &:hover {
      animation: bouncingLoader 0.6s alternate;
    } */
  }
  @keyframes bouncingLoader {
    from {
      width: 0.1 rem;
      height: 0.1 rem;
      opacity: 1;
      transform: translate3d(0);
    }
    to {
      width: 1 rem;
      height: 1 rem;
      opacity: 0.1;
      transform: translate3d(0, -1rem, 0);
    }
  }
  .card-1 {
    background-color: @card1-bg;
    border: 3px solid transparent;
    transition: all 0.4s ease;
    &:hover {
      border: 3px solid (@card1-bg+#817b7b11);
    }
  }
  .card-2 {
    border: 3px solid transparent;
    transition: all 0.4s ease;
    background-color: @card2-bg;
    &:hover {
      border: 3px solid (@card2-bg+#817b7b11);
    }
  }
  .card-3 {
    border: 3px solid transparent;
    transition: all 0.4s ease;
    background-color: @card3-bg;
    &:hover {
      border: 3px solid (@card3-bg+#817b7b11);
    }
  }
  .card-4 {
    border: 3px solid transparent;
    transition: all 0.4s ease;
    background-color: @card4-bg;
    &:hover {
      border: 3px solid (@card4-bg+#817b7b11);
    }
  }
  i[class*="iconfont"] {
    font-size: 45px;
    color: #151615af;
  }
}
.statistic {
  align-items: center;
  .chart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
/* this card is inspired form this - https://georgefrancis.dev/ */

.card {
  --border-radius: 0.75rem;
  --primary-color: #7257fa;
  --secondary-color: #3c3852;
  width: 210px;
  font-family: "Arial";
  padding: 1rem;
  cursor: pointer;
  border-radius: var(--border-radius);
  background: #f1f1f3;
  box-shadow: 0px 8px 16px 0px rgb(0 0 0 / 3%);
  position: relative;
}

.card > * + * {
  margin-top: 1.1em;
}

.card .card__content {
  color: var(--secondary-color);
  font-size: 0.86rem;
}

.card .card__title {
  padding: 0;
  font-size: 1.3rem;
  font-weight: bold;
}

.card .card__date {
  color: #6e6b80;
  font-size: 0.8rem;
}

.card .card__arrow {
  position: absolute;
  background: var(--primary-color);
  padding: 0.4rem;
  border-top-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
  bottom: 0;
  right: 0;
  transition: 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card svg {
  transition: 0.2s;
}

/* hover */
.card:hover .card__title {
  color: var(--primary-color);
  text-decoration: underline;
}

.card:hover .card__arrow {
  background: #111;
}

.card:hover .card__arrow svg {
  transform: translateX(3px);
}
</style>
