<template>
  <div class="container">
    <h2>To-do</h2>
      <form
        @submit.prevent="onSubmit"
      >
      
      <div  class="d-flex">
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
      </div>
      
      <div v-if="hasError" style="color:red">
        This s cannot be empty
      </div>
    </form>
    <!-- {{todos}} -->
    <!-- for문을 돌릴 때 유일한 키 값이 꼭 필요하다. -->
    <div 
      v-for="todo in todos"
      :key="todo.id" 
      class="card mt-2">
      <div class="card-ody p-2">
        <div class="form-check">
          <input class="form-check-input"
                  type="checkbox"
                  v-model="todo.completed">
          <label class="form-check-label"
                  :class="{todo: todo.completed}">
            {{todo.subject}}
          </label>
          <div>
            <button class="btn btn-outline-danger btn-sm">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div> 
  
</template>

<script>
import { ref } from 'vue' ;
export default {
 setup(){
  // 변수
  const todo = ref('');
  const todos = ref([]);
  const hasError = ref(false)
  

  // 함수
  const onSubmit = () => {

    if(todo.value == '') {
      hasError.value = true;
    } else {
        todos.value.push({
        id: Date.now(),
        subject: todo.value,
        completed: false,
      });
      hasError.value = false;
      todo.value = ''; // 데이터 값을 초기화 한다.
    }   
  }


// 값을 리턴해주지 않으면 오류가 난다.
  return{
    todo,
    onSubmit,
    todos,
    hasError,
  }
 }
}
</script>

<style>
  .todo{
    color : gray;
    text-decoration: line-through;
  }

</style>
