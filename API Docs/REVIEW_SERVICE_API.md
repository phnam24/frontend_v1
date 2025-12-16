# ⭐ Review & Rating API Guide - Product Reviews Management

## 📋 Overview

Review & Rating API cho phép users đánh giá và nhận xét về sản phẩm với các quy tắc:
- **User đã mua sản phẩm**: Có thể đánh giá (rating 1-5 sao) + viết nhận xét
- **User chưa mua sản phẩm**: Chỉ có thể viết nhận xét (không có rating)
- Mỗi user chỉ có thể đánh giá/nhận xét một lần cho mỗi sản phẩm

**🔐 Authentication:** 
- `POST /api/v1/product/reviews` - Yêu cầu JWT token (authenticated users)
- `GET /api/v1/product/reviews/**` - Public (không cần authentication)

**🌐 Gateway URL:** `http://localhost:8888`  
**📡 Direct Service URL:** `http://localhost:8083`

---

## 🎯 API Endpoints

### 1. Tạo Review/Comment cho Sản Phẩm

```bash
POST /api/v1/product/reviews
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body:**

**Trường hợp 1: User đã mua sản phẩm (có thể đánh giá + comment)**
```json
{
  "productId": 1,
  "rating": 5,
  "comment": "Sản phẩm rất tốt, chất lượng cao, giao hàng nhanh!"
}
```

**Trường hợp 2: User chưa mua (chỉ có thể comment)**
```json
{
  "productId": 1,
  "comment": "Sản phẩm này trông đẹp, tôi đang cân nhắc mua!"
}
```

**Request Fields:**
- `productId` (required): ID của sản phẩm cần đánh giá
- `rating` (optional): Đánh giá từ 1-5 sao (chỉ có thể set nếu user đã mua sản phẩm)
- `comment` (optional): Nhận xét về sản phẩm (có thể có hoặc không)

**Response:**
```json
{
  "code": 1000,
  "message": "Review created successfully",
  "result": {
    "id": 1,
    "productId": 1,
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "rating": 5,
    "comment": "Sản phẩm rất tốt, chất lượng cao, giao hàng nhanh!",
    "createdAt": "2024-11-10T10:00:00",
    "updatedAt": "2024-11-10T10:00:00"
  }
}
```

**Business Logic:**
1. Hệ thống tự động kiểm tra user đã mua sản phẩm chưa (có order COMPLETED với productId này)
2. Nếu đã mua:
   - Cho phép set `rating` (1-5) + `comment`
   - Nếu không có `rating` nhưng có `comment` → Chỉ lưu comment
3. Nếu chưa mua:
   - Chỉ cho phép `comment` (không có rating)
   - Nếu có `rating` trong request → Trả về lỗi `REVIEW_RATING_NOT_ALLOWED`
4. Mỗi user chỉ có thể review một lần cho mỗi sản phẩm
5. Phải có ít nhất `rating` hoặc `comment`

**Error Responses:**

```json
// User chưa mua nhưng cố gắng đánh giá
{
  "code": 2010,
  "message": "Bạn chưa mua sản phẩm này nên không thể đánh giá. Bạn chỉ có thể để lại nhận xét."
}

// Đã review rồi
{
  "code": 2013,
  "message": "Bạn đã đánh giá hoặc nhận xét sản phẩm này rồi. Bạn chỉ có thể đánh giá một lần cho mỗi sản phẩm."
}

// Rating không hợp lệ
{
  "code": 2012,
  "message": "Đánh giá không hợp lệ. Đánh giá phải từ 1 đến 5 sao."
}

