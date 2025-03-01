<script setup>
import { useSteamStore } from "@/stores/SteamStore";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const steamStore = useSteamStore()
const token = ref(steamStore.token)
const nickname = ref(steamStore.nickname)
const headImg=ref(steamStore.headImg)
//订阅store及时更新token
steamStore.$subscribe(() => {
  token.value = steamStore.token
  nickname.value = steamStore.nickname
  headImg.value=steamStore.headImg
})
const login = () => {
  router.push("/login");
};
const gotoStore = () => {
  router.push("/");
};
const gotoWishList = () => {
  //愿望单前加路由守卫
  router.push("/wishList");
};
const getImageUrl = (url) => {
    return new URL(url, import.meta.url).href
}
const logout=()=>{
  steamStore.logout()
}
</script>

<template>
  <div class="header" >
    <el-row :gutter="0">
      <el-col :span="4" :offset="15">
        <el-button size="small" color="#5C7E10" type="primary" @click="installSteam">
          <el-icon>
            <Download />
          </el-icon>
          安装steam
        </el-button>
        <el-button v-if="!token" type="text" size="small" @click="login" class="login">登录</el-button>
        <div v-else class="user">
          <div class="userinfo">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                {{ nickname }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item >查看我的个人资料</el-dropdown-item>
                  <el-dropdown-item @click="logout">退出账户</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div class="headImg">
            <img :src="getImageUrl(headImg)" alt="">
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="0">
      <el-col :offset="5" :span="3">
        <div class="logo">
          <img src="../assets/logo_steam.svg" alt="steam" />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="navmenu">
          <el-dropdown class="header-drop">
            <el-button type="text" size="default" @click="gotoStore">
              商城
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item><el-button type="text" size="default"
                    @click="gotoStore">主页</el-button></el-dropdown-item>
                <el-dropdown-item><el-button type="text" size="default" @click="gotoWishList">愿望单</el-button>
                </el-dropdown-item>
                <el-dropdown-item><el-button type="text" size="default"
                  @click="">探索队列</el-button></el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-button type="text" size="default" @click="none">社区</el-button>
          <el-button type="text" size="default" @click="none">关于</el-button>
          <el-button type="text" size="default" @click="none">客服</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped lang="less">
.header {
  background-color: #171d25;
  width: 100%;
  height: auto;
  padding-top: 5px;
  padding-bottom: 20px;
  border-radius: 2px 2px 0 0;
  .login {
    color: #d6d5d9;
    margin: 0%;
  }

  .user {
    margin-left: 5px;
    height: 24px;
    display: inline-flex;
    .el-dropdown-link{
      line-height: 24px
    }
    .headImg{
      width: 35px;
      height: 35px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }

  .logo {
    width: 176px;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .navmenu {
    display: flex;
    height: 100%;

    .el-dropdown-link:focus {
      outline: none;
    }

    .header-drop {
      background-color: #171d25;
    }

    .el-button {
      color: #d6d5d9;
      font-size: 17px;
      margin-left: 7px;
      margin-top: 8px;
    }
  }
}
</style>
