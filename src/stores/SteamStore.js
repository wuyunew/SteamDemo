import { defineStore } from 'pinia'

import api from '../api/user'
import router from '@/router'
//在组合式写法中在 Setup Store 中：ref() 就是 state 属性, computed() 就是 getters, function() 就是 actions
//选项式语法
function initState() {
  return {
    token: JSON.parse(localStorage.getItem('steamToken')) || JSON.parse(sessionStorage.getItem('steamToken')) || null,
    userId: null,
    username: null,
    nickname: null,
    avatar: null,
    searchList: JSON.parse(localStorage.getItem('searchList')) || JSON.parse(sessionStorage.getItem('searchList')) || [],
  }
}

const { loginApi, getUserInfoApi } = api

export const useSteamStore = defineStore('steam', {

  state: () => initState(),
  getters: {
    //计算属性
    //Getter 只是幕后的计算属性，所以不可以向它们传递任何参数。
    userInfo: (state) => {
      return {
        userId: state.userId,
        username: state.username,
        nickname: state.nickname,
        avatar: state.avatar
      }
    },
  },
  actions: {
    //注销
    logout() {
      localStorage.removeItem('steamToken')
      sessionStorage.removeItem('steamToken')
      this.$reset()
      //刷新
      router.go(0)
    },
    //登录
    async login({ username, password, rememberMe }) {
      //axios 实例是Promise对象
      //then的参数是promise兑现时的回调参数
      return await loginApi({ username, password }).then(({ data }) => {
        console.log({username,password})
        console.log(data)
        const { token } = data
        this.token = token
        if (rememberMe) {
          localStorage.setItem('steamToken', JSON.stringify(token))
        } else {
          sessionStorage.setItem('steamToken', JSON.stringify(token))
        }
      }).catch((err) => {
        throw new Error(err)
      })
    },
    //获取用户信息
    async getUserInfo() {
      if (!this.token) return Promise.reject(new Error('You must be logged in'))
      return await getUserInfoApi(this.userId).then(({ data }) => {
        this.userId = data.userId;
        this.username = data.username;
        this.nickname = data.nickname;
        this.avatar = data.avatar;
      }).catch((err) => {
        throw new Error(err)
      })
    },

  }

})
