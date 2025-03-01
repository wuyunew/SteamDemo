<template>
  <button id="elem"> click me</button>
</template>

<script setup>

    let obj={
        handleEvent(event){
            alert(event.type+"at"+event.currentTarget);

        }
    }
    let elem=document.querySelector("button");
    elem.addEventListener('click',obj);

</script>

<style>
</style>