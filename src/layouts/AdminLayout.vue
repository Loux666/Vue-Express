<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="logo">
        ADMIN<span class="dot"></span>
      </div>
      <nav class="nav-menu">
        <router-link to="/admin/cms" class="nav-item">Quản lý Trang chủ (CMS)</router-link>
        <!-- Add other admin links here in the future -->
      </nav>
      <div class="sidebar-footer">
        <button @click="handleLogout" class="btn-logout">Đăng xuất</button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <header class="topbar">
        <h2>{{ route.name || 'Admin Dashboard' }}</h2>
        <div class="user-info" v-if="authStore.user">
          Xin chào, <strong>{{ authStore.user.name || authStore.user.email }}</strong>
        </div>
      </header>
      
      <div class="content-wrapper">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth.store';
import { useRouter, useRoute } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const handleLogout = async () => {
  await authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f8f9fa;
  font-family: 'Inter', sans-serif;
}

.sidebar {
  width: 260px;
  background: #fff;
  border-right: 1px solid #eee;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
}

.logo {
  padding: 24px;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 32px;
  color: #7A0E16; /* var(--red) */
}

.dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #7A0E16;
  border-radius: 50%;
  margin-left: 2px;
}

.nav-menu {
  flex: 1;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  padding: 12px 16px;
  border-radius: 8px;
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

.nav-item:hover, .nav-item.router-link-active {
  background: rgba(122, 14, 22, 0.1);
  color: #7A0E16;
  font-weight: 600;
}

.sidebar-footer {
  padding: 24px;
  border-top: 1px solid #eee;
}

.btn-logout {
  width: 100%;
  padding: 12px;
  background: transparent;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  color: #666;
  transition: all 0.2s ease;
}

.btn-logout:hover {
  background: #f1f1f1;
  color: #333;
}

.main-content {
  flex: 1;
  margin-left: 260px;
  display: flex;
  flex-direction: column;
}

.topbar {
  background: #fff;
  padding: 20px 32px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.topbar h2 {
  margin: 0;
  font-size: 20px;
  color: #111;
  font-weight: 600;
}

.user-info {
  font-size: 14px;
  color: #555;
}

.content-wrapper {
  padding: 32px;
  flex: 1;
}
</style>
