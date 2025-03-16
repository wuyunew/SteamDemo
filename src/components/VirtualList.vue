<template>
  <div class="virtual-list" ref="listContainer" >

    <div v-for="(item, index) in visibleItems" :key="index" class="virtual-list-item">
      <slot name="item" :item="item" :index="index"></slot>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted} from 'vue';
import { throttle } from '../utils/wrapper';
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  itemHeight: {
    type: Number,
    default: 30,
  },
});

const listContainer = ref(null);
const startIndex = ref(0);
const visibleCount = ref(0);

// 计算可见项目的数量
const calculateVisibleCount = () => {
  const container = listContainer.value;
  if (container) {
    const containerHeight = container.clientHeight;
    visibleCount.value = Math.ceil(containerHeight / props.itemHeight) + 1;
    visibleCount.value = Math.max(visibleCount.value, 4);
  }
};

const throttledCalculateVisibleCount = throttle(calculateVisibleCount, 100);
// 计算可见项目的索引范围
const visibleItems = computed(() => {
  const endIndex = startIndex.value + visibleCount.value;
  return props.items.slice(startIndex.value, endIndex);
});



// 组件挂载时计算可见项目数
onMounted(() => {
  calculateVisibleCount();
  window.addEventListener('resize', calculateVisibleCount);
  window.addEventListener('scroll', throttledCalculateVisibleCount);
});

// 清理资源
onUnmounted(() => {
  window.removeEventListener('resize', calculateVisibleCount);
  window.removeEventListener('scroll', throttledCalculateVisibleCount);
});
</script>

<style scoped>

.virtual-list {
  overflow-y: auto;
}
.virtual-list-item {
  box-sizing: border-box;
}
</style>