<script setup>
import { ref, onMounted, onUnmounted,toRef,toRefs, onUpdated } from 'vue';

const {gamesList} = defineProps(['gamesList'])//因为可能不止一个prop

const num=gamesList.length      
let curnum = ref(0)//当前显示的是第几个游戏
let curindex = ref(4)//当前游戏显示的是哪张主视图，第五张为默认主视图
let timer //定时器
//轮播图控制 
const nextGame = () => {
    //如果是最后一项则返回第一项 
    curnum.value = (curnum.value + 1) % num
}
const prevGame = () => { 
    curnum.value = (curnum.value - 1 + num) % num
}
const pause = () => {
    clearInterval(timer)
} 
const start = () => {
    timer = setInterval(() => { nextGame() }, 5000)
}
const select = (index) => {
    curnum.value = index
}
//轮播图内部控制
const selectMainImg = (index) => {
    curindex.value = index
}
const resetMainImg = () => {
    curindex.value = 4
}


const getImageUrl = (url) => {
    return new URL(url, import.meta.url).href
}
onMounted(() => {
    start()
})
onUnmounted(() => {
    clearInterval(timer)
})
</script>

<template>
    <!--swiper用flex布局,组件就不用-->
    <div class="swiper" @mouseenter="pause" @mouseleave="start">
        <div class="pre" @click="prevGame"> <img src="../assets/arrow_left.png" alt="pre"></div>
        <div class="content">
            <div class="content-left">
                <img :src="getImageUrl(gamesList[curnum].imgUrl[curindex])" alt="pic_mian">
            </div>
            <div class="content-right">
                <div class="name">{{ gamesList[curnum].name }}</div>
                <div class="imgList">
                    <img v-for="i in 4" :key=i :src="getImageUrl(gamesList[curnum].imgUrl[i - 1])"
                        @mouseenter="selectMainImg(i - 1)" @mouseleave="resetMainImg">
                </div>
                <div class="end">现已推出</div>
            </div>
        </div>
        <div class="nxt" @click="nextGame">
            <img src="../assets/arrow_right.png" alt="nxt">
        </div>
        <div class="dots">
            <!--:class="{curnum:curnum === i-1}": 这是一个动态类绑定，根据条件添加类名。如果 curnum 等于 i-1，则会给 div 元素添加 curnum 类。-->
            <div v-for="i in num" :key="i" class="dot" :class="{ curnum: curnum === i - 1 }" @click="select(i - 1)" />
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