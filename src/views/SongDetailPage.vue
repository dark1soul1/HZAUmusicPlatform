<template>
  <div class="music-player">
    <header class="music-header">
      <h2>{{ musicInfo.name }}</h2>
      <p><strong>作词:</strong> {{ musicInfo.wording }}</p>
      <p><strong>作曲:</strong> {{ musicInfo.writeMusic }}</p>
      <p><strong>歌手:</strong> {{ musicInfo.singer }}</p>
    </header>
    <img :src="musicInfo.photo" alt="Cover" class="cover-image"/>
    <audio v-if="musicInfo.audio" controls class="music-audio" preload="metadata" crossorigin>
      <source :src="musicInfo.audio" type="audio/mpeg">
      您的浏览器不支持 audio 标签。
    </audio>
    <button @click="goHome" class="exit-button">退出</button>
    <button v-show="userStore.isAllow" @click="showPlaylists" class="add-to-playlist-button">加入歌单</button>
    <div v-if="showPlaylistModal" class="modal-overlay">
      <div class="playlist-modal">
        <h3>选择歌单</h3>
        <ul>
          <li
            v-for="(playlist, index) in playlists"
            :key="index"
            @click="selectPlaylist(playlist)"
            :class="{ 'selected-playlist': selectedPlaylist && selectedPlaylist.id === playlist.id }"
          >
            {{ playlist.name }}
          </li>
        </ul>
        <button @click="addToSelectedPlaylist" class="confirm-button">确认加入</button>
        <button @click="closePlaylistModal" class="cancel-button">取消</button>
      </div>
    </div>
    <el-button @click="toggleLyric" class="toggle-lyric">切换歌词显示</el-button>
    <pre v-if="showLyric" class="lyric">{{ musicInfo.lyric }}</pre>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { getMusic, updatePlaylist, getPlaylists } from '../api/index';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../store';

const userStore=useUserStore();
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
    await fetchMusicInfo(newId);
  }
}, { immediate: true });

const musicInfo = ref({
  name: '',
  wording: '',
  writeMusic: '',
  singer: '',
  lyric: '',
  photo: '',
  audio: ''
});

const showLyric = ref(false);
const playlists = ref([]);
const selectedPlaylist = ref(null);
const showPlaylistModal = ref(false);

async function fetchMusicInfo(id) {
  try {
    const response = await getMusic(id);
    console.log(response.data.data);
    if (response.data.data) {
      musicInfo.value = { ...response.data.data };
    } else {
      console.error('获取歌曲信息失败');
    }
  } catch (error) {
    console.error('请求失败', error);
  }
}

function goHome() {
  router.push('/home');
}

const toggleLyric = () => {
  showLyric.value = !showLyric.value;
};

const showPlaylists = async () => {
  const data={
    userId:userStore.id
  }
  try {
    const response = await getPlaylists(data);
    playlists.value = response.data.data;
    showPlaylistModal.value = true;
  } catch (error) {
    console.error('获取歌单失败', error);
  }
};

const selectPlaylist = (playlist) => {
  selectedPlaylist.value = playlist;
};

const closePlaylistModal = () => {
  showPlaylistModal.value = false;
};

const addToSelectedPlaylist = async () => {
  if (!selectedPlaylist.value) {
    alert('请选择一个歌单');
    return;
  }

  try {
    await updatePlaylist({
      playlistId: selectedPlaylist.value.id,
      musicId: props.id,
      userId:userStore.id
    });
    alert('成功加入歌单');
    closePlaylistModal();
  } catch (error) {
    console.error('加入歌单失败', error);
    alert('加入歌单失败，请重试');
  }
};
</script>

<style scoped>
@import '../styles/songPlayStyle.css';
.music-player {
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

.music-header {
  position:relative;
  text-align: center;
  margin-bottom: 20px;
}

.music-header h2 {
  font-size: 2rem;
  margin: 0 0 10px;
  color: #333;
}

.music-header p {
  font-size: 1rem;
  line-height: 1.5;
  color: #666;
  margin: 0 0 10px;
}

.cover-image {
  width: 100%;
  max-width: 300px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  transition: transform 0.3s ease;
}

.cover-image:hover {
  transform: scale(1.02);
}

.music-audio {
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  border-radius: 10vh;
}

.music-audio:hover {
  transform: scale(1.02);
}

.lyric {
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 5px;
  overflow-y: auto;
  max-height: 200px;
  margin-bottom: 20px;
  font-family: "Arial", sans-serif;
  white-space: pre-wrap;
}

.toggle-lyric {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-size: 0.9rem;
  background-color: #A2CD5A;
  color: white;
}

.toggle-lyric:hover {
  background-color: RGB(107,142,35);
  transform: scale(1.05);
}

.toggle-lyric:active {
  background-color: rgb(0,80,0);
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

strong{
  color: #333;
}

@media (max-width: 600px) {
  .music-player {
    padding: 15px;
  }

  .music-header h2 {
    font-size: 1.8rem;
  }

  .music-header p {
    font-size: 0.9rem;
  }

  .cover-image,
  .music-audio {
    max-width: 100%;
  }

  .toggle-lyric {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
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

.add-to-playlist-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-size: 0.9rem;
  background-color: #3498db;
  color: white;
  margin-top: 10px;
}

.add-to-playlist-button:hover {
  background-color: #2980b9;
  transform: scale(1.05);
}

.add-to-playlist-button:active {
  background-color: #2c3e50;
}

.playlist-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.playlist-modal h3 {
  margin-top: 0;
}

.playlist-modal ul {
  list-style-type: none;
  padding: 0;
}

.playlist-modal li {
  padding: 10px;
  cursor: pointer;
  background: #f4f4f4;
  margin-bottom: 5px;
  border-radius: 4px;
}

.playlist-modal li:hover {
  background: #ddd;
}

.selected-playlist {
  background-color: #d1ecff;
  font-weight: bold;
}

/* audio样式修改 */

/* 进度条 */
audio::-webkit-media-controls-progress-bar {
  height: 6px;
  background-color: #ffffff;
}
/* 已播放进度 */
audio::-webkit-media-controls-played-bar {
  background-color: #0000ff;
}
/* 剩余时间 */
audio::-webkit-media-controls-time-remaining-display {
  color: #1d0101;
}
</style>