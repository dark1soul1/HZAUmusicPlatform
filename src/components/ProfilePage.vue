<template>
  <div class="personal-center">
        <h1>个人信息</h1>
        <el-form :model="user" label-width="120px" class="form-container">
          <el-form-item label="昵称">
            <el-input v-model="user.nickname" placeholder="请输入昵称" @focus="onInputFocus" @blur="onInputBlur"></el-input>
      </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="user.gender" placeholder="请选择性别" @focus="onInputFocus" @blur="onInputBlur">
              <el-option label="男" value="male"></el-option>
              <el-option label="女" value="female"></el-option>
        </el-select>
      </el-form-item>
          <el-form-item label="爱好">
            <el-input v-model="user.hobbies" placeholder="请输入爱好" @focus="onInputFocus" @blur="onInputBlur"></el-input>
      </el-form-item>
          <el-form-item>
            <el-button type="primary" 
            @click="saveProfile" 
            :class="{ 'animate__animated': isButtonClicked, 'animate__bounce': isButtonClicked }" 
            @mousedown="onButtonMouseDown" 
            @mouseup="onButtonMouseUp"
            >保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElButton } from 'element-plus';
const user = ref({
    nickname: '',
    gender: '',
    hobbies: ''
});
const saveProfile = () => {
    console.log('个人信息已保存:', user.value);
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
},3000);
};
</script>
<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');
@keyframes fadeIn {
        from {
          opacity: 0;
    }
    to {
          opacity: 1;
    }
}
@keyframes slideIn {
    from {
        transform: translateY(-20px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}
.personal-center {
  min-height: 695px;
  background: url('../assets/preview.jpg') no-repeat center center / cover;
  padding: 40px;
  color: #fff;
  border-radius: 8px;
  animation: fadeIn 1s ease-in-out;
}
.form-container {
  max-width: 450px;
  margin: auto;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.5s ease-in-out;
}
h1 {
  text-align: center;
  font-weight: bold;
  margin-bottom: 30px;
  animation: fadeIn 1s ease-in-out 0.5s;
}
.el-form-item__label {
  color: #fff;
}
.el-input,.el-select {
  width: 100%;
  transition: all 0.3s ease-in-out;
}
.el-input.input-focused,.el-select.input-focused {
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}
.el-button--primary {
  width: 100%;
  transition: all 0.3s ease-in-out;
}
.el-button--primary:hover {
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}
</style>