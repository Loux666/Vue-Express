import { defineStore } from 'pinia';
import { authService } from '../services/auth.service';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any | null,
    isAuthenticated: false,
    isLoading: false,
    error: null as string | null,
  }),

  actions: {
    async login(credentials: any) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await authService.login(credentials);
        this.user = response.data.data;
        this.isAuthenticated = true;
        return response.data;
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Đăng nhập thất bại';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async register(data: any) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await authService.register(data);
        return response.data;
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Đăng ký thất bại';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchProfile() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await authService.getProfile();
        this.user = response.data.data || response.data; // Tuỳ thuộc format trả về của backend
        this.isAuthenticated = true;
        return response.data;
      } catch (error: any) {
        this.user = null;
        this.isAuthenticated = false;
        // Lỗi 401 sẽ bị catch ở đây (ví dụ Cookie hết hạn hoặc chưa login)
      } finally {
        this.isLoading = false;
      }
    },

    async logout() {
      try {
        await authService.logout();
      } catch (error) {
        console.error('Lỗi khi đăng xuất:', error);
      } finally {
        this.user = null;
        this.isAuthenticated = false;
      }
    }
  }
});
