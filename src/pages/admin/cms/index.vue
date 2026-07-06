<template>
  <div class="cms-settings">
    <div class="header">
      <h3>Cấu hình Trang chủ</h3>
      <button @click="saveSettings" class="btn-save" :disabled="isSaving">
        {{ isSaving ? 'Đang lưu...' : 'Lưu thay đổi' }}
      </button>
    </div>

    <div v-if="isLoading" class="loading">Đang tải dữ liệu...</div>

    <div v-else class="settings-form">
      <!-- 1. Hero Banner Section -->
      <section class="card">
        <h4>1. Banner Chính (Hero)</h4>
        <div class="form-group">
          <label>Tiêu đề (HTML cho phép xuống dòng)</label>
          <textarea v-model="settings.hero.title" rows="3" placeholder="BÙNG<br>DÁNG<br>PHỐ."></textarea>
        </div>
        <div class="form-group">
          <label>Phụ đề (Mô tả)</label>
          <textarea v-model="settings.hero.subtitle" rows="2" placeholder="Tự do bứt phá với bộ sưu tập..."></textarea>
        </div>
        <div class="form-group">
          <label>Dòng chữ chạy (Marquee)</label>
          <input type="text" v-model="settings.hero.marqueeText" placeholder="SIÊU SALE RA MẮT - GIẢM ĐẾN 50%..." />
        </div>
        <div class="form-group">
          <label>Ảnh nền</label>
          <div class="image-uploader">
            <img v-if="settings.hero.imageUrl" :src="settings.hero.imageUrl" class="preview-img" />
            <div class="upload-controls">
              <input type="file" @change="uploadDirectImage($event, 'hero')" accept="image/*" />
              <span v-if="uploadingState.hero" class="uploading-text">Đang tải ảnh...</span>
            </div>
            <input type="text" v-model="settings.hero.imageUrl" placeholder="Hoặc dán URL ảnh trực tiếp vào đây..." class="url-fallback" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Nội dung Nút Chính</label>
            <input type="text" v-model="settings.hero.primaryBtnText" placeholder="KHOÁC LÊN MÌNH, TỰ TIN TỎA SÁNG" />
          </div>
          <div class="form-group">
            <label>Link Nút Chính</label>
            <input type="text" v-model="settings.hero.primaryBtnLink" placeholder="#new" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Nội dung Nút Phụ</label>
            <input type="text" v-model="settings.hero.secondaryBtnText" placeholder="TÌM HIỂU THÊM" />
          </div>
          <div class="form-group">
            <label>Link Nút Phụ</label>
            <input type="text" v-model="settings.hero.secondaryBtnLink" placeholder="#cat" />
          </div>
        </div>
      </section>

      <!-- 2. Lookbook Section -->
      <section class="card">
        <h4>2. Lookbook (Sportswear)</h4>
        <div class="form-group">
          <label>Eyebrow (Chữ nhỏ phía trên)</label>
          <input type="text" v-model="settings.lookbook.eyebrow" placeholder="Rya's Sport" />
        </div>
        <div class="form-group">
          <label>Tiêu đề</label>
          <input type="text" v-model="settings.lookbook.title" placeholder="ĐỘT PHÁ MỌI GIỚI HẠN" />
        </div>
        <div class="form-group">
          <label>Mô tả</label>
          <textarea v-model="settings.lookbook.description" rows="3" placeholder="Chất liệu thun lạnh cao cấp..."></textarea>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Nội dung Nút</label>
            <input type="text" v-model="settings.lookbook.btnText" placeholder="KHÁM PHÁ NGAY" />
          </div>
          <div class="form-group">
            <label>Link Nút</label>
            <input type="text" v-model="settings.lookbook.btnLink" placeholder="#" />
          </div>
        </div>
        <div class="form-group">
          <label>Ảnh Lookbook (Hiệu ứng Parallax)</label>
          <div class="image-uploader">
            <img v-if="settings.lookbook.imageUrl" :src="settings.lookbook.imageUrl" class="preview-img" />
            <div class="upload-controls">
              <input type="file" @change="uploadDirectImage($event, 'lookbook')" accept="image/*" />
              <span v-if="uploadingState.lookbook" class="uploading-text">Đang tải ảnh...</span>
            </div>
            <input type="text" v-model="settings.lookbook.imageUrl" placeholder="Hoặc dán URL ảnh trực tiếp..." class="url-fallback" />
          </div>
        </div>
      </section>

      <!-- 3. Banner Break Section -->
      <section class="card">
        <h4>3. Banner Break</h4>
        <div class="form-group">
          <label>Tiêu đề</label>
          <input type="text" v-model="settings.bannerBreak.title" placeholder="Khám phá bản sắc riêng" />
        </div>
        <div class="form-group">
          <label>Mô tả</label>
          <textarea v-model="settings.bannerBreak.description" rows="2" placeholder="Rya's Store mang đến những thiết kế..."></textarea>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Nội dung Nút</label>
            <input type="text" v-model="settings.bannerBreak.btnText" placeholder="XEM TẤT CẢ SẢN PHẨM" />
          </div>
          <div class="form-group">
            <label>Link Nút</label>
            <input type="text" v-model="settings.bannerBreak.btnLink" placeholder="/products" />
          </div>
        </div>
        <div class="form-group">
          <label>Ảnh nền</label>
          <div class="image-uploader">
            <img v-if="settings.bannerBreak.imageUrl" :src="settings.bannerBreak.imageUrl" class="preview-img" />
            <div class="upload-controls">
              <input type="file" @change="uploadDirectImage($event, 'bannerBreak')" accept="image/*" />
              <span v-if="uploadingState.bannerBreak" class="uploading-text">Đang tải ảnh...</span>
            </div>
            <input type="text" v-model="settings.bannerBreak.imageUrl" placeholder="Hoặc dán URL ảnh trực tiếp..." class="url-fallback" />
          </div>
        </div>
      </section>



    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/store/auth.store';

