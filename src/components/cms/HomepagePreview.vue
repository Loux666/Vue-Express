<template>
  <div class="preview-home-frame">
    <div class="home-page preview-home">
      <section id="preview-hero" class="hero">
        <div
          v-for="(img, index) in heroImages"
          :key="index"
          class="hero-bg"
          :class="{ active: currentHeroIndex === index }"
          :style="{ backgroundImage: 'url(' + img + ')' }"
        ></div>
        <div class="hero-grid">
          <div>
            <div class="hero-eyebrow">Bộ sưu tập SS26</div>
            <h1 class="hero-title" v-html="settings.hero.title"></h1>
            <p class="hero-sub">{{ settings.hero.subtitle }}</p>
            <div class="hero-cta">
              <a class="btn btn-primary" :href="settings.hero.primaryBtnLink">{{ settings.hero.primaryBtnText }}</a>
              <a class="btn btn-ghost" :href="settings.hero.secondaryBtnLink">{{ settings.hero.secondaryBtnText }}</a>
            </div>
          </div>
        </div>
        <div class="hero-marquee">
          <div class="hero-marquee-track">
            <span>NEW DROP MỖI THỨ 6</span><span>FREESHIP TỪ 499K</span><span>HÀNG VỀ MỖI TUẦN</span><span>BẢO HÀNH ĐỔI SIZE</span>
            <span>NEW DROP MỖI THỨ 6</span><span>FREESHIP TỪ 499K</span><span>HÀNG VỀ MỖI TUẦN</span><span>BẢO HÀNH ĐỔI SIZE</span>
          </div>
        </div>
      </section>

      <section id="preview-gender" class="section section-soft">
        <div class="wrap">
          <div class="sec-head">
            <div>
              <div class="sec-eyebrow">Bộ sưu tập nổi bật</div>
              <h2 class="sec-title">Trải nghiệm Rya's Store</h2>
            </div>
          </div>
          <div class="gender-split">
            <a href="#" class="gender-card">
              <img :src="settings.gender.men.img" :alt="settings.gender.men.title">
              <div class="gender-card-content">
                <h3>{{ settings.gender.men.title }}</h3>
                <span class="gender-btn">{{ settings.gender.btnLabel }}</span>
              </div>
            </a>
            <a href="#" class="gender-card">
              <img :src="settings.gender.women.img" :alt="settings.gender.women.title">
              <div class="gender-card-content">
                <h3>{{ settings.gender.women.title }}</h3>
                <span class="gender-btn">{{ settings.gender.btnLabel }}</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section id="preview-newArrivals" class="section" :style="{ background: '#fff' }">
        <div class="wrap">
          <div class="sec-head">
            <div>
              <div class="sec-eyebrow">Hàng mới về</div>
              <h2 class="sec-title">Drop mới nhất</h2>
            </div>
          </div>
          <div class="carousel-wrap">
            <button class="carousel-btn prev" @click="scrollCarousel(newArrivalsRef, 'left')">&larr;</button>
            <button class="carousel-btn next" @click="scrollCarousel(newArrivalsRef, 'right')">&rarr;</button>

            <div class="prod-carousel" ref="newArrivalsRef">
              <div v-for="n in settings.products.displayCount" :key="'new-' + n" class="prod-card">
                <div class="prod-img">
                  <span class="prod-badge">Mới</span>
                  <img :src="getDemoImage(n)" alt="Product" class="prod-cover" />
                  <div class="prod-quickadd">Thêm vào giỏ</div>
                </div>
                <div class="prod-cat">Áo thun</div>
                <div class="prod-name">Sản phẩm Demo {{ n }}</div>
                <div class="prod-sizes">
                  <span class="size-btn active">S</span>
                  <span class="size-btn">M</span>
                  <span class="size-btn">L</span>
                </div>
                <div class="prod-price">
                  <span class="now">450.000đ</span>
                  <span class="old">610.000đ</span>
                  <span class="discount">-20%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="preview-bestSeller" class="section" :style="{ background: '#fff' }">
        <div class="wrap">
          <div class="sec-head">
            <div>
              <div class="sec-eyebrow">Được yêu thích nhất</div>
              <h2 class="sec-title">Best Seller</h2>
            </div>
          </div>
            <div class="carousel-wrap">
            <button class="carousel-btn prev" @click="scrollCarousel(bestSellerRef, 'left')">&larr;</button>
            <button class="carousel-btn next" @click="scrollCarousel(bestSellerRef, 'right')">&rarr;</button>

            <div class="prod-carousel" ref="bestSellerRef">
              <div v-for="n in Math.min(settings.products.displayCount, 6)" :key="'best-' + n" class="prod-card">
                <div class="prod-img">
                  <span class="prod-badge sale">-20%</span>
                  <img :src="getDemoImage(n + 1)" alt="Product" class="prod-cover" />
                  <div class="prod-quickadd">Thêm vào giỏ</div>
                </div>
                <div class="prod-cat">Áo khoác</div>
                <div class="prod-name">Best Seller {{ n }}</div>
                <div class="prod-sizes">
                  <span class="size-btn active">S</span>
                  <span class="size-btn">M</span>
                  <span class="size-btn">L</span>
                </div>
                <div class="prod-price">
                  <span class="now">520.000đ</span>
                  <span class="old">680.000đ</span>
                  <span class="discount">-24%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="preview-bannerBreak" class="section section-soft">
        <div class="wrap">
          <div class="banner-break" :style="{ backgroundImage: 'url(' + settings.bannerBreak.bgImage + ')' }">
            <div class="banner-break-content">
              <h2>{{ settings.bannerBreak.heading }}</h2>
              <p>{{ settings.bannerBreak.text }}</p>
              <a class="btn-light" href="#">{{ settings.bannerBreak.btnLabel }}</a>
            </div>
          </div>
        </div>
      </section>

      <section id="preview-reviews" class="section">
        <div class="wrap">
          <div class="sec-head">
            <div>
              <div class="sec-eyebrow">Khách hàng nói gì</div>
              <h2 class="sec-title">Đánh giá khách hàng</h2>
            </div>
          </div>
          <div class="review-list">
            <article class="review-card" v-for="review in reviews" :key="review.name">
              <div class="review-stars">★★★★★</div>
              <p class="review-text">{{ review.text }}</p>
              <div class="review-author">
                <div class="review-avatar">{{ review.avatar }}</div>
                <div>
                  <div class="review-name">{{ review.name }}</div>
                  <div class="review-role">{{ review.role }}</div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="preview-about" class="section section-soft">
        <div class="wrap">
          <div class="about-grid">
            <div class="about-img">
              <img src="/src/assets/banner/banner-break.avif" alt="About Rya's Store" />
            </div>
            <div class="about-copy">
              <h2>VỀ RYA'S STORE</h2>
              <p>Rya's Store là thương hiệu streetwear Việt Nam, theo đuổi sự tối giản trong thiết kế và chất lượng trong từng đường may.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="preview-stats" class="section">
        <div class="wrap">
          <div class="stats-grid">
            <div class="stat-item" v-for="stat in stats" :key="stat.label">
              <div class="stat-num">{{ stat.num }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

const props = defineProps<{ settings: any }>();

const heroImages = computed(() => {
  const images = props.settings?.hero?.carouselImages || [];
  return images.filter((image: string) => image);
});

const currentHeroIndex = ref(0);
let heroTimer: ReturnType<typeof setInterval> | undefined;

const newArrivalsRef = ref<HTMLElement | null>(null);
const bestSellerRef = ref<HTMLElement | null>(null);

const scrollCarousel = (el: HTMLElement | null, direction: 'left' | 'right') => {
  if (!el) return;
  const scrollAmount = el.clientWidth / 2;
  const currentScroll = el.scrollLeft;
  el.scrollTo({ left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount, behavior: 'smooth' });
};

const reviews = [
  { text: 'Chất vải dày dặn, form chuẩn, đúng như mô tả. Giao hàng nhanh, đóng gói cẩn thận.', name: 'Lan Nguyễn', role: 'Khách hàng thân thiết', avatar: 'L' },
  { text: 'Mẫu mã cập nhật liên tục, mặc lên rất chất. Đã mua 3 lần và đều ưng ý.', name: 'Hải Trần', role: 'Mua lần đầu', avatar: 'H' },
  { text: 'Dịch vụ tư vấn nhiệt tình, đổi size dễ dàng. Sẽ tiếp tục ủng hộ shop dài lâu.', name: 'Thu Hà', role: 'Khách VIP', avatar: 'T' }
];

const stats = [
  { num: '12K+', label: 'Khách hàng hài lòng' },
  { num: '500+', label: 'Sản phẩm đa dạng' },
  { num: '86', label: 'Cửa hàng đối tác' },
  { num: '99%', label: 'Đánh giá 5 sao' }
];

const getDemoImage = (index: number) => {
  const images = props.settings?.products?.demoImages || [];
  if (images.length === 0) {
    return 'https://via.placeholder.com/400x500?text=No+Image';
  }
  return images[(index - 1) % images.length];
};

onMounted(() => {
  if (heroImages.value.length > 1) {
    heroTimer = setInterval(() => {
      currentHeroIndex.value = (currentHeroIndex.value + 1) % heroImages.value.length;
    }, 5000);
  }
});

onUnmounted(() => {
  if (heroTimer) clearInterval(heroTimer);
});
</script>

<style src="../../pages/home/home.css"></style>

<style scoped>
.preview-home-frame {
  width: 100%;
  max-width: none;
  margin: 0;
}

.preview-home {
  background: #fff;
  max-width: 1200px;
  margin: 0 auto;
}

.preview-prod-row {
  padding-bottom: 20px;
}

/* rely on home.css for product card sizing and banner styles */

.review-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.review-card {
  background: linear-gradient(160deg, #fff, rgba(122, 14, 22, 0.04));
  border-radius: 14px;
  padding: 16px;
  box-shadow: 0 2px 12px rgba(122, 14, 22, 0.06);
}

.review-stars {
  font-size: 11px;
  color: #7A0E16;
  letter-spacing: 2px;
  margin-bottom: 8px;
}

.review-text {
  font-size: 12px;
  line-height: 1.6;
  color: #000;
  margin-bottom: 12px;
}

.review-author {
  display: flex;
  align-items: center;
  gap: 8px;
}

.review-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(122, 14, 22, 0.15);
  color: #7A0E16;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 13px;
}

.review-name {
  font-size: 12px;
  font-weight: 700;
  color: #000;
}

.review-role {
  font-size: 10.5px;
  color: #000;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
}

.about-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.about-copy {
  background: #7A0E16;
  color: #fff;
  padding: 22px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.about-copy h2 {
  font-size: 18px;
  margin-bottom: 8px;
}

.about-copy p {
  font-size: 11px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.88);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  text-align: center;
}

.stat-num {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 26px;
  color: #000;
}

.stat-label {
  font-size: 10px;
  color: #000;
  margin-top: 2px;
}

/* Preview tweaks to match homepage when rendered inside admin panel */
.preview-home .hero-bg {
  background-attachment: scroll !important;
}

.preview-home .hero-grid {
  padding: 0 32px 72px;
  max-width: 1200px;
  margin: 0 auto;
}

.preview-home .hero {
  padding-top: 72px;
}
</style>