// Thiếu cả rating và comment
{
  "code": 2011,
  "message": "Bạn phải cung cấp ít nhất đánh giá (rating) hoặc nhận xét (comment)."
}
```

---

### 2. Lấy Tất Cả Reviews/Comments của Sản Phẩm (Có Phân Trang)

```bash
GET /api/v1/product/reviews/product/{productId}?page=1&limit=20
```

**Query Parameters:**
- `page` (optional): Số trang (mặc định: 1)
- `limit` (optional): Số lượng reviews mỗi trang (mặc định: 20)

**Response:**
```json
{
  "code": 1000,
  "message": "Reviews retrieved successfully",
  "result": {
    "result": [
      {
        "id": 1,
        "productId": 1,
        "userId": "550e8400-e29b-41d4-a716-446655440000",
        "rating": 5,
        "comment": "Sản phẩm rất tốt!",
        "createdAt": "2024-11-10T10:00:00",
        "updatedAt": "2024-11-10T10:00:00"
      },
      {
        "id": 2,
        "productId": 1,
        "userId": "660e8400-e29b-41d4-a716-446655440001",
        "rating": null,
        "comment": "Sản phẩm này trông đẹp, tôi đang cân nhắc mua!",
        "createdAt": "2024-11-10T11:00:00",
        "updatedAt": "2024-11-10T11:00:00"
      }
    ],
    "total": 15,
    "page": 1,
    "size": 20,
    "totalPages": 1
  }
}
```

**Note:**
- `rating: null` nghĩa là user chưa mua sản phẩm, chỉ comment
- Endpoint này là **PUBLIC** - không cần authentication

---

### 3. Lấy Tất Cả Reviews/Comments của Sản Phẩm (Không Phân Trang)

```bash
GET /api/v1/product/reviews/product/{productId}/all
```

**Response:**
```json
{
  "code": 1000,
  "message": "All reviews retrieved successfully",
  "result": [
    {
      "id": 1,
      "productId": 1,
      "userId": "550e8400-e29b-41d4-a716-446655440000",
      "rating": 5,
      "comment": "Sản phẩm rất tốt!",
      "createdAt": "2024-11-10T10:00:00",
      "updatedAt": "2024-11-10T10:00:00"
    },
    {
      "id": 2,
      "productId": 1,
      "userId": "660e8400-e29b-41d4-a716-446655440001",
      "rating": null,
      "comment": "Sản phẩm này trông đẹp!",
      "createdAt": "2024-11-10T11:00:00",
      "updatedAt": "2024-11-10T11:00:00"
    }
  ]
}
```

**Note:**
- Endpoint này trả về tất cả reviews không phân trang
- Phù hợp khi số lượng reviews ít
- Endpoint này là **PUBLIC** - không cần authentication

---

## 🔄 Complete Flow Examples

### Flow 1: User Đã Mua Sản Phẩm - Đánh Giá + Comment

```bash
# 1. User đăng nhập và lấy token
TOKEN="your_jwt_token_here"

# 2. User đã mua sản phẩm ID=1, tạo review với rating + comment
curl -X POST http://localhost:8888/api/v1/product/reviews \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 1,
    "rating": 5,
    "comment": "Sản phẩm rất tốt, chất lượng cao, giao hàng nhanh!"
  }'

# Response: Review được tạo với rating=5 và comment
```

---

### Flow 2: User Chưa Mua - Chỉ Comment

```bash
# 1. User đăng nhập và lấy token
TOKEN="your_jwt_token_here"

# 2. User chưa mua sản phẩm ID=1, chỉ có thể comment
curl -X POST http://localhost:8888/api/v1/product/reviews \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 1,
    "comment": "Sản phẩm này trông đẹp, tôi đang cân nhắc mua!"
  }'

# Response: Review được tạo với rating=null và comment

# 3. Nếu user cố gắng đánh giá (có rating) → Lỗi
curl -X POST http://localhost:8888/api/v1/product/reviews \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 1,
    "rating": 5,
    "comment": "Sản phẩm tốt!"
  }'

# Response: Error 2010 - REVIEW_RATING_NOT_ALLOWED
```

---

### Flow 3: Xem Tất Cả Reviews của Sản Phẩm

```bash
# 1. Lấy reviews có phân trang (không cần token)
curl "http://localhost:8888/api/v1/product/reviews/product/1?page=1&limit=10"

# 2. Lấy tất cả reviews (không cần token)
curl "http://localhost:8888/api/v1/product/reviews/product/1/all"
```

---

## 💾 Database Schema

### reviews Table

```sql
CREATE TABLE reviews (
  id         BIGINT AUTO_INCREMENT PRIMARY KEY,
  product_id BIGINT NOT NULL,
  user_id    VARCHAR(36) NOT NULL,
  rating     INT NULL,  -- 1-5, NULL nếu user chưa mua
  comment    TEXT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_review_product (product_id),
  INDEX idx_review_user (user_id),
  UNIQUE KEY uq_review_user_product (user_id, product_id)
);
```

**Key Points:**
- `rating`: NULL nếu user chưa mua sản phẩm
- `comment`: Có thể NULL nếu user chỉ đánh giá (rating) mà không comment
- `UNIQUE (user_id, product_id)`: Mỗi user chỉ có thể review một lần cho mỗi sản phẩm
- Index trên `product_id` để query nhanh khi lấy reviews theo sản phẩm

---

## 🔍 Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 2010 | REVIEW_RATING_NOT_ALLOWED | User chưa mua sản phẩm nên không thể đánh giá |
| 2011 | REVIEW_REQUIRED_FIELDS | Phải có ít nhất rating hoặc comment |
| 2012 | INVALID_RATING | Rating phải từ 1 đến 5 |
| 2013 | REVIEW_ALREADY_EXISTS | User đã review sản phẩm này rồi |
| 2001 | PRODUCT_NOT_FOUND | Không tìm thấy sản phẩm |

---

## 🎨 Frontend Integration Examples

### React/TypeScript Example

```typescript
// Review Service
import { apiClient } from '@/lib/api/client';

