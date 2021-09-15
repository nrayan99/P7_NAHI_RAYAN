import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
  {
    path :'/maskedposts',
    name: 'Maskedposts',
    component : () => import('../views/Maskedposts')
  },
  {
    path: '/forum',
    name : 'Forum',
    component : () => import('../views/Forum.vue')
  },
  {
    path: '/profiles:nickname',
    name : 'Profiles',
    component : () => import('../views/Profiles.vue')
  },
  {
    path: '/',
    name : 'Home',
    component : () => import('../views/Home.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
    
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})



export default router
