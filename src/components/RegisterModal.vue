<template>
  <div class="login_overlay">
    <div class="login_container">
      <el-card class="login-box" id="loginBox">
        <div class="title">
          <h1>华农音乐平台注册</h1>
        </div>
        <el-button class="close-button" @click="userStore.logout">X</el-button>
        <el-form :model="form" :rules="rules" ref="registerForm" label-width="80px" class="log-reg-form">
          <el-form-item label="用户名" prop="username">
            <el-input 
            v-model="form.username" 
            @focus="onInputFocus" 
            @blur="onInputBlur"
            placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input 
            v-model="form.password" 
            @focus="onInputFocus" 
            @blur="onInputBlur"
            type="password" 
            placeholder="请输入密码" 
            class="input-with-placeholder" 
            autocomplete="off"
            show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input 
            v-model="form.confirmPassword" 
            @focus="onInputFocus" 
            @blur="onInputBlur"
            type="password" 
            placeholder="请再次输入密码" 
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
            >注册</el-button>
          </el-form-item>
        </el-form>
        <p class="dialog-footer">
          已经有账号？<el-link @click="userStore.login()">立即登录</el-link>
        </p>
      </el-card>
      </div>
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import { useUserStore } from '../store';
import { register } from '../api/index';
import { ElMessage } from 'element-plus';

const userStore=useUserStore();
const registerForm=ref(null);

const form = ref({
  username: '',
  password: '',
  confirmPassword: ''
});

const validateConfirmPassword = (rule, value, callback) => {
  console.log('Password:', form.value.password);
  console.log('Confirm Password:', value);
  if (value !== form.value.password) {
    callback(new Error('两次输入的密码不一致'));
  } else {
    callback();
  }
};

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
    { pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/, message: '密码必须包含字母和数字', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
    { pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/, message: '密码必须包含字母和数字', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
};

const handleSubmit = () => {
  if (registerForm.value.validate) {
    registerForm.value.validate(valid => {
      if (valid) {
        handleRegister();
      } else {
        console.log('注册失败!');
      }
    });
  }
};

const handleRegister = async () => {
  const requestBody = {
    name: form.value.username,
    password: form.value.password
  };
  const response = await register(requestBody);
  console.log(response);
  if (response.data.code === 200) {
    userStore.logout();
    ElMessage.success('注册成功');
  } 
  else if(response.data.code===500){
    userStore.logout();
    ElMessage.success('用户已存在');
  }
  else {
    throw new Error(response.msg || '注册失败');
  }
};

onMounted(()=>{
  if(registerForm.value){
    registerForm.value.resetFields();
  }
})

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