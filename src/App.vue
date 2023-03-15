<template>
  <div class="name">{{greeting('MetaNet')}}</div>
</template>

<script>
export default {
 setup(){
  const name = "Hello MetaNet!";
  const greeting = (name) => {
    return 'Hello! ' + name;
  }
// 값을 리턴해주지 않으면 오류가 난다.
  return{
    name,
    greeting,
  }
 }
}
</script>

<style>
  .name{
    color : blue;
  }
</style>
