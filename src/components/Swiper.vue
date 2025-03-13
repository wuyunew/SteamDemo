<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useSteamStore } from '@/stores/SteamStore';
import { CarouselControl as swiperControlClass } from '@/utils/models';
const store = useSteamStore();
const props = defineProps({
    recommendList: Array,
})
const { recommendList } = JSON.parse(JSON.stringify(props.recommendList))
const num = recommendList.length;

const swiperControl = new swiperControlClass(num);

const curGame = computed(() => recommendList[swiperControl.getCurGame()])
const curImg=ref(4)
const handleMouseEnter=(index)=>{
    curImg.value=index
}
const getImageUrl = store.getImageUrl
const mainPicUrl = computed(() => getImageUrl(curGame.value.imgUrl[curImg.value]))



onMounted(() => {
    swiperControl.start();
})
onUnmounted(() => {
    swiperControl.pause();
})
</script>

<template>
    <div class="swiper" ref="swiper" @mouseenter="swiperControl.pause()" @mouseleave="swiperControl.start()">
        <div class="pre" @click="swiperControl.prevGame()">
            <img src="../assets/arrow_left.png" alt="pre">
        </div>
        <div class="content">
            <div class="content-left">
                <img :src="mainPicUrl" alt="pic_mian">
            </div>
            <div class="content-right">
                <div class="name">{{ curGame.name }}</div>
                <div class="imgList">
                    <img v-for="i in 4" :key="i" :src="getImageUrl(curGame.imgUrl[i - 1])" @mouseenter="handleMouseEnter(i-1)" alt="pic">
                </div>
                <div class="end">现已推出</div>
            </div>
        </div>
        <div class="nxt" @click="swiperControl.nextGame()">
            <img src="../assets/arrow_right.png" alt="nxt">
        </div>
        <div class="dots">
            <div v-for="i in num" :key="i" class="dot" @click="swiperControl.select(i-1)"/>
        </div>
    </div>
</template>

<style lang="less" scoped>
.swiper {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .pre {
        width: 3%;
        height: 30%;
        display: flex;
        align-items: center;
    }

    .pre:hover {
        background: linear-gradient(to right, rgba(171, 218, 244, 0) 5%, rgba(171, 218, 244, 0.3) 95%);
        cursor: pointer;
    }

    .content {
        height: 95%;
        width: 94%;
        display: flex;

        .content-left {
            width: 60%;
            height: 100%;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .content-right {
            width: 40%;
            height: 100%;
            display: flex;
            flex-direction: column;

            .name {
                margin-top: 2%;
                margin-left: 10%;
                margin-bottom: 5%;
                font-size: large;
                font-weight: bold;
            }

            .imgList {
                width: 100%;
                height: 60%;
                display: flex;
                flex-wrap: wrap;
                align-content: flex-start;

                img {
                    width: 40%;
                    height: 45%;
                    margin: 2%;
                }
            }

            .end {
                margin-left: 3%;
                margin-top: 5%;
            }
        }

    }

    .nxt {
        width: 3%;
        height: 30%;
        display: flex;
        align-items: center;

    }

    .nxt:hover {
        background: linear-gradient(to right, rgba(171, 218, 244, 0) 5%, rgba(171, 218, 244, 0.3) 95%);
        cursor: pointer;
    }

    .dots {
        margin: 0 auto; //水平居中
        display: flex;

        .dot {
            width: 16px;
            height: 9px;
            border-radius: 2px;
            background-color: rgba(255, 255, 255, 0.2);
            cursor: pointer;

            &:hover {
                background-color: rgba(255, 255, 255, 0.3);
            }

            &.current {
                background-color: rgba(255, 255, 255, 0.4);
            }
        }
    }

}
</style>