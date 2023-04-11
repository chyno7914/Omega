<template>
  <div class="box">
    <div class="Card">
      <div class="loginCard">
        <el-card>
          <el-form
            ref="regFormRef"
            :model="regForm"
            label-width="100px"
            :rules="rules"
            class="demo-ruleForm"
            status-icon
            :hide-required-asterisk="true"
          >
            <el-form-item label="旧密码：" prop="password">
              <el-input v-model="regForm.password" type="password" />
            </el-form-item>
            <el-form-item label="确认密码：" prop="confirm">
              <el-input v-model="regForm.confirm" type="password" />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitReg(regFormRef)" round
                >注册</el-button
              >
              <el-button @click="resetForm(regFormRef)" round>重置</el-button>
            </el-form-item>
          </el-form>
          <a
            href="javascript:void(0);"
            @click="enterChange(regFormRef)"
            v-show="!enterType"
          >
            去登录->
          </a>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { RouteRecordRaw, useRouter } from "vue-router";
import { login, register } from "@/api/user";
import { useZeusStore, useAstraeaStore } from "@/store";
let enterType = ref<boolean>(true);
const Zeus = useZeusStore();
const Astraea = useAstraeaStore();
const regStatus = ref(1);
const loginFormRef = ref<FormInstance>();
const regFormRef = ref<FormInstance>();
const router = useRouter();
const loginForm = reactive({
  username: "user",
  password: "123456",
});
const regForm = reactive({
  username: "",
  password: "",
  confirm: "",
  role: null,
  sid: "",
  tcode: "",
  telephone: "",
});
const passwordCheck = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请确认密码"));
  } else if (value !== regForm.password) {
    callback(new Error("密码确认失败"));
  } else {
    callback();
  }
};
const rules = reactive<FormRules>({
  username: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 1, max: 16, message: "账号须在1至16位之间", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 18, message: "密码须在6至18位之间", trigger: "blur" },
  ],
  confirm: [{ validator: passwordCheck, trigger: "blur" }],
  role: [{ required: true, message: "请选择身份", trigger: "change" }],
  tcode: [
    { required: !!regForm.role, message: "请输入身份校验码", trigger: "blur" },
  ],
  telephone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    { min: 11, max: 11, message: "手机号格式输入错误", trigger: "blur" },
  ],
});
const submitLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      login(loginForm).then((res) => {
        ElMessage({
          message: res.data.message,
          type: res.data.status ? "error" : "success",
        });
        if (!res.data.status) {
          Zeus.token = res.data.token;
          // Astraea.route = res.data.route;
          Zeus.username = loginForm.username;
          router.push("/");
        }
      });
    }
  });
};
const submitReg = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      register(regForm).then((res) => {
        ElMessage({
          message: res.data.message,
          type: res.data.status ? "error" : "success",
        });
        if (!res.data.status) {
          enterType.value = !enterType.value;
        }
      });
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
const enterChange = (formEl: FormInstance | undefined) => {
  enterType.value = !enterType.value;
  resetForm(formEl);
};
</script>

<style scoped>
.box {
  position: relative;
  width: 100%;
  height: 100vh;

  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: 0 -143px;
}
.Card {
  position: absolute;
  width: 500px;
  height: 500px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.el-card a {
  color: rgb(135, 158, 235);
}
.card-box {
  width: 25%;
  height: 25%;
}
.card-head {
  height: 120px;
  background-image: url("assets/img/backgrund3.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: 0 -389px;
}
a {
  float: right;
  margin-bottom: 10px;
}
.el-input {
  width: 80%;
}
.el-button {
  width: 100px;
}
template {
  height: 100%;
  width: 100%;
  text-align: center;
}
</style>
