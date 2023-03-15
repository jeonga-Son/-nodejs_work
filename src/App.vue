<template>
  <div class="name">
    {{name}}
  </div>
  <input v-bind:type="type" v-bind:value="name">
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
  const type = ref("number");

  const updateName = () => {
    name.value = 'Metanet';
    type.value = 'text';
    console.log(name);
  }
 

// 값을 리턴해주지 않으면 오류가 난다.
  return{
    name,
    updateName,
    type,
  }
 }
}
</script>

<style>
  .name{
    color : blue;
  }
</style>
