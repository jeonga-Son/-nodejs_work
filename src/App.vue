<template>
  <div class="name">{{name}}</div>
</template>

<script>
export default {
 setup(){
  const name = "Hello MetaNet!";

// 값을 리턴해주지 않으면 오류가 난다.
  return{
    name,
  }
 }
}
</script>

<style>
  .name{
    color : blue;
  }
</style>
