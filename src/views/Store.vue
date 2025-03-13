<script setup>
import Swiper from '@/components/Swiper.vue';
import { computed, ref } from 'vue';
import { useSteamStore } from '../stores/SteamStore';
import { debounce, throttle } from '@/utils/wrapper'
import router from '@/router';
const store = useSteamStore()
const items = [
    { name: "您的商城", path: '/' },
    { name: "新鲜推荐", path: '/' },
    { name: "类别", path: '/' },
    { name: "点数商城", path: '/' },
    { name: "新闻", path: '/' },
    { name: "实验室", path: '/' },

]


//搜索框
const querySearch = async (queryString, cb) => {
    const suggestions = await store.fetchSearchSuggestions(queryString)
    const limitnum = 5;
    const searchList = suggestions.slice(0, limitnum).map(item => ({ value: item }));
    cb(searchList)
};
const debounceQuerySearch = debounce(querySearch, 300);
const matchName = ref('');
const getSearch = async () => {
    //matchName为待搜索的游戏，搜索功能待写
}
const throttleGetSearch = throttle(getSearch, 1000);


//轮播图数据
const recommendList = computed(() => store.recommendList)


//商品栏
const getImageUrl = store.getImageUrl
const gameList = computed(() => store.gameList);
const active = ref({
    category: 'newAndHot',
    index: 0
})
const curGameList = computed(() => gameList.value[active.value.category]);
const curGame = computed(() => curGameList.value[active.value.index])
const selectCategory = (index_str) => { active.value.category = index_str }
const selectCurGame = (item) => { active.value.index = curGameList.value.indexOf(item) }
const gotoGamePage=(item)=>{
    //先跳转到GamePage，再加载数据
    const {name}=item
    router.push({name:'gamePage',params:{gameName:name}})
    
}


//愿望单
const token = ref(store.token)
store.$subscribe(() => {
    token.value = store.token
})
const gotoWishList = () => {
    router.push('/wishlist')
}
</script>

<template>
    <div class="store">
        <div class="store-top">
            <!--导航栏-->
            <div class="wishlist" v-if="token"><el-button type="primary" size="small"
                    @click="gotoWishList">愿望单</el-button>
            </div>
            <div class="store-top-nav">
                <RouterLink class="stroe-top-nav-tab" v-for="{ name, path } in items" :key="name" :to="path">{{ name }}
                </RouterLink>
                <div class="store-top-nav-search">
                    <el-autocomplete v-model="matchName" placeholder="搜索" :fetch-suggestions="debounceQuerySearch"
                        fit-input-width="true" @select="throttleGetSearch" />
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
                <Swiper class="swiper" v-if="recommendList" :recommendList="recommendList"></Swiper>
            </div>
            <!--新品与热门商品-->
            <div class="store-down-newGame">
                <div class="buttonList">
                    <button v-for="category in ['newAndHot', 'hot', 'recent', 'off', 'free']"
                        @click="selectCategory(category)" :class="{ active: active.category === category }">{{ category
                        }}</button>
                </div>
                <div class="shopList">
                    <div class="left">
                        <div class="shopItem" v-for="item in curGameList" @mouseenter="selectCurGame(item)" @click="gotoGamePage(item)" >
                            <img :src="getImageUrl(item.imgUrl[4])" alt="">
                            <p>{{ item.name }}</p>
                            <div class="connect"></div>
                        </div>
                    </div>
                    <div class="right">
                        <template v-if="curGame">
                            <p>{{ curGame.name }}</p> <!-- 修改这里，直接访问 curGame 的 name 属性 -->
                            <img v-for="i in 4" :key="i" :src="getImageUrl(curGame.imgUrl[i - 1])" alt="">
                        </template>
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
        padding-top: 10px;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        justify-content: center;
        background-image: url("../assets/home_header_bg_day_schinese.gif");
        background-position: center;

        .wishlist {
            width: 100%;
            padding-bottom: 5px;
            margin-left: 1242px;
        }

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

        .store-down-newGame {
            margin-left: 22%;
            margin-top: 20px;

            button {
                border-style: none;
                color: #4F868E;
                background-color: #1B2838;

                &:hover {
                    color: #ffffff;
                    cursor: pointer;
                }

                &.active {
                    color: #ffffff;
                }



            }

            .shopList {
                width: 1000px;
                height: 100%;
                display: flex;
                background-color: #2A475E;

                .left {
                    width: 67%;

                    .shopItem {
                        display: flex;
                        margin-top: 5px;
                        height: 80px;
                        background-color: #1B2838;

                        &:hover {
                            background-color: #A5CADF;
                            cursor: pointer;
                            .connect {
                                background-color: #A5CADF;
                            }
                        }

                        .connect {
                            margin-left: auto;
                            width: 2%;
                            background-color: #2A475E;
                        }

                        img {
                            height: 100%;
                            width: 150px;
                        }

                        p {
                            margin-left: 20px;
                            margin-top: 5px;
                        }
                    }
                }

                .right {
                    background-color: #A5CADF;
                    margin-top: 5px;
                    width: 33%;
                    padding-left: 1%;
                    border-radius: 5px;

                    p {
                        margin-top: 7px;
                        font-size: larger;
                        margin-bottom: 0%;
                    }

                    img {
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