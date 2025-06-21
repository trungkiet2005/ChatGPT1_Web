# GPT1 - Ứng dụng Chat Làm Thơ

## 📖 Giới thiệu

GPT1 là một ứng dụng web chat được xây dựng bằng React, chuyên về tạo thơ từ những từ khóa người dùng cung cấp. Ứng dụng có giao diện thân thiện với người dùng, hỗ trợ chế độ tối và lưu trữ lịch sử chat.

## ✨ Tính năng

- 🎭 Tạo thơ từ từ khóa người dùng nhập
- 💬 Giao diện chat trực quan và dễ sử dụng  
- 🌙 Chế độ tối/sáng
- 📚 Lưu trữ và quản lý lịch sử chat
- 📱 Thiết kế responsive, hoạt động tốt trên mọi thiết bị
- ⚡ Sidebar có thể thu gọn để tiết kiệm không gian

## 🔧 Công nghệ sử dụng

- **Frontend**: React 18.2.0
- **Styling**: CSS3 với CSS Variables
- **Build Tool**: React Scripts
- **Package Manager**: npm

## 📋 Yêu cầu hệ thống

- Node.js (phiên bản 14.0 trở lên)
- npm (đi kèm với Node.js)
- Trình duyệt web hiện đại (Chrome, Firefox, Safari, Edge)

## 🚀 Hướng dẫn cài đặt và chạy

### 1. Tải mã nguồn

```bash
# Clone repository về máy
git clone <repository-url>
cd Chat-GPT1-Web
```

### 2. Cài đặt dependencies

```bash
# Cài đặt các package cần thiết
npm install
```

### 3. Chạy ứng dụng

#### Chế độ phát triển (Development)
```bash
# Khởi chạy server development
npm start
```

Ứng dụng sẽ mở tại: `http://localhost:3000`

#### Build cho production
```bash
# Tạo build cho production
npm run build
```

Build sẽ được tạo trong thư mục `build/`

#### Chạy tests
```bash
# Chạy test suite
npm test
```

## 📁 Cấu trúc dự án

```
Chat-GPT1-Web/
├── public/                 # File tĩnh
│   └── index.html         # HTML template chính
├── src/                   # Mã nguồn ứng dụng
│   ├── components/        # Các React components
│   │   ├── ChatBox.js     # Component chat chính
│   │   ├── ChatBox.css    # Styles cho ChatBox
│   │   ├── Message.js     # Component tin nhắn
│   │   ├── Message.css    # Styles cho Message
│   │   ├── Sidebar.js     # Component sidebar
│   │   └── Sidebar.css    # Styles cho Sidebar
│   ├── App.js             # Component chính
│   ├── App.css            # Styles chính
│   └── index.js           # Entry point
├── package.json           # Dependencies và scripts
├── vercel.json           # Cấu hình deploy Vercel
└── README.md             # File hướng dẫn này
```

## 🎯 Cách sử dụng

1. **Khởi động ứng dụng**: Chạy `npm start` để bắt đầu
2. **Tạo thơ**: Nhập từ khóa vào ô chat và nhấn Enter
3. **Tạo chat mới**: Click nút "Tạo chat mới" ở góc trên phải
4. **Xem lịch sử**: Click vào biểu tượng menu để mở sidebar và xem các chat đã lưu
5. **Chuyển chế độ**: Click biểu tượng mặt trời/mặt trăng để chuyển đổi chế độ sáng/tối

## 🌐 Deploy

### Deploy lên Vercel
```bash
# Deploy lên Vercel (nếu đã cài Vercel CLI)
vercel --prod
```

### Deploy lên Netlify
```bash
# Build project
npm run build

# Upload thư mục build/ lên Netlify
```

## 🛠️ Scripts có sẵn

| Script | Mô tả |
|--------|-------|
| `npm start` | Chạy app ở chế độ development |
| `npm run build` | Build app cho production |
| `npm run vercel-build` | Build cho Vercel deployment |
| `npm test` | Chạy test suite |
| `npm run eject` | Eject khỏi Create React App (không thể hoàn tác) |

## 🔧 Tùy chỉnh

- **Thay đổi giao diện**: Chỉnh sửa các file CSS trong thư mục `src/components/`
- **Thêm tính năng**: Tạo component mới trong `src/components/`
- **Thay đổi API**: Chỉnh sửa logic trong các component

## 📞 Hỗ trợ

Nếu gặp vấn đề khi chạy ứng dụng:

1. Đảm bảo đã cài đặt đúng phiên bản Node.js
2. Xóa `node_modules` và chạy lại `npm install`
3. Kiểm tra console browser để xem lỗi chi tiết
4. Đảm bảo port 3000 không bị chiếm dụng

## 📄 License

Dự án này được phát hành dưới giấy phép MIT.

---

**Chúc bạn coding vui vẻ! 🎉**