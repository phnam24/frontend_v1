# Product Service API Documentation

Base URL: `/products`, `/brands`, `/categories`, `/variants`, `/spec-attributes`, `/variant-specs`

---

## Products API

### 1. Create Product
- **URL**: `POST /products`
- **Auth**: Required (ADMIN role)
- **Request Body**:
```json
{
  "categoryIds": [1, 2],
  "brandId": 1,
  "name": "Product Name",
  "slug": "product-name",
  "shortDescription": "Short description",
  "description": "Full description",
  "priceList": 1000000,
  "priceSale": 900000,
  "avatar": "image_url",
  "images": "image1,image2,image3",
  "status": true,
  "firstImage": "first_image_url"
}
```
- **Response**:
```json
{
  "message": "Product created successfully",
  "result": {
    "id": 1,
    "categoryIds": [1, 2],
    "brandId": 1,
    "name": "Product Name",
    "slug": "product-name",
    "shortDescription": "Short description",
    "description": "Full description",
    "priceList": 1000000,
    "priceSale": 900000,
    "avatar": "image_url",
    "images": "image1,image2,image3",
    "status": true,
    "firstImage": "first_image_url",
    "createdAt": "2024-01-01T00:00:00",
    "updatedAt": "2024-01-01T00:00:00",
    "variants": []
  }
}
```

### 2. Update Product
- **URL**: `PUT /products/{id}`
- **Auth**: Required (ADMIN role)
- **Request Body**: Same as Create Product
- **Response**: Same structure as Create Product with message "Product updated successfully"

### 3. Delete Product
- **URL**: `DELETE /products/{id}`
- **Auth**: Required (ADMIN role)
- **Response**:
```json
{
  "message": "Product deleted successfully"
}
```

### 4. Get Product by ID
- **URL**: `GET /products/{id}`
- **Auth**: Not required
- **Response**:
```json
{
  "message": "Product details",
  "result": {
    "id": 1,
    "categoryIds": [1, 2],
    "brandId": 1,
    "name": "Product Name",
    "slug": "product-name",
    "shortDescription": "Short description",
    "description": "Full description",
    "priceList": 1000000,
    "priceSale": 900000,
    "avatar": "image_url",
    "images": "image1,image2,image3",
    "status": true,
    "firstImage": "first_image_url",
    "createdAt": "2024-01-01T00:00:00",
    "updatedAt": "2024-01-01T00:00:00",
    "variants": []
  }
}
```

### 5. Search Products
- **URL**: `GET /products/search?name={name}&page={page}&limit={limit}`
- **Auth**: Not required
- **Query Parameters**:
  - `name` (required): Search term
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
- **Response**:
```json
{
  "message": "Search results",
  "result": {
    "result": [/* array of products */],
    "total": 100,
    "page": 1,
    "size": 12,
    "totalPages": 9
  }
}
```

### 6. Get All Products
- **URL**: `GET /products?page={page}&limit={limit}&search={search}`
- **Auth**: Not required
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
  - `search` (optional): Search term
- **Response**: Same structure as Search Products with message "Products retrieved successfully"

---

## Brands API

### 1. Create Brand
- **URL**: `POST /brands`
- **Auth**: Required (ADMIN role)
- **Request Body**:
```json
{
  "name": "Brand Name",
  "slug": "brand-name",
  "description": "Brand description",
  "logo": "logo_url",
  "status": true
}
```
- **Response**:
```json
{
  "message": "Brand created successfully",
  "result": {
    "id": 1,
    "name": "Brand Name",
    "slug": "brand-name",
    "description": "Brand description",
    "logo": "logo_url",
    "status": true,
    "createdAt": "2024-01-01T00:00:00",
    "updatedAt": "2024-01-01T00:00:00"
  }
}
```

### 2. Update Brand
- **URL**: `PUT /brands/{id}`
- **Auth**: Required (ADMIN role)
- **Request Body**: Same as Create Brand
- **Response**: Same structure as Create Brand with message "Brand updated successfully"

