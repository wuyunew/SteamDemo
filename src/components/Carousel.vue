<script setup>
import { useSteamStore } from '@/stores/SteamStore';
import { computed} from 'vue';
import { CarouselControl } from '@/utils/models';

const steamStore = useSteamStore();
const getImgurl = steamStore.getImageUrl;

// 当前展示的游戏数据
const currentGame = computed(() => steamStore.getCurrentGame());
const items = computed(() => {
    return [
        ...currentGame.value.videosUrl.map(src => ({ src, alt: 'Game Video', type: 'video', img: '../assets/avatar.jpg' })),
        ...currentGame.value.imgsUrl.map(src => ({ src, alt: 'Game Image', type: 'img' }))
    ]
});

// 轮播图控制
class CarouselControlClass extends CarouselControl {
    constructor(num) {
        super(num);
    }

}

const carouselControls = new CarouselControlClass(items.value.length);

// 当前展示的图片或视频
const currentItem = computed(() => items.value[carouselControls.getCurGame()]);


</script>

<template>
    <div class="carousel">
        <!-- 主轮播图区域 -->
        <div class="left">
            <div class="main-carousel">
                <img v-if="currentItem.type === 'img'" :src="getImgurl(currentItem.src)" :alt="currentItem.alt">
                <video v-else :src="getImgurl(currentItem.src)" controls autoplay></video>
            </div>

            <!-- 缩略图区域 -->
            <div class="thumbnails" >
                <div v-for="(item, index) in items" :key="index" class="thumbnail"
                     @click="carouselControls.select(index)"
                     :style="carouselControls.getCurGame()==index? { border: '2px solid #fff' } : { }">
                    <img v-if="item.type === 'video'" :src="getImgurl(item.img)" >
                    <img v-else :src="getImgurl(item.src)" ></img>
                </div>
            </div>
        </div>
        <!-- 介绍区域 -->
        <div class="right">
            <img src="../assets/action.png" alt="">
            <p>{{ currentGame.introduce }}</p>
            <div class="introduce">
                <p>最近评测： {{ currentGame.evaluate }}</p>
                <p>全部评测：{{ currentGame.evaluate }}</p>
                <p>发行日期： {{ currentGame.releaseDate }}</p>
            </div>
        </div>
    </div>
</template>

<style lang="less">
.carousel {
    position: relative;
    width: 100%;
    height: auto; // 自适应高度
    display: flex;
    border: 3px black solid;
    background-color:#181D25 ;
    .left {
        width: 60%; // 调整左侧宽度
        display: flex;
        flex-direction: column; // 垂直排列子元素
        .main-carousel {
            width: 100%;
            height: 400px; // 设置主轮播图的高度
            background-color: #000; // 黑色背景
            overflow: hidden;

            img, video {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .thumbnails {
            margin-top: 10px; // 缩略图区域与主轮播图之间的间距
            display: flex;
            overflow-x: auto; // 添加水平滚动
            padding-bottom: 10px;
            // 滚动条样式
            scrollbar-color:#162533 #121A26 ;
            ::-webkit-scrollbar-thumb:active{
                color: #376382;
                cursor: pointer;
            }


            .thumbnail {
                margin-right: 10px; // 缩略图之间的间距
                cursor: pointer;

                img {
                    width: 100px;
                    height: 60px;
                    object-fit: cover;
                }

            }
        }


    }

    .right {
        width: 37%; // 调整右侧宽度
        margin-left: 2%; // 移除左边距
        img {
            max-height: 250px;
            width: 100%;
            margin-bottom: 10px;
        }

        p {
            color: #fff;
            font-size: 14px;
            line-height: 1.5;
        }

        .introduce {
            margin-top: 10px;

            p {
                margin: 5px 0;
            }
        }
    }
}
</style>