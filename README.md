# 🛍️ Rya's Store - E-Commerce Web (Frontend)

Đây là ứng dụng Frontend (SPA) của hệ thống thương mại điện tử Rya's Store, phục vụ cả giao diện cho Khách hàng (Customer) và Quản trị viên (Admin).

## 🚀 Công nghệ sử dụng
- **Core:** Vue 3 (Composition API) + Vite
- **Ngôn ngữ:** TypeScript
- **State Management:** Pinia
- **Routing:** Vue Router
- **HTTP Client:** Axios (Tích hợp interceptors để gắn JWT Token tự động)
- **Styling:** Vanilla CSS (Xây dựng Design System riêng, tối ưu hiệu năng, không phụ thuộc UI framework nặng)

## 📌 Chức năng chính
- **Màn hình Khách hàng (Customer):**
  - Trang chủ động (Load dữ liệu từ API CMS - Banners, Hàng mới về, Promo cards).
  - Đăng nhập / Đăng ký tài khoản.
  - Xác thực Email bằng mã OTP.
  - Danh mục sản phẩm, xem chi tiết, giỏ hàng (sắp ra mắt).
- **Màn hình Quản trị (Admin):**
  - CMS Dashboard: Cấu hình giao diện trang chủ động (Kéo thả, đổi ảnh, thay đổi nội dung trang chủ tức thì).
  - Phân quyền (Role-based access control) bằng Vue Router `beforeEach`.
  - Công cụ upload ảnh nhanh lấy URL nội bộ.

## 🛠️ Hướng dẫn cài đặt & Khởi chạy

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Cấu hình biến môi trường
Tạo file `.env` nếu cần thiết (thường để lưu `VITE_API_URL` trỏ về Backend).
Ví dụ:
```
VITE_API_URL=http://localhost:3000/api
```

### 3. Chạy môi trường Dev
```bash
npm run dev
```
Ứng dụng sẽ chạy tại `http://localhost:5173`. Tốc độ khởi động siêu nhanh nhờ Vite.

### 4. Build môi trường Production
```bash
npm run build
```
File tĩnh sẽ được build ra thư mục `dist/`, sẵn sàng để deploy lên Nginx, Vercel, hoặc Netlify.
