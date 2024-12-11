<template>
  <div class="home">
    <Header />
    <component :is="currentComponent" />
    <Footer/>
    <a class="btn_bottom" @click="scrollToTop"><img src="../assets/(2).png" alt=""></a>
    <LoginModal v-if="userStore.isLoggedIn" />
    <RegisterModal v-if="userStore.isRegister" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '../store/index';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import MyMusic from '../components/MyMusic.vue';
import LoginScreen from '../components/LoginScreen.vue';
import Combination from '../components/Combination.vue';
import LoginModal from '../components/LoginModal.vue';
import RegisterModal from '../components/RegisterModal.vue';
import PlayListDetail from '../components/PlayListDetail.vue';
import SearchDetails from '../components/searchDetails.vue';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const userStore=useUserStore()
const currentComponent=computed(()=>{
  switch(userStore.currentView){
    case 'combination':
      return Combination
    case 'login':
      return LoginScreen
    case 'mymusic':
      return MyMusic
    case 'playlistdetail':
      return PlayListDetail
    case 'searchdetails':
      return SearchDetails
    default:
      return Combination
  }
})
</script>

<style scoped>
.btn_bottom {
  position: fixed;
  right: 6%;
  bottom: 10%;
  width: 38px;
  display: block;
  line-height: 38px;
  font-size: 14px;
  text-align: center;
  background-color: #fff;
  border: 1px solid #c9c9c9;
  z-index: 6;
}
.btn_bottom:hover {
  background-color: #ece6e6;
}
</style>