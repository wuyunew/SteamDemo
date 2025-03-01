<script setup>
import { useSteamStore } from '@/stores/SteamStore';
const steamStore = useSteamStore()
const userInfo = steamStore.userInfo
const { nickname, headImg } = userInfo
const getImageUrl = (url) => {
    return new URL(url, import.meta.url).href
}
/**{
    "wishlist": [
        {
            "appID": 0,
            "name": "string",
            "imgUrl": "string",
            "tag": "string",
            "addDate": "string",
            "saleDate": "string",
            "price": "string"
        }
    ]
}**/

const { wishlist } = JSON.parse(sessionStorage.getItem('wishlist'))
console.log(wishlist)
</script>

<template>
    <div class="wishlist">
        <div class="userInformation">
            <div class="header"><img :src="getImageUrl(headImg)" alt=""></div>
            <div class="title">{{ nickname }}的愿望单</div>
        </div>
        <div class="search">
            <input type="search-input">
            <button>选项</button>
            <el-dropdown>
                <span class="el-dropdown-link">
                    排序依据
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>Action 1</el-dropdown-item>
                        <el-dropdown-item>Action 2</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <div class="gameslist">
            <div class="gameItem" v-for="item in wishlist">
                <div class="left">
                    <img src="" alt="" class="icon">
                    <p class="index">这是第几个游戏</p>
                </div>
                <div class="right">
                    <div class="gameImg">
                        <img src="" alt="" class="mainImg">
                    </div>
                    <div class="intorduce">
                        <h3>游戏名称</h3>
                        <p>发售日期</p>
                        <div class="buy">
                            <p>price</p>
                            <button></button>
                        </div>
                        <div class="tags">
                            <button v-for="tag in tags">
                                tag
                            </button>
                        </div>
                        <div>
                            <p>addtime</p>
                            <button class="remove">(移除)</button>
                        </div>
                    </div>
                </div>
0            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.wishlist {
    background-color: #1B2838;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    padding-left: 20%;
    min-height: 690px;

    .userInformation {
        width: 100%;
        display: flex;
        padding-top: 40px;
        .header{
            width: 75px;
            height: 75px;
            border-radius: 10px;
            img {
                width: 100%;
                height: 100%;
                border-radius: 10px
            }

        }

        .title {
            margin-left: 30px;
            font-size: 30px;
            line-height: 60px;
            color: white;
        }
    }

    .search {
        width: 100%;
    }

    .gameslist {
        .gameItem {
            width: 1000px;
            height: 160px;
            background-color: #3D4D5E;
            margin-top: 10px
        }

    }
    
}
</style>