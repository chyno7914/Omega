<template>
  <el-col
    :offset="1"
    style="
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      padding-top: 5px;
    "
    :id="dataForm.applId"
  >
    <span>申请</span>
    <span style="margin: 10px">|</span>
    <span style="font-size: 25px">报修</span>
  </el-col>
  <el-row>
    <el-col :span="18" :offset="3">
      <el-form
        ref="dataFormRef"
        :model="dataForm"
        :rules="rules"
        hide-required-asterisk
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="学号">
              <el-input
                v-model="dataStencil.sid"
                v-limit-elsearch="'inputSid:limit'"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="3">
            <el-form-item label="姓名">
              <el-input
                v-model="dataStencil.sname"
                v-limit-elsearch="'inputSname:limit'"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="3">
            <el-form-item label="宿舍">
              <el-input
                v-model="dataStencil.tname"
                v-limit-elsearch="'inputFlat:limit'"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="房间">
              <el-input
                v-model="dataStencil.rid"
                v-limit-elsearch="'inputRoom:limit'"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="3">
            <el-form-item label="电话" prop="telephone">
              <el-input
                placeholder="请输入4至11位电话号码"
                v-model="dataStencil.telephone"
                :formatter="(value: string) => value.replace(/[^\d]/g, '').slice(0, 11)"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="3"> </el-col>
          <el-col :span="6" :offset="3"> </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="报修详情：" prop="text"> </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :offset="1" :span="23">
            <div style="border: 1px solid #ccc">
              <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editorRef"
                :defaultConfig="toolbarConfig"
              />
              <Editor
                style="height: 300px; overflow-y: hidden"
                v-model="dataStencil.valueHtml"
                @onCreated="handleCreated($event)"
                :defaultConfig="editorConfig"
              />
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-col>
  </el-row>
  <el-col :offset="19" style="margin-top: 15px">
    <el-button @click="toSave()" type="success">保存</el-button>
    <el-button @click="submit(dataFormRef)" type="primary"> 提交 </el-button>
  </el-col>
  <el-button @click="publish()"></el-button>
</template>

<script setup lang="ts">
import {
  ref,
  reactive,
  shallowRef,
  onMounted,
  toRefs,
  watch,
  computed,
  watchEffect,
  onBeforeMount,
} from "vue";
import { IToolbarConfig, IEditorConfig } from "@wangeditor/editor";
import {
  useRoute,
  useRouter,
  onBeforeRouteLeave,
  onBeforeRouteUpdate,
} from "vue-router";
import { useZeusStore } from "@/store";
import { ElMessage, ElMessageBox, FormRules, FormInstance } from "element-plus";
import type { Action } from "element-plus";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { pushSubmit, continueSubmit } from "@/api/apply";
import { ArrowLeft } from "@element-plus/icons-vue";

// onBeforeRouteEnter((to, from, next) => {
//   // 使用箭头函数将 next 函数传递给 open 函数
//   if (diftFlag.value) open(() => next());
//   else next();
// });

onBeforeRouteLeave((to, from, next) => {
  // 使用箭头函数将 next 函数传递给 open 函数
  if (diftFlag.value) open(() => next());
  else next();
});
type Stencil = {
  applId: number | null;
  uid: number | null;
  sid: number;
  sname: string;
  tname: string;
  rid: number;
  time: number;
  type: string;
  telephone: string;
  valueHtml: string;
  meta: string;
};
type Others = {};
type FormData = Stencil & Others;
//富文本编辑器
const route = useRoute();
const router = useRouter();
const Zeus = useZeusStore();
const dataFormRef = ref<FormInstance>();
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
console.log(route.query.id);

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const publish = () => {
  console.log(dataStencil.valueHtml);
};
const dataStencil = reactive<Stencil>({
  applId: null,
  uid: Zeus.uid,
  sid: Zeus.sid,
  sname: Zeus.sname,
  tname: Zeus.flat,
  rid: Zeus.rid,
  type: "repair",
  telephone: "",
  meta: "",
  time: 0,
  valueHtml: "<p><br></p>",
});
const toolbarConfig: Partial<IToolbarConfig> = {
  excludeKeys: ["emotion", "group-image", "group-video"],
};
const editorConfig: Partial<IEditorConfig> = {
  placeholder: "请输入内容...",
};
const dataOther = reactive<Others>({});
const dataForm = computed<FormData>(() => {
  return {
    ...dataOther,
    ...dataStencil,
  };
});
const rules = reactive<FormRules>({
  telephone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    { min: 4, message: "电话号码过短", trigger: "blur" },
  ],
});
let copyForm = ref<string>(JSON.stringify(dataStencil));
// let diftFlag = ref<boolean>(copyForm.value == JSON.stringify(dataStencil));
let diftFlag = computed<boolean>(
  () => copyForm.value != JSON.stringify(dataStencil)
);

const toSave = async (): Promise<void> => {
  dataStencil.meta = JSON.stringify(dataOther);
  dataStencil.time = Date.now();
  const {
    data: { message, status, id },
  } = await pushSubmit(dataStencil);
  ElMessage({
    message: message,
    type: status ? "error" : "success",
  });
  if (!dataStencil.applId)
    router.replace({
      query: {
        id,
      },
    });

  copyForm.value = JSON.stringify(dataStencil);

  // const {[propName: string]: _, ...data } = dataStencil;
};
const submit = async (formEl: FormInstance | undefined): Promise<void> => {
  dataStencil.meta = JSON.stringify(dataOther);
  dataStencil.time = Date.now();
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const {
        data: { message, status },
      } = await pushSubmit(dataStencil, "checking");
      ElMessage({
        message: message,
        type: status ? "error" : "success",
      });
      if (!status) router.push("/applist");
    }
  });
  copyForm.value = JSON.stringify(dataStencil);
};

const initData = async () => {
  const { id } = route.query;
  if (typeof id === "string") {
    console.log("执行重置");

    const {
      data: { message: dataList, status },
    } = await continueSubmit(id);
    if (!status) {
      dataStencil.telephone = dataList[0].telephone;
      dataStencil.valueHtml = dataList[0].straight;
      dataStencil.applId = dataList[0].applId;
      copyForm.value = JSON.stringify(dataStencil);
    }
  }
};

initData();
// 将 next 函数设置为 open 函数的参数
const open = (next: () => void) => {
  console.log(copyForm.value);
  console.log(JSON.stringify(dataStencil));

  ElMessageBox.confirm(
    "你的请求尚未保存，请求保存后可于请求列表页查看，是否确认离开此页面？",
    "提示",
    {
      confirmButtonText: "确认离开",
      cancelButtonText: "取消",
      type: "warning",
    }
  )
    .then(() => {
      ElMessage({
        type: "success",
        message: "确认跳转",
      });
      // 用户点击了 OK 按钮，执行路由跳转
      next();
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消跳转",
      });
      // 用户点击了 Cancel 按钮，不执行路由跳转
    });
};
watchEffect(() => {
  console.log(diftFlag.value);
  console.log("执行" + dataStencil.applId);
});
watch(
  () => dataOther,
  (k) => {
    dataStencil.meta = JSON.stringify(k);
  },
  { deep: true }
);
watch(
  () => route.query,
  (newPath, oldPath) => {
    initData();
  }
);
// 判断 a 是否等于 1A
// if (a === 1) {
//   // 阻止用户离开当前路由
//   next(false)
// } else {
//   // 允许用户离开当前路由
//   next()
// }
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
