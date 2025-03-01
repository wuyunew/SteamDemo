import { createRouter, createWebHistory } from 'vue-router'
import {getGameListApi,getRecommendationsApi} from "../api/app"
import{ getWishlistApi}from"../api/wishlist"
import { useSteamStore } from '@/stores/SteamStore'
import Store from '@/views/Store.vue'
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

router.beforeEach((to,from)=>{
  //确认登陆状态,token是否过期,如果token过期则重置state数据
  const token=JSON.parse(localStorage.getItem('steamToken')||sessionStorage.getItem('steamToken')||("null"))
  if(token)
  {
    const steamStore=useSteamStore()
    console.log(steamStore.$state)
    const timeOver=24*3600*1000//token过期事件为一天
    const date=new Date().getTime()
    if(date-steamStore.tokenStartTime>timeOver)
    {
      //token 过期
      steamStore.logout()
    }
  }
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
  }else if(to.name=='wishlist'){
    //愿望单数据
    if(!sessionStorage.getItem('wishlist')){
      await getWishlistApi().then((resolve)=>{
        const wishlist=resolve
        sessionStorage.setItem('wishlist',JSON.stringify(wishlist))
      })
    }
  }
})
router.afterEach((to,from)=>{
  //重定向
  const token=JSON.parse(localStorage.getItem('steamToken')||sessionStorage.getItem('steamToken')||("null"))
  if(!token){
    if(!(to.name=='login'||to.name=='store')){
      router.push({name:'store'})
    }
  }
})

export default router