### 3. Delete Brand
- **URL**: `DELETE /brands/{id}`
- **Auth**: Required (ADMIN role)
- **Response**:
```json
{
  "message": "Brand deleted successfully"
}
```

### 4. Search Brands
- **URL**: `GET /brands/search?name={name}&page={page}&limit={limit}`
- **Auth**: Not required
- **Query Parameters**:
  - `name` (required): Search term
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
- **Response**:
```json
{
  "message": "Search results",
  "result": {
    "result": [/* array of brands */],
    "total": 50,
    "page": 1,
    "size": 12,
    "totalPages": 5
  }
}
```

### 5. Get All Brands
- **URL**: `GET /brands?page={page}&limit={limit}`
- **Auth**: Not required
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
- **Response**: Same structure as Search Brands with message "All brands"

### 6. Get Brand by ID
- **URL**: `GET /brands/{id}`
- **Auth**: Not required
- **Path Parameters**:
  - `id` (required): Brand ID
- **Response**:
```json
{
    "code": 1000,
    "message": "Brand with id: 1",
    "result": {
        "id": 1,
        "name": "Apple",
        "logo": "example.com/logo.png"
    }
}
```
---

## Categories API

### 1. Create Category
- **URL**: `POST /categories`
- **Auth**: Required (ADMIN role)
- **Request Body**:
```json
{
  "name": "Category Name",
  "slug": "category-name",
  "description": "Category description",
  "icon": "icon_url",
  "status": true
}
```
- **Response**:
```json
{
  "message": "Category created successfully",
  "result": {
    "id": 1,
    "name": "Category Name",
    "slug": "category-name",
    "description": "Category description",
    "icon": "icon_url",
    "status": true,
    "createdAt": "2024-01-01T00:00:00",
    "updatedAt": "2024-01-01T00:00:00"
  }
}
```

### 2. Update Category
- **URL**: `PUT /categories/{id}`
- **Auth**: Required (ADMIN role)
- **Request Body**: Same as Create Category
- **Response**: Same structure as Create Category with message "Category updated successfully"

### 3. Delete Category
- **URL**: `DELETE /categories/{id}`
- **Auth**: Required (ADMIN role)
- **Response**:
```json
{
  "message": "Category deleted successfully"
}
```

### 4. Search Categories
- **URL**: `GET /categories/search?name={name}&page={page}&limit={limit}`
- **Auth**: Not required
- **Query Parameters**:
  - `name` (required): Search term
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
- **Response**:
```json
{
  "message": "Search results",
  "result": {
    "result": [/* array of categories */],
    "total": 30,
    "page": 1,
    "size": 12,
    "totalPages": 3
  }
}
```

### 5. Get All Categories
- **URL**: `GET /categories?page={page}&limit={limit}&search={search}`
- **Auth**: Not required
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
  - `search` (optional): Search term
- **Response**: Same structure as Search Categories with message "Categories retrieved successfully"

---

## Product Variants API

### 1. Create Product Variant
- **URL**: `POST /variants`
- **Auth**: Not required
- **Request Body**:
```json
{
  "productId": 1,
  "sku": "SKU-001",
  "price": 1000000,
  "stock": 100,
  "color": "Red",
  "size": "M",
  "image": "variant_image_url"
}
```
- **Response**:
```json
{
  "message": "Variant created successfully",
  "result": {
    "id": 1,
    "productId": 1,
    "sku": "SKU-001",
    "price": 1000000,
    "stock": 100,
    "color": "Red",
    "size": "M",
    "image": "variant_image_url",
    "createdAt": "2024-01-01T00:00:00",
    "updatedAt": "2024-01-01T00:00:00"
  }
}
```

### 2. Update Product Variant
- **URL**: `PUT /variants/{id}`
- **Auth**: Not required
- **Request Body**: Same as Create Product Variant
- **Response**: Same structure as Create Product Variant with message "Variant updated successfully"

