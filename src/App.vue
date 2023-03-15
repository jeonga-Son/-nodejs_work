<template>
  <input 
    type="type" 
    v-model="name"
  >
  <button 
    class="btn btn-primary"
    @:click="onSubmit"
  >
    Click
  </button>
</template>

<script>
import { ref } from 'vue' ;
export default {
 setup(){
  const name = ref('kosa2');

  const onSubmit = () => {
    console.log(name);
  }

// 값을 리턴해주지 않으면 오류가 난다.
  return{
    name,
    onSubmit,
  }
 }
}
</script>

<style>
  .name{
    color : red;
  }

</style>
