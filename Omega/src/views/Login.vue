<template>
  <div class="box">
    <div class="Card">
      <div class="card-head"></div>
      <div class="loginCard">
        <el-card v-show="enterType">
          <el-form
            ref="loginFormRef"
            v-show="regStatus == 1"
            :model="loginForm"
            label-width="100px"
            :rules="rules"
            class="demo-ruleForm"
            status-icon
            :hide-required-asterisk="true"
          >
            <el-form-item label="用户名：" prop="username">
              <el-input v-model="loginForm.username" />
            </el-form-item>
            <el-form-item label="密码：" prop="password">
              <el-input v-model="loginForm.password" type="password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitLogin(loginFormRef)" round
                >登录</el-button
              >
              <el-button @click="resetForm(loginFormRef)" round>重置</el-button>
            </el-form-item>
          </el-form>
          <a
            href="javascript:void(0);"
            @click="enterChange(loginFormRef)"
            v-show="enterType"
          >
            去注册->
          </a>
        </el-card>
        <el-card v-show="!enterType">
          <el-form
            ref="regFormRef"
            :model="regForm"
            label-width="100px"
            :rules="rules"
            class="demo-ruleForm"
            status-icon
            :hide-required-asterisk="true"
          >
            <el-form-item label="权限" prop="role">
              <el-select v-model="regForm.role" placeholder="请选择您的身份">
                <el-option label="临时用户" value="0" />
                <el-option label="学生用户" value="1" />
                <el-option label="管理员" value="2" />
                <el-option label="超级管理员" value="3" />
              </el-select>
            </el-form-item>
            <div v-show="Number(regForm.role) == 1">
              <el-form-item label="学号：" prop="sid">
                <el-input
                  v-model="regForm.sid"
                  :formatter="(value:string) => value.replace(/[^\d]/g, '')"
                />
              </el-form-item>
            </div>
            <el-form-item label="用户名：" prop="username">
              <el-input v-model="regForm.username" />
            </el-form-item>
            <el-form-item label="密码：" prop="password">
              <el-input v-model="regForm.password" type="password" />
            </el-form-item>
            <el-form-item label="确认密码：" prop="confirm">
              <el-input v-model="regForm.confirm" type="password" />
            </el-form-item>
            <el-form-item label="联系方式：" prop="telephone">
              <el-input v-model="regForm.telephone" />
            </el-form-item>
            <div v-show="Number(regForm.role) > 1">
              <el-form-item label="校验码：" prop="confirm">
                <el-input v-model="regForm.tcode" />
              </el-form-item>
            </div>
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
import { useRouter } from "vue-router";
import { login, register } from "@/api/user";
import { useZeusStore, useAstraeaStore, useHermesStore } from "@/store";
let enterType = ref<boolean>(true);
const Zeus = useZeusStore();
const Astraea = useAstraeaStore();
const Hermes = useHermesStore();
const regStatus = ref(1);
let attributions = ref([]);
const loginFormRef = ref<FormInstance>();
const regFormRef = ref<FormInstance>();
const router = useRouter();
const loginForm = reactive({
  username: "admin",
  password: "123456",
});
const regForm = reactive({
  username: "user",
  password: "123456",
  confirm: "123456",
  role: null,
  tcode: "",
  sid: null,
  telephone: "12345678910",
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
          ({
            token: Zeus.token,
            uid: Zeus.uid,
            rid: Zeus.rid,
            tname: Zeus.flat,
            tid: Zeus.tid,
            sid: Zeus.sid,
            username: Zeus.username,
            attribution: attributions.value,
            sname: Zeus.sname,
            permission: Zeus.permission,
            user_pic: Zeus.portrait,
          } = res.data);
          Zeus.portrait = Zeus.setPortrait(Zeus.portrait);
          for (let { kind, responsiless } of attributions.value) {
            if (kind === "status") {
              Hermes.limitApplyStatus.push(responsiless);
            } else if (kind === "kind") {
              Hermes.limitApplyType.push(responsiless);
            }
          }
          console.log("登录：" + Hermes.limitApplyStatus);
          console.log(Hermes.limitApplyStatus.length);
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
