import { createRouter, createWebHistory } from 'vue-router'
import Store from '../views/Store.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'store',
      component: Store,
      children: []
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: () => import('../views/WishList.vue')
    },
    {
      path:'/about',
      name:'about',
      component:()=>import('../views/About.vue'),
    },
    {
      path:'/join',
      name:'join',
      component:()=>import('../views/Join.vue'),
    },
    {
      path:'/wishlist',
      name:'wishlist',
      component:()=>import('../views/WishList.vue'),
    }
  ]
})

export default router
