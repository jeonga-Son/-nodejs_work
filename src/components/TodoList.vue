<template>
    <div
        v-for="(todo,index) in todos"
        :key="todo.id"
        class="card mt-2">
        <div class="card-body p-2 d-flex align-items-center">
            <div class="form-check flex-grow-1">
                <input class="form-check-input"
                        type="checkbox"
                        :value="todo.completed"
                        @change="toggleTodo(index)">
                <label class="form-check-label"
                        :class="{todo: todo.completed}">
                    {{ todo.subject }}
                </label>             
            </div>      
            <div>
                <button 
                    class="btn btn-danger btn-sm"
                    @click="deleteTodo(index)">
                    Delete
                </button>  
            </div>        
        </div>
    </div>  
</template>

<script>
export default {
    props: {
        todos:{
            type: Array,
            required: true
        }
    }, 
    emits: ['toggle-todo','delete-todo'], // emit을 여러번 사용하기 때문에 목록으로 명시해준다. 
    setup(props, {emit}){
        const toggleTodo = (index) => {
            emit('toggle-todo', index);
        }

        // app.vue에 리스트가 있기 때문에 함수를 가져올 수 없다.
        // 인덱스 값을 전달하여 삭제를 한다.
        // 자식 -> 부모에게 삭제 버튼을 클릭한 사실을 전달한다.
        const deleteTodo = (index) => {
            emit('delete-todo', index);
        }
        

        return {
            toggleTodo,
            deleteTodo
        }
    }   
}
</script>

<style>

</style>