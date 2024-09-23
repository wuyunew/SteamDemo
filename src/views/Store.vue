<script setup>
import Swiper from '@/components/Swiper.vue';
const items = [
    { name: "您的商城", path: '/' },
    { name: "新鲜推荐", path: '/' },
    { name: "类别", path: '/' },
    { name: "点数商城", path: '/' },
    { name: "新闻", path: '/' },
    { name: "实验室", path: '/' },

]
</script>

<template>
    <div class="store">
        <div class="store-top">
            <!--导航栏-->
            <div class="store-top-nav">
                <RouterLink class="stroe-top-nav-tab" v-for="{ name, path } in items" :key="name" :to="path">{{ name }}
                </RouterLink>
                <div class="store-top-nav-search">
                    <!--不用el的组件，因为改样式很麻烦，而且不能自己写实现方法-->
                    <input v-model="keyword" class="store-top-nav-search-input" placeholder="搜索"
                        @input="getSearchSuggestionsDebounce()" type="text">
                    <button @click=""></button>
                    <!--搜索建议-->
                    <div class="store-top-nav-search-suggestions">
                        <!--待完成AJAX逻辑-->
                    </div>
                </div>
            </div>
        </div>
        <div class="store-down">
            <!--精选与推荐-->
            <div class="store-dowm-section">
                <h5>精选与推荐</h5>
                <Swiper class="swiper"></Swiper>
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
                border: 1px solid rgba(0, 0, 0, 0.3);
                border-radius: 3px;
                background-color: #316282;
                margin-left: 355px;
                display: flex;

                &:hover {
                    color: #0e1c25;
                    border-color: #4c9acc;
                }

                input {
                    border: 0;
                    box-sizing: border-box;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0);

                    &::placeholder {
                        color: #0e1c25;
                    }

                    &:focus {
                        outline: none;
                    }
                }

                input[type="text"] {
                    color: white;

                }

                button {
                    width: 100%;
                    height: 100%;
                    border-radius: 5px;
                    background-image: url('../assets/search_icon_btn_over.png');
                    background-size: cover;

                    &:hover {
                        cursor: pointer;
                    }
                }
            }
        }


    };
    .store-down{
        width: 100%;
        height: 500px;
        margin-top: -120px;
        color: white;
        background-image: url("../assets/Steam_Summer_Sale_pattern-04-day_lighter.gif");
    }
    h5{
        margin-left:20% ;
    }
    .swiper{
        width: 1000px;
        height: 360px;
        margin-left: 22%;
    }

}

</style>