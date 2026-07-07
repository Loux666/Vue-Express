<template>
  <div class="cms-page">
    <div class="cms-shell">
      <header class="cms-header">
        <div>
          
        </div>
        <button @click="saveSettings" class="btn-save" :disabled="isSaving">
          {{ isSaving ? 'Đang lưu...' : 'Lưu thay đổi' }}
        </button>
      </header>

      <div v-if="isLoading" class="loading-panel">Đang tải dữ liệu...</div>

      <div v-else class="cms-grid">
        <aside class="cms-index">
          <div class="index-title">Trang Home Page</div>
          <button class="index-item" :class="{ active: activeSection === 'hero' }" @click="setSection('hero')">Hero banner</button>
          <button class="index-item" :class="{ active: activeSection === 'gender' }" @click="setSection('gender')">Danh mục nam/nữ</button>
          <button class="index-item" :class="{ active: activeSection === 'newArrivals' }" @click="setSection('newArrivals')">Sản phẩm mới</button>
          <button class="index-item" :class="{ active: activeSection === 'bestSeller' }" @click="setSection('bestSeller')">Best seller</button>
          <button class="index-item" :class="{ active: activeSection === 'bannerBreak' }" @click="setSection('bannerBreak')">Banner giữa trang</button>
          <button class="index-item" :class="{ active: activeSection === 'reviews' }" @click="setSection('reviews')">Đánh giá khách hàng</button>
          <button class="index-item" :class="{ active: activeSection === 'about' }" @click="setSection('about')">Giới thiệu</button>
          <button class="index-item" :class="{ active: activeSection === 'stats' }" @click="setSection('stats')">Thống kê</button>
        </aside>

        <section class="cms-editor">
          <section id="hero" class="cms-card">
            <div class="card-head">
              <div>
                <div class="card-ordinal">01</div>
                <h2>Hero banner</h2>
              </div>
              <span class="card-tag">Active</span>
            </div>
            <div class="form-group">
              <label>Tiêu đề Banner</label>
              <textarea v-model="settings.hero.title" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label>Phụ đề</label>
              <textarea v-model="settings.hero.subtitle" rows="2"></textarea>
            </div>
            <div class="form-group">
              <label>Số lượng ảnh Carousel</label>
              <input type="number" v-model.number="settings.hero.carouselCount" min="1" max="10" @change="updateCarouselCount" />
            </div>
            <div class="form-group">
              <label>Ảnh Carousel</label>
              <div v-for="(_img, idx) in settings.hero.carouselImages" :key="idx" class="stack-input">
                <input type="text" v-model="settings.hero.carouselImages[idx]" :placeholder="'URL ảnh ' + (idx + 1)" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Nút Chính</label>
                <input type="text" v-model="settings.hero.primaryBtnText" />
              </div>
              <div class="form-group">
                <label>Link Nút Chính</label>
                <input type="text" v-model="settings.hero.primaryBtnLink" />
              </div>
            </div>
          </section>

          <section id="gender" class="cms-card">
            <div class="card-head">
              <div>
                <div class="card-ordinal">02</div>
                <h2>Danh mục nam / nữ</h2>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Nam - Tiêu đề</label>
                <input type="text" v-model="settings.gender.men.title" />
              </div>
              <div class="form-group">
                <label>Nam - Ảnh</label>
                <input type="text" v-model="settings.gender.men.img" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Nữ - Tiêu đề</label>
                <input type="text" v-model="settings.gender.women.title" />
              </div>
              <div class="form-group">
                <label>Nữ - Ảnh</label>
                <input type="text" v-model="settings.gender.women.img" />
              </div>
            </div>
            <div class="form-group">
              <label>Nút</label>
              <input type="text" v-model="settings.gender.btnLabel" />
            </div>
          </section>

          <section id="newArrivals" class="cms-card">
            <div class="card-head">
              <div>
                <div class="card-ordinal">03</div>
                <h2>Sản phẩm mới</h2>
              </div>
            </div>
            <div class="form-group">
              <label>Số lượng sản phẩm hiển thị</label>
              <input type="number" v-model.number="settings.products.displayCount" min="4" max="24" />
            </div>
            <div class="form-group">
              <label>Bố cục (Số cột)</label>
              <select v-model.number="settings.products.layout">
                <option value="3">3 Cột</option>
                <option value="4">4 Cột</option>
                <option value="5">5 Cột</option>
              </select>
            </div>
            <div class="form-group">
              <label>Ảnh Product Demo</label>
              <textarea v-model="demoImagesString" rows="3" placeholder="URL1, URL2..."></textarea>
            </div>
          </section>

          <section id="bestSeller" class="cms-card mini-note">
            <div class="card-head">
              <div>
                <div class="card-ordinal">04</div>
                <h2>Best seller</h2>
              </div>
            </div>
            <p>Phần này đang dùng chung dữ liệu demo với danh sách sản phẩm phía trên. Khi cần, có thể tách riêng thành nguồn dữ liệu khác.</p>
          </section>

          <section id="bannerBreak" class="cms-card">
            <div class="card-head">
              <div>
                <div class="card-ordinal">05</div>
                <h2>Banner giữa trang</h2>
              </div>
            </div>
            <div class="form-group">
              <label>Tiêu đề</label>
              <input type="text" v-model="settings.bannerBreak.heading" />
            </div>
            <div class="form-group">
              <label>Nội dung</label>
              <textarea v-model="settings.bannerBreak.text" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label>Nhãn nút</label>
              <input type="text" v-model="settings.bannerBreak.btnLabel" />
            </div>
            <div class="form-group">
              <label>Ảnh nền</label>
              <input type="text" v-model="settings.bannerBreak.bgImage" />
            </div>
          </section>

          <section id="reviews" class="cms-card mini-note">
            <div class="card-head">
              <div>
                <div class="card-ordinal">06</div>
                <h2>Đánh giá khách hàng</h2>
              </div>
            </div>
            <p>Hiện phần này dùng dữ liệu demo từ trang mẫu. Nếu cần editor chi tiết, có thể mở rộng thành form danh sách sau.</p>
          </section>

          <section id="about" class="cms-card mini-note">
            <div class="card-head">
              <div>
                <div class="card-ordinal">07</div>
                <h2>Giới thiệu</h2>
              </div>
            </div>
            <p>Khối giới thiệu sẽ được map từ nội dung thương hiệu của trang chủ.</p>
          </section>

          <section id="stats" class="cms-card mini-note">
            <div class="card-head">
              <div>
                <div class="card-ordinal">08</div>
                <h2>Thống kê</h2>
              </div>
            </div>
            <p>Phần số liệu ở cuối trang sẽ đồng bộ từ dữ liệu CMS hoặc API riêng.</p>
          </section>
        </section>

        <aside class="cms-preview">
          <div class="preview-topbar">Xem trước — <b>{{ previewLabel }}</b></div>
          <div class="preview-body">
            <div class="preview-pane active">
              <HomepagePreview :settings="settings" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/store/auth.store';
