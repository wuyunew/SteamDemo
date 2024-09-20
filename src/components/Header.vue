<script setup>
import { useSteamStore } from '@/stores/SteamStore';
import { useRouter } from 'vue-router';
const stores = useSteamStore();
const router=useRouter();
const login=()=>{
    router.push('/login');
}
const gotoStore=()=>{
    router.push('/');
}
const gotoWishList =()=>{
    //愿望单前加路由守卫
    router.push('/wishList');
}
</script>

<template>
    <div class="header">
        <el-row :gutter="0">
            <el-col :span="4" :offset="16">
                <el-button size="small" color="#5C7E10" type="primary" @click="installSteam">
                    <el-icon>
                        <Download />
                    </el-icon>
                    安装steam
                </el-button>
                <el-button type="text" size="small" @click="login" class="login">登录</el-button>
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
                                <el-dropdown-item><el-button type="text" size="default" @click="gotoStore">主页</el-button></el-dropdown-item>
                                <el-dropdown-item><el-button type="text" size="default" @click="gotoWishList">愿望单</el-button>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <el-button type="text" size="default" @click="">社区</el-button>
                    <el-button type="text" size="default" @click="">关于</el-button>
                    <el-button type="text" size="default" @click="">客服</el-button>
                </div>
            </el-col>



        </el-row>

    </div>
</template>
<style scoped lang="less">
.header {
    background-color: #171D25;
    width: 100%;
    height:auto;
    padding-top: 5px;
    padding-bottom: 20px;
    border-radius: 2px 2px 0 0;


    .login {
        color: #D6D5D9;
        margin: 0%;
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

        .el-dropdown-link:focus{
            outline: none;
        }

        .header-drop {
            background-color: #171D25;
        }

        .el-button {
            color: #D6D5D9;
            font-size: 17px;
            margin-left: 7px;
            margin-top: 8px;
        }
    }

}
</style>
