<template>
  <div class="admin-layout" :class="{ 'sidebar-collapsed': !isSidebarOpen }">
    <aside class="sidebar">
      <div class="sidebar-brand">
        <div class="logo">
          <span class="logo-full">ADMIN<span class="dot"></span></span>
          <span class="logo-mini">A<span class="dot"></span></span>
        </div>
        <p>Content Studio</p>
      </div>

      <nav class="nav-menu">
        <div class="nav-group">
          <button class="nav-group-head" type="button" @click="toggleGroup('content')">
            <span>Content</span>
            <svg class="group-chevron" :class="{ open: openGroup === 'content' }" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 6l4 4 4-4" />
            </svg>
          </button>
          <div class="nav-group-body" v-show="openGroup === 'content'">
            <router-link to="/admin/cms" class="nav-item" title="Home Page">
              <span class="nav-dot"></span>
              <span class="nav-text">Home Page</span>
            </router-link>
            
          </div>
        </div>

        <div class="nav-group">
          <button class="nav-group-head" type="button" @click="toggleGroup('data')">
            <span>Data Management</span>
            <svg class="group-chevron" :class="{ open: openGroup === 'data' }" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 6l4 4 4-4" />
            </svg>
          </button>
          <div class="nav-group-body" v-show="openGroup === 'data'">
            <router-link to="/admin/cms" class="nav-item nav-item--muted">
              <span class="nav-dot"></span>
              <span class="nav-text">Products</span>
            </router-link>
            <router-link to="/admin/cms" class="nav-item nav-item--muted">
              <span class="nav-dot"></span>
              <span class="nav-text">Orders</span>
            </router-link>
            <router-link to="/admin/cms" class="nav-item nav-item--muted">
              <span class="nav-dot"></span>
              <span class="nav-text">Users</span>
            </router-link>
            <router-link to="/admin/cms" class="nav-item nav-item--muted">
              <span class="nav-dot"></span>
              <span class="nav-text">Coupons</span>
            </router-link>
          </div>
        </div>
      </nav>

      <div class="sidebar-footer">
        <button @click="handleLogout" class="btn-logout" title="Đăng xuất">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span class="nav-text">Đăng xuất</span>
        </button>
      </div>
    </aside>

    <main class="main-content">
      <header class="topbar">
        <div class="topbar-left">
          <button class="btn-toggle" @click="toggleSidebar" aria-label="Toggle Menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <div>
            <h2>{{ route.name === 'admin-cms' ? 'Home Page CMS' : (route.name || 'Admin Dashboard') }}</h2>
            <p>Quản lý nội dung và dữ liệu theo từng nhóm rõ ràng</p>
          </div>
        </div>
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
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth.store';
import { useRouter, useRoute } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const isSidebarOpen = ref(true);
const openGroup = ref<'content' | 'data' | ''>('content');

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const toggleGroup = (group: 'content' | 'data') => {
  openGroup.value = openGroup.value === group ? '' : group;
};

const handleLogout = async () => {
  await authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(180deg, #f7f5f3 0%, #ffffff 100%);
  font-family: 'Inter', sans-serif;
}

.sidebar {
  width: 290px;
  background: #fff;
  border-right: 1px solid #ececec;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  transition: width 0.3s ease;
  overflow: hidden;
  z-index: 100;
}

.sidebar-brand {
  padding: 24px 24px 12px;
  border-bottom: 1px solid #f0f0f0;
}

.sidebar-brand p {
  margin-top: 8px;
  font-size: 12px;
  color: #666;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.logo {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 32px;
  color: #7A0E16; 
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.logo-mini {
  display: none;
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
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow-y: auto;
}

.nav-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-group-head {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border: 0;
  border-radius: 14px;
  background: #fafafa;
  color: #111;
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  cursor: pointer;
}

.group-chevron {
  transition: transform 0.2s ease;
}

.group-chevron.open {
  transform: rotate(180deg);
}

.nav-group-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-left: 6px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 14px;
  border-radius: 14px;
  color: #333;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.nav-item:hover, .nav-item.router-link-active {
  background: rgba(122, 14, 22, 0.08);
  color: #7A0E16;
  font-weight: 600;
}

.nav-item--muted {
  color: #666;
  font-size: 13px;
}

.nav-submenu {
  display: grid;
  gap: 4px;
  padding: 2px 0 8px 22px;
  border-left: 1px solid #ececec;
  margin-left: 16px;
}

.nav-subitem {
  display: block;
  padding: 8px 10px;
  border-radius: 10px;
  color: #555;
  font-size: 13px;
  transition: all 0.2s ease;
}

.nav-subitem:hover,
.nav-subitem.router-link-active {
  background: rgba(122, 14, 22, 0.08);
  color: #7A0E16;
}

.nav-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #7A0E16;
  flex-shrink: 0;
}

.sidebar-footer {
  padding: 16px;
  border-top: 1px solid #ececec;
}

.btn-logout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  padding: 12px 14px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 14px;
  cursor: pointer;
  font-weight: 600;
  color: #666;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.btn-logout:hover {
  background: #fafafa;
  color: #333;
}

.main-content {
  flex: 1;
  margin-left: 290px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  transition: margin-left 0.3s ease;
}

.topbar {
  background: #fff;
  padding: 18px 32px;
  border-bottom: 1px solid #ececec;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.btn-toggle {
  background: transparent;
  border: none;
  cursor: pointer;
  color: #555;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.btn-toggle:hover {
  background: #f5f5f5;
  color: #111;
}

.topbar h2 {
  margin: 0;
  font-size: 18px;
  color: #111;
  font-weight: 700;
}

.topbar p {
  margin-top: 4px;
  font-size: 12.5px;
  color: #777;
}

.user-info {
  font-size: 14px;
  color: #555;
}

.content-wrapper {
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* --- COLLAPSED STATE --- */
.sidebar-collapsed .sidebar {
  width: 88px;
}

.sidebar-collapsed .sidebar-brand p,
.sidebar-collapsed .nav-text,
.sidebar-collapsed .nav-submenu,
.sidebar-collapsed .nav-group-head span,
.sidebar-collapsed .btn-logout .nav-text,
.sidebar-collapsed .topbar p,
.sidebar-collapsed .sidebar-footer,
.sidebar-collapsed .nav-item--muted {
  display: none;
}

.sidebar-collapsed .logo-full {
  display: none;
}

.sidebar-collapsed .logo-mini {
  display: block;
}

.sidebar-collapsed .nav-item {
  padding: 12px;
  justify-content: center;
}

.sidebar-collapsed .nav-dot {
  margin: 0;
}

.sidebar-collapsed .btn-logout {
  width: 44px;
  height: 44px;
  padding: 0;
  border-radius: 50%;
  margin: 16px auto;
}

.sidebar-collapsed .main-content {
  margin-left: 88px;
}
</style>