const authStore = useAuthStore();
const isLoading = ref(true);
const isSaving = ref(false);

const settings = ref({
  hero: {
    title: '',
    subtitle: '',
    marqueeText: '',
    imageUrl: '',
    primaryBtnText: '',
    primaryBtnLink: '',
    secondaryBtnText: '',
    secondaryBtnLink: ''
  },
  lookbook: {
    eyebrow: '',
    title: '',
    description: '',
    btnText: '',
    btnLink: '',
    imageUrl: ''
  },
  bannerBreak: {
    title: '',
    description: '',
    btnText: '',
    btnLink: '',
    imageUrl: ''
  }
});

// Upload helper state
const uploadingState = ref({
  hero: false,
  lookbook: false,
  bannerBreak: false
});

const fetchSettings = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/settings/homepage');
    if (res.data && res.data.data) {
       // Merge backend settings with default schema
       settings.value = { ...settings.value, ...res.data.data };
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

const uploadDirectImage = async (e: Event, section: 'hero' | 'lookbook' | 'bannerBreak') => {
  const target = e.target as HTMLInputElement;
  if (!target.files || target.files.length === 0) return;
  const file = target.files[0];
  if (!file) return;
  
  uploadingState.value[section] = true;
  const formData = new FormData();
  formData.append('files', file);

  try {
    const res = await axios.post('http://localhost:3000/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authStore.user?.accessToken}`
      }
    });
    // Giả sử backend trả về data.urls (mảng) hoặc tương tự
    if (res.data && res.data.urls && res.data.urls.length > 0) {
      settings.value[section].imageUrl = res.data.urls[0];
    } else {
      alert('Upload thành công nhưng không tìm thấy URL trả về.');
    }
  } catch (error) {
    console.error('Upload failed', error);
    alert('Lỗi khi tải ảnh lên.');
  } finally {
    uploadingState.value[section] = false;
    target.value = ''; // Reset input
  }
};

onMounted(() => {
  fetchSettings();
});
</script>

<style scoped>
.cms-settings {
  max-width: 1000px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.header h3 {
  margin: 0;
  font-size: 24px;
  color: #111;
}

.btn-save {
  background: #7A0E16;
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
}

.btn-save:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.03);
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

input[type="text"], textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-family: inherit;
  font-size: 14px;
}

.hint {
  display: block;
  font-size: 12px;
  color: #888;
  margin-top: 4px;
}

.promo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.promo-item {
  background: #fafafa;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #eee;
}

.promo-item h5 {
  margin: 0 0 12px;
  color: #7A0E16;
}

.image-uploader {
  border: 1px dashed #ccc;
  padding: 16px;
  border-radius: 8px;
  background: #f9f9f9;
}

.preview-img {
  max-width: 100%;
  max-height: 200px;
  border-radius: 6px;
  margin-bottom: 12px;
  object-fit: cover;
}

.upload-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.uploading-text {
  font-size: 13px;
  color: #7A0E16;
  font-weight: 600;
}

.url-fallback {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 13px;
  background: #fff;
}
</style>
