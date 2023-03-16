<template>  
  <div class="container">
    <h2>To-Do List</h2>

    <input
      class="form-control" 
      type="text" 
      v-model="searchText"
      placeholder="Search"
    >

    <br>

    <TodoSimpleForm @add-todo="addTodo"/>

    <div style="color: red">
      {{error}}
    </div>

    <div v-if="!todos.length">
      추가된 Todo가 없습니다.
    </div>

    <div v-if="!filteredTodos.length">
      There is nothing to display
    </div>

    <TodoList :todos="filteredTodos"
              @toggle-todo="toggleTodo" 
              @delete-todo="deleteTodo"/>

  </div>   
</template>

<script>
import { ref , computed} from 'vue';
import axios from "axios";
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';
export default {  
  components: {
    TodoSimpleForm,
    TodoList
  },
  setup(){
      
    const todos = ref([]);   
    const searchText = ref('');
    const error = ref('');

    const filteredTodos = computed(() => {
      if(searchText.value) {
        return todos.value.filter(todo => {
          return todo.subject.includes(searchText.value);
        });
      }

      return todos.value;
    });

    // 삭제 구현
    const deleteTodo = async (index) => {
      error.value ='';
      const id = todos.value[index].id;
      try{
          await axios.delete('http://localhost:3000/todos/' + id); 
          todos.value.splice(index, 1);
      } catch(err) {
        console.log(error);
        error.value = 'Something went wrong';
      }
      
    }   

    const getTodos = async () => {
      error.value ='';
       try{
          const res = await axios.get('http://localhost:3000/todos');  
          todos.value = res.data;
        } catch(err) {
          console.log(error);
          error.value = 'Something went wrong';
        }
    }

    getTodos();

    const addTodo = async (todo) => {
      error.value ='';
      try{
          const res = await axios.post('http://localhost:3000/todos', { // 테이블형식으로 데이터를 post하면 추가된다.
          subject: todo.subject,
          completed: todo.completed
        });
          todos.value.push(res.data); // 배열안에 데이터값을 넣는 것
      } catch(err) {
        console.log(error);
        error.value = 'Something went wrong';
      }
    }

    const toggleTodo = (index) => {     
      todos.value[index].completed = !todos.value[index].completed;      
    }
    
    return{      
      todos,      
      deleteTodo,
      addTodo,
      toggleTodo,
      searchText,
      filteredTodos,
      error,
      getTodos,
    }
  }  
}
</script>

<style>  
  .todo{
    color: gray;
    text-decoration: line-through;
  }
</style>
