<template>
  <div class="playlist-detail-container">
    <header class="playlist-header">
      <h1>{{ playlist.name }}</h1>
    </header>
    <el-table :data="playlist" style="width: 100%" row-key="id">
      <el-table-column prop="name" label="歌曲名称"></el-table-column>
      <el-table-column prop="singer" label="歌手"></el-table-column>
      <el-table-column prop="writeMusic" label="编曲"></el-table-column>
      <el-table-column prop="wording" label="作词"></el-table-column>
      <el-table-column label="操作" width="250">
        <template #default="scope">
          <el-button  @click="router.push(`/song/${scope.row.id}`)">查看</el-button>
          <el-button  @click="deleteSongFromPlaylist(scope.row)" class="ml-2">删除</el-button>
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
import { deletePlaylistMusic, getPlaylistMusic } from '../api/index';

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const playlist = ref([]);

const fetchPlaylistDetail = async () => {
  const data = {
    listId: userStore.playlistId,
    userId: userStore.id
  };
  console.log(data);
  try {
    const response = await getPlaylistMusic(data);
    playlist.value = response.data.data;
    console.log(playlist);
  } 
  catch (error) {
    console.error('歌单详情查询失败:', error);
  }
};

onMounted(async () => {
    if(userStore.playlistId!==null&&userStore.id!==null){
        await fetchPlaylistDetail();
    }
});

const deleteSongFromPlaylist = async (song) => {
  ElMessageBox.confirm(
    `确定要从歌单中删除歌曲 "${song.name}" 吗？`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(async () => {
    const data={
      playlistId: userStore.playlistId,
      musicId: song.id,
      userId: userStore.id
    }
    console.log(data);
    try {
      await deletePlaylistMusic(data);
      ElMessage.success('删除成功');
      playlist.value = playlist.value.filter(s => s.id !== song.id);
    } catch (error) {
      ElMessage.error('删除歌曲失败');
    }
  }).catch(() => {
    ElMessage.info('已取消删除');
  });
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