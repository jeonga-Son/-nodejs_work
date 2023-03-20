import {ref, onUnmounted} from 'vue';

export const useToast = () => {
    onUnmounted(() => {
        console.log("unmounted");
        clearTimeout(timeout.value); //hello가 출력되지 않는다.
      });
    
    const showToast = ref(false);
    const toastMessage = ref(''); 
    const toastAlertType = ref('');
    const timeout = ref(null); // 시간을 저장할 수 있는 변수
    
    const triggerToast = (message, type = 'success') => { //메세지라는 이름으로 데이터 값이 넘어오면
        showToast.value = true; // 화면에서 보여진다.
        toastMessage.value = message; // tocomposablesastMessage.value에 message값을 넣어준다.
        toastAlertType.value = type;
    
        timeout.value = setTimeout(() => { 
            console.log('hello'); // 메모리적 누수가 발생할 수 있는 곳에서 onUnmounted를 사용한다.
            toastMessage.value = ''; // // 먼저 toastMEssaage에 해당하는 값을 기본값으로 초기화한다.
            showToast.value = false; // 화면에서 3초 후에 사라진다.
            toastAlertType.value = ''; // toastAlertType값을 초기화 해준다.
        }, 3000)
    }

    return {
        showToast,
        triggerToast,
        toastMessage,
        toastAlertType,
      }
    
}