<template>
  <div class="mv-player">
    <header class="mv-header">
      <h2>{{ mvInfo.name }}</h2>
      <p><strong>描述:</strong> {{ mvInfo.describe }}</p>
      <p><strong>作者:</strong> {{ mvInfo.author }}</p>
    </header>
    <video v-if="mvInfo.video" controls class="mv-video" preload="metadata" crossorigin @error="handleVideoError">
      <source :src="mvInfo.video" type="video/mp4">
      您的浏览器不支持 video 标签。
    </video>
    <button @click="goHome" class="exit-button">退出</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { getMV } from '../api/index';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});
watch(() => route.params.id, async (newId) => {
  if (newId) {
    await fetchMVInfo(newId);
  }
}, { immediate: true });

const mvInfo = ref({
  name: '',
  describe: '',
  author: '',
  video: ''
});

async function fetchMVInfo(id) {
  try {
    const response = await getMV(id);
    console.log(response.data.data);
    if (response.data.data) {
      mvInfo.value = { ...response.data.data };
    } else {
      console.error('获取MV信息失败');
    }
  } catch (error) {
    console.error('请求失败', error);
  }
}

function goHome() {
  router.push('/home');
}

function handleVideoError(event) {
  console.error('视频加载失败:', event.target.error);
}
</script>
<style scoped>
* {
  box-sizing: border-box;
}

.mv-player {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 800px; 
  margin: 0 auto;
  transition: box-shadow 0.3s ease;
}

.mv-header {
  text-align: center;
  margin-bottom: 20px;
  position: relative;
}

h2 {
  font-size: 2rem;
  margin: 0 0 10px;
  color: #333;
}

p {
  font-size: 1rem;
  line-height: 1.5;
  color: #666;
  margin: 0 0 10px;
}

strong {
  color: #333;
}

.exit-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-size: 0.9rem;
}

.exit-button:hover {
  background-color: #c0392b;
  transform: scale(1.05);
}

.exit-button:active {
  background-color: #a93226;
}

.mv-video {
  width: 100%;
  max-width: 600px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  transition: transform 0.3s ease;
}

.mv-video:hover {
  transform: scale(1.02);
}

@media (max-width: 600px) {
  .mv-player {
    padding: 15px;
  }

  h2 {
    font-size: 1.8rem;
  }

  p {
    font-size: 0.9rem;
  }

  .exit-button {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
}
</style>