import HomepagePreview from '@/components/cms/HomepagePreview.vue';

const authStore = useAuthStore();
const route = useRoute();
const isLoading = ref(true);
const isSaving = ref(false);
const activeSection = ref('hero');
const previewLabelMap: Record<string, string> = {
  hero: 'Hero Banner',
  gender: 'Danh mục Nam / Nữ',
  newArrivals: 'Sản phẩm mới',
  bestSeller: 'Best Seller',
  bannerBreak: 'Banner giữa trang',
  reviews: 'Đánh giá khách hàng',
  about: 'Giới thiệu',
  stats: 'Thống kê'
};
const previewLabel = computed(() => previewLabelMap[activeSection.value] || 'Hero Banner');

const settings = ref({
  hero: {
    title: 'BÙNG<br>DÁNG<br>PHỐ.',
    subtitle: 'Streetwear cắt may chuẩn form, chất liệu dày dặn. Mặc đi đâu cũng nổi — không cần cố.',
    carouselCount: 3,
    carouselImages: [
      '/src/assets/banner/banner.avif',
      '/src/assets/banner/banner1.avif',
      '/src/assets/banner/banner2.avif'
    ],
    primaryBtnText: 'Mua ngay',
    primaryBtnLink: '#new',
    secondaryBtnText: 'Xem bộ sưu tập →',
    secondaryBtnLink: '#cat'
  },
  products: {
    displayCount: 8,
    layout: 4,
    demoImages: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400',
      'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400'
    ]
  },
  gender: {
    men: {
      title: 'Thời trang Nam',
      img: '/src/assets/product/men-clothes.webp'
    },
    women: {
      title: 'Thời trang Nữ',
      img: '/src/assets/product/women-clothes.jpg'
    },
    btnLabel: 'Mua ngay'
  },
  bannerBreak: {
    heading: 'Khám phá bản sắc riêng',
    text: 'Rya\'s Store mang đến những thiết kế thời trang táo bạo, giúp bạn tự tin thể hiện cá tính trong mọi khoảnh khắc.',
    btnLabel: 'Xem bộ sưu tập',
    bgImage: '/src/assets/banner/banner-break.avif'
  }
});

