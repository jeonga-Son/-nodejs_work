<template>
  <div class="name">
    {{name}}
  </div>
  <input type="text" value="name">
  <button 
    class="btn btn-primary"
    v-on:click="updateName"
  >
    Click
  </button>
</template>

<script>
import { ref } from 'vue' ;
export default {
 setup(){
  const name = ref('kosa');

  const updateName = () => {
    name.value = 2222222;
    console.log(name);
  }
 

// 값을 리턴해주지 않으면 오류가 난다.
  return{
    name,
    updateName,
  }
 }
}
</script>

<style>
  .name{
    color : blue;
  }
</style>
