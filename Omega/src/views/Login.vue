<template>
  <!-- 波浪区域 -->
  <div class="master">
  <div class="waveBox">
    <!-- svg形状 -->
    <h1>宿舍管理系统</h1>
    <svg class="waves" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
      <!-- 形状容器 -->
      <defs>
        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88 18 88 18 v44h-352z">
        </path>
      </defs>
      <!-- 组合形状 -->
      <g class="parallax">
        <path xlink-href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)"/>
        <path xlink-href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)"/>
        <path xlink-href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)"/>
        <path xlink-href="#gentle-wave" x="48" y="7" fill="#fff"/>
      </g>
    </svg> 
    
  </div>  
  <el-card class="box-card" v-show="enterType">
        <el-form 
          ref="loginFormRef"
          :model="loginForm" 
          label-width="100px" 
          :rules="rules"
          class="demo-ruleForm"
          status-icon
          hide-required-asterisk="false"
        >
            <el-form-item label="账号：" prop="uid">
            <el-input v-model="loginForm.uid"/>
            </el-form-item>
            <el-form-item label="密码：" prop='password' >
            <el-input v-model="loginForm.password" type="password"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitLogin(loginFormRef)" round>登录</el-button>
              <el-button @click="resetForm(loginFormRef)" round>重置</el-button>
            </el-form-item>
        </el-form>
        
        <a href="javascript:void(0);" @click="enterChange(loginFormRef)" v-show="enterType">
          去注册-> 
        </a>
        
  </el-card>
  <el-card class="box-card" v-show="!enterType">
    
  <el-form 
          ref="regFormRef"
          :model="regForm" 
          label-width="100px" 
          :rules="rules"
          class="demo-ruleForm"
          status-icon
          hide-required-asterisk="false"
        > 
          <v-show>
            <el-form-item label="账号：" prop="uid">
            <el-input v-model="regForm.uid"/>
            </el-form-item>
            <el-form-item label="密码：" prop='password' >
            <el-input v-model="regForm.password" type="password" />
            </el-form-item>
            <el-form-item label="确认密码：" prop='confirm'>
            <el-input v-model="regForm.confirm" type="password"/>
            </el-form-item>
          </v-show>
          <v-show>
            <el-form-item label="账号：" prop="uid">
            <el-input v-model="regForm.uid"/>
            </el-form-item>
            <el-form-item label="密码：" prop='password' >
            <el-input v-model="regForm.password" type="password" />
            </el-form-item>
            <el-form-item label="确认密码：" prop='confirm'>
            <el-input v-model="regForm.confirm" type="password"/>
            </el-form-item>
          </v-show>
            
            <el-form-item>
              <el-button type="primary" @click="submitReg(regFormRef)" round>登录</el-button>
              <el-button @click="resetForm(regFormRef)" round>重置</el-button>
              <el-button @click="next"></el-button>
            </el-form-item>
            
        </el-form> 
        <a href="javascript:void(0);" @click="enterChange(regFormRef)" v-show="!enterType">
          去登录-> 
        </a>
  </el-card>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
let enterType = ref<boolean>(true)
const active = ref(0)
const next = () => {
  if (active.value++ > 2) active.value = 0
}
const loginFormRef = ref<FormInstance>()
const regFormRef = ref<FormInstance>()
const loginForm = reactive({
  uid: '',
  password:''
})
const regForm = reactive({
  uid: '',
  password: '',
  confirm:''
})
const passwordCheck = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请确认密码'))
  } else if (value !== regForm.password) {
    callback(new Error("密码确认失败"))
  } else {
    callback()
  }
}
const rules = reactive<FormRules>({
  uid: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 6, max: 16, message: '账号须在6至16位之间', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 18, message: '密码须在6至18位之间', trigger: 'blur' },
  ],
  confirm: [
    { validator: passwordCheck, trigger: 'blur' },
  ]
})  
const submitLogin = async (formEl: FormInstance | undefined ) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
const submitReg = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
const enterChange = (formEl: FormInstance | undefined) => {
  enterType.value = !enterType.value
  resetForm(formEl)
}
</script>

<style scoped>
.master{
  background-color: pink;
  background-size: 100% 100%;
   background: url(../);
}
.el-card a{
  color:rgb(135, 158, 235);
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width:480px;
}
a{
  float:right;
  margin-bottom: 10px;
}
.el-input{
  width: 80%;
}
.el-button{
  /* justify-content: center; */
  width: 100px;
}
template{
  height: 100%;
  width: 100%;
}
.waveBox{
  background:linear-gradient(60deg,rgba(84,58,183,1),rgba(0,172,193,1) 100%);
  height: 120px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.waveBox h1{
  display: flex;
  justify-content: center;
  color: #fff;
}
</style>