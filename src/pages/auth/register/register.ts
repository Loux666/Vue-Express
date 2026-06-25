import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth.store';

export default defineComponent({
    name: 'RegisterPage',
    setup() {
        const router = useRouter();
        const authStore = useAuthStore();
        const name = ref('');
        const email = ref('');
        const password = ref('');
        const password_confirmation = ref('');
        const errorMessage = ref('');

        const handleRegister = async () => {
            errorMessage.value = '';

            if (password.value !== password_confirmation.value) {
                errorMessage.value = 'Mật khẩu nhập lại không khớp!';
                return;
            }

            try {
                await authStore.register({
                    name: name.value,
                    email: email.value,
                    password: password.value,
                    password_confirmation: password_confirmation.value,
                    phone: '0123456789' // Tạm thời hardcode phone vì backend yêu cầu nhưng form chưa có
                });
                alert('Đăng ký thành công');
                // Backend của bạn hiện đăng ký xong là xong, nhưng tôi vẫn giữ luồng redirect theo ý bạn
                router.push({ name: 'otp', query: { type: 'registration', email: email.value } });
            } catch (error: any) {
                alert(authStore.error || 'Đăng ký thất bại');
            }
        };

        return {
            name,
            email,
            password,
            password_confirmation,
            errorMessage,
            handleRegister,
        };
    },
});