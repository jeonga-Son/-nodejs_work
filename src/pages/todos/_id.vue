<template>
  <h1>Todo Page</h1>
  <div v-if="loading">
    Loading...
  </div>

  <form v-else
   @submit.prevent="onSave" > 
    <div class="row">
      <div class="col-6">
          <div class="form-group">
            <label>Todo Subject</label>
              <input v-model="todo.subject" type="text" class="form-control"/>
          </div>
      </div>
      <div class="col-6">
          <div class="form-group">
            <label>Status</label>
              <div>
                <button 
                    class="btn"
                    type="button"
                    :class="todo.completed ? 'btn-success' : 'btn-danger'"
                    @click="toggleTodoStatus">
                  {{todo.completed ? 'Completed' : 'InComplete'}}  
                </button>
              </div>
          </div>
      </div>
    </div>

    <button type="submit" class="btn btn-outline-primary">Save</button>
    <button class="btn btn-outline-primary ml-2" @click="moveToListPage">
        Cancel
    </button>
  </form>
</template>

<script>
import {useRoute, useRouter} from 'vue-router';
import axios from  'axios';
import {ref} from '@vue/reactivity';

export default {
    setup(){
        const route = useRoute();
        const router = useRouter(); // route가 뭔지 router가 뭔지 알아야 함.
        const todo = ref(null);
        const loading = ref(true); // 처음엔 true로 선언
        const todoId = route.params.id;

        const onSave = async() => {
          //patch나 put은 수정.
          // 여러개를 수정해야하므로 put 사용.
          const res = await axios.put(`http://localhost:3000/todos/${todoId}`, {
            subject: todo.value.subject,
            completed: todo.value.completed
          }); // 벡틱을 쓰면 안에 변수를 넣을 수 있다.
          console.log(res);
        }

        const getTodo = async() => { // 비동기식 처리
          const res = await axios.get(`http://localhost:3000/todos/${todoId}`);
          todo.value = res.data;
          loading.value = false; // 데이터 값을 받아오면 false 처리
       }

        getTodo();

      
        const moveToListPage = () => {
            router.push({
                name: 'Todos'
            })
        };

        const toggleTodoStatus = () => {
          todo.value.completed = ! todo.value.completed
        }

        return {
          todo,
          loading,
          toggleTodoStatus,
          moveToListPage,
          onSave,
        }

    }

}
</script>

<style>

</style>