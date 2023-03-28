<template>
  <!-- 波浪区域 -->
  <div class="waveBox">
    <!-- svg形状 -->
    <h1>宿舍管理系统</h1>
    <svg class="waves" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
    </svg> 
    
  </div>  
  <el-card class="box-card" v-show="enterType">
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
            <el-input v-model="loginForm.username"/>
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
          :hide-required-asterisk="true"
        >   
            <el-form-item label="权限" prop="role">
              <el-select v-model="regForm.role" placeholder="请选择您的身份">
                <el-option label="学生用户" value=0 />
                <el-option label="管理员" value=1 />
                <el-option label="超级管理员" value=2 />
              </el-select>
            </el-form-item>
            <el-form-item label="用户名：" prop="username">
            <el-input v-model="regForm.username"/>
            </el-form-item>
            <el-form-item label="密码：" prop='password' >
            <el-input v-model="regForm.password" type="password" />
            </el-form-item>
            <el-form-item label="确认密码：" prop='confirm'>
            <el-input v-model="regForm.confirm" type="password"/>
            </el-form-item>
            <el-form-item label="联系方式：" prop="telephone">
                <el-input v-model="regForm.telephone"/>
            </el-form-item>
            <div v-show="regForm.role != 0">
              <el-form-item label="校验码：" prop='confirm'>
                <el-input v-model="regForm.tcode" />
              </el-form-item>
            </div>
              
            
  
            <el-form-item>
              <el-button type="primary" @click="submitReg(regFormRef)" round>注册</el-button>
              <el-button @click="resetForm(regFormRef)" round>重置</el-button>
            </el-form-item>
            
  </el-form> 
        <a href="javascript:void(0);" @click="enterChange(regFormRef)" v-show="!enterType">
          去登录-> 
        </a>
  </el-card>

</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { login, register } from '../api/user'
import { useKEYStore } from '../store'
let enterType = ref<boolean>(true)
const KEY = useKEYStore()
const regStatus = ref(1)
const loginFormRef = ref<FormInstance>()
const regFormRef = ref<FormInstance>()
const router = useRouter()
const loginForm = reactive({
  username: '',
  password:''
})
const regForm = reactive({
  username: '',
  password: '',
  confirm: '',
  role: null,
  sid: '',
  tcode: '',
  telephone: ''
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
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 1, max: 16, message: '账号须在1至16位之间', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 18, message: '密码须在6至18位之间', trigger: 'blur' },
  ],
  confirm: [
    { validator: passwordCheck, trigger: 'blur' },
  ],
  role: [
    { required: true, message: '请选择身份', trigger: 'change' },
  ],
  sid: [
    { required: !regForm.role, message: '请输入学号', trigger: 'blur' },
  ],
  tcode: [
    { required: !!regForm.role, message: '请输入身份校验码', trigger: 'blur' },
  ],
  telephone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { min: 11, max: 11, message: '手机号格式输入错误', trigger: 'blur' },
  ],
})  
const submitLogin = async (formEl: FormInstance | undefined ) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      login(loginForm).then((res) => {
        ElMessage({
          message: res.data.message,
          type: res.data.status?'error':'success'
        })
        if (!res.data.status) {
          KEY.token = res.data.token
          router.push('/index')
        }
        
      })
    }
  })
}
const submitReg = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
    if (valid) {
        register(regForm).then((res) => {
        ElMessage({
          message: res.data.message,
          type: res.data.status ? 'error' : 'success'
        })
        if (!res.data.status) {
          enterType.value = !enterType.value
        }
      })
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