const demoImagesString = ref(settings.value.products.demoImages.join(', '));

watch(demoImagesString, (val) => {
  settings.value.products.demoImages = val.split(',').map(s => s.trim()).filter(s => s);
});

const updateCarouselCount = () => {
  const count = settings.value.hero.carouselCount;
  const currentImages = settings.value.hero.carouselImages;
  if (count > currentImages.length) {
    for (let i = currentImages.length; i < count; i++) {
      currentImages.push('');
    }
  } else if (count < currentImages.length) {
    settings.value.hero.carouselImages = currentImages.slice(0, count);
  }
};

const setSection = (section: string) => {
  activeSection.value = section;
  const element = document.getElementById(section);
  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  document.getElementById('preview-' + section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const fetchSettings = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/settings/homepage');
    if (res.data && res.data.data) {
       if (res.data.data.hero) settings.value.hero = { ...settings.value.hero, ...res.data.data.hero };
       if (res.data.data.products) settings.value.products = { ...settings.value.products, ...res.data.data.products };
       demoImagesString.value = settings.value.products.demoImages?.join(', ') || '';
    }
  } catch (error) {
    console.error('Failed to load settings', error);
  } finally {
    isLoading.value = false;
  }
};

const saveSettings = async () => {
  isSaving.value = true;
  try {
    await axios.put(
      'http://localhost:3000/api/admin/settings/homepage',
      { value: settings.value },
      { headers: { Authorization: `Bearer ${authStore.user?.accessToken}` } }
    );
    alert('Đã lưu cấu hình thành công!');
  } catch (error) {
    console.error('Failed to save settings', error);
    alert('Lưu cấu hình thất bại. Vui lòng kiểm tra lại quyền.');
  } finally {
    isSaving.value = false;
  }
};

onMounted(() => {
  fetchSettings();
  const initialSection = String(route.query.section || 'hero');
  activeSection.value = initialSection;
  window.setTimeout(() => setSection(initialSection), 200);
});
</script>

<style scoped>
.cms-page {
  height: 100%;
  min-height: 0;
  background: linear-gradient(180deg, #f7f5f3 0%, #ffffff 100%);
  overflow: hidden;
}

.cms-shell {
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  min-height: 0;
  gap: 14px;
}

.cms-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  flex-shrink: 0;
  background: #fff;
  border: 1px solid #ececec;
  border-radius: 16px;
  padding: 14px 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.035);
}

.eyebrow {
  font-size: 11px;
  letter-spacing: 0.1em;
  font-weight: 800;
  text-transform: uppercase;
  color: #7A0E16;
  margin-bottom: 6px;
}

.cms-header h1 {
  margin: 0;
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(26px, 2.6vw, 36px);
  line-height: 0.95;
  letter-spacing: 0.02em;
  color: #111;
}

.cms-header p {
  margin-top: 4px;
  color: #666;
  max-width: 64ch;
  font-size: 13px;
  line-height: 1.55;
}

.btn-save {
  background: #7A0E16;
  color: #fff;
  padding: 9px 16px;
  border-radius: 999px;
  border: none;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;
  margin-top: 2px;
}

.btn-save:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.cms-preview {
  flex: 1;
  min-width: 0;
  background: #fff;
  border-radius: 20px;
  border: 1px solid #ececec;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 8px 28px rgba(0,0,0,0.05);
}

.preview-topbar {
  height: 44px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 0 24px;
  font-size: 12.5px;
  color: #8a8a8a;
  background: #fafafa;
  border-bottom: 1px solid #ececec;
}

.preview-topbar b {
  color: #1a1a1a;
  margin-left: 5px;
}

.preview-body {
  flex: 1;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  padding: 32px 24px;
  background: #fafafa;
}

.preview-pane {
  width: 100%;
  max-width: 720px;
}

.mock-home-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.preview-block {
  width: 100%;
}

.cms-grid {
  display: grid;
  grid-template-columns: 220px 360px minmax(0, 1fr);
  gap: 18px;
  min-height: 0;
  flex: 1;
  overflow: hidden;
}

.cms-index {
  background: #fff;
  border: 1px solid #ececec;
  border-radius: 20px;
  padding: 18px;
  height: fit-content;
  position: sticky;
  top: 18px;
}

.index-title {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #666;
  margin-bottom: 12px;
}

.index-item {
  width: 100%;
  text-align: left;
  border: 0;
  background: transparent;
  padding: 10px 12px;
  border-radius: 12px;
  font-size: 13px;
  color: #444;
  cursor: pointer;
}

