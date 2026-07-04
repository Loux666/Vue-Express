
<script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import Header from '../components/layout/Header/index.vue';

  import Footer from '../components/layout/Footer/Footer.vue';

  const isSidebarOpen = ref(false);
  const showScrollTop = ref(false);

  const handleScroll = () => {
    showScrollTop.value = window.scrollY > 400;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
</script>

<template>
  <div>
    <Header />
    
    <div class="layout">
      <main class="main-content">
        <slot />
      </main>
      <Footer />
    </div>

    <!-- Scroll To Top Button -->
    <transition name="fade">
      <button v-show="showScrollTop" @click="scrollToTop" class="scroll-top-btn" title="Lên đầu trang">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
    </transition>
  </div>
</template>



<style scoped>
  .layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    width: 100%;
    font-family: 'Montserrat', sans-serif;  
    font-size: 15px;
  }

  .main-content {
    flex: 1;
  }

  @media (max-width: 768px) {
    .main-content {
      margin-top: 45px;
    }
  }

  @media (max-width: 480px) {
    .main-content {
      margin-top: 42px;
    }
  }

  .scroll-top-btn {
    position: fixed;
    bottom: 40px;
    right: 40px;
    width: 48px;
    height: 48px;
    background-color: var(--primary-red, #7A0E16);
    color: white;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 999;
    transition: all 0.3s ease;
  }

  .scroll-top-btn:hover {
    transform: translateY(-5px);
    background-color: #5a0a10;
    box-shadow: 0 6px 16px rgba(0,0,0,0.2);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }

  @media (max-width: 768px) {
    .scroll-top-btn {
      bottom: 20px;
      right: 20px;
      width: 40px;
      height: 40px;
    }
  }
</style>