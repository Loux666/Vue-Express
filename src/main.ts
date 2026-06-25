import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useAuthStore } from './store/auth.store'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)

const authStore = useAuthStore()

// Gọi API lấy profile trước khi mount app để kiểm tra trạng thái login
authStore.fetchProfile().finally(() => {
  app.use(router)
  app.mount('#app')
})