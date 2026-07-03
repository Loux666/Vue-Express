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
          <label>Phụ đề</label>
          <input type="text" v-model="settings.hero.subtitle" placeholder="Streetwear cắt may chuẩn form..." />
        </div>
        <div class="form-group">
          <label>Ảnh nền (URL)</label>
          <input type="text" v-model="settings.hero.imageUrl" placeholder="Nhập URL ảnh đã upload..." />
          <small class="hint">Upload ảnh tại form phía dưới và dán URL vào đây.</small>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Link Nút Chính</label>
            <input type="text" v-model="settings.hero.primaryLink" placeholder="#new" />
          </div>
          <div class="form-group">
            <label>Link Nút Phụ</label>
            <input type="text" v-model="settings.hero.secondaryLink" placeholder="#cat" />
          </div>
        </div>
      </section>

      <!-- 2. Promo Cards (4 Cards) -->
      <section class="card">
        <h4>2. Promo Split (4 Thẻ)</h4>
        <div class="promo-grid">
          <div v-for="(card, index) in settings.promoCards" :key="index" class="promo-item">
            <h5>Thẻ {{ index + 1 }}</h5>
            <div class="form-group">
              <label>Tag (Badge)</label>
              <input type="text" v-model="card.tag" placeholder="VD: Mới về" />
            </div>
            <div class="form-group">
              <label>Tiêu đề</label>
              <input type="text" v-model="card.title" placeholder="VD: Urban Layer" />
            </div>
            <div class="form-group">
              <label>Mô tả</label>
              <input type="text" v-model="card.description" />
            </div>
            <div class="form-group">
              <label>Ảnh (URL)</label>
              <input type="text" v-model="card.imageUrl" />
            </div>
          </div>
        </div>
      </section>

      <!-- Upload Helper -->
      <section class="card upload-section">
        <h4>Công cụ Upload Ảnh Nhanh (Backend)</h4>
        <div class="upload-wrapper">
          <input type="file" @change="handleFileUpload" accept="image/*" />
          <button @click="uploadImage" class="btn-upload" :disabled="!selectedFile || isUploading">
            {{ isUploading ? 'Đang tải lên...' : 'Tải lên & Lấy URL' }}
          </button>
        </div>
        <div v-if="uploadedUrl" class="uploaded-result">
          <p>URL Ảnh:</p>
          <input type="text" :value="uploadedUrl" readonly @click="($event.target as HTMLInputElement).select()" />
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
    imageUrl: '',
    primaryLink: '',
    secondaryLink: ''
  },
  promoCards: [
    { tag: '', title: '', description: '', imageUrl: '' },
    { tag: '', title: '', description: '', imageUrl: '' },
    { tag: '', title: '', description: '', imageUrl: '' },
    { tag: '', title: '', description: '', imageUrl: '' }
  ]
});

// Upload helper state
const selectedFile = ref<File | null>(null);
const isUploading = ref(false);
const uploadedUrl = ref('');

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

const handleFileUpload = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0] || null;
  }
};

const uploadImage = async () => {
  if (!selectedFile.value) return;
  isUploading.value = true;
  const formData = new FormData();
  formData.append('files', selectedFile.value as any);

  try {
    const res = await axios.post('http://localhost:3000/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authStore.user?.accessToken}`
      }
    });
    // Giả sử backend trả về data.urls (mảng) hoặc tương tự
    if (res.data && res.data.urls && res.data.urls.length > 0) {
      uploadedUrl.value = res.data.urls[0];
    } else {
      alert('Upload thành công nhưng không tìm thấy URL trả về.');
    }
  } catch (error) {
    console.error('Upload failed', error);
    alert('Lỗi khi tải ảnh lên.');
  } finally {
    isUploading.value = false;
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

.upload-section {
  background: #fcf8f8;
}

.upload-wrapper {
  display: flex;
  gap: 16px;
  align-items: center;
}

.btn-upload {
  background: #333;
  color: #fff;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.btn-upload:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.uploaded-result {
  margin-top: 16px;
}

.uploaded-result input {
  background: #fff;
}
</style>