.index-item.active,
.index-item:hover {
  background: rgba(122, 14, 22, 0.08);
  color: #7A0E16;
}

.cms-editor {
  display: grid;
  gap: 16px;
  overflow-y: auto;
  padding-right: 6px;
  min-width: 0;
  max-width: 360px;
  scrollbar-gutter: stable;
}

.cms-card {
  background: #fff;
  border: 1px solid #ececec;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 8px 28px rgba(0,0,0,0.04);
}

.card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
}

.card-ordinal {
  font-size: 12px;
  font-weight: 800;
  color: #7A0E16;
  letter-spacing: 0.08em;
  margin-bottom: 6px;
}

.card-head h2 {
  margin: 0;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 32px;
  line-height: 0.95;
  letter-spacing: 0.02em;
  color: #111;
}

.card-tag {
  padding: 8px 12px;
  border-radius: 999px;
  background: #f4f4f4;
  font-size: 12px;
  font-weight: 700;
  color: #555;
}

.mini-note p {
  color: #666;
  line-height: 1.7;
}

.card h4 {
  margin: 0 0 20px;
  color: #333;
  font-size: 18px;
  border-bottom: 1px solid #eee;
  padding-bottom: 12px;
}

.form-group {
  margin-bottom: 16px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #555;
  margin-bottom: 6px;
}

input[type="text"], input[type="number"], textarea, select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 12px;
  font-family: inherit;
  font-size: 14px;
}

.carousel-input {
  margin-bottom: 8px;
}

.loading-panel {
  padding: 28px;
  background: #fff;
  border: 1px solid #ececec;
  border-radius: 20px;
}

.cms-editor::-webkit-scrollbar,
.cms-preview .preview-body::-webkit-scrollbar,
.cms-index::-webkit-scrollbar {
  width: 8px;
}

.cms-editor::-webkit-scrollbar-thumb,
.cms-preview .preview-body::-webkit-scrollbar-thumb,
.cms-index::-webkit-scrollbar-thumb {
  background: rgba(122, 14, 22, 0.22);
  border-radius: 999px;
}

@media (max-width: 1280px) {
  .cms-grid {
    grid-template-columns: 220px minmax(0, 360px);
  }

  .cms-preview {
    grid-column: 1 / -1;
  }

  .cms-editor {
    max-width: none;
  }
}

