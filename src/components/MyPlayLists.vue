<template>
  <div class="playlist-container">
    <header class="playlist-header">
      <h1>我的歌单</h1>
      <el-button type="primary" @click="createPlaylistDialogVisible = true">创建新歌单</el-button>
    </header>

    <el-table :data="playlists" style="width: 100%" row-key="id">
      <el-table-column prop="name" label="歌单名称"></el-table-column>
      <!-- <el-table-column prop="songCount" label="歌曲数量" width="100"></el-table-column> -->
      <el-table-column label="操作" width="250">
        <template #default="scope">
          <el-button type="text" @click="userStore.switchToPlayListDetail(scope.row.id)">查看</el-button>
          <el-button type="text" @click="deletePlaylistHandler(scope.row)" class="ml-2">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog class="createPlayList" v-model="createPlaylistDialogVisible" title="创建新歌单">
      <el-form :model="newPlaylistForm">
        <el-form-item label="歌单名称" :label-width="formLabelWidth">
          <el-input v-model="newPlaylistForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="createPlaylistDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmCreatePlaylist">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../store';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getPlaylists, createPlaylist, deletePlaylist } from '../api/index';

const userStore=useUserStore();
const createPlaylistDialogVisible = ref(false);
const formLabelWidth = '100px';
const newPlaylistForm = ref({
  name: ''
});
const playlists = ref([]);

const fetchPlaylists = async () => {
  console.log(userStore.id);
  const data={
    userId:userStore.id
  }
  try {
    const response = await getPlaylists(data);
    playlists.value = response.data.data;
  } catch (error) {
    console.error('歌单查询失败:', error);
  }
};

onMounted(() => {
  fetchPlaylists();
});

const confirmCreatePlaylist = async () => {
  if (newPlaylistForm.value.name.trim()) {
    const data={
      name: newPlaylistForm.value.name,
      userId:userStore.id
    }
    try {
      const response = await createPlaylist(data);
      ElMessage.success('歌单创建成功！');
      console.log(response);
      playlists.value.push(response);
      createPlaylistDialogVisible.value = false;
      newPlaylistForm.value.name = '';
      fetchPlaylists();
    } catch (error) {
      ElMessage.error('创建歌单失败');
    }
  } else {
    ElMessage.error('请输入歌单名称');
  }
};

const deletePlaylistHandler = async (playlist) => {
  ElMessageBox.confirm(
    `确定要删除歌单 "${playlist.name}" 吗？`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(async () => {
    const data={
      id:playlist.id,
      userId:userStore.id
    }
    try {
      await deletePlaylist(data); 
      ElMessage.success('删除成功');
      const index = playlists.value.findIndex(p => p.id === playlist.id);
      if (index > -1) {
        playlists.value.splice(index, 1);
      }
    } catch (error) {
      ElMessage.error('删除歌单失败');
    }
  }).catch(() => {
    ElMessage.info('已取消删除');
  });
};
</script>

<style scoped>
.playlist-container {
  width:83%;
  padding: 20px;
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