<template>    
  <div>
    <div class="d-flex justify-content-between mb-3">
      <h2>To-Do List</h2>
      <button 
      class="btn btn-primary"
      @click="moveToCreatePage"
      >
        Create Todo
      </button>
    </div>
    <hr>
    
    <div v-if="!todos.length">
      추가된 Todo가 없습니다.
    </div>

    <div v-if="!todos.length">
      There is noting to display  
    </div>    

    <TodoList :todos="todos"
              @toggle-todo="toggleTodo"
              @delete-todo="deleteTodo" />

    <br>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li
          v-if="currentPage !== 1" 
          class="page-item">
          <a class="page-link" @click="getTodos(currentPage - 1)">Previous</a>
        </li>
        <li
          v-for="page in numberOfPages"
          :key="page"
          class="page-item"
          :class="currentPage === page ? 'active' : ''">
          <a class="page-link"
             @click="getTodos(page)">
             {{page}}
          </a>
        </li>        
        <li 
          v-if="numberOfPages != currentPage"
          class="page-item">
          <a class="page-link" @click="getTodos(currentPage + 1)">Next</a>
        </li>
      </ul>
    </nav>          
  </div>   
    <Toast v-if="showToast"
          :message="toastMessage"
          :type="toastAlertType" />
</template>

<script>
import { ref, computed, watch } from 'vue';
import axios from "axios";
import TodoList from '@/components/TodoList.vue';
import Toast from '@/components/Toast.vue';
import {useToast} from '@/composables/toast'; // js 꼭 안붙여도 된다.
import {useRouter} from 'vue-router';
// router는 페이지를 이동하기 위해 씀.
export default {  
  components: {
    TodoList,
    Toast,
  },
  setup(){      
    const todos = ref([]); 
    const searchText = ref('');
    const error = ref('');
    const numberOfTodos = ref(0);
    const limit = 5;
    const currentPage = ref(1);
    let timeout = null;
    const router = useRouter();

    const{
      toastMessage,
      toastAlertType,
      showToast,
      triggerToast
    } = useToast();

    watch(searchText, () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        getTodos(1);
      }, 2000);      
    });

    const moveToCreatePage = () => {
      router.push({
        name: 'TodoCreate'
        }
      );
    }

    const searchTodo = () => {
      clearTimeout(timeout);
      getTodos(1);
    }

    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value/limit);
    });   

    const deleteTodo = async (index) => {
      error.value = '';
      const id = todos.value[index].id;
      try{
        await axios.delete('http://localhost:3000/todos/'+id);
        //todos.value.splice(index, 1);
         getTodos(1);
      }catch(err){
        console.log(err);
        triggerToast('something went wrong!', 'danger');
      } 
    }   

    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      error.value = '';
      try{
        const res = await axios.get(
          `http://localhost:3000/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`);

        numberOfTodos.value = res.headers['x-total-count'];         
        todos.value = res.data;       
      }catch(err){
        console.log(err);
        triggerToast('something went wrong!', 'danger');
      }
    }

    getTodos();

    const addTodo = async (todo) => {
      error.value = '';
      try{
        await axios.post('http://localhost:3000/todos', {
          subject: todo.subject,
          completed: todo.completed
        });
        //todos.value.push(res.data);
         getTodos(1);
      }catch(err){
        console.log(err);
        triggerToast('something went wrong!', 'danger');
      }     
    }

    const toggleTodo = async (index, checked) => {  
      console.log(checked);
      error.value = '';
      const id = todos.value[index].id;
      try{
        await axios.patch('http://localhost:3000/todos/'+id, {
          completed: !todos.value[index].completed
        });
        todos.value[index].completed = checked;  
      }catch(err){
        console.log(err);
        triggerToast('something went wrong!', 'danger');
      } 
    }

    return{      
      todos,      
      deleteTodo,
      addTodo,
      toggleTodo, 
      searchText,
      error,  
      getTodos,
      numberOfTodos,
      limit,
      currentPage,
      numberOfPages,
      searchTodo, 
      showToast,
      toastMessage,
      toastAlertType,
      triggerToast,
      moveToCreatePage,
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
