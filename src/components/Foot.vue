<script setup>
import { useRouter } from 'vue-router';
const text = "加入 Steam，探索数千款精彩游戏。"
const goToAbout = () => {
    router.push('/about');
}
const joinUs = () => {
    router.push('/join')
}
</script>

<template>
    <div class="button">
        <el-row>f
            <el-col :span="3" :offset="8">
                <div class="left">
                    <span>{{ text }}</span><br>
                    <el-button type="text" size="default" @click="goToAbout">了解更多</el-button>
                </div>
            </el-col>

            <el-col :span="3" :offset="0">
                <img src="../assets/join_pc.png" alt="join steam">
            </el-col>
            <el-col :span="3" :offset="0">
                <div class="right">
                    <el-button type="primary" size="default" @click="joinUs" class="join">加入Steam</el-button>
                    <br>
                    <span>免费加入且简单易用</span>
                </div>
            </el-col>


        </el-row>


    </div>
</template>

<style scoped lang="less">
.button {
    background-color: #171D25;
    color: #D6D5D9;
    font-size: 14px;
    border-radius: 2px;

    .el-row {
        padding-top: 10px;
        height: 100%;
    }

    .left {
        width: 200px;
        text-align: center;
        align-items: center;
        padding-top: 20px
    }

    img {
        width: 100%;
        height: auto;
    }

    .right {
        text-align: center;
        padding-top: 40px;

    }

    .join {
        color: white;
        background-color: black;
        border: 1px solid white;
    }

    .join:hover {
        border: 2px solid white;
    }

}
</style>