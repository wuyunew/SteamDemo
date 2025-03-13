<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useSteamStore } from '@/stores/SteamStore';
import { Game_type1, Game_type2 } from '@/utils/models';
import Carousel from '@/components/Carousel.vue';
const route = useRoute();
const store = useSteamStore();
const loading = ref(0);//loading 0为加载中，loading 1为加载完成
const curGame = ref('');
const supports = ref('');
const about = ref('');
watch(() => route.params, async () => {
    loading.value = 0;
    await store.getGameDetail(route.params.gameName);
    const gameInstance = store.getCurrentGame();
    //动态创建类
    if (gameInstance.price > 200)
        curGame.value = new Game_type1(gameInstance);
    else
        curGame.value = new Game_type2(gameInstance);

    supports.value = curGame.value.supports;
    about.value = curGame.value.about;
    loading.value = 1;
}, { immediate: true })
const textStyle = (styles) => {
    return {
        fontWeight: styles.bold ? 'bold' : 'normal',
        color: styles.color,
    }
}
const getUrl = store.getImageUrl;
</script>
<template>
    <div class="gamePage" v-if="loading">
        <div class="gamePage-top">
            <h2>{{ curGame.name }}</h2>
            <el-button type="primary" size="large" @click="" class="center">社区中心</el-button>
            <Carousel></Carousel>
        </div>
        <div class="gamePage-bottom">
            <div class="gamePage-bottom-left">
                <div class="item1">
                    <p>下载{{ curGame.name }}</p>
                    <button class="item1-button" @click="">下载</button>
                </div>
                <div class="item2">
                    <p>购买{{ curGame.name }}</p>
                    <div class="item2-inside">
                        <p>NT$ {{ curGame.price }}</p>
                        <button class="item2-inside-button">添加至购物车</button>
                    </div>
                </div>
                <div class="about">
                    <p>关于这款游戏</p>
                    <div v-for="(item, index) in about" :key="index">
                        <!--渲染文本 内容-->
                        <div v-if="item.type == 'text'" :style="textStyle(item.data.styles)" class="text">
                            {{ item.data.text }}
                        </div>
                        <!--渲染图片-->
                        <img v-else-if="item.type == 'image'" :src="getUrl(item.data.url)">
                        <!--渲染视频-->
                        <video v-else-if="item.type == 'video'" :src="getUrl(item.data.url)" controls></video>
                    </div>
                </div>
            </div>
            <div class="gamePage-bottom-right">
                <div class="supports">
                    <div v-for="item in supports">
                        <div class="support" @click="">{{ item }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.gamePage {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #233748;

    .gamePage-top {
        width: 60%;
        height: 50%;
        display: flex;
        margin: auto;
        flex-wrap: wrap;
        justify-content: space-between;

        h2 {
            color: aliceblue
        }

        .center {
            margin-top: 3.5%;
        }

    }

    .gamePage-bottom {
        width: 60%;
        height: auto;
        display: flex;
        margin: auto;
        margin-top: 1%;
        justify-content: space-between;
        flex-wrap: wrap;

        .gamePage-bottom-left {
            width: 60%;
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;

            .item1 {
                display: flex;
                width: 100%;
                height: 45px;
                border-radius: 5px;
                background-image: linear-gradient(to right, #5A8729, #406326);
                border: 2px black;

                p {
                    margin: auto;
                    margin-left: 25%;
                    color: aliceblue;
                }

                .item1-button {
                    width: 60px;
                    height: 40px;
                    margin-top: 4%;
                    margin-right: 3%;
                    border: 2px black solid;
                    border-radius: 5px;
                    background-image: linear-gradient(to right, #5A8729, #406326);
                    color: aliceblue;

                    &:hover {
                        background-image: linear-gradient(to right, #6da631, #4b732d);
                        cursor: pointer;
                    }
                }


            }

            .item2 {
                margin-top: 6%;
                display: flex;
                width: 100%;
                height: 45px;
                border-radius: 5px;
                background-image: linear-gradient(to right, #5A8729, #406326);
                border: 2px black;

                p {
                    margin: auto;
                    margin-left: 25%;
                    color: aliceblue;
                }

                .item2-inside {
                    display: flex;
                    height: 40px;
                    width: auto;
                    margin-top: 4%;
                    margin-right: 3%;
                    border: 2px black solid;
                    border-radius: 5px;
                    background-color: #181D25;
                    p {
                        margin-left: 0%;
                    }
                    .item2-inside-button {
                        margin-left: 5px;
                        background-image: linear-gradient(to right, #5A8729, #406326);
                        color: aliceblue;
                        &:hover {
                            background-image: linear-gradient(to right, #6da631, #4b732d);
                            cursor: pointer;
                        }
                    }

                }
            }

            .about {
                margin-top: 7%;
                color: aliceblue;

                p::after{
                    content: " ";
                    display: block;
                    width: 100%;
                    height: 2px;
                    background-image: linear-gradient(to right, #6183b3, #293a4a);
                }
                .text{
                    white-space: pre-wrap;
                }

            }
        }

        .gamePage-bottom-right {
            width: 35%;
            margin-left: 5%;
            .supports {
                background-color: #181D25;
                color: rgb(104, 193, 252);
                padding: 2%;
                .support {
                    border: #181D25 solid 1px;
                    background-color: rgb(36, 59, 79);
                    &:hover{
                        background-color: rgb(88, 148, 189);
                        cursor: pointer;
                    }
                }
            }
        }
    }

}
</style>