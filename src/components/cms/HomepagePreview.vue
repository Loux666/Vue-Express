<template>
  <div class="preview-home-frame">
    <div class="home-page preview-home">
      <HeroSection :settings="settings" />

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
          <ProductCarousel :demoImages="settings.products.demoImages" :displayCount="settings.products.displayCount" />
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
          <ProductCarousel :demoImages="settings.products.demoImages" :displayCount="Math.min(settings.products.displayCount, 6)" />
        </div>
      </section>

      <section id="preview-bannerBreak" class="section section-soft">
        <div class="wrap">
          <BannerBreak :banner="settings.bannerBreak" />
        </div>
      </section>

      <ReviewsSection :reviews="settings.reviews" />

      <AboutSection :about="settings.about" />

      <StatsGrid :stats="settings.stats" />
    </div>
  </div>
</template>

<script setup lang="ts">
import HeroSection from '@/components/home/HeroSection.vue';
import ProductCarousel from '@/components/home/ProductCarousel.vue';
import BannerBreak from '@/components/home/BannerBreak.vue';
import ReviewsSection from '@/components/home/ReviewsSection.vue';
import AboutSection from '@/components/home/AboutSection.vue';
import StatsGrid from '@/components/home/StatsGrid.vue';

const props = defineProps<{ settings: any }>();

const settings = props.settings || {};

// Reviews and stats are provided from settings; components have defaults when missing.
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
