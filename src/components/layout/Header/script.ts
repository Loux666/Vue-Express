import { defineComponent, ref, onMounted, onUnmounted, computed } from 'vue';
import { useRouter } from 'vue-router'; // 1. Import
import { useAuthStore } from '@/store/auth.store';
import { getAvatarUrl } from '@/utils/media';
// import api, { headerApi } from '@/services/api';



export default defineComponent({
  emits: ['toggle-sidebar'],
  setup() {
    // 2. Khởi tạo router instance (QUAN TRỌNG)
    const router = useRouter();



    // Logic scroll giữ nguyên
    const isScrolled = ref(false);
    const handleScroll = () => {
      isScrolled.value = window.scrollY > 10;
    };

    const authStore = useAuthStore();

    // Fetch header data
    // const fetchHeaderData = async () => {
    //   try {
    //     const response = await headerApi.getHeader();
    //     if (response.data) {
    //       collections.value = response.data.collections || [];
    //       audiences.value = response.data.audiences || [];
    //     }
    //   } catch (error) {
    //     console.error('Failed to fetch header data:', error);
    //   }
    // };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
      document.addEventListener('click', closeAllDropdowns);
    });
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', closeAllDropdowns);
    });

    const goToLogin = () => {
      router.push('/login');
    };

    const goToRegister = () => {
      router.push('/register');
    };

    // User menu
    const showDropdown = ref(false);
    const toggleDropdown = () => (showDropdown.value = !showDropdown.value);

    const userName = computed(() => {
      return authStore.user?.name || authStore.user?.username || '';
    });

    const avatarUrl = computed(() => getAvatarUrl(authStore.user?.avatar, 40));

    const goToProfile = () => {
      showDropdown.value = false;
      router.push('/profile');
    };

    const logout = async () => {
      showDropdown.value = false;
      await authStore.logout();
    };

    // Product menu toggle
    const activeNavDropdown = ref('');
    const toggleNavDropdown = (menu: string) => {
      if (activeNavDropdown.value === menu) {
        activeNavDropdown.value = '';
      } else {
        activeNavDropdown.value = menu;
      }
    };

    const closeAllDropdowns = () => {
      showDropdown.value = false;
      activeNavDropdown.value = '';
    };    return {
      isScrolled,
      goToLogin,
      goToRegister,
      // user menu
      showDropdown,
      toggleDropdown,
      userName,
      avatarUrl,
      goToProfile,
      logout,
      // expose auth status
      isAuthenticated: computed(() => authStore.isAuthenticated),
      activeNavDropdown,
      toggleNavDropdown,
    };
  }
});