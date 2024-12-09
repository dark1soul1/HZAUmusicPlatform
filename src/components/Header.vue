<template>
  <div class="header">
    <div class="inner">
        <h1 class="hnmusic_title">
          <img src="../assets/LOGO.png" alt="华农音乐" class="hnmusic_logo">
        </h1>
        <ul class="topn">
          <li v-for="(item, index) in items" :key="index" class="topn_item">
            <a class="topn_link" :class="{'topn_item_current': item.isActive}" @click="item.action">{{ item.label }}</a>
          </li>
        </ul>
        <ul v-show="userStore.isMusicWorld" class="subn">
            <li class="subn_item"><a class="subn_link firword">首页</a></li>
        </ul>
        <!-- <el-radio-group v-model="radio1" class="top_search_btn" size="large">
          <el-radio-button label="music" value="music" />
          <el-radio-button label="MV" value="MV" />
        </el-radio-group> -->
        <div class="top_search"> 
            <div class="top_search_input">
                <input type="text" class="input_input" placeholder="音乐/MV">
                <button class="top_search_button">
                    <img src="../assets/searchIcon.jpg" class="icon_picture" alt="">
                </button>
            </div>
        </div>
        <div class="top_option">
          <a v-if="!userStore.isAllow" class="top_option_login btn btn_green" @click="userStore.login()">登录</a>
          <a v-if="userStore.isAllow" class="top_option_logout btn btn_green" @click="userStore.resetLoginSituation()">退出登录</a>
          <div class="select_personalCenter" id="aniu">
            <a class="btn btn_green">{{userStore.name}}</a>
            <ul class="box" id="popup">
                <li class="select_item">个人中心</li>
            </ul>
          </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { ref,watch } from 'vue';
import { useUserStore } from '../store';

const userStore=useUserStore()
const items = ref([
  { label: '音乐世界', isActive: userStore.isMusicWorld, action: () => userStore.switchToCombination() },
  { label: '我的音乐', isActive: !userStore.isMusicWorld, action: () => userStore.switchToMymusic() }
]);

watch(() => userStore.isMusicWorld, (newValue) => {
  items.value = [
    { label: '音乐世界', isActive: newValue, action: () => userStore.switchToCombination() },
    { label: '我的音乐', isActive: !newValue, action: () => userStore.switchToMymusic() }
  ];
});
const radio1 = ref('music')
</script>

<style scoped>
@keyframes colorChange {
  0% {background-color: #A2CD5A;}
  25% {background-color: RGB(107,142,35);}
  50% {background-color: rgb(0,80,0);}
  75% {background-color: RGB(107,142,35);}
  100% {background-color: #A2CD5A;}
}

.header .inner {
  padding-top: 90px;
}
.header {
  animation: colorChange 16s infinite;
  position: sticky;
  top:0;
  z-index: 1025;
}
.hnmusic_title {
  position: absolute;
  left: 0;
  top: 22px;
}
.hnmusic_logo {
  width: 170px;
  height: 46px;
}
.topn {
  position: absolute;
  left: 198px;
  top: 0;
}
.topn_item {
  float: left;
  margin-right: -5px;
}
.topn_link {
  display: block;
  padding: 0 20px;
  line-height: 90px;
  height: 90px;
  font-size: 18px;
}


/**/
.subn {
  height: 51px;
  line-height: 51px;
  border-top: 1px solid #f2f2f2;
  padding-left:230px;
  margin-right: -50px;
}
.subn_item {
  float: left;
  font-size: 15px;
  color: #c1c1c1;
  margin-right: 47px;
}
.subn_link {
  display: block;
}
.top_search_btn{
  position: absolute;
  top: 25px;
  right:524px;
}
.top_search {
  position: absolute;
  top: 0;
  right: 284px;
}
.top_search_input {
  border: 1px solid #c9c9c9;
  padding: 0 33px 0 11px;
  line-height: 36px;
  height: 36px;
  margin-top: 26px;
  position: relative;
  border-radius: 3px;
  background-color: #fff;
}
.input_input {
  width: 174px;
  height: 36px;
  font-size: 14px;
  border: 0;
  background: transparent;
  outline: none;
  padding: 0 10px;
}
.top_search_button {
  position: absolute;
  top: 0;
  right: 0;
  border: 0;
  width: 38px;
  height: 35px;
  overflow: visible;
  background: transparent;
}
.icon_picture {
  position: absolute;
  top: 50%;
  right: 11px;
  margin-top: -8px;
  width: 16px;
  height: 16px;
  background-position: 0 -40px;
}
.top_option {
  position: absolute;
  top: 40px;
  right: 0;
}
.top_option_logout {
  width: 58px;
  margin-top: -16px;
}
.top_option_login,.top_option_logout {
  display: block;
  font-size: 16px;
  margin-right: 10px;
}
.select_personalCenter{
  display: none;
  position: relative;
  font-size: 13px;
}
.select_personalCenter,.top_option_login{
  width: 38px;
  height: 38px;
  float:left;
  line-height: 36px;
  text-align: center;
  margin-top: -16px;
}
.box {
  position: absolute;
  width: 100%;
  left: 0;
  top: 38px;
}
.box .select_item:first-of-type {
  border-top: 1px solid #c9c9c9;
}
.box .select_item:last-of-type {
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}
.select_item {
  position: relative;
  line-height: 40px;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  background-color: #fff;
  border-top: none;
}
.topn_item_current,.select_item:hover,.topn_item_current:hover{
  background:#31c27c;
  color: #fff;
}
</style>