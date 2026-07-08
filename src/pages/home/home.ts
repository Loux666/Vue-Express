import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import HeroSection from '@/components/home/HeroSection.vue';
import ProductCarousel from '@/components/home/ProductCarousel.vue';
import BannerBreak from '@/components/home/BannerBreak.vue';
import ReviewsSection from '@/components/home/ReviewsSection.vue';
import AboutSection from '@/components/home/AboutSection.vue';
import StatsGrid from '@/components/home/StatsGrid.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    HeroSection,
    ProductCarousel,
    BannerBreak
    ,ReviewsSection,
    AboutSection,
    StatsGrid
  },
  setup() {
    const heroImages = [
      '/src/assets/banner/banner.avif',
      '/src/assets/banner/banner1.avif',
      '/src/assets/banner/banner2.avif'
    ];

    const demoImages = [
      'https://picsum.photos/400/500?random=2',
      'https://picsum.photos/400/500?random=3',
      'https://picsum.photos/400/500?random=4',
      'https://picsum.photos/400/500?random=5',
      'https://picsum.photos/400/500?random=6',
      'https://picsum.photos/400/500?random=7',
      'https://picsum.photos/400/500?random=8'
    ];

    const pageSettings = {
      hero: {
        carouselImages: heroImages,
        title: 'BÙNG<br>DÁNG<br>PHỐ.',
        subtitle: 'Streetwear cắt may chuẩn form, chất liệu dày dặn. Mặc đi đâu cũng nổi — không cần cố.',
        primaryBtnText: 'Mua ngay',
        primaryBtnLink: '#new',
        secondaryBtnText: 'Xem bộ sưu tập →',
        secondaryBtnLink: '#cat'
      },
      gender: {
        men: { img: '../../assets/product/men-clothes.webp', title: 'Thời trang Nam' },
        women: { img: '../../assets/product/women-clothes.jpg', title: 'Thời trang Nữ' },
        btnLabel: 'Mua ngay'
      },
      products: {
        displayCount: 8,
        demoImages
      },
      bannerBreak: {
        heading: 'Khám phá bản sắc riêng',
        text: "Rya's Store mang đến những thiết kế thời trang táo bạo, giúp bạn tự tin thể hiện cá tính.",
        btnLabel: 'Xem bộ sưu tập',
        bgImage: '/src/assets/banner/banner-break.avif'
      }
      ,
      reviews: [
        { text: 'Chất vải dày dặn, form chuẩn, đúng như mô tả. Giao hàng nhanh, đóng gói cẩn thận.', name: 'Lan Nguyễn', role: 'Khách hàng thân thiết', avatar: 'L' },
        { text: 'Mẫu mã cập nhật liên tục, mặc lên rất chất. Đã mua 3 lần và đều ưng ý.', name: 'Hải Trần', role: 'Mua lần đầu', avatar: 'H' },
        { text: 'Dịch vụ tư vấn nhiệt tình, đổi size dễ dàng. Sẽ tiếp tục ủng hộ shop dài lâu.', name: 'Thu Hà', role: 'Khách VIP', avatar: 'T' }
      ],
      about: {
        image: '/src/assets/product/about.jpg',
        heading: 'VỀ Rya\'s Store',
        text: "Rya's Store là thương hiệu streetwear Việt Nam, theo đuổi sự tối giản trong thiết kế và chất lượng trong từng đường may."
      },
      stats: [
        { num: '12K+', label: 'Khách hàng hài lòng' },
        { num: '500+', label: 'Sản phẩm đa dạng' },
        { num: '86', label: 'Cửa hàng đối tác' },
        { num: '99%', label: 'Đánh giá 5 sao' }
      ]
    };

    return {
      pageSettings
    };
  }
});
