<template>
  <div class="music bg">
    <div class="inner">
      <div class="title">
        <h2>歌曲推荐</h2>
      </div>
      <div class="sortTab">
        <a 
        class="sortTab_item" 
        v-for="(item, index) in categories" 
        :key="index" 
        @click="changeCategory(item)" 
        >{{ item }}</a>
      </div>

      <div class="pushList">
        <div class="slide_list" id="nliide" ref="nliide">
          <ul class="debutlist_list">
            <li class="debutlist_item" v-for="music in displayedMusics" :key="music.id">
              <div class="debutlist_item_box" @click="router.push(`/song/${music.id}`)">
                <a class="debutlist_link be_cover">
                  <img class="debutlist_pic be_cover_img" :src="music.photo">
                  <div class="cover_icon"></div>
                </a>
                <div class="debutlist_cont">
                  <h3 class="debutlist_song">
                    <a ><span>{{ music.name }}</span></a>
                  </h3>
                  <p class="debutlist_author">
                    <a class="c_tx_thin">{{ music.singer }}</a>
                  </p>
                </div>
                <!-- <div class="debutlist_time c_tx_thin">{{ music.duration }}</div> -->
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="switch" id="music_liitch">
        <a v-for="page in totalPages" :key="page" @click="moveToPage(page - 1)" :class="{ active: page - 1 === currentPage }"></a>
      </div>
    </div>
    <div class="slide_action">
        <div class="slide_action_both slide_action_left">
          <a href="#" class="slide_action_btn slide_action_btn_hot slide_action_btn_left" id="hot_btn_left" @click.prevent="arrowAction('left')">
            <img src="../assets/leftOne.png" alt="" class="slide_action_arrow slide_act_arr_left">
          </a>
        </div>
        <div class="slide_action_both slide_action_right">
          <a href="#" class="slide_action_btn slide_action_btn_hot slide_action_btn_right" id="hot_btn_right" @click.prevent="arrowAction('right')">
            <img src="../assets/rightOne.png" alt="" class="slide_action_arrow slide_act_arr_right">
          </a>
        </div>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getCategories, getMusics } from '../api';
import { useUserStore } from '../store';
import { useRouter } from 'vue-router';
import { createCarousel } from '../utils/carouselUtils';

const router=useRouter();
const userStore = useUserStore();
const categories = ref([]);
const musics = ref([]);
const pageNum = 1;
const currentPage = ref(0);
const itemsPerPage = 6;
const slideWidth = 0;
const nliide = ref(null);

const displayedMusics = computed(() => {
  const startIdx = currentPage.value * itemsPerPage;
  return musics.value.slice(startIdx, startIdx + itemsPerPage);
});

const totalPages = computed(() => Math.ceil(musics.value.length / itemsPerPage));

const carousel = createCarousel({
  rimgArr: nliide,
  itemsPerPage,
  slideWidth,
  onMove: (newPage) => {
    currentPage.value = newPage;
  }
});

function moveToPage(newPage) {
  if (newPage >= 0 && newPage < totalPages.value) {
    currentPage.value = newPage;
    if (rimgArr.value) {
      rimgArr.value.style.transform = `translateX(${(-slideWidth * newPage)}px)`;
    }
    setA();
  }
}

// 设置底部切换点的样式
function setA() {
  const allA = document.querySelectorAll('#MV_liitch a');
  allA.forEach((a, i) => {
    a.classList.remove("active");
  });
  if (currentPage.value >= 0 && currentPage.value < allA.length) {
    allA[currentPage.value].classList.add("active");
  }
}

function arrowAction(direction) {
  stopAutoChange();
  if (direction === 'left') {
    carousel.moveToPage((currentPage.value - 1 + totalPages.value) % totalPages.value);
  } else if (direction === 'right') {
    carousel.moveToPage((currentPage.value + 1) % totalPages.value);
  }
  startAutoChange(totalPages.value);
  setA();
}

// 自动切换控制
function startAutoChange(totalPages) {
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    currentPage.value = (currentPage.value + 1) % totalPages;
    carousel.moveToPage(currentPage.value);
  }, 30000);
  setA();
}

function stopAutoChange() {
  clearInterval(intervalId);
}

let intervalId = null;

function changeCategory(category) {
  userStore.currentCategory = category;
  fetchMusics();
}

async function fetchMusics() {
  try {
    const musicParams = {
      category: userStore.currentCategory,
      page: String(pageNum),
      pageSize: '15'
    };
    const responseMusics = await getMusics(musicParams);
    musics.value = responseMusics.data.data.records;
    console.log(musics.value);
    carousel.startAutoChange(totalPages.value);
  } catch (error) {
    console.error('音乐推送失败:', error);
  }
}

onMounted(async () => {
  try {
    const responseCategories = await getCategories();
    categories.value = responseCategories.data.data;
    userStore.currentCategory = categories.value[0];

    await fetchMusics();
    setA();
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }
});
</script>

<style scoped>
@import '../styles/musicAndMV.css';
.pushList {
  overflow: hidden;
  min-height: 222px;
  margin: 11px -30px 10px 0;
  padding-bottom: 84px;
}
.slide_list {
  display: flex;
  flex-wrap: nowrap;
  font-size: 0;
  transition: .5s;
  width: 600%;
}
.debutlist_list {
  display: inline-block;
  width: 16.667%;
}
.debutlist_item {
  display: inline-block;
  width: 33.333%;
}
.debutlist_item_box,.debutlist_link {
  position: relative;
  height: 86px;
  overflow: hidden;
}
.debutlist_item_box {
  border-top: 1px solid #f2f2f2;
  margin: -1px 30px 13px 0;
  padding-top: 12px;
  font-size: 14px;
  cursor: pointer;
}
.debutlist_link {
  float: left;
  margin-right: 14px;
}
.debutlist_pic {
 width: 86px;
}
.debutlist_author,.debutlist_song {
  max-width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.debutlist_author,.c_tx_thin {
  color: #999;
}
.debutlist_song {
  font-size: 14px;
  padding: 21px 0 2px;
  font-weight: 400;
}
.debutlist_time {
  position: absolute;
  right: 0;
  bottom: 0;
  line-height: 86px;
}
</style>