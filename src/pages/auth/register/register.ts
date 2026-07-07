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
        const phone = ref('');
        const password = ref('');
        const password_confirmation = ref('');
        const errorMessage = ref('');
        const successMessage = ref('');

        const handleRegister = async () => {
            errorMessage.value = '';
            successMessage.value = '';

            if (password.value !== password_confirmation.value) {
                errorMessage.value = 'Mật khẩu nhập lại không khớp!';
                return;
            }

            try {
                await authStore.register({
                    name: name.value,
                    email: email.value,
                    phone: phone.value,
                    password: password.value,
                    password_confirmation: password_confirmation.value
                });
                successMessage.value = 'Đăng ký thành công. Đang chuyển sang xác thực OTP...';
                router.push({ name: 'otp', query: { type: 'registration', email: email.value } });
            } catch (error: any) {
                errorMessage.value = authStore.error || 'Đăng ký thất bại';
            }
        };

        return {
            name,
            email,
            phone,
            password,
            password_confirmation,
            errorMessage,
            successMessage,
            handleRegister,
        };
    },
});