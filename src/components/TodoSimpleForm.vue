<template>
  <form       
      @submit.prevent="onSubmit"  
    >
      <div class="d-flex">
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
            class="btn btn-primary"
            type="submit"
          >
            Add
          </button>
        </div> 
      </div>
      <div v-if="hasError" style="color: red">
        This is cannot be empty  
      </div>        
    </form>  
</template>

<script>
import { ref } from 'vue';
export default {
    setup(props, context){ // context를 이용해서 데이터값을 추가한다.
        const todo = ref('');
        const hasError = ref(false); 

        const onSubmit = () =>{  
            if(todo.value == ''){
                hasError.value = true;
            }else{
               context.emit('add-todo', { // 'add-todo'의 이름으로 데이터 값을 보낼 준비 다 됨.
                    id: Date.now(),
                    subject: todo.value,
                    completed: false,  
               });

                hasError.value = false;
                todo.value = '';
            } 
        }

        return{
            todo,
            hasError,
            onSubmit,
        };

    }
}
</script>

<style>

</style>