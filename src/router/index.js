import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/home', name: 'Home', component:()=>import('../views/Home.vue'),},
  { path: '/song/:id', name: 'SongDetail', component:()=>import('../views/SongDetailPage.vue'),props:true, meta: { requiresAuth: true } },
  { path: '/mv/:id', name: 'MVDetail', component: ()=>import('../views/MVDetailPage.vue'),props:true, meta: { requiresAuth: true } },
  { path: '/profile', name: 'Profile', component: ()=>import('../views/ProfilePage.vue'), meta: { requiresAuth: true } },
  { path: '/', redirect: '/home' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;