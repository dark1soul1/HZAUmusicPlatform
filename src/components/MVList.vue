<template>
  <div class="MV bg">
    <div class="inner">
      <div class="title">
        <h2>MV推荐</h2>
      </div>
      <div class="sortTab">
        <a 
        class="sortTab_item" 
        v-for="(item, index) in categories" 
        :key="index" 
        @click="changeCategory(item,index)"
        >{{ item }}</a>
      </div>

      <div class="pushList">
        <ul class="list_slide" id="rliide" ref="rimgArr">
          <li class="list_sli_item" v-for="(MV,index) in displayedMVs" :key="index">
            <div class="list_item_box" @click="router.push(`/mv/${MV.id}`)">
              <div class="list_cover be_cover">
                <a>
                  <img class="cover_mask be_cover_img" :src="MV.photo">
                  <div class="cover_icon"></div>
                </a>
              </div>
              <h4>
                <span class="list_title_txt">
                  <a>{{ MV.name }}</a>
                </span>
              </h4>
              <div class="list_other">{{MV.author}}</div>
            </div>
          </li>
        </ul>
      </div>

      <div class="switch" id="MV_liitch">
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
import { ref, onMounted, computed, watch,nextTick } from 'vue';
import { getCategories, getMVs } from '../api';
import { useUserStore } from '../store';
import { useRouter } from 'vue-router';
import { createCarousel } from '../utils/carouselUtils';

const router=useRouter();
const userStore = useUserStore();
const categories = ref([]);
const MVs = ref([]);
const pageNum = 1;
const currentPage = ref(0);
const itemsPerPage = 5;
const slideWidth = 0;
const rimgArr = ref(null);

const displayedMVs = computed(() => {
  const startIdx = currentPage.value * itemsPerPage;
  return MVs.value.slice(startIdx, startIdx + itemsPerPage);
});

const totalPages = computed(() => Math.ceil(MVs.value.length / itemsPerPage));

const carousel = createCarousel({
  rimgArr,
  itemsPerPage,
  slideWidth,
  onMove: (newPage) => {
    currentPage.value = newPage;
  }
});

const itemWidth = 265;

watch(displayedMVs, () => {
  nextTick(() => {
    if (rimgArr.value) {
      rimgArr.value.style.width = `${itemWidth * MVs.value.length}px`;
    }
  });
}, { immediate: true });

function moveToPage(newPage) {
  if (newPage >= 0 && newPage < totalPages.value) {
    currentPage.value = newPage;
    if (rimgArr.value) {
      rimgArr.value.style.transform = `translateX(${(-itemWidth * newPage)}px)`;
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
  fetchMVs();
}

async function fetchMVs() {
  try {
    const MVParams = {
      category: userStore.currentCategory,
      page: String(pageNum),
      pageSize: '15'
    };
    const responseMVs = await getMVs(MVParams);
    MVs.value = responseMVs.data.data.records;
    console.log(MVs.value);
    startAutoChange(totalPages.value);
  } catch (error) {
    console.error('MV推送失败:', error);
  }
}

onMounted(async () => {
  try {
    const responseCategories = await getCategories();
    categories.value = responseCategories.data.data;
    userStore.currentCategory = categories.value[0];

    await fetchMVs();
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
  min-height:224px;
  padding-bottom: 84px;
}
.list_slide {
  display: flex;
  flex-wrap: nowrap;
  transition: transform 0.5s ease-in-out;
}
.list_sli_item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  width: 224px;
  margin-right: 15px;
  flex-shrink: 0;
}
.list_item_box {
  width: 100%;
}
.list_cover {
  position: relative;
  display: block;
  overflow: hidden;
  margin-bottom: 10px;
}

.list_title_txt {
  float: left;
  width: 100%;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 22px;
  max-height: 44px;
  white-space: normal;
}
.list_other {
  float: left;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 22px;
  font-size: 14px;    
}
.active{
  background-color: black;
}
</style>