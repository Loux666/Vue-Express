import apiClient from './api';

export const authService = {
  login(data: any) {
    return apiClient.post('/login', data);
  },
  register(data: any) {
    return apiClient.post('/register', data);
  },
  logout() {
    return apiClient.post('/logout');
  },
  getProfile() {
    return apiClient.get('/profile');
  }
};
