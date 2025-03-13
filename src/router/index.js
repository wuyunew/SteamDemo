import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'store',
      component: () => import('../views/Store.vue'),
      children: []
    },
    {
      path:'/:gameName',
      name:'gamePage',
      component:()=>import('../views/GamePage.vue'),

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
      path:'/wishlist',
      name:'wishlist',
      component:()=>import('../views/WishList.vue'),
    }
  ]
})


//路由守卫分为全局路由守卫，独享守卫，及组件路由守卫。全局守卫每次导航时都会触发
router.beforeResolve(async to=>{})
router.beforeEach((to,from)=>{})
router.afterEach((to,from)=>{})
export default router
