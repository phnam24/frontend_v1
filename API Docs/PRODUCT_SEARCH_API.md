# 🔍 Product Search API Guide - Advanced Search với Filters

## 📋 Overview

Product Search API cho phép tìm kiếm sản phẩm với các tính năng nâng cao:
- **Fuzzy Search**: Tìm kiếm với khả năng chịu lỗi chính tả (ví dụ: "macbok" tìm được "macbook")
- **Lọc theo giá**: Tìm sản phẩm trong khoảng giá (minPrice - maxPrice)
- **Lọc theo thương hiệu**: Tìm sản phẩm theo brandId
- **Kết hợp filters**: Có thể dùng đồng thời nhiều điều kiện hoặc không có điều kiện nào
- **Phân trang**: Hỗ trợ phân trang kết quả tìm kiếm

**🌐 Gateway URL:** `http://localhost:8888`  
**📡 Direct Service URL:** `http://localhost:8083`  
**🔐 Authentication:** Public (không cần authentication)

---

## 🎯 API Endpoints

### 1. Advanced Search với Filters

```bash
GET /api/v1/product/products/search/advanced
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `keyword` | String | No | Từ khóa tìm kiếm (tên sản phẩm) - hỗ trợ fuzzy search |
| `minPrice` | Long | No | Giá tối thiểu (lọc theo priceSale) |
| `maxPrice` | Long | No | Giá tối đa (lọc theo priceSale) |
| `brandId` | Long | No | ID thương hiệu |
| `page` | Integer | No | Số trang (mặc định: 1) |
| `limit` | Integer | No | Số lượng mỗi trang (mặc định: 12) |

**Response:**
```json
{
  "code": 1000,
  "message": "Search results",
  "result": {
    "result": [
      {
        "id": 1,
        "categoryIds": [1, 2],
        "brandId": 1,
        "name": "MacBook Pro 16 inch",
        "slug": "macbook-pro-16-inch",
        "shortDescription": "Laptop cao cấp",
        "description": "...",
        "priceList": 50000000,
        "priceSale": 45000000,
        "avatar": "...",
        "images": "...",
        "status": true,
        "firstImage": "...",
        "createdAt": "2024-11-10T10:00:00",
        "updatedAt": "2024-11-10T10:00:00",
        "variants": [...]
      }
    ],
    "total": 25,
    "page": 1,
    "size": 12,
    "totalPages": 3
  }
}
```

---

## 🔍 Use Cases & Examples

### Use Case 1: Search chỉ với Keyword (Fuzzy Search)

**Tìm kiếm với typo tolerance:**
```bash
# Search "macbok" sẽ tìm được "macbook"
GET /api/v1/product/products/search/advanced?keyword=macbok
```

**cURL:**
```bash
curl "http://localhost:8888/api/v1/product/products/search/advanced?keyword=macbok"
```

**Kết quả:** Tìm được tất cả sản phẩm có tên chứa "macbook" hoặc match với pattern fuzzy của "macbok"

---

### Use Case 2: Search với Lọc Giá

**Tìm sản phẩm trong khoảng giá:**
```bash
# Tìm sản phẩm từ 10 triệu đến 50 triệu
GET /api/v1/product/products/search/advanced?minPrice=10000000&maxPrice=50000000
```

**cURL:**
```bash
curl "http://localhost:8888/api/v1/product/products/search/advanced?minPrice=10000000&maxPrice=50000000"
```

**Kết quả:** Tất cả sản phẩm có `priceSale` từ 10,000,000 đến 50,000,000

---

### Use Case 3: Search với Lọc Thương Hiệu

**Tìm sản phẩm theo brand:**
```bash
# Tìm sản phẩm của Apple (brandId = 1)
GET /api/v1/product/products/search/advanced?brandId=1
```

**cURL:**
```bash
curl "http://localhost:8888/api/v1/product/products/search/advanced?brandId=1"
```

**Kết quả:** Tất cả sản phẩm của thương hiệu có ID = 1

---

### Use Case 4: Search với Cả 2 Điều Kiện (Giá + Brand)

**Tìm sản phẩm Apple trong khoảng giá 20-50 triệu:**
```bash
GET /api/v1/product/products/search/advanced?minPrice=20000000&maxPrice=50000000&brandId=1
```

**cURL:**
```bash
curl "http://localhost:8888/api/v1/product/products/search/advanced?minPrice=20000000&maxPrice=50000000&brandId=1"
```

**Kết quả:** Sản phẩm của Apple có giá từ 20-50 triệu

---

### Use Case 5: Search với Tất Cả Filters + Phân Trang

**Tìm kiếm đầy đủ với phân trang:**
```bash
GET /api/v1/product/products/search/advanced?keyword=macbook&minPrice=20000000&maxPrice=50000000&brandId=1&page=1&limit=20
```

**cURL:**
```bash
curl "http://localhost:8888/api/v1/product/products/search/advanced?keyword=macbook&minPrice=20000000&maxPrice=50000000&brandId=1&page=1&limit=20"
```

**Kết quả:** 
- Sản phẩm có tên chứa "macbook" (fuzzy search)
- Giá từ 20-50 triệu
- Thương hiệu ID = 1
- Trang 1, 20 sản phẩm mỗi trang

---

### Use Case 6: Search Không Có Điều Kiện Nào (Lấy Tất Cả)

**Lấy tất cả sản phẩm với phân trang:**
```bash
GET /api/v1/product/products/search/advanced?page=1&limit=12
```

**cURL:**
```bash
curl "http://localhost:8888/api/v1/product/products/search/advanced?page=1&limit=12"
```

**Kết quả:** Tất cả sản phẩm (chỉ lọc theo status = true), phân trang

---

## 🎨 Fuzzy Search - Typo Tolerance

### Cách Hoạt Động

Fuzzy search sử dụng pattern matching để tìm kiếm với khả năng chịu lỗi chính tả:

**Ví dụ:**
- Keyword: `"macbok"`
- Pattern được tạo: `"%m%a%c%b%o%k%"`
- Sẽ match với: `"macbook"`, `"MacBook Pro"`, `"MacBook Air"`, etc.

**Logic:**
1. Tìm exact match trước (ưu tiên cao nhất)
2. Sau đó tìm fuzzy match
3. Loại bỏ khoảng trắng khi so sánh để tìm tốt hơn

### Ví Dụ Fuzzy Search

```bash
# Typo: "macbok" → Tìm được "MacBook"
GET /api/v1/product/products/search/advanced?keyword=macbok

