import { request } from "./apiService";

// 登录接口
export async function login(data) {
  return request('POST', '/user/login', data);
}

// 注册接口
export async function register(data) {
  return request('POST', '/user/register', data);
}

// 个人信息查询
export async function getPersonalInfo(data) {
  return request('GET', '/user',data);
}

// 个人信息更新
export async function updatePersonalInfo(data) {
  return request('PUT', '/user', data);
}

// 歌单查询
export async function getPlaylists(data) {
  return request('GET', '/playlist/list',data);
}

// 歌单创建
export async function createPlaylist(data) {
  return request('POST', '/playlist', data);
}

// 歌单删除
export async function deletePlaylist(data) {
  return request('DELETE', '/playlist', data);
}

// 歌单查询(查询音乐)
export async function getPlaylistMusic(data) {
  return request('GET', `/playlist/music`,data);
}

// 歌单更新(增加音乐)
export async function updatePlaylist(data) {
  return request('PUT', '/playlist/music', data);
}

// 歌单删除(删除音乐)
export async function deletePlaylistMusic(data) {
  return request('DELETE', '/playlist/music', data);
}

// 分类查询
export async function getCategories() {
  return request('GET', '/music/category');
}

// 音乐查询
export async function getMusic(id) {
  return request('GET', `/music/${id}`);
}

// 音乐推送
export async function getMusics(data) {
  return request('GET', '/music/page', data);
}

// MV 推送
export async function getMVs(data) {
  return request('GET', '/mv/page', data);
}

// 查询具体 MV 的接口
export async function getMV(id) {
  return request('GET', `/mv/${id}`);
}

//模糊搜索音乐
export async function getMusicMessage(data){
  return request('GET','/music/search',data);
}

//模糊搜索MV
export async function getMVMessage(data){
  return request('GET','/mv/search',data)
}