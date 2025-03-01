import { defineStore } from 'pinia'
import { loginApi } from '@/api/user'
import { getRecommendationsApi, getSearchApi, getSearchSuggestionsApi, getGameListApi } from '@/api/app'
import { ref } from 'vue'

export const useSteamStore = defineStore("steam", () => {
  //初始就获取，不需要缓存
  const recommendList = ref();
  const gameList = ref({});//用于存储游戏列表

  //需要缓存
  const token = ref();
  const searchSuggestionsCache = ref({});
  async function initState() {

    //加载推荐列表
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
    //加载token缓存
    token.value = JSON.parse(localStorage.getItem('steamToken')) || JSON.parse(sessionStorage.getItem('steamToken'))

    //加载搜索提示缓存
    const catchedSearchSuggestions = localStorage.getItem('steamSearchSuggestions');
    if (catchedSearchSuggestions) {
      searchSuggestionsCache.value = JSON.parse(catchedSearchSuggestions);
    }


  }

  async function login({ username, password, rememberMe }) {
    try {
      const { data } = await loginApi({ username, password });
      const { responseToken } = data;
      token.value = responseToken;
      if (rememberMe) {
        localStorage.setItem('steamToken', JSON.stringify(responseToken))
      } else {
        sessionStorage.setItem('steamToken', JSON.stringify(responseToken))
      }
      return responseToken;
    } catch (err) {
      console.error('Failed to login:', err)
    }
  }
  async function fetchSearchSuggestions(query) {
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
  async function searchGame(matchName) {
    try {
      const { data } = await getSearchApi(matchName);
      return data;
    } catch (err) {
      console.error('Failed to search game:', err)
    }
  }


  function getImageUrl(url) {
    return new URL(url, import.meta.url).href
  }



  initState();



  return { token, recommendList, gameList, login, fetchSearchSuggestions, searchGame, getImageUrl }

})