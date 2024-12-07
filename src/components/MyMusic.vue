<template>
    <div class="my-music">
      <div class="background">
        <div class="header">
          <h1 style="font-size: 36px;">欢迎您，{{ userStore.name }}!</h1>
        </div>
        <div class="nav-bar">
          <el-menu class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1" @click="userStore.switchToMyPlayLists();$router.push(`/mv/${MV.id}`);" class="el-menu-fir">我的歌单</el-menu-item>
            <el-menu-item index="2" @click="userStore.switchToProfileCenter()">个人中心</el-menu-item>
          </el-menu>
        </div>
      </div>
      <component style="height: 400px;" :is="mmCurrentComponent" />
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useUserStore } from '../store';
import { useRouter } from 'vue-router';
import MyPlayLists from './MyPlayLists.vue';
import ProfileCenter from './ProfileCenter.vue';

const userStore = useUserStore();
const router=useRouter();

const mmCurrentComponent=computed(()=>{
  switch(userStore.mmCurrentView){
    case 'myplaylists':
      return MyPlayLists;
    case 'profilecenter':
      return ProfileCenter;
    default:
      return MyPlayLists;
  }
})
</script>
<style scoped>
.my-music {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.background{
  position: relative;
  width: 100%;
  height: 40vh;
  background: url('../assets/preview.jpg') no-repeat center center / cover;
}

.header {
  margin: 100px 0;
  text-align: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.nav-bar {
  position: absolute;
  bottom: 0;
  width: 100%;
  opacity: 0.4;
}

.el-menu-demo {
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.el-menu-item {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #222;
}

.el-menu-item.is-active,.el-menu-item:hover {
  color: #409EFF;
}
</style>