### 3. Delete Product Variant
- **URL**: `DELETE /variants/{id}`
- **Auth**: Not required
- **Response**:
```json
{
  "message": "Variant deleted"
}
```

### 4. Get All Variants
- **URL**: `GET /variants?page={page}&limit={limit}`
- **Auth**: Not required
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
- **Response**:
```json
{
  "message": "All variants",
  "result": {
    "result": [/* array of variants */],
    "total": 200,
    "page": 1,
    "size": 12,
    "totalPages": 17
  }
}
```

### 5. Get Variants by Product
- **URL**: `GET /variants/product/{productId}`
- **Auth**: Not required
- **Response**:
```json
{
  "message": "Variants by product",
  "result": [/* array of variants */]
}
```

### 6. Search Variants by SKU
- **URL**: `GET /variants/search?sku={sku}&page={page}&limit={limit}`
- **Auth**: Not required
- **Query Parameters**:
  - `sku` (required): SKU to search
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
- **Response**:
```json
{
  "message": "Search result",
  "result": {
    "result": [/* array of variants */],
    "total": 10,
    "page": 1,
    "size": 12,
    "totalPages": 1
  }
}
```

---

## Spec Attributes API

### 1. Create Spec Attribute
- **URL**: `POST /spec-attributes`
- **Auth**: Not required
- **Request Body**:
```json
{
  "label": "Screen Size",
  "type": "text"
}
```
- **Response**:
```json
{
  "message": "Attribute created",
  "result": {
    "id": 1,
    "label": "Screen Size",
    "type": "text",
    "createdAt": "2024-01-01T00:00:00",
    "updatedAt": "2024-01-01T00:00:00"
  }
}
```

### 2. Update Spec Attribute
- **URL**: `PUT /spec-attributes/{id}`
- **Auth**: Not required
- **Request Body**: Same as Create Spec Attribute
- **Response**: Same structure as Create Spec Attribute with message "Attribute updated"

### 3. Delete Spec Attribute
- **URL**: `DELETE /spec-attributes/{id}`
- **Auth**: Not required
- **Response**:
```json
{
  "message": "Attribute deleted"
}
```

### 4. Get All Spec Attributes
- **URL**: `GET /spec-attributes?page={page}&limit={limit}&search={search}`
- **Auth**: Not required
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
  - `search` (optional): Search term
- **Response**:
```json
{
  "message": "Attributes retrieved successfully",
  "result": {
    "result": [/* array of spec attributes */],
    "total": 50,
    "page": 1,
    "size": 12,
    "totalPages": 5
  }
}
```

### 5. Search Spec Attributes
- **URL**: `GET /spec-attributes/search?label={label}&page={page}&limit={limit}`
- **Auth**: Not required
- **Query Parameters**:
  - `label` (required): Search term
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
- **Response**: Same structure as Get All Spec Attributes with message "Search results"

---

## Variant Specs API

### 1. Create Variant Spec
- **URL**: `POST /variant-specs`
- **Auth**: Not required
- **Request Body**:
```json
{
  "variantId": 1,
  "specAttributeId": 1,
  "value": "6.5 inches"
}
```
- **Response**:
```json
{
  "message": "Variant spec created successfully",
  "result": {
    "id": "1",
    "variantId": 1,
    "specAttributeId": 1,
    "value": "6.5 inches",
    "createdAt": "2024-01-01T00:00:00"
  }
}
```

### 2. Delete Variant Spec
- **URL**: `DELETE /variant-specs/{id}`
- **Auth**: Not required
- **Response**:
```json
{
  "message": "Variant spec deleted successfully"
}
```

### 3. Get Variant Specs by Variant
- **URL**: `GET /variant-specs/variant/{variantId}`
- **Auth**: Not required
- **Response**:
```json
{
  "message": "Variant specs fetched successfully",
  "result": [/* array of variant specs */]
}
```
