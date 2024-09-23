<script setup>
//轮播原理 不用列表实现 
//const recommendations=defineProps(['recommendations'])
/*
recommendations{
num: num
gamesList[
{url:url of game,
 name:name of game,
 imgUrl_main:游戏主视图的url
 imgUrl_aside:[四张附属图的url]
},
]
}
*/
//let{num,gamesList}=recommendations

</script>

<template>
    <!--swiper用flex布局,组件就不用-->
    <div class="swiper">
        <div class="pre"> <img src="../assets/arrow_left.png" alt=""></div>
        <div class="content">
            <div class="content-left" @click="">
                <div class="content-reight">
                    <h4>{{ gameName }}</h4>
                    <div class="imgList">
                        <img>
                        <img>
                        <img>
                        <img>
                        <h4>现已推出</h4>
                    </div>
                </div>
            </div>
        </div>
        <div class="nxt" @click="">
            <img src="../assets/arrow_right.png" alt="">
        </div>
        <div class="dots">

        </div>
    </div>
</template>

<style lang="less" scoped>
.swiper {
    display: flex;
    align-items: center;
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
        width: 94%;
    }

    .nxt {
        width: 3%;
        height: 30%;
        display: flex;
        align-items: center;

    }
    .nxt:hover{
        background: linear-gradient(to right, rgba(171, 218, 244, 0) 5%, rgba(171, 218, 244, 0.3) 95%);
    }
}
</style>