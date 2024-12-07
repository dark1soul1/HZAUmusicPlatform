<template>
  <div class="playlist-detail-container">
    <header class="playlist-header">
      <h1>{{ playlist.name }}</h1>
    </header>
    <el-table :data="playlist.songs" style="width: 100%" row-key="id">
      <el-table-column prop="name" label="歌曲名称"></el-table-column>
      <el-table-column prop="artist" label="歌手"></el-table-column>
      <el-table-column prop="album" label="专辑"></el-table-column>
      <el-table-column label="操作" width="250">
        <template #default="scope">
          <el-button type="text" @click="viewSongDetail(scope.row)">查看</el-button>
          <el-button type="text" @click="deleteSongFromPlaylist(scope.row)" class="ml-2">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../store';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getPlaylists, deletePlaylistMusic } from '../api/index';

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const playlist = ref({ name: '', songs: [] });

const fetchPlaylistDetail = async (playlistId) => {
  const data = {
    listId: playlistId,
    userId: userStore.id
  };
  try {
    const response = await getPlaylists(data);
    playlist.songs = response.data.data;
    console.log(playlist);
  } 
  catch (error) {
    console.error('歌单详情查询失败:', error);
  }
};

onMounted(async () => {
    if(userStore.playlistId){
        await fetchPlaylistDetail(userStore.playlistId);
    }
});

const deleteSongFromPlaylist = async (song) => {
  ElMessageBox.confirm(
    `确定要从歌单 "${playlist.value.name}" 中删除歌曲 "${song.name}" 吗？`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(async () => {
    try {
      await deletePlaylistMusic({
        playlistId: playlist.value.id,
        musicId: song.id
      });
      ElMessage.success('删除成功');
      const index = playlist.value.songs.findIndex(s => s.id === song.id);
      if (index > -1) {
        playlist.value.songs.splice(index, 1);
      }
    } catch (error) {
      ElMessage.error('删除歌曲失败');
    }
  }).catch(() => {
    ElMessage.info('已取消删除');
  });
};

const viewSongDetail = (song) => {
  console.log('查看歌曲详情:', song);
};
</script>

<style scoped>
.playlist-detail-container {
  padding: 20px;
  height: 400px;
  overflow-y: scroll;
}

.playlist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.ml-2 {
  margin-left: 0.5rem;
}
</style>