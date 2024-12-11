<template>
    <div class="search_container">
        <div class="nav-bar">
            <el-menu class="el-menu-demo" mode="horizontal">
              <el-menu-item index="1" @click="isMusicList=true">歌曲</el-menu-item>
              <el-menu-item index="2" @click="isMusicList=false">MV</el-menu-item>
            </el-menu>
        </div>
        <el-table 
        v-if="isMusicList" 
        :data="musicList" 
        rom-key="id" 
        class="searchTable">
            <el-table-column prop="name" label="歌曲名称"></el-table-column>
            <el-table-column prop="singer" label="歌手"></el-table-column>
            <el-table-column prop="writeMusic" label="编曲"></el-table-column>
            <el-table-column prop="wording" label="作词"></el-table-column>
            <el-table-column label="操作" width="250">
                <template #default="scope">
                  <el-button @click="router.push(`/song/${scope.row.id}`)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-table 
        v-else 
        :data="mvList" 
        rom-key="id" 
        class="searchTable">
            <el-table-column prop="name" label="MV名称"></el-table-column>
            <el-table-column prop="author" label="作者"></el-table-column>
            <el-table-column prop="describe" label="描述"></el-table-column>
            <el-table-column label="操作" width="250">
                <template #default="scope">
                  <el-button @click="router.push(`/mv/${scope.row.id}`)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '../store';
import { useRouter } from 'vue-router';
import { getMusicMessage,getMVMessage } from '../api';
import { ElMessage } from 'element-plus';

const userStore=useUserStore();
const router=useRouter();
const isMusicList=ref(true);
const musicList=ref([]);
const mvList=ref([]);

async function fetchMessage(){
    let searchString=userStore.searchString;
    try{
        console.log(searchString);
        const musicMessage=await getMusicMessage({name:searchString});
        const MVMessage=await getMVMessage({name:searchString});
        musicList.value=musicMessage.data.data;
        mvList.value=MVMessage.data.data;
        console.log(musicList.value+"//"+mvList.value);
    }
    catch(error){
        ElMessage.warning("搜索失败，请稍后再试："+error);
    }
}

onMounted(async()=>{
     await fetchMessage();
})
</script>

<style scoped>
.search_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    height: 300vh;
    overflow:auto;
}

.nav-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 5vh;
  width: 100%;
  opacity: 0.8;
  z-index: 4;
}

.el-menu-demo {
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.content-container {
  margin-top: 60px;
  padding: 20px;
  width: 100%;
  overflow: auto;
  height: calc(100vh - 60px);
}

.el-menu-demo {
  background-color: transparent;
}

.el-menu-item {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #222;
}

.el-menu-item.is-active,
.el-menu-item:hover {
  color: #409EFF;
}

.el-table .cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.searchTable{
    margin-top: 60px;
}
</style>