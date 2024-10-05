
<script setup>
import Swiper from '@/components/Swiper.vue';
import {  getSearchSuggestionsApi} from '@/api/app';
import {  onMounted, onUnmounted, ref } from 'vue';
import { useSteamStore } from '../stores/SteamStore';
const store = useSteamStore()
const items = [
    { name: "您的商城", path: '/' },
    { name: "新鲜推荐", path: '/' },
    { name: "类别", path: '/' },
    { name: "点数商城", path: '/' },
    { name: "新闻", path: '/' },
    { name: "实验室", path: '/' },

]
//轮播图数据
const recommendList=JSON.parse(sessionStorage.getItem('recommendList'))

//下面这部分是搜索栏的代码实现，前端ajax的逻辑，最大的搜索数为limitnum，先从前端已经缓存的搜索结果中找，返回，不足的地方从后端返回。每次将更新结果存储
const matchName = ref('')
let localList = []
const limitnum = 9
const getList = () => {
    //获取已经缓存的搜索项,存储在pinia里,是地址对应相等
    localList = store.searchList
}
const querySearch = (queryString, cb) => {
    //前端搜索匹配的逻辑,先匹配本地
    const searchList = []
    for (let item of localList) {
        if (item.includes(queryString)) {
            if (searchList.length < limitnum)
                searchList.push({ value: item })
        }
    }
    if (searchList.length < limitnum) {
        const data = {
            keyword: queryString,
            num: limitnum - searchList.length
        }
        getSearchSuggestionsApi(data).then((resolve, reject) => {
            //对据的格式有要求，必须是一个数组对象，并且属性名为“value”
            cb(searchList.concat(resolve))
        })
    }
    else {
        cb(searchList)
    }
}
const getSearch = () => {
    //返回搜索结果，更新localList，再更新localStore中的list
    store.searchList.push(matchName.value)
    localStorage.setItem('searchList', JSON.stringify(store.searchList))

}

//下面这部分是商品栏 新品与热门商品 热销商品等的代码实现
let prebutton //存储前一个点击的按钮
const showNum=10 //要展示的游戏数量为10，5行一页，做个分页器
const gameList=JSON.parse(sessionStorage.getItem('gameList'))
const curGameList=ref(gameList["newAndHot"])//当前选择的游戏种类
const curGame=ref(curGameList.value[0])//当前选择的游戏
const getImageUrl = (url) => {//vite里没有require，自己实现
    return new URL(url, import.meta.url).href
}

const selcet=(index_str)=>{
    //dom实现点击按钮样式切换
    if(prebutton)
    prebutton.style.backgroundColor='#1B2838'
    const curButton=document.getElementById(index_str)
    curButton.style.backgroundColor='#2A475E'
    prebutton=curButton
    //选择对应的游戏列表
    curGameList.value=gameList[index_str]
    curGame.value=curGameList.value[0]
    
}
const selectCurGame=(item)=>{
    //选中当前游戏
    curGame.value=item

}

onMounted(() => {
    getList()
})
onUnmounted(() => {
    localStorage.clear()
})
</script>

