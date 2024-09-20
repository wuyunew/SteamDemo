<script setup>
import Header from '@/components/Header.vue';
import Foot from './components/Foot.vue';
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-header class="el-header"><Header></Header></el-header>
      <el-main><RouterView/></el-main>
      <el-footer><Foot/></el-footer>
    </el-container>
  </div>
</template>

<style scoped lang="less">
html, body,#app {
  height: 100%;
  width: 100%;
  margin:0;
	padding:0;
	border:0
}

.common-layout {
  height: 100%;
  width: 100%;
  .el-header {
    padding:0;
    height: 100%;
  }
  .el-main {
    padding:0;
    height:100%
  }
  .el-footer {
    padding:0;
    height:100%
  }
}



</style>