# Typo: "iphne" → Tìm được "iPhone"
GET /api/v1/product/products/search/advanced?keyword=iphne

# Typo: "samung" → Tìm được "Samsung"
GET /api/v1/product/products/search/advanced?keyword=samung
```

---

## 📊 Complete Flow Examples

### Flow 1: User Tìm Kiếm Sản Phẩm Laptop

```bash
# 1. User search "laptop" với fuzzy search
curl "http://localhost:8888/api/v1/product/products/search/advanced?keyword=laptop&page=1&limit=12"

# 2. User muốn lọc theo giá 10-30 triệu
curl "http://localhost:8888/api/v1/product/products/search/advanced?keyword=laptop&minPrice=10000000&maxPrice=30000000&page=1&limit=12"

# 3. User muốn thêm filter brand (Apple)
curl "http://localhost:8888/api/v1/product/products/search/advanced?keyword=laptop&minPrice=10000000&maxPrice=30000000&brandId=1&page=1&limit=12"
```

---

### Flow 2: User Tìm Kiếm với Typo

```bash
# User gõ nhầm "macbok" thay vì "macbook"
curl "http://localhost:8888/api/v1/product/products/search/advanced?keyword=macbok"

# Response: Vẫn tìm được "MacBook Pro", "MacBook Air", etc.
```

---

### Flow 3: User Lọc Sản Phẩm Theo Giá

```bash
# Tìm sản phẩm dưới 20 triệu
curl "http://localhost:8888/api/v1/product/products/search/advanced?maxPrice=20000000"

# Tìm sản phẩm trên 50 triệu
curl "http://localhost:8888/api/v1/product/products/search/advanced?minPrice=50000000"

# Tìm sản phẩm trong khoảng 15-25 triệu
curl "http://localhost:8888/api/v1/product/products/search/advanced?minPrice=15000000&maxPrice=25000000"
```

---

## 💻 Frontend Integration Examples

### React/TypeScript Example

```typescript
// Product Search Service
import { apiClient } from '@/lib/api/client';

export interface ProductSearchParams {
  keyword?: string;
  minPrice?: number;
  maxPrice?: number;
  brandId?: number;
  page?: number;
  limit?: number;
}

export interface ProductResponse {
  id: number;
  name: string;
  priceSale: number;
  brandId: number;
  // ... other fields
}

export interface PaginatedResponse<T> {
  result: T[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
}

// Advanced search
export const searchProducts = async (
  params: ProductSearchParams
): Promise<PaginatedResponse<ProductResponse>> => {
  const queryParams = new URLSearchParams();
  
  if (params.keyword) queryParams.append('keyword', params.keyword);
  if (params.minPrice) queryParams.append('minPrice', params.minPrice.toString());
  if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString());
  if (params.brandId) queryParams.append('brandId', params.brandId.toString());
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  
  const response = await apiClient.get<ApiResponse<PaginatedResponse<ProductResponse>>>(
    `/product/products/search/advanced?${queryParams.toString()}`
  );
  return response.data.result;
};
```

### Usage Example

```typescript
// Component: ProductSearchPage
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchProducts } from '@/lib/api/product.service';

