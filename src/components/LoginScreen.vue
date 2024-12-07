<template>
    <div class="mymusic_unlogin">
        <div class="inner">
            <h2 class="mymusic_unlogin__tit">
                <div class="icon_text">想你所想,听我想听</div>
            </h2>
            <div class="mymusic_unlogin__desc"></div>
            <a class="btn btn_green mymusic_unlogin__btn" @click="userStore.login()">立即登录</a>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '../store';

const userStore=useUserStore();
</script>

<style scoped>
@keyframes flame{
    0%{
        text-shadow:0 0 20px #fefcc9,
        10px -10px 30px #feec85,
        -20px -20px 40px #ffae34,
        20px -40px 50px #ec760c,
        0 -80px 70px #f38e1c;
    }
    30%{
        text-shadow:0 0 20px #fefcc9,
        10px -10px 30px #feec85,
        -20px -20px 40px #ffae34,
        20px -40px 50px #ec760c,
        10px -90px 80px #f38e1c;
    }
    60%{
        text-shadow:0 0 20px #fefcc9,
        10px -10px 30px #feec85,
        -20px -20px 40px #ffae34,
        20px -40px 50px #ec760c,
        0px -80px 100px #f38e1c;
    }
    100%{
        text-shadow:0 0 20px #fefcc9,
        10px -10px 30px #feec85,
        -20px -20px 40px #ffae34,
        20px -40px 50px #ec760c,
        0 -80px 70px #f38e1c;
    }
}
.mymusic_unlogin{
    height: 622px;
    background: url('../assets/mymusic_unlogin.jpg') 50% no-repeat;
    background-size: cover;
    overflow: hidden;
}
.mymusic_unlogin__tit,.mymusic_unlogin__desc{
    margin-left: auto;
    margin-right: auto;
}
.mymusic_unlogin__tit{
    font-size:60px;
    font-weight:bold;
    color:#fff;
    text-align:center
 }
.icon_text{
    text-shadow:0 0 20px #fefcc9,
    10px -10px 30px #feec85,
    -20px -20px 40px #ffae34,
    20px -40px 50px #ec760c,
    0 -80px 70px #f38e1c;
    animation: flame 2s infinite;
    margin-top: 60px;
}
.mymusic_unlogin__desc{
    width: 345px;
    height: 30px;
    background-position: 0 -70px;
    margin-top: 30px;
    margin-bottom: 36px;
}
.mymusic_unlogin__btn{
    height: 48px;
    width: 128px;
    font-size: 24px;
    text-align: center;
    margin-top: 44px;
    margin: 0 auto;
}
</style>