<template>
    <div class="store">
        <div class="store-top">
            <!--导航栏-->
            <div class="store-top-nav">
                <RouterLink class="stroe-top-nav-tab" v-for="{ name, path } in items" :key="name" :to="path">{{ name }}
                </RouterLink>
                <div class="store-top-nav-search">
                    <el-autocomplete v-model="matchName" placeholder="搜索" :debounce="0" :fetch-suggestions="querySearch"
                        fit-input-width="true" @select="" />
                    <el-button type="primary" size="default" @click="getSearch"><el-icon>
                            <Search />
                        </el-icon></el-button>

                </div>
            </div>
        </div>
        <div class="store-down">
            <!--精选与推荐-->
            <div class="store-dowm-section">
                <h5>精选与推荐</h5>
                <Swiper class="swiper" :recommendList="recommendList" :key="key"></Swiper>
            </div>
            <!--新品与热门商品-->
            <div class="store-down-newGame">
                <div class="buttonList">
                    <button id="newAndHot" @click="selcet('newAndHot')">新品与热门商品</button>
                    <button id="hot" @click="selcet('hot')">热销商品</button>
                    <button id="recent" @click="selcet('recent')">热门即将推出</button>
                    <button id="off" @click="selcet('off')">优惠</button>
                    <button id="free" @click="selcet('free')">热门免费游戏</button>
                </div>
                <div class="shopList">
                    <div class="left">
                        <div class="shopItem" v-for="item in curGameList" @mouseenter="selectCurGame(item)">
                            <img :src="getImageUrl(item.imgUrl[4])" alt="">
                            <p>{{ item.name }}</p>
                            <div class="connect"></div>
                        </div>
                    </div>
                    <div class="right">
                        <p>{{ curGame.name }}</p>
                        <img v-for="i in 4" :src="getImageUrl(curGame.imgUrl[i-1])" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.store {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: max(calc(100vh-104px), 765px);
    margin-top: -4px;

    .store-top {
        height: 740px;
        padding-top: 27px;
        display: flex;
        justify-content: center;
        background-image: url("../assets/home_header_bg_day_schinese.gif");
        background-position: center;

        .store-top-nav {
            width: 920px;
            height: 38px;
            display: flex;
            align-items: center; //子元素垂直居中
            background: linear-gradient(90deg, rgba(62, 103, 150, 0.919) 11.38%, rgba(58, 120, 177, 0.8) 25.23%, rgb(15, 33, 110) 100%);

            .stroe-top-nav-tab {
                color: #e5e5e5;
                font-weight: bold;
                text-decoration: none;
                text-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
                font-size: 14px;
                margin-left: 15px;

            }

            .stroe-top-nav-tab:hover {
                color: #ffffff;
                background: linear-gradient(90deg, rgba(33, 162, 255, 0.25) 0%, rgba(33, 162, 255, 0.15) 50%, rgba(50, 50, 51, 0) 100%);
            }

            .store-top-nav-search {
                width: 202px;
                height: 80%;
                margin-left: 355px;
                display: flex;

                .el-button {
                    width: 20px;
                    

                }
            }
        }


    }

    ;

    .store-down {
        width: 100%;
        height: 100%;
        margin-top: -120px;
        color: white;
        background-image: url("../assets/Steam_Summer_Sale_pattern-04-day_lighter.gif");

        h5 {
            margin-left: 22%;
        }

        .swiper {
            width: 1000px;
            height: 360px;
            margin-left: 22%;
        }
        .store-down-newGame{
            margin-left: 22%;
            margin-top: 20px;
            button{
                border-style: none;
                color: #4F868E;
                background-color: #1B2838;
                &:hover{
                    color: #ffffff;
                    cursor: pointer;
                }

            }
            .shopList{
                width: 1000px;
                height: 100%;
                display: flex;
                background-color:#2A475E;
                .left{
                    width: 67%;
                    .shopItem{
                        display: flex;
                        margin-top: 5px;
                        height: 80px;
                        background-color: #1B2838;
                        &:hover{
                            background-color: #A5CADF;
                            .connect{
                                background-color:#A5CADF;
                            }
                        }
                        .connect{
                            margin-left: auto;
                            width: 2%;
                            background-color: #2A475E;
                        }
                        img{
                            height: 100%;
                            width: 150px;
                        }
                        p{
                            margin-left: 20px;
                            margin-top: 5px;
                        }
                    }
                }
                .right{
                    background-color: #A5CADF;
                    width: 33%;
            
                    p{
                        margin-top: 7px;
                        font-size: larger;
                        margin-bottom: 0%;
                    }
                    img{
                        margin-top: 10px;
                        width: 97%;
                        height: 180px;
                    }
                }
        
            }
        }
    }


}
</style>