export interface ReviewRequest {
  productId: number;
  rating?: number; // 1-5, optional
  comment?: string;
}

export interface ReviewResponse {
  id: number;
  productId: number;
  userId: string;
  rating: number | null;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
}

// Tạo review
export const createReview = async (data: ReviewRequest): Promise<ReviewResponse> => {
  const response = await apiClient.post<ApiResponse<ReviewResponse>>(
    '/product/reviews',
    data
  );
  return response.data.result;
};

// Lấy reviews có phân trang
export const getReviewsByProductId = async (
  productId: number,
  page: number = 1,
  limit: number = 20
): Promise<PaginatedResponse<ReviewResponse>> => {
  const response = await apiClient.get<ApiResponse<PaginatedResponse<ReviewResponse>>>(
    `/product/reviews/product/${productId}`,
    { params: { page, limit } }
  );
  return response.data.result;
};

// Lấy tất cả reviews
export const getAllReviewsByProductId = async (
  productId: number
): Promise<ReviewResponse[]> => {
  const response = await apiClient.get<ApiResponse<ReviewResponse[]>>(
    `/product/reviews/product/${productId}/all`
  );
  return response.data.result;
};
```

### Usage Example

```typescript
// Component: ProductReviewForm
const handleSubmit = async (rating: number, comment: string) => {
  try {
    await createReview({
      productId: product.id,
      rating: rating, // Chỉ set nếu user đã mua
      comment: comment
    });
    toast.success('Đánh giá thành công!');
  } catch (error: any) {
    if (error.response?.data?.code === 2010) {
      // User chưa mua, chỉ cho phép comment
      await createReview({
        productId: product.id,
        comment: comment
      });
    } else {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    }
  }
};

// Component: ProductReviewsList
const { data: reviews } = useQuery(
  ['reviews', productId],
  () => getReviewsByProductId(productId, 1, 20)
);
```

---

## 🔐 Security & Permissions

### Public Endpoints (Không cần authentication)
- `GET /api/v1/product/reviews/product/{productId}` - Xem reviews có phân trang
- `GET /api/v1/product/reviews/product/{productId}/all` - Xem tất cả reviews

### Protected Endpoints (Yêu cầu authentication)
- `POST /api/v1/product/reviews` - Tạo review/comment

**Note:** 
- User ID được tự động lấy từ JWT token
- Không cần truyền `userId` trong request body
- Hệ thống tự động kiểm tra user đã mua sản phẩm chưa

---

## 🚀 Testing với cURL

### 1. Tạo Review (User đã mua)

```bash
# Set token
export TOKEN="your_jwt_token_here"

# Tạo review với rating + comment
curl -X POST http://localhost:8888/api/v1/product/reviews \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 1,
    "rating": 5,
    "comment": "Sản phẩm rất tốt!"
  }'
```

### 2. Tạo Comment (User chưa mua)

```bash
curl -X POST http://localhost:8888/api/v1/product/reviews \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 1,
    "comment": "Sản phẩm này trông đẹp!"
  }'
```

### 3. Lấy Reviews (Public)

```bash
# Có phân trang
curl "http://localhost:8888/api/v1/product/reviews/product/1?page=1&limit=10"

# Tất cả reviews
curl "http://localhost:8888/api/v1/product/reviews/product/1/all"
```

---

## 📝 Notes

1. **Purchase Verification**: Hệ thống tự động kiểm tra user đã mua sản phẩm bằng cách query order service (có order COMPLETED với productId)
2. **One Review Per User**: Mỗi user chỉ có thể review một lần cho mỗi sản phẩm
3. **Rating Validation**: Rating chỉ có thể từ 1-5, và chỉ user đã mua mới được set
4. **Comment Optional**: User có thể chỉ đánh giá (rating) mà không comment, hoặc chỉ comment mà không đánh giá (nếu chưa mua)
5. **Public Read**: Tất cả users (kể cả chưa đăng nhập) đều có thể xem reviews

---

## 🔗 Related APIs

- **Product Service**: `/api/v1/product/products/{id}` - Lấy thông tin sản phẩm
- **Order Service**: `/api/v1/orders/my-orders` - Xem đơn hàng của user (để biết đã mua sản phẩm nào)

---

**Last Updated:** 2024-11-10

