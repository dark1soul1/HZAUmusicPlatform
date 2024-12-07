<template>
  <div class="profile-container">
    <h1 class="title">个人中心</h1>
    <el-form :model="userProfile" label-width="100px" :rules="rules" ref="formRef">
      <el-form-item label="ID" prop="id">
        <el-input v-model="userProfile.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="name">
        <el-input v-model="userProfile.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input 
        v-model="userProfile.password" 
        autocomplete="off"
        show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="userProfile.gender" placeholder="请选择性别">
          <el-option label="男" value="0"></el-option>
          <el-option label="女" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="爱好" prop="hobby">
        <el-input v-model="userProfile.hobby"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">保存</el-button>
        <el-button @click="resetForm();">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '../store';
import { ElMessage } from 'element-plus';
import { getPersonalInfo, updatePersonalInfo } from '../api/index';

const userStore=useUserStore();
const formRef = ref(null);
const userProfile = ref({
  id: userStore.id,
  name: userStore.name,
  password:userStore.password,
  gender: '0',
  hobby: '无'
});

const rules = {
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
    { pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/, message: '密码必须包含字母和数字', trigger: 'blur' }
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ],
  hobby: [
    { required: true, message: '请输入爱好', trigger: 'blur' }
  ]
};

onMounted(() => {
  fetchUserInfo();
});

const fetchUserInfo = async () => {
  const data={
    userId:userStore.id
  }
  try {
    const response = await getPersonalInfo(data);
    console.log(response);
    if (response.data.data) {
      userProfile.value={...response.data.data};
    } else {
      ElMessage.error('获取用户信息失败');
    }
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    ElMessage.error('网络请求失败');
  }
};

const resetForm = () => {
  if (formRef.value) {
    userProfile.value = {
      id: userStore.id,
      name: userStore.name,
      password: userStore.password,
      gender: userStore.gender,
      hobby: userStore.hobby
    };
    formRef.value.resetFields();
  }
};

const submitForm = async () => {
  if (!formRef.value) return;
  formRef.value.validate(async (valid) => {
    if (valid) {
      const updateData = {
          userId: userProfile.value.id,
          name: userProfile.value.name,
          password: userProfile.value.password,
          gender: userProfile.value.gender,
          hobby: userProfile.value.hobby
      };
      const response = await updatePersonalInfo(updateData);
      console.log(response);
      if (response.data.code === 200) {
        ElMessage.success('个人信息更新成功！');
      } else {
        ElMessage.error('更新失败，请稍后再试');
      }
    } else {
      ElMessage.error('请修正表单中的错误');
      return false;
    }
  });
};
</script>

<style scoped>
.title{
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.profile-container {
  padding: 20px;
}

.avatar-preview {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
</style>