import { defineStore } from 'pinia'
import { loginApi,getUserInfoApi} from '@/api/user'
import { getRecommendationsApi, getSearchSuggestionsApi, getGameListApi, getGameDetailApi } from '@/api/app'
import { ref } from 'vue'
import { Game } from '@/utils/models'
import router from '@/router'

export const useSteamStore = defineStore("steam", () => {
  //不需要缓存
  const recommendList = ref();
  const gameList = ref({});
  const currentGame = ref(null);
  //需要缓存
  const token = ref();
  const searchSuggestionsCache = ref({});
  //userInfo:{userID:string,userName:string,headImg:string}
  const userInfo = ref({}); 

  async function initState() {

    //加载轮播推荐列表
    try {
      const data = await getRecommendationsApi();
      recommendList.value = data;
    } catch (err) {
      console.error('Failed to fetch recommendations:', err)
    }
    //加载游戏列表
    try {
      const data = await getGameListApi();
      gameList.value = data;
    }
    catch (err) {
      console.error('Failed to fetch game list:', err)
    }
    //加载token缓存和用户信息缓存
    token.value = JSON.parse(localStorage.getItem('token')) || null;
    if(token.value)
    {
      userInfo.value = JSON.parse(localStorage.getItem('userInfo')) || null;
    }

    //加载搜索提示缓存
    const catchedSearchSuggestions = localStorage.getItem('steamSearchSuggestions');
    if (catchedSearchSuggestions) {
      searchSuggestionsCache.value = JSON.parse(catchedSearchSuggestions);
    }


  }
  initState();
  async function login({ username, password, rememberMe }) {
    try {
      const { responseToken } = await loginApi({ username, password });
      token.value = responseToken;
      localStorage.setItem('token', JSON.stringify(token.value));
      await setUserInfo();
      if (rememberMe) {
        localStorage.setItem('rememberMe', true);
      } else {
        localStorage.removeItem('rememberMe');
      }
      router.push({name: 'store'})
    }
    catch (error) {
      console.error("登录失败:", error);
      alert("登录失败");
    }
  }
  async function setUserInfo() {
    try {
      const {responseUserInfo} = await getUserInfoApi();
      userInfo.value = responseUserInfo;
      localStorage.setItem('userInfo', JSON.stringify(userInfo.value));
    }
    catch (error) {
      console.error("获取用户信息失败");
    }
  }
  async function setSearchSuggestions(query) {
    if (searchSuggestionsCache.value[query]) {
      return searchSuggestionsCache.value[query];
    }
    try {
      const response = await getSearchSuggestionsApi(query);
      const data = response[query] || [];
      searchSuggestionsCache.value[query] = data;
      localStorage.setItem('steamSearchSuggestions', JSON.stringify(searchSuggestionsCache.value));
    } catch (err) {
      console.error('Failed to fetch search suggestions:', err)
    }
  }
  async function setGameDetail(gameName) {
    try {
      const data = await getGameDetailApi(gameName);
      currentGame.value = new Game(data)
    } catch (err) {
      console.error('Failed to fetch game detail:', err)
    }
  }

  function logout() {
      try {
          localStorage.removeItem('token');
          localStorage.removeItem('userInfo');
      } catch (error) {
          console.error("Error occurred while clearing localStorage:", error);
      }
  
      if (typeof token !== 'undefined' && token !== null) {
          token.value = null;
      }
      if (typeof userInfo !== 'undefined' && userInfo !== null) {
          userInfo.value = null;
      }
      router.push({name: 'store'})
  }
  function getImageUrl(url) {
    //其实是将相对路由转为绝对路由，项目前期只有图片用到所以用这个名字
    return new URL(url, import.meta.url).href
  }
  function getCurrentGame() {
    return currentGame.value;
  }
  function getToken(){
    return token.value;
  }
  function getUserInfo(){
    return userInfo.value;
  }




  return {
    recommendList,
    gameList,

    login,
    logout,
    setSearchSuggestions,
    getImageUrl,
    setGameDetail,
    getCurrentGame,
    getToken,
    getUserInfo,
  }

})