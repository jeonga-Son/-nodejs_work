<template>
    <div
        class="alert alert-success toast-box" 
        role="alert"
        :class="`alert-${type}`">
        {{message}}
    </div>
</template>

<script>
export default { // 부모에서 props를 통해 받아오는 message 값을 결과 화면으로 띄워준다.
    props: {
        message: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'success'
        }
    }
}
</script>

<style>
    .toast-box {
        position: fixed;
        top: 10px;
        right: 10px;
    }
</style>