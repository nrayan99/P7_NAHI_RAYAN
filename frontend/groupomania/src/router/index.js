import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
  {
    path: '/forum',
    name : 'Forum',
    component : () => import('../views/Forum.vue')
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
