import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { useAuthStore } from '@/store/auth.store';

// Import Layouts


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/home/index.vue'), // Lazy Load
      meta: { layout: MainLayout }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/auth/login/index.vue'), 
       
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/pages/auth/register/index.vue'), 
      
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/pages/profile/index.vue'), 
      meta: { requiresAuth: true , layout: MainLayout}
      
    },
    {
      path: '/otp',
      name: 'otp',
      component: () => import('@/pages/otp/index.vue'),
    },
    
    // --- ADMIN ROUTES ---
    {
      path: '/admin/cms',
      name: 'admin-cms',
      component: () => import('@/pages/admin/cms/index.vue'),
      meta: { requiresAdmin: true, layout: AdminLayout }
    }
  ]
});

export default router;

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();
  
  if (to.meta.requiresAdmin) {
    if (!authStore.isAuthenticated) {
      next('/login');
    } else if (authStore.user?.role !== 'ADMIN') {
      alert('Bạn không có quyền truy cập trang này!');
      next('/'); // Not admin, redirect to home
    } else {
      next(); // Is admin
    }
  } else if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login'); // Chưa đăng nhập mà đòi vào -> Đá về Login
  } else {
    next(); // Ok cho qua
  }
});