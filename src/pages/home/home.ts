import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'HomePage',
  setup() {
    const carouselRef = ref<HTMLElement | null>(null);

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

    return {
      carouselRef,
      scrollCarousel
    };
  }
});
