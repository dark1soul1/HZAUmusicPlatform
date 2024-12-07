<template>
  <div class="login_overlay">
    <div class="login_container">
      <el-card class="login-box" id="loginBox">
        <div class="title">
          <h1>华农音乐平台登录</h1>
        </div>
        <el-button class="close-button" @click="userStore.logout">X</el-button>
        <el-form :model="loginForm" :rules="rules" ref="loginFormRef" label-width="80px" class="log-reg-form">
          <el-form-item label="用户名" prop="username">
            <el-input 
            v-model="loginForm.username" 
            @focus="onInputFocus" 
            @blur="onInputBlur" 
            placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input 
            v-model="loginForm.password" 
            @focus="onInputFocus" 
            @blur="onInputBlur"
            type="password" 
            placeholder="请输入密码" 
            class="input-with-placeholder" 
            autocomplete="off"
            show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button 
            type="primary" 
            @click="handleSubmit" 
            class="login-button" 
            :class="{ 'animate__animated': isButtonClicked, 'animate__bounce': isButtonClicked }" 
            @mousedown="onButtonMouseDown" 
            @mouseup="onButtonMouseUp"
            >登录</el-button>
          </el-form-item>
        </el-form>
        <p class="dialog-footer">
          还没有账号？<el-link  type="info" @click="userStore.switchToRegister()">立即注册</el-link>
        </p>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../store';
import { login } from '../api';
import { ElMessage } from 'element-plus';

const loginFormRef=ref(null);
const userStore = useUserStore();
const loginForm=ref({
  username:'',
  password:''
})
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
    { pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/, message: '密码必须包含字母和数字', trigger: 'blur' }
  ]
};

const handleSubmit = () => {
  if (loginFormRef.value && loginFormRef.value.validate) {
    loginFormRef.value.validate(async valid => {
      if (valid) {
        try {
          await handleLogin();
        } catch (error) {
          ElMessage.error(error.value);
        }
      } else {
        console.log('登陆失败!');
      }
    });
  }
};

const handleLogin = async () => {
  const responseBody = {
    name: loginForm.value.username,
    password: loginForm.value.password,
  };
  let response = await login(responseBody);
  /* console.log('Response:', response); */
  if (response.data.code===200) {
    userStore.logout();
    userStore.switchToCombination();
    userStore.isAllow=true;
    userStore.password=loginForm.value.password;
    userStore.updateUserInfo({
      id:response.data.data.id,
      token: response.data.data.token,
      name: response.data.data.name,
      gender: response.data.data.gender,
      hobby: response.data.data.hobby
    });
    ElMessage.success('登录成功');
  } else {
    throw new Error(response.msg || '登录失败');
  }
};

const onInputFocus = (event) => {
    event.target.classList.add('input-focused');
};
const onInputBlur = (event) => {
    event.target.classList.remove('input-focused');
};
const isButtonClicked = ref(false);
const onButtonMouseDown = () => {
    isButtonClicked.value = true;
};
const onButtonMouseUp = () => {
    setTimeout(() => {
        isButtonClicked.value = false;
    }, 3000);
};
</script>
<style scoped>
@import '../styles/logAndReg.css';
</style>