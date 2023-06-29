<template>
  <el-col
    :offset="1"
    style="
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      padding-top: 5px;
    "
  >
    <span>个人信息</span>
    <span style="margin: 10px">|</span>
    <span style="font-size: 25px">设置</span>
  </el-col>
  <el-row style="padding-top: 2%">
    <el-col :span="18" :offset="3">
      <el-row>
        <el-col :span="2">修改头像：</el-col>
        <el-col :span="4">
          <el-avatar :size="150" :src="Zeus.portrait" />
        </el-col>
        <el-col :span="4">
          <PhotoCut ref="photoCutRef" @upload="changePortrait"></PhotoCut>
        </el-col>
        <el-col :span="4">
          <el-button
            @click="photoCutRef?.uploadImage()"
            @update="showData"
            style="margin-top: 50%"
            >确认修改</el-button
          >
        </el-col>
      </el-row>
      <el-row style="height: 50px; margin-top: 15px">
        <el-col :span="2">UID：</el-col>
        <el-col :span="4">
          {{ Zeus.uid }}
        </el-col>
        <el-col :span="2">权限：</el-col>
        <el-col :span="4">
          <el-tag>
            {{ appellation }}
          </el-tag>
        </el-col>
      </el-row>
      <el-row style="height: 50px">
        <el-col :span="2">用户名：</el-col>
        <el-col :span="4">
          <el-form
            ref="justUsernameRef"
            :model="justUsername"
            :rules="nameRules"
          >
            <el-form-item prop="omega">
              <el-input v-model="justUsername.omega"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4">
          <el-button @click="changeUsername(justUsernameRef)"
            >确认修改</el-button
          >
        </el-col>
      </el-row>
      <el-row style="height: 50px" v-has-show="'profile:studentenausweis'">
        <el-col :span="2">姓名：</el-col>
        <el-col :span="4"> {{ studentenausweis.sname }} </el-col>
        <el-col :span="2">学号：</el-col>
        <el-col :span="4"> {{ studentenausweis.sid }} </el-col>
      </el-row>
      <el-row style="height: 50px" v-has-show="'profile:studentenausweis'">
        <el-col :span="2">出生日期：</el-col>
        <el-col :span="4"> {{ studentenausweis.birth }} </el-col>
        <el-col :span="2">户籍：</el-col>
        <el-col :span="4"> {{ studentenausweis.cencus }} </el-col>
      </el-row>
      <el-row style="height: 50px" v-has-show="'profile:studentenausweis'">
        <el-col :span="2">寝室：</el-col>
        <el-col :span="4">
          {{ studentenausweis.tname }} - {{ studentenausweis.rid }}</el-col
        >
      </el-row>
      <el-row style="height: 50px">
        <el-col :span="2">密码：</el-col>
        <el-col :span="4">
          <el-button @click="passwordDialogRef?.showDialog()"
            >修改密码</el-button
          >
        </el-col>
      </el-row>
      <el-row style="">
        <el-col>
          <el-row>
            <el-col :span="2">电话号码：</el-col>
            <el-col :span="4">
              <el-input v-model="justPhone.alpha" disabled></el-input>
            </el-col>
          </el-row>

          <el-row style="margin-top: 10px">
            <el-col :span="4" :offset="2"
              ><el-form
                ref="justPhoneRef"
                :model="justPhone"
                :rules="phoneRules"
              >
                <el-form-item prop="omega">
                  <el-input
                    v-model="justPhone.omega"
                    :formatter="(value:string) => value.replace(/[^\d]/g, '')"
                  ></el-input>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="1">
              <el-button @click="changeTelephone(justPhoneRef)">确认</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  <PasswordDialog ref="passwordDialogRef"></PasswordDialog>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { RouteRecordRaw, useRouter } from "vue-router";
import { cureUser, setUsername, setTelephone } from "@/api/user";
import { useZeusStore, useAstraeaStore } from "@/store";
import PhotoCut from "components/generalComponent/photoCut.vue";
import PasswordDialog from "components/customComponents/reset/passwordDialog.vue";
import moment from "moment";
let enterType = ref<boolean>(true);
const Zeus = useZeusStore();
const Astraea = useAstraeaStore();
const regStatus = ref(1);
const justUsernameRef = ref<FormInstance>();
const justPhoneRef = ref<FormInstance>();
const passwordDialogRef = ref<InstanceType<typeof PasswordDialog>>();
const router = useRouter();
const justUsername = reactive({
  omega: Zeus.username,
  alpha: Zeus.username,
});
let appellation = ref();
const studentenausweis = reactive({
  birth: "",
  cencus: "",
  gender: null,
  rid: "",
  sid: "",
  sname: "",
  tname: "",
});
const justPhone = reactive({
  alpha: "",
  omega: "",
});
const photoCutRef = ref<InstanceType<typeof PhotoCut>>();
const showData = (data: any) => {
  console.log(data, 1);
};
const initData = async () => {
  const {
    data: {
      message: { call, telephone, user_pic, birth, ...orthers },
    },
  } = await cureUser();
  ({
    census: studentenausweis.cencus,
    gender: studentenausweis.gender,
    rid: studentenausweis.rid,
    sid: studentenausweis.sid,
    sname: studentenausweis.sname,
    tname: studentenausweis.tname,
  } = orthers);
  studentenausweis.birth = moment(birth).format("YYYY-MM-DD");
  console.log(studentenausweis.birth);

  Zeus.portrait = Zeus.setPortrait(user_pic);
  appellation.value = call;
  justPhone.alpha = telephone;
};
const phoneRules = reactive<FormRules>({
  omega: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      min: 11,
      max: 11,
      message: "手机号格式输入错误，长度为11位",
      trigger: "blur",
    },
  ],
});
const nameRules = reactive<FormRules>({
  omega: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 1, max: 16, message: "用户名须在1至16位之间", trigger: "blur" },
  ],
});
const changePortrait = (data: any) => {
  Zeus.portrait = Zeus.setPortrait(data.src);
  ElMessage({
    message: data.message,
    type: data.status ? "error" : "success",
  });
};
const changeUsername = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  if (justUsername.omega == justUsername.alpha) return;
  console.log(justUsername.omega);

  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const {
        data: { message, status },
      } = await setUsername(justUsername.omega);

      //   .then((res) => {
      ElMessage({
        message: message,
        type: status ? "error" : "success",
      });
      if (!status) {
        justUsername.alpha = justUsername.omega
        Zeus.username = justUsername.omega
      };
      // });
    }
  });
};
const changeTelephone = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const {
        data: { message, status },
      } = await setTelephone(justPhone.omega);

      //   .then((res) => {
      ElMessage({
        message: message,
        type: status ? "error" : "success",
      });
      if (!status) {
        justPhone.alpha = justPhone.omega;
        justPhone.omega = "";
      }
      // });
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
console.log(Zeus.username);

initData();
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
