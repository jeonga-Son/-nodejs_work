<template>
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

    <button 
        type="submit" 
        class="btn btn-info"
        :disabled="!todoUpdated">
        Save
    </button>
    <button 
        class="btn btn-secondary ml-2" 
        @click="moveToListPage">
        Cancel
    </button>
  </form>
  <Toast v-if="showToast"
          :message="toastMessage"
          :type="toastAlertType" /> 
</template>

<script>
import {useRoute, useRouter} from 'vue-router';
import axios from 'axios';
import {ref, computed, onUnmounted} from 'vue';
import _ from 'lodash';
import Toast from '@/components/Toast.vue'; // @ => 절대경로
import {useToast} from '@/composables/toast';

export default {
  components: { // 다른 위치에있는 파일을 불러와서 여기서 실행시키고 싶다면 이렇게 선언해줘야한다.
    Toast
  },

    setup(){
        // onUnmounted(() => {
        //   console.log("unmounted");
        //   clearTimeout(timeout.value); //hello가 출력되지 않는다.
        // });

        console.log('hello');

        const route = useRoute();
        const router = useRouter(); // route가 뭔지 router가 뭔지 알아야 함.
        const todo = ref(null);
        const loading = ref(true); // 처음엔 true로 선언
        const todoId = route.params.id;
        const originalTodo = ref(null); // 오리지널 todo값을 가질 수 있는 변수를 선언

        const{
          toastMessage,
          toastAlertType,
          showToast,
          triggerToast
        } = useToast();

        const onSave = async() => {
          //patch나 put은 수정.
          // 여러개를 수정해야하므로 put 사용.
          const res = await axios.put(`http://localhost:3000/todos/${todoId}`, {
            subject: todo.value.subject,
            completed: todo.value.completed
          }); // 벡틱을 쓰면 안에 변수를 넣을 수 있다.
          originalTodo.value = {...res.data}; // 새로운 값으로 저장된 것을 original값으로 다시 저장한다.
          triggerToast('집에 보내줘!!!!!!!!!!!!!!!!!!!!!!!'); // 메세지값이 이거로 수정이 되도록 한다.
          console.log(res);
        }

        const todoUpdated = computed(() => {
          return !_.isEqual(todo.value, originalTodo.value); // 값이 서로 같지 않으면 버튼을 비활성화 처리
        });

        const getTodo = async() => { // 비동기식 처리
          try {
              const res = await axios.get(`http://localhost:3000/todos/${todoId}`);
              todo.value = {...res.data};
              originalTodo.value = {...res.data};//res.data => 같은값이 저장된다. 같은 주소값을 가짐. 따라서 {...res.dat}로 새로운 주소값을 받아 복사해서 가져온다.
              console.log(todo.value);
              loading.value = false; // 데이터 값을 받아오면 false 처리
          } catch(err) {
            console.log(err);
            triggerToast('something went wrong!', 'danger');
          }
        };
      
        const moveToListPage = () => {
            router.push({
                name: 'Todos'
            });
            // router.push('/todos');
        }

        const toggleTodoStatus = () => {
          todo.value.completed = !todo.value.completed
        }

        getTodo();

        return {
          todo,
          loading,
          toggleTodoStatus,
          moveToListPage,
          onSave,
          todoUpdated,
          showToast,
          triggerToast,
          toastMessage,
          toastAlertType,
        }

    }

}
</script>

<style>

</style>