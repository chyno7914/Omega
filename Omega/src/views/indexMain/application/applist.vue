<template>
  <div class="">
    <el-container>
      <el-main style="" class="main">
        <el-scrollbar>
          <el-col :span="18" :offset="3" style="background-image: ">
            <!-- <div v-for="n in 1">
              <el-card
                style="width: 100%; height: 150px; margin: 15px; padding: 0"
              >
                <el-row style="height: 38px">
                  <el-col style="line-height: 38px" :span="6"
                    >申请人：123</el-col
                  >
                  <el-col style="line-height: 38px" :span="6"> </el-col>
                  <el-col style="line-height: 38px" :span="4" :offset="8">
                    请求类型：暂无
                  </el-col>
                </el-row>
                <el-row style="height: 38px">
                  <el-col
                    style="line-height: 38px; text-align: center"
                    :span="3"
                    :offset="20"
                  >
                    <el-tag>已保存</el-tag>
                  </el-col>
                </el-row>
                <el-row style="height: 38px">
                  <el-col style="line-height: 38px" :span="13" :offset="6">
                    <el-button text type="success" style="">详情</el-button>
                    <el-button text type="success">删除</el-button>
                    <el-button text type="success" style="">详情</el-button>
                    <el-button text type="success">删除</el-button>
                  </el-col>
                  <el-col
                    style="line-height: 38px; text-align: center"
                    :span="5"
                  >
                    2023-12-10
                  </el-col>
                </el-row>
              </el-card>
            </div> -->
            <transition-group
              enterActiveClass="animate__animated animate__zoomIn "
              leaveActiveClass="animate__animated animate__fadeOutRight"
            >
              <div v-for="(item, index) in dataList" :key="item.applId">
                <el-card
                  style="width: 100%; height: 150px; margin: 15px; padding: 0"
                >
                  <el-row>
                    <el-col :span="19" style="height: 114px">
                      <el-row style="height: 38px">
                        <el-col style="line-height: 38px" :span="6"
                          >申请人：{{ item.username }}</el-col
                        >
                        <el-col :span="14" style="">
                          <el-button
                            text
                            type="success"
                            style="float: right"
                            @click="
                              stepsDrawerRef?.showDrawer(
                                item.sequence,
                                item.homeobox
                              )
                            "
                            >查看进度</el-button
                          >
                          <el-button
                            text
                            type="success"
                            style="float: right"
                            v-show="
                              item.status === 'checking' && item.type != 'leave'
                            "
                            v-has-show="'applyList:acceptance'"
                            @click="disposeRepair(item.applId)"
                            >受理</el-button
                          >
                          <el-button
                            text
                            type="success"
                            style="float: right"
                            v-show="
                              item.status === 'checking' && item.type == 'leave'
                            "
                            v-has-show="'applyList:acceptance'"
                            @click="disposeLeave(item.applId)"
                            >受理</el-button
                          >
                          <el-button
                            text
                            type="success"
                            style="float: right"
                            @click="repairDetailRef?.showDialog(item.applId)"
                            v-show="
                              item.type === 'repair' && item.status != 'save'
                            "
                            >详情</el-button
                          >
                          <el-button
                            text
                            type="success"
                            style="float: right"
                            @click="leaveDetailRef?.showDialog(item.applId)"
                            v-show="
                              item.type === 'leave' && item.status != 'save'
                            "
                            >详情</el-button
                          >
                          <el-button
                            text
                            type="success"
                            style="float: right"
                            @click="repairDetailRef?.showDialog(item.applId)"
                            v-show="
                              item.type === 'swap' && item.status != 'save'
                            "
                            >详情</el-button
                          >
                          <el-button
                            text
                            type="success"
                            style="float: right"
                            @click="repairDetailRef?.showDialog(item.applId)"
                            v-show="
                              item.type === 'ruin' && item.status != 'save'
                            "
                            >详情</el-button
                          >
                          <el-button
                            text
                            type="success"
                            style="float: right"
                            v-has-show="'applyList:revocation'"
                            v-show="item.status == 'checking'"
                            @click="toRevocation(item.applId, `撤回`)"
                            >撤回</el-button
                          >
                          <el-button
                            text
                            type="success"
                            style="float: right"
                            v-has-show="'applyList:repulse'"
                            v-show="item.status == 'checking'"
                            @click="toRevocation(item.applId, `打回`)"
                            >打回</el-button
                          >
                          <el-button
                            text
                            type="success"
                            style="float: right"
                            v-has-show="'applyList:homecoming'"
                            v-show="item.status == 'backing'"
                            @click="homecoming(item.applId)"
                            >销假</el-button
                          >
                          <el-button
                            text
                            type="success"
                            style="float: right"
                            v-has-show="'applyList:delete'"
                            v-show="item.status == 'save'"
                            @click="clickBoxDelete(item.applId)"
                            >删除</el-button
                          >
                          <el-button
                            text
                            type="success"
                            style="float: right"
                            v-has-show="'applyList:continue'"
                            v-if="item.status == 'save'"
                            @click="toContinue(item.type, item.applId)"
                            >补完</el-button
                          >
                        </el-col>
                      </el-row>
                      <el-row style="height: 76px">
                        <el-col
                          :span="15"
                          :offset="5"
                          style="background-color: #fff"
                        >
                          <!-- <el-card style="height: 100%" shadow="hover" @click=""
                          >珊瑚礁：珊瑚礁是一种生长在海洋中的硬骨骼生物，它们通常生活在浅海水42554387878857827827272
                        </el-card> -->
                          <!-- result.straight = decodeURIComponent(removeQuotes(result.straight)); -->
                          <Editor
                            style="overflow-y: hidden; border: 1px solid #ccc"
                            v-model="item.straight"
                            :defaultConfig="editorConfig"
                          />
                        </el-col>
                      </el-row>
                    </el-col>
                    <el-col
                      :span="5"
                      style="height: 114px; border-left: 1px dashed #000"
                    >
                      <el-row style="height: 38px; line-height: 38px">
                        <el-col style="text-align: center">
                          请求类型：{{ item.meaning }}
                        </el-col>
                      </el-row>
                      <el-row style="height: 38px">
                        <el-col style="text-align: center; line-height: 38px">
                          <el-tag>{{ item.surrogate }}</el-tag>
                        </el-col>
                      </el-row>
                      <el-row style="height: 38px">
                        <el-col style="line-height: 38px; text-align: center">
                          {{ Hermes.formatTimestamp(item.timestamp) }}
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>

                  <!-- //到此为止 -->
                </el-card>
              </div>
            </transition-group>
          </el-col>
        </el-scrollbar>
      </el-main>
      <el-aside width="20%" style="" class="aside">
        <el-scrollbar>
          <el-col style="margin-top: 20%">
            <el-row style="height: 50px">
              <el-col :span="12">
                <el-button
                  style="width: 100%; height: 100%"
                  :class="switchStateButton('checking')"
                  @click="setState('checking')"
                  >待审核</el-button
                >
              </el-col>
              <el-col :span="12">
                <el-button
                  style="width: 100%; height: 100%"
                  :class="switchStateButton('checked')"
                  @click="setState('checked')"
                  >已审核</el-button
                >
              </el-col>
            </el-row>
            <el-row style="height: 50px" v-has-show="'applyUltraStatus:affirm'">
              <el-col :span="12">
                <el-button
                  style="width: 100%; height: 50px"
                  :class="switchStateButton('backing')"
                  @click="setState('backing')"
                  >待销假</el-button
                >
              </el-col>
              <el-col :span="12">
                <el-button
                  style="width: 100%; height: 50px"
                  :class="switchStateButton('backed')"
                  @click="setState('backed')"
                  >已销假</el-button
                >
              </el-col>
            </el-row>
            <el-row v-has-show="'applyOthertype:affirm'">
              <el-col>
                <el-button
                  style="width: 100%; height: 50px"
                  :class="switchStateButton('save')"
                  @click="setState('save')"
                  >已保存</el-button
                >
              </el-col>
            </el-row>
            <el-row v-has-show="'applyOthertype:affirm'">
              <el-col>
                <el-button
                  style="width: 100%; height: 50px"
                  :class="switchStateButton('backing')"
                  @click="setState('backing')"
                  >待销假</el-button
                >
              </el-col>
            </el-row>
            <el-row v-has-show="'applyOthertype:affirm'">
              <el-col>
                <el-button
                  style="width: 100%; height: 50px"
                  :class="switchStateButton('backed')"
                  @click="setState('backed')"
                  >已销假</el-button
                >
              </el-col>
            </el-row>
            <el-row v-has-show="'applyStatus:affirm'">
              <el-col>
                <el-button
                  style="width: 100%; height: 50px"
                  :class="switchTypeButton('repair')"
                  @click="setType('repair')"
                  >报修申请</el-button
                >
              </el-col>
            </el-row>

            <el-row v-has-show="'applyStatus:affirm'">
              <el-col>
                <el-button
                  style="width: 100%; height: 50px"
                  :class="switchTypeButton('leave')"
                  @click="setType('leave')"
                  >离校申请</el-button
                >
              </el-col>
            </el-row>
            <el-row v-has-show="'applyStatus:affirm'">
              <el-col>
                <el-button
                  style="width: 100%; height: 50px"
                  :class="switchTypeButton('swap')"
                  @click="setType('swap')"
                  >换寝申请</el-button
                >
              </el-col>
            </el-row>
            <el-row v-has-show="'applyStatus:affirm'">
              <el-col>
                <el-button
                  style="width: 100%; height: 50px"
                  :class="switchTypeButton('ruin')"
                  @click="setType('ruin')"
                  >退寝申请</el-button
                >
              </el-col>
            </el-row>
          </el-col>
        </el-scrollbar>
      </el-aside>
    </el-container>
  </div>

  <StepsDrawer ref="stepsDrawerRef"></StepsDrawer>
  <RepairDetail ref="repairDetailRef"></RepairDetail>
  <LeaveDetail ref="leaveDetailRef"></LeaveDetail>
