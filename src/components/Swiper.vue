<script setup>
</script>
<template>
    <!--轮播图组件-->
    <div class="swiper" @mouseenter="pause" @mouseleave="start">
        <div class="content">
            <template v-for="index in num" :key="index">
                <div class="swiper-item" :class="{ current: current === index - 1 }">
                    <slot :name="index - 1" />
                </div>
            </template>
        </div>
        <div class="dots">
            <div v-for="index in num" :key="index" class="dot" :class="{ current: current === index - 1 }"
                @click="select(index - 1)" />
        </div>
        <div class="pre" @click="pre">
            <img src="../assets/arrow_left.png">
        </div>
        <div class="nxt" @click="nxt">
            <img src="../assets/arrow_right.png">
        </div>

    </div>
</template>

<style lang="less" scoped>
.swiper {
    position: relative;
    padding-bottom: 32px;
}

.content {
    display: flex;
    width: 100%;
    height: 100%;
}

.swiper-item {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.5s;

    &.current {
        opacity: 1;
        pointer-events: auto;
    }
}

.pre,
.nxt {
    position: absolute;
    top: 50%;
    padding: 36px 12px;
    transform: translateY(-50%);
    cursor: pointer;
    user-select: none;

    img {
        width: 23px;
        height: 36px;
    }
}

.pre {
    right: 100%;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.3) 5%, rgba(0, 0, 0, 0) 95%);

    &:hover {
        background: linear-gradient(to right, rgba(171, 218, 244, 0.3) 5%, rgba(171, 218, 244, 0) 95%);
    }
}

.nxt {
    left: 100%;
    background: linear-gradient(to right, rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, 0.3) 95%);

    &:hover {
        background: linear-gradient(to right, rgba(171, 218, 244, 0) 5%, rgba(171, 218, 244, 0.3) 95%);
    }
}

.dots {
    position: absolute;
    left: 50%;
    bottom: 12px;
    display: flex;
    gap: 4px;
    transform: translateX(-50%);
}

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


</style>