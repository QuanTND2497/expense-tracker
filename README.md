## ChatGPT AI Assistant

Ứng dụng này tích hợp với ChatGPT API để cung cấp các tính năng thông minh:

1. **Trợ lý AI tương tác**: Trò chuyện với AI để nhận trợ giúp về quản lý tài
   chính
2. **Phân tích chi tiêu**: AI phân tích chi tiêu và đưa ra gợi ý tiết kiệm
3. **Quét hóa đơn**: Chụp ảnh hóa đơn và tự động trích xuất thông tin

### Cài đặt thư viện

Để sử dụng tính năng AI, bạn cần cài đặt các thư viện sau:

```bash
# Frontend
npm install animejs framer-motion @headlessui/react

# Backend
npm install openai
```

### Cấu hình OpenAI API

Thêm khóa API của OpenAI vào file `.env`:

```
OPENAI_API_KEY=your_openai_api_key
```

### Backend API Endpoints

API endpoints cho ChatGPT được triển khai ở phía backend:

-   `POST /api/ai/chat`: Gửi câu hỏi đến ChatGPT và nhận phản hồi
-   `POST /api/ai/analyze`: Phân tích chi tiêu và đưa ra gợi ý tiết kiệm
-   `POST /api/ai/receipt`: Xử lý hình ảnh hóa đơn và trích xuất thông tin
