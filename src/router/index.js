import { createRouter, createWebHistory } from 'vue-router'
import Store from '../views/Store.vue'
import {getGameListApi,getRecommendationsApi} from "../api/app"
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

//在vueRouter中设置全局解析守卫统一在渲染前取得数据，通过SessionStorage传递数据
router.beforeResolve(async to=>{
  if(to.name=='store'){
    //轮播图数据
    if(!sessionStorage.getItem('recommendList')){
      await getRecommendationsApi().then((resolve)=>{
        const recommendList=resolve.recommendList
        sessionStorage.setItem('recommendList',JSON.stringify(recommendList))
      })
    }
    //商品数据
    if(!sessionStorage.getItem('gameList')){
      await getGameListApi().then((resolve)=>{
        const gameList=resolve
        sessionStorage.setItem('gameList',JSON.stringify(gameList))
      })
    }
  }else if(to.name=='login'){

  }
})


export default router