const ProductSearchPage = () => {
  const [keyword, setKeyword] = useState('');
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [brandId, setBrandId] = useState<number | undefined>();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery(
    ['products', 'search', keyword, minPrice, maxPrice, brandId, page],
    () => searchProducts({
      keyword: keyword || undefined,
      minPrice,
      maxPrice,
      brandId,
      page,
      limit: 12
    }),
    { enabled: true }
  );

  return (
    <div>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Tìm kiếm sản phẩm..."
      />
      
      <input
        type="number"
        value={minPrice || ''}
        onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
        placeholder="Giá tối thiểu"
      />
      
      <input
        type="number"
        value={maxPrice || ''}
        onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
        placeholder="Giá tối đa"
      />
      
      <select
        value={brandId || ''}
        onChange={(e) => setBrandId(e.target.value ? Number(e.target.value) : undefined)}
      >
        <option value="">Tất cả thương hiệu</option>
        <option value="1">Apple</option>
        <option value="2">Samsung</option>
        {/* ... */}
      </select>

      {isLoading ? (
        <div>Đang tải...</div>
      ) : (
        <div>
          <p>Tìm thấy {data?.total} sản phẩm</p>
          {data?.result.map(product => (
            <div key={product.id}>
              <h3>{product.name}</h3>
              <p>Giá: {product.priceSale.toLocaleString('vi-VN')} VNĐ</p>
            </div>
          ))}
          
          {/* Pagination */}
          <div>
            {Array.from({ length: data?.totalPages || 0 }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                disabled={p === page}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
```

---

## 🔄 Comparison với Endpoint Cũ

### Endpoint Cũ (Đã được cải thiện)

```bash
# Search theo tên (giờ đã hỗ trợ fuzzy search)
GET /api/v1/product/products/search?name=macbok
```

**Khác biệt:**
- Endpoint cũ: Chỉ search theo tên, không có filters
- Endpoint mới: Search với đầy đủ filters (giá, brand) + fuzzy search

### Endpoint GetAll (Có thể dùng search)

```bash
# Lấy tất cả hoặc search
GET /api/v1/product/products?search=macbook&page=1&limit=12
```

**Khác biệt:**
- Endpoint này: Chỉ search theo tên, không có filters giá/brand
- Endpoint mới: Đầy đủ tính năng filters

---

## 📝 Notes & Best Practices

### 1. Fuzzy Search
- Fuzzy search hoạt động tốt với keyword ngắn (3-10 ký tự)
- Với keyword quá dài, có thể giảm độ chính xác
- Exact match luôn được ưu tiên trong kết quả

### 2. Price Filtering
- Lọc theo `priceSale` (giá bán), không phải `priceList`
- Nếu sản phẩm không có `priceSale`, sẽ không xuất hiện trong kết quả khi có filter giá
- Có thể chỉ dùng `minPrice` hoặc chỉ `maxPrice`

### 3. Brand Filtering
- `brandId` phải là ID hợp lệ trong database
- Nếu `brandId` không tồn tại, sẽ trả về kết quả rỗng

### 4. Pagination
- Mặc định: `page=1`, `limit=12`
- Nên giới hạn `limit` tối đa 100 để tránh query quá nặng
- Sử dụng `totalPages` để hiển thị pagination UI

### 5. Performance
- Query được tối ưu với indexes trên `name`, `priceSale`, `brand_id`, `status`
- Fuzzy search có thể chậm hơn exact search với dataset lớn
- Nên cache kết quả search phổ biến

---

## 🚀 Testing với cURL

### Test 1: Fuzzy Search

```bash
# Test typo tolerance
curl "http://localhost:8888/api/v1/product/products/search/advanced?keyword=macbok"
```

### Test 2: Price Filter

```bash
# Test lọc theo giá
curl "http://localhost:8888/api/v1/product/products/search/advanced?minPrice=10000000&maxPrice=50000000"
```

### Test 3: Brand Filter

```bash
# Test lọc theo brand
curl "http://localhost:8888/api/v1/product/products/search/advanced?brandId=1"
```

### Test 4: Combined Filters

```bash
# Test tất cả filters
curl "http://localhost:8888/api/v1/product/products/search/advanced?keyword=macbook&minPrice=20000000&maxPrice=50000000&brandId=1&page=1&limit=20"
```

### Test 5: Pagination

```bash
# Test phân trang
curl "http://localhost:8888/api/v1/product/products/search/advanced?page=2&limit=10"
```

---

## 🔗 Related APIs

- **Get Product by ID**: `GET /api/v1/product/products/{id}`
- **Get All Products**: `GET /api/v1/product/products`
- **Simple Search**: `GET /api/v1/product/products/search?name={name}`
- **Get Brands**: `GET /api/v1/product/brands` (để lấy danh sách brandId)

---

## 🐛 Error Handling

API sẽ trả về lỗi nếu:
- Invalid query parameters (sẽ bỏ qua và không filter)
- Database connection issues (500 error)

**Response khi không tìm thấy:**
```json
{
  "code": 1000,
  "message": "Search results",
  "result": {
    "result": [],
    "total": 0,
    "page": 1,
    "size": 12,
    "totalPages": 0
  }
}
```

---

**Last Updated:** 2024-11-10

