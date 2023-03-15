<template>
  <div v-if="toggle">true</div>
  <div v-else>false</div>
  <button  class="btn btn-outline-success" @click="onToggle">Toggle</button>

  <div class="container">
    <h2>To-do</h2>
      <form
        class="d-flex"
        @submit.prevent="onSubmit"
      >

      <div class="flex-grow-1 mr-2">
        <input 
          class="form-control"
          type="text" 
          v-model="todo"
          placeholder="Type new to-do"
        >
      </div>
      
      <div>
        <button 
          class="btn btn-outline-info"
          @:click="submit"
        >
        Add
        </button>
      </div>
      <div>Error</div>
    </form>
    {{todos}}
    <!-- for문을 돌릴 때 유일한 키 값이 꼭 필요하다. -->
    <div 
      v-for="todo in todos"
      :key="todo.id" 
      class="card mt-2">
      <div class="card-ody p-2">
        {{todo.subject}}
      </div>
    </div>

  </div> 
  
</template>

<script>
import { ref } from 'vue' ;
export default {
 setup(){
  const todo = ref('');
  const todos = ref([
    {id:1, subject: 'vue study'},
    {id:2, subject: 'vue work'}
  ]);

  const toggle = ref(false);

  const onSubmit = () => {

    todos.value.push({
      id: Date.now(),
      subject: todo.value
    });
    console.log(todos);
  }

  const onToggle = () => {
    toggle.value = !toggle.value;
  }

// 값을 리턴해주지 않으면 오류가 난다.
  return{
    todo,
    onSubmit,
    todos,
    toggle,
    onToggle,
  }
 }
}
</script>

<style>
  .name{
    color : red;
  }

</style>
