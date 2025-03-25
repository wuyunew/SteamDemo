<script setup>
import { useSteamStore } from '@/stores/SteamStore';
import {  ref,onBeforeMount } from 'vue';
import { getWishlistApi } from '@/api/wishlist';
import VirtualList from '@/components/VirtualList.vue';
const steamStore = useSteamStore();
const getImageUrl = steamStore.getImageUrl;
const userInfo = ref();
const wishList = ref([]);
const loading = ref(0); // 0表示加载中，1表示加载完成

onBeforeMount(async () => {
  // 加载相关数据
  userInfo.value = steamStore.getUserInfo();
  try {
    const { data } = await getWishlistApi();
    wishList.value = data;
    loading.value = 1;
  } catch (err) {
    console.error('Failed to fetch wishlist:', err);
  }
});


const addToCart = (item) => {
  console.log('Adding to cart:', item);
};
const isDrag = ref("false");
const allowDrag = () => {
  isDrag.value = "true";
}
const disallowDrag = () => {
  isDrag.value = "false";
}
let dragIndex = 0;
const dragStart = (event, index) => {
  dragIndex = index;
  const target = event.target;
  setTimeout(() => {
    target.classList.add('moving');
  }, 0)
}
const dragEnter = (event, index) => {

  if (dragIndex !== index) {
    [wishList.value[dragIndex], wishList.value[index]] = [wishList.value[index], wishList.value[dragIndex]]
    dragIndex = index;
  }

}

const dragOver = (event) => {
  event.dataTransfer.dropEffect = 'move';
}
const dragEnd = (event) => {
  const target = event.target;
  target.classList.remove('moving');
  disallowDrag();
}

</script>

<template>
  <div class="wishList" v-if="loading">
    <div class="userInformation">
      <div class="header"><img :src="getImageUrl(userInfo.headImg)" alt=""></div>
      <div class="title">{{ userInfo.userName }}的愿望单</div>
    </div>
    <div class="search">
      <input type="search-input" placeholder="按名称或标签搜索">
      <button>选项</button>
      <el-dropdown>
        <span class="el-dropdown-link">
          排序依据
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="gameslist">
      <VirtualList :items="wishList" :itemHeight="140">
        <template #item="{ item, index }">
          <div class="gameItem" :draggable="isDrag" @dragstart="dragStart($event, index)" @dragover="dragOver"
            @dragenter="dragEnter($event, index)" @dragend="dragEnd" >
            <div class="left">
              <p class="index">{{ index + 1 }}</p>
              <div class="icon" @mousedown="allowDrag"></div>
            </div>
            <div class="right">
              <div class="gameImg">
                <img :src="getImageUrl(item.imgUrl)" alt="" class="mainImg" draggable="false">
              </div>
              <div class="intorduce">
                <h3>{{ item.name }}</h3>
                <p>发行日期: {{ item.releaseDate }}</p>
                <div class="buy">
                  <p>HK$ {{ item.price }}</p>
                  <button @click="addToCart(item)">添加到购物车</button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </VirtualList>

    </div>
  </div>
</template>

<style lang="less" scoped>
.wishList {
  background-color: #1B2838;
  padding-left: 20%;
  min-height: 690px;

  .userInformation {
    width: 100%;
    display: flex;
    padding-top: 40px;

    .header {
      width: 75px;
      height: 75px;
      border-radius: 10px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }

    .title {
      margin-left: 30px;
      font-size: 30px;
      line-height: 60px;
      color: white;
    }
  }

  .search {
    margin-top: 20px;
    display: flex;
    align-items: center;
    gap: 10px; // 添加按钮和输入框之间的间距

    input[type="search-input"] {
      width: 70%; // 设置输入框宽度
      padding: 8px 12px; // 内边距
      border: none; // 移除默认边框
      background-color: #2C3E50; // 背景颜色
      color: white; // 文字颜色
      border-radius: 4px; // 圆角
      font-size: 14px; // 字体大小

      &::placeholder {
        color: rgba(255, 255, 255, 0.6); 
      }
    }

    button {
      background-color: #2C3E50; 
      color: white; 
      border: none; 
      padding: 8px 12px; 
      border-radius: 4px; 
      cursor: pointer;

      &:hover {
        background-color: #34495e; 
      }
    }
  }

  .gameslist {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 20px;
    padding-top: 20px;

    .gameItem {
      width: 70%;
      height: 140px;
      background-color: #2C3E50;
      border-radius: 10px;
      overflow: hidden;
      padding: 20px;
      display: flex;
      margin-bottom: 20px;
      transition: transform 0.1s ease, opacity 0.1s ease; 

      .left {
        margin-right: 20px;
        height: 100%;

        .index {
          margin-top: auto;
          font-size: 14px;
          color: white;

        }

        .icon {
          width: 25px;
          height: 25px;
          margin-top: 50px;
          background-color: antiquewhite;
          cursor: move;
        }
      }

      .right {
        margin: auto;
        display: flex;
        flex-wrap: nowrap;
        height: 100%;

        .gameImg {
          .mainImg {
            border-radius: 10px;
            width: 300px;
            height: 150px;
          }
        }

        .intorduce {
          margin-left: 150px;

          h3 {
            color: white;
            margin-bottom: 10px;
          }

          p {
            color: gray;
            margin-bottom: 10px;
          }

          .buy {
            display: flex;
            justify-content: space-between;
            align-items: center;

            button {
              background-color: green;
              color: white;
              padding: 5px 10px;
              border-radius: 5px;
              cursor: pointer;
            }
          }
        }
      }
    }

    .moving {
      opacity: 0;
    }

  }
}
</style>