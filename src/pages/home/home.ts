import { defineComponent, ref, onMounted, onUnmounted } from 'vue';

export default defineComponent({
  name: 'HomePage',
  setup() {
    const carouselRef = ref<HTMLElement | null>(null);

    // Hero Carousel
    const heroImages = [
      '/src/assets/banner/banner.avif',
      '/src/assets/banner/banner1.avif',
      '/src/assets/banner/banner2.avif',

    ];
    const currentHeroIndex = ref(0);
    let heroTimer: ReturnType<typeof setInterval>;

    onMounted(() => {
      heroTimer = setInterval(() => {
        currentHeroIndex.value = (currentHeroIndex.value + 1) % heroImages.length;
      }, 5000);
    });

    onUnmounted(() => {
      if (heroTimer) clearInterval(heroTimer);
    });

    const scrollCarousel = (direction: 'left' | 'right') => {
      if (carouselRef.value) {
        // Cuộn một khoảng bằng nửa chiều rộng container
        const scrollAmount = carouselRef.value.clientWidth / 2;
        const currentScroll = carouselRef.value.scrollLeft;

        carouselRef.value.scrollTo({
          left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
          behavior: 'smooth'
        });
      }
    };

    const selectSize = (event: Event, imageSrc: string) => {
      const btn = event.currentTarget as HTMLElement;
      const card = btn.closest('.prod-card');
      if (card) {
        // Cập nhật hình ảnh
        const img = card.querySelector('.prod-cover') as HTMLImageElement;
        if (img) img.src = imageSrc;

        // Cập nhật trạng thái nút
        const parent = btn.parentElement;
        if (parent) {
          parent.querySelectorAll('.size-btn').forEach(el => el.classList.remove('active'));
        }
        btn.classList.add('active');

        // Cập nhật giá
        const nowPriceEl = card.querySelector('.prod-price .now');
        const oldPriceEl = card.querySelector('.prod-price .old');
        const discountEl = card.querySelector('.prod-price .discount');
        if (nowPriceEl && oldPriceEl && discountEl) {
          // Fake random price cho giao diện demo
          const newNow = Math.floor(Math.random() * 500) * 1000 + 150000;
          // Random mức giảm giá từ 10% đến 50%
          const discountPercent = Math.floor(Math.random() * 41) + 10;
          const newOld = Math.floor(newNow / (1 - discountPercent / 100));

          nowPriceEl.textContent = new Intl.NumberFormat('vi-VN').format(newNow) + 'đ';
          oldPriceEl.textContent = new Intl.NumberFormat('vi-VN').format(newOld) + 'đ';
          discountEl.textContent = `-${discountPercent}%`;
        }
      }
    };

    return {
      carouselRef,
      scrollCarousel,
      selectSize,
      heroImages,
      currentHeroIndex
    };
  }
});