@media (max-width: 960px) {
  .cms-grid {
    grid-template-columns: 1fr;
  }

  .cms-index {
    position: static;
  }
}
</style>

  <style scoped>
  .mock-frame {
    background: #fff;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 2px 24px rgba(0, 0, 0, 0.06);
  }

  .mock-hero {
    position: relative;
    height: 340px;
    background-size: cover;
    background-position: center;
    overflow: hidden;
  }

  .mock-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
  }

  .mock-hero-content {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 28px 32px;
  }

  .mock-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.06em;
    padding: 5px 12px;
    border-radius: 999px;
    margin-bottom: 14px;
    width: fit-content;
  }

  .mock-eyebrow::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #fff;
  }

  .mock-hero-title {
    font-size: 34px;
    font-weight: 800;
    color: #fff;
    line-height: 0.98;
    margin-bottom: 12px;
  }

  .mock-hero-sub {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.9);
    max-width: 220px;
    line-height: 1.6;
    margin-bottom: 16px;
  }

  .mock-hero-cta {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .mock-btn {
    font-size: 11.5px;
    font-weight: 700;
    padding: 10px 18px;
    border-radius: 999px;
  }

  .mock-btn-primary {
    background: #7A0E16;
    color: #fff;
  }

  .mock-btn-ghost {
    background: transparent;
    color: #fff;
    padding: 10px 4px;
  }

  .mock-marquee {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: #7A0E16;
    color: #fff;
    font-size: 11px;
    letter-spacing: 0.05em;
    padding: 8px 16px;
    white-space: nowrap;
    overflow: hidden;
    z-index: 2;
  }

  .mock-sec-head {
    padding: 20px 4px 14px;
  }

  .mock-sec-eyebrow {
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: #000;
    text-transform: uppercase;
    margin-bottom: 5px;
  }

  .mock-sec-title {
    font-size: 22px;
    font-weight: 800;
    color: #000;
  }

  .mock-gender-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    padding: 0 4px 20px;
  }

  .mock-gender-card {
    position: relative;
    height: 180px;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    align-items: flex-end;
    padding: 16px;
  }

  .mock-gender-card img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
  }

  .mock-gender-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 2;
  }

  .mock-gender-card .c {
    position: relative;
    z-index: 3;
  }

  .mock-gender-card h3 {
    font-size: 17px;
    font-weight: 800;
    color: #fff;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .mock-gender-btn {
    display: inline-block;
    background: #fff;
    color: #000;
    font-size: 10.5px;
    font-weight: 700;
    text-transform: uppercase;
    padding: 7px 14px;
  }

  .mock-prod-row {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    padding: 0 4px 20px;
  }

  .mock-prod-card {
    width: 120px;
    flex-shrink: 0;
    background: #fff;
    border-radius: 14px;
    padding: 8px;
    box-shadow: 0 2px 10px rgba(122, 14, 22, 0.06);
  }

  .mock-prod-img {
    position: relative;
    aspect-ratio: 1/1;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 8px;
  }

  .mock-prod-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .mock-prod-badge {
    position: absolute;
    top: 6px;
    left: 6px;
    background: #fff;
    color: #7A0E16;
    font-size: 8.5px;
    font-weight: 700;
    padding: 3px 7px;
    border-radius: 999px;
  }

  .mock-prod-badge.sale {
    background: #7A0E16;
    color: #fff;
  }

  .mock-prod-cat {
    font-size: 8.5px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #000;
    margin-bottom: 2px;
  }

  .mock-prod-name {
    font-size: 11px;
    font-weight: 600;
    color: #000;
    margin-bottom: 5px;
    line-height: 1.25;
  }

  .mock-prod-price {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-wrap: wrap;
  }

  .mock-prod-price .now {
    font-size: 11px;
    font-weight: 700;
    color: #111;
  }

  .mock-prod-price .old {
    font-size: 9.5px;
    color: #999;
    text-decoration: line-through;
  }

  .mock-prod-price .disc {
    font-size: 8.5px;
    font-weight: 700;
    color: #fff;
    background: #e74c3c;
    padding: 1px 4px;
    border-radius: 3px;
  }

  .mock-banner {
    position: relative;
    height: 180px;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: flex-end;
    margin: 0 4px 20px;
    border-radius: 12px;
    overflow: hidden;
  }

  .mock-banner::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
  }

  .mock-banner-content {
    position: relative;
    z-index: 2;
    padding: 22px;
    color: #fff;
  }

  .mock-banner-content h2 {
    font-size: 22px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    margin-bottom: 8px;
  }

  .mock-banner-content p {
    font-size: 11px;
    line-height: 1.5;
    opacity: 0.95;
    margin-bottom: 14px;
    max-width: 260px;
  }

  .mock-btn-light {
    display: inline-block;
    background: #fff;
    color: #000;
    text-transform: uppercase;
    font-size: 11px;
    font-weight: 700;
    padding: 9px 18px;
  }

  .mock-review-grid {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0 4px 20px;
  }

  .mock-review-card {
    background: linear-gradient(160deg, #fff, rgba(122, 14, 22, 0.04));
    border-radius: 14px;
    padding: 16px;
    box-shadow: 0 2px 12px rgba(122, 14, 22, 0.06);
  }

  .mock-review-stars {
    font-size: 11px;
    color: #7A0E16;
    letter-spacing: 2px;
    margin-bottom: 8px;
  }

  .mock-review-text {
    font-size: 12px;
    line-height: 1.6;
    color: #000;
    margin-bottom: 12px;
  }

  .mock-review-author {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .mock-review-avatar {
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

  .mock-review-name {
    font-size: 12px;
    font-weight: 700;
    color: #000;
  }

  .mock-review-role {
    font-size: 10.5px;
    color: #000;
  }

  .mock-about {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 200px;
    margin: 0 4px 20px;
    border-radius: 10px;
    overflow: hidden;
  }

  .mock-about-img {
    position: relative;
  }

  .mock-about-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .mock-about-text {
    background: #7A0E16;
    color: #fff;
    padding: 22px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .mock-about-text h2 {
    font-size: 18px;
    margin-bottom: 8px;
  }

  .mock-about-text p {
    font-size: 11px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.88);
  }

  .mock-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    text-align: center;
    padding: 0 4px 20px;
  }

  .mock-stat-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 26px;
    color: #000;
  }

  .mock-stat-lbl {
    font-size: 10px;
    color: #000;
    margin-top: 2px;
  }
  </style>

<!-- Import các class từ home.css và cô lập bằng 'scoped' để giao diện admin không bị ảnh hưởng -->
<style scoped src="../../home/home.css"></style>