</template>
<script setup lang="ts">
import { ref, reactive, onActivated, watch } from "vue";
import { useRouter } from "vue-router";
import {
  searchSubmit,
  deleteSubmit,
  submitRevocation,
  acceptRepair,
  acceptLeave,
  acceptComing,
} from "@/api/apply";
import { useZeusStore, useHermesStore } from "@/store";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor } from "@wangeditor/editor-for-vue";
import { IEditorConfig } from "@wangeditor/editor";
import StepsDrawer from "@/components/customComponents/applist/stepsDrawer.vue";
import RepairDetail from "@/components/customComponents/applist/repairDetail.vue";
import LeaveDetail from "@/components/customComponents/applist/leaveDetail.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import "animate.css";
import service from "@/utils/request";
type KeySearch = {
  state: string[];
  type: string[];
};
interface DataList {
  applId: number;
  homeobox: number;
  meaning: string;
  meta: string;
  rid: number;
  sequence: number;
  sid: number;
  sname: string;
  status: string;
  straight: string;
  surrogate: string;
  telephone: string;
  timestamp: number;
  tname: string;
  type: string;
  uid: number;
  username: string;
}

onActivated(async () => {
  await dataFetch(searchKey);
});
const router = useRouter();
const Zeus = useZeusStore();
const Hermes = useHermesStore();
const editorConfig: Partial<IEditorConfig> = {
  readOnly: true,
  autoFocus: false,
  scroll: false,
};
const searchKey = reactive<KeySearch>({
  type: Hermes.limitApplyType,
  state: Hermes.limitApplyStatus,
});
const stepsDrawerRef = ref<InstanceType<typeof StepsDrawer>>();
const repairDetailRef = ref<InstanceType<typeof RepairDetail>>();
const leaveDetailRef = ref<InstanceType<typeof LeaveDetail>>();
const dataList = reactive<DataList[]>([]);
const setState = (key: string) => {
  if (searchKey.state.includes(key)) {
    searchKey.state.splice(searchKey.state.indexOf(key), 1);
  } else searchKey.state.push(key);
};
const setType = (key: string) => {
  if (searchKey.type.includes(key)) {
    searchKey.type.splice(searchKey.type.indexOf(key), 1);
  } else searchKey.type.push(key);
};
const switchStateButton = (key: string): string => {
  return searchKey.state.includes(key) ? "inactive" : "";
};
const switchTypeButton = (key: string): string => {
  return searchKey.type.includes(key) ? "inactive" : "";
};
const dataFetch = async (data: KeySearch): Promise<void> => {
  const {
    data: { message },
  } = await searchSubmit(data.state, data.type, Zeus.tid);
  dataList.splice(0, dataList.length, ...message);
};
const toContinue = (path: string, id: number) => {
  router.push({
    path: "/apply/" + path,
    query: {
      id,
    },
  });
};
const toDelete = async (id: number | string) => {
  const {
    data: { message, status },
  } = await deleteSubmit(id);
  ElMessage({
    message: message,
    type: status ? "error" : "success",
  });
  dataFetch(searchKey);
};
const clickBoxDelete = (id: number | string) => {
  ElMessageBox.confirm("删除后无法恢复，是否删除这条数据？", "提示", {
    confirmButtonText: "确认删除",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      toDelete(id);
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
      // 用户点击了 Cancel 按钮，不执行路由跳转
    });
};
const disposeRepair = async (target: number) => {
  const {
    data: { message, status },
  } = await acceptRepair(target);
  ElMessage({
    message: message,
    type: status ? "error" : "success",
  });
  dataFetch(searchKey);
};
const disposeLeave = async (target: number) => {
  const {
    data: { message, status },
  } = await acceptLeave(target);
  ElMessage({
    message: message,
    type: status ? "error" : "success",
  });
  dataFetch(searchKey);
};
const homecoming = async (target: number) => {
  const {
    data: { message, status },
  } = await acceptComing(target);
  ElMessage({
    message: message,
    type: status ? "error" : "success",
  });
  dataFetch(searchKey);
};
const toRevocation = async (target: number, antistop: string) => {
  const {
    data: { message, status },
  } = await submitRevocation(target, antistop);
  ElMessage({
    message: message,
    type: status ? "error" : "success",
  });
  dataFetch(searchKey);
};

watch(
  () => searchKey,
  () => {
    console.log("组件内" + searchKey.state);
    dataFetch(searchKey);
  },
  { deep: true }
);
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
