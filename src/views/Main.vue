<script setup>
import Header from '@/components/Header.vue';
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-header class="el-header"><Header></Header></el-header>
      <el-main>MainOfStore</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<style scoped>
 .common-layout {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin:0;
	  padding:0;
   	border:0
  }
  .el-header {
    padding: 0%;
  
  }
</style>