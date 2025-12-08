# API Documentation

This document provides comprehensive API documentation for all microservices in the e-commerce system.

---

## Table of Contents

1. [Product Service](#product-service)
2. [Identity Service](#identity-service)
3. [Profile Service](#profile-service)
4. [Notification Service](#notification-service)
5. [Order Service](#order-service)

---

## Product Service

Base URL: `/products`, `/brands`, `/categories`, `/variants`, `/spec-attributes`, `/variant-specs`

### Products API

#### 1. Create Product
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

#### 2. Update Product
- **URL**: `PUT /products/{id}`
- **Auth**: Required (ADMIN role)
- **Request Body**: Same as Create Product
- **Response**: Same structure as Create Product with message "Product updated successfully"

#### 3. Delete Product
- **URL**: `DELETE /products/{id}`
- **Auth**: Required (ADMIN role)
- **Response**:
```json
{
  "message": "Product deleted successfully"
}
```

#### 4. Get Product by ID
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

#### 5. Search Products
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

#### 6. Get All Products
- **URL**: `GET /products?page={page}&limit={limit}&search={search}`
- **Auth**: Not required
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
  - `search` (optional): Search term
- **Response**: Same structure as Search Products with message "Products retrieved successfully"

---

### Brands API

#### 1. Create Brand
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

#### 2. Update Brand
- **URL**: `PUT /brands/{id}`
- **Auth**: Required (ADMIN role)
- **Request Body**: Same as Create Brand
- **Response**: Same structure as Create Brand with message "Brand updated successfully"

#### 3. Delete Brand
- **URL**: `DELETE /brands/{id}`
- **Auth**: Required (ADMIN role)
- **Response**:
```json
{
  "message": "Brand deleted successfully"
}
```

#### 4. Search Brands
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

#### 5. Get All Brands
- **URL**: `GET /brands?page={page}&limit={limit}`
- **Auth**: Not required
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
- **Response**: Same structure as Search Brands with message "All brands"

---

### Categories API

#### 1. Create Category
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

#### 2. Update Category
- **URL**: `PUT /categories/{id}`
- **Auth**: Required (ADMIN role)
- **Request Body**: Same as Create Category
- **Response**: Same structure as Create Category with message "Category updated successfully"

#### 3. Delete Category
- **URL**: `DELETE /categories/{id}`
- **Auth**: Required (ADMIN role)
- **Response**:
```json
{
  "message": "Category deleted successfully"
}
```

#### 4. Search Categories
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

#### 5. Get All Categories
- **URL**: `GET /categories?page={page}&limit={limit}&search={search}`
- **Auth**: Not required
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
  - `search` (optional): Search term
- **Response**: Same structure as Search Categories with message "Categories retrieved successfully"

---

### Product Variants API

#### 1. Create Product Variant
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

#### 2. Update Product Variant
- **URL**: `PUT /variants/{id}`
- **Auth**: Not required
- **Request Body**: Same as Create Product Variant
- **Response**: Same structure as Create Product Variant with message "Variant updated successfully"

#### 3. Delete Product Variant
- **URL**: `DELETE /variants/{id}`
- **Auth**: Not required
- **Response**:
```json
{
  "message": "Variant deleted"
}
```

#### 4. Get All Variants
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

#### 5. Get Variants by Product
- **URL**: `GET /variants/product/{productId}`
- **Auth**: Not required
- **Response**:
```json
{
  "message": "Variants by product",
  "result": [/* array of variants */]
}
```

#### 6. Search Variants by SKU
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

### Spec Attributes API

#### 1. Create Spec Attribute
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

#### 2. Update Spec Attribute
- **URL**: `PUT /spec-attributes/{id}`
- **Auth**: Not required
- **Request Body**: Same as Create Spec Attribute
- **Response**: Same structure as Create Spec Attribute with message "Attribute updated"

#### 3. Delete Spec Attribute
- **URL**: `DELETE /spec-attributes/{id}`
- **Auth**: Not required
- **Response**:
```json
{
  "message": "Attribute deleted"
}
```

#### 4. Get All Spec Attributes
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

#### 5. Search Spec Attributes
- **URL**: `GET /spec-attributes/search?label={label}&page={page}&limit={limit}`
- **Auth**: Not required
- **Query Parameters**:
  - `label` (required): Search term
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
- **Response**: Same structure as Get All Spec Attributes with message "Search results"

---

### Variant Specs API

#### 1. Create Variant Spec
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

#### 2. Delete Variant Spec
- **URL**: `DELETE /variant-specs/{id}`
- **Auth**: Not required
- **Response**:
```json
{
  "message": "Variant spec deleted successfully"
}
```

#### 3. Get Variant Specs by Variant
- **URL**: `GET /variant-specs/variant/{variantId}`
- **Auth**: Not required
- **Response**:
```json
{
  "message": "Variant specs fetched successfully",
  "result": [/* array of variant specs */]
}
```

---

## Identity Service

Base URL: `/auth`, `/users`, `/roles`, `/permissions`

### Authentication API

#### 1. Login (Get Token)
- **URL**: `POST /auth/token`
- **Auth**: Not required
- **Request Body**:
```json
{
  "username": "user@example.com",
  "password": "password123"
}
```
- **Response**:
```json
{
  "result": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "authenticated": true,
    "userId": "user-id-123",
    "username": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "roles": ["USER", "ADMIN"]
  }
}
```

#### 2. Introspect Token
- **URL**: `POST /auth/introspect`
- **Auth**: Not required
- **Request Body**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
- **Response**:
```json
{
  "result": {
    "valid": true
  }
}
```

#### 3. Refresh Token
- **URL**: `POST /auth/refresh`
- **Auth**: Not required
- **Request Body**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
- **Response**:
```json
{
  "result": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "authenticated": true,
    "userId": "user-id-123",
    "username": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "roles": ["USER", "ADMIN"]
  }
}
```

#### 4. Logout
- **URL**: `POST /auth/logout`
- **Auth**: Not required
- **Request Body**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
- **Response**:
```json
{}
```

---

### Users API

#### 1. Create User
- **URL**: `POST /users/createUser`
- **Auth**: Not required
- **Request Body**:
```json
{
  "username": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "dob": "1990-01-01",
  "city": "Hanoi"
}
```
- **Response**:
```json
{
  "result": {
    "id": "user-id-123",
    "username": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "dob": "1990-01-01",
    "city": "Hanoi",
    "roles": [],
    "createdAt": "2024-01-01T00:00:00",
    "updatedAt": "2024-01-01T00:00:00"
  }
}
```

#### 2. Get All Users
- **URL**: `GET /users?page={page}&limit={limit}`
- **Auth**: Not required
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
- **Response**:
```json
{
  "result": {
    "result": [/* array of users */],
    "total": 100,
    "page": 1,
    "size": 12,
    "totalPages": 9
  }
}
```

#### 3. Get User by ID
- **URL**: `GET /users/{userId}`
- **Auth**: Not required
- **Response**:
```json
{
  "result": {
    "id": "user-id-123",
    "username": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "dob": "1990-01-01",
    "city": "Hanoi",
    "roles": ["USER"],
    "createdAt": "2024-01-01T00:00:00",
    "updatedAt": "2024-01-01T00:00:00"
  }
}
```

#### 4. Get My Info
- **URL**: `GET /users/my-info`
- **Auth**: Required
- **Response**:
```json
{
  "result": {
    "id": "user-id-123",
    "username": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "dob": "1990-01-01",
    "city": "Hanoi",
    "roles": ["USER"],
    "createdAt": "2024-01-01T00:00:00",
    "updatedAt": "2024-01-01T00:00:00"
  }
}
```

#### 5. Update User
- **URL**: `PUT /users/{userId}`
- **Auth**: Not required
- **Request Body**:
```json
{
  "password": "newpassword123",
  "firstName": "John",
  "lastName": "Doe",
  "dob": "1990-01-01",
  "city": "Hanoi",
  "roles": ["USER", "ADMIN"]
}
```
- **Response**: Same structure as Get User by ID

#### 6. Delete User
- **URL**: `DELETE /users/{userId}`
- **Auth**: Not required
- **Response**:
```json
{
  "result": "User has been deleted"
}
```

---

### Roles API

#### 1. Create Role
- **URL**: `POST /roles`
- **Auth**: Not required
- **Request Body**:
```json
{
  "name": "MANAGER",
  "description": "Manager role",
  "permissions": ["READ_DATA", "WRITE_DATA"]
}
```
- **Response**:
```json
{
  "result": {
    "name": "MANAGER",
    "description": "Manager role",
    "permissions": [
      {
        "name": "READ_DATA",
        "description": "Read data permission"
      },
      {
        "name": "WRITE_DATA",
        "description": "Write data permission"
      }
    ]
  }
}
```

#### 2. Get All Roles
- **URL**: `GET /roles?page={page}&limit={limit}`
- **Auth**: Not required
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
- **Response**:
```json
{
  "result": {
    "result": [/* array of roles */],
    "total": 10,
    "page": 1,
    "size": 12,
    "totalPages": 1
  }
}
```

#### 3. Delete Role
- **URL**: `DELETE /roles/{role}`
- **Auth**: Not required
- **Response**:
```json
{}
```

---

### Permissions API

#### 1. Create Permission
- **URL**: `POST /permissions`
- **Auth**: Not required
- **Request Body**:
```json
{
  "name": "READ_DATA",
  "description": "Permission to read data"
}
```
- **Response**:
```json
{
  "result": {
    "name": "READ_DATA",
    "description": "Permission to read data"
  }
}
```

#### 2. Get All Permissions
- **URL**: `GET /permissions?page={page}&limit={limit}`
- **Auth**: Not required
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
- **Response**:
```json
{
  "result": {
    "result": [/* array of permissions */],
    "total": 20,
    "page": 1,
    "size": 12,
    "totalPages": 2
  }
}
```

#### 3. Delete Permission
- **URL**: `DELETE /permissions/{permission}`
- **Auth**: Not required
- **Response**:
```json
{}
```

---

## Profile Service

Base URL: `/users`, `/internal/users`

### User Profile API

#### 1. Get Profile by ID
- **URL**: `GET /users/{profileId}`
- **Auth**: Not required
- **Response**:
```json
{
  "id": "profile-id-123",
  "userId": "user-id-123",
  "firstName": "John",
  "lastName": "Doe",
  "dob": "1990-01-01",
  "city": "Hanoi",
  "createdAt": "2024-01-01T00:00:00",
  "updatedAt": "2024-01-01T00:00:00"
}
```

#### 2. Get All Profiles
- **URL**: `GET /users?page={page}&limit={limit}`
- **Auth**: Not required
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
- **Response**:
```json
{
  "result": {
    "result": [/* array of user profiles */],
    "total": 100,
    "page": 1,
    "size": 12,
    "totalPages": 9
  }
}
```

---

### Internal User Profile API

#### 1. Create Profile (Internal)
- **URL**: `POST /internal/users`
- **Auth**: Internal service only
- **Request Body**:
```json
{
  "userId": "user-id-123",
  "firstName": "John",
  "lastName": "Doe",
  "dob": "1990-01-01",
  "city": "Hanoi"
}
```
- **Response**:
```json
{
  "id": "profile-id-123",
  "userId": "user-id-123",
  "firstName": "John",
  "lastName": "Doe",
  "dob": "1990-01-01",
  "city": "Hanoi",
  "createdAt": "2024-01-01T00:00:00",
  "updatedAt": "2024-01-01T00:00:00"
}
```

---

## Notification Service

Base URL: `/email/send`

### Email API

#### 1. Send Email
- **URL**: `POST /email/send`
- **Auth**: Not required
- **Request Body**:
```json
{
  "to": "recipient@example.com",
  "subject": "Email Subject",
  "htmlContent": "<h1>Email Content</h1>"
}
```
- **Response**:
```json
{
  "result": {
    "messageId": "message-id-123",
    "status": "sent"
  }
}
```

### Kafka Listener (Internal)

The notification service also listens to Kafka topic `onboard-successful` for automatic email notifications when users are onboarded.

---

## Order Service

Base URL: `/api/cart`, `/api/orders`, `/api/vouchers`

### Cart API

#### 1. Get My Cart
- **URL**: `GET /api/cart`
- **Auth**: Required
- **Response**:
```json
{
  "message": "Cart retrieved successfully",
  "result": {
    "id": 1,
    "userId": "user-id-123",
    "items": [
      {
        "id": 1,
        "variantId": 1,
        "quantity": 2,
        "price": 1000000
      }
    ],
    "totalAmount": 2000000,
    "createdAt": "2024-01-01T00:00:00",
    "updatedAt": "2024-01-01T00:00:00"
  }
}
```

#### 2. Add to Cart
- **URL**: `POST /api/cart/items`
- **Auth**: Required
- **Request Body**:
```json
{
  "variantId": 1,
  "quantity": 2
}
```
- **Response**: Same structure as Get My Cart with message "Item added to cart successfully"

#### 3. Update Cart Item
- **URL**: `PUT /api/cart/items/{itemId}`
- **Auth**: Required
- **Request Body**:
```json
{
  "quantity": 3
}
```
- **Response**: Same structure as Get My Cart with message "Cart item updated successfully"

#### 4. Remove from Cart
- **URL**: `DELETE /api/cart/items/{itemId}`
- **Auth**: Required
- **Response**: Same structure as Get My Cart with message "Item removed from cart successfully"

#### 5. Clear Cart
- **URL**: `DELETE /api/cart/clear`
- **Auth**: Required
- **Response**:
```json
{
  "message": "Cart cleared successfully"
}
```

---

### Orders API

#### 1. Create Order
- **URL**: `POST /api/orders`
- **Auth**: Required
- **Request Body**:
```json
{
  "addressId": 1,
  "voucherCode": "DISCOUNT10",
  "paymentMethod": "CREDIT_CARD",
  "shippingFee": 30000,
  "note": "Please deliver in the morning",
  "items": [
    {
      "variantId": 1,
      "quantity": 2,
      "price": 1000000
    }
  ]
}
```
- **Response**:
```json
{
  "message": "Order created successfully",
  "result": {
    "id": 1,
    "userId": "user-id-123",
    "orderNumber": "ORD-2024-001",
    "status": "PENDING",
    "paymentStatus": "UNPAID",
    "paymentMethod": "CREDIT_CARD",
    "totalAmount": 2030000,
    "shippingFee": 30000,
    "discount": 0,
    "note": "Please deliver in the morning",
    "items": [
      {
        "id": 1,
        "variantId": 1,
        "quantity": 2,
        "price": 1000000,
        "subtotal": 2000000
      }
    ],
    "createdAt": "2024-01-01T00:00:00",
    "updatedAt": "2024-01-01T00:00:00"
  }
}
```

#### 2. Get Order by ID
- **URL**: `GET /api/orders/{id}`
- **Auth**: Required
- **Response**: Same structure as Create Order with message "Order details"

#### 3. Get All Orders (Admin)
- **URL**: `GET /api/orders?page={page}&limit={limit}`
- **Auth**: Required (ADMIN role)
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
- **Response**:
```json
{
  "message": "All orders",
  "result": {
    "result": [/* array of orders */],
    "total": 500,
    "page": 1,
    "size": 12,
    "totalPages": 42
  }
}
```

#### 4. Get My Orders
- **URL**: `GET /api/orders/my-orders?page={page}&limit={limit}`
- **Auth**: Required
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
- **Response**: Same structure as Get All Orders with message "My orders"

#### 5. Get Orders by User ID (Admin)
- **URL**: `GET /api/orders/user/{userId}?page={page}&limit={limit}`
- **Auth**: Required (ADMIN role)
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
- **Response**: Same structure as Get All Orders with message "Orders by user"

#### 6. Get Orders by Status (Admin)
- **URL**: `GET /api/orders/status/{status}?page={page}&limit={limit}`
- **Auth**: Required (ADMIN role)
- **Path Parameters**:
  - `status`: Order status (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED)
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
- **Response**: Same structure as Get All Orders with message "Orders by status"

#### 7. Get Orders by User and Status (Admin)
- **URL**: `GET /api/orders/user/{userId}/status/{status}?page={page}&limit={limit}`
- **Auth**: Required (ADMIN role)
- **Path Parameters**:
  - `userId`: User ID
  - `status`: Order status
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
- **Response**: Same structure as Get All Orders with message "Orders by user and status"

#### 8. Update Order Status (Admin)
- **URL**: `PUT /api/orders/{id}/status?status={status}`
- **Auth**: Required (ADMIN role)
- **Query Parameters**:
  - `status`: New order status (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED)
- **Response**: Same structure as Create Order with message "Order status updated successfully"

#### 9. Update Payment Status (Admin)
- **URL**: `PUT /api/orders/{id}/payment-status?status={status}`
- **Auth**: Required (ADMIN role)
- **Query Parameters**:
  - `status`: New payment status (UNPAID, PAID, REFUNDED)
- **Response**: Same structure as Create Order with message "Payment status updated successfully"

#### 10. Cancel Order
- **URL**: `PUT /api/orders/{id}/cancel`
- **Auth**: Required
- **Response**: Same structure as Create Order with message "Order cancelled successfully"

---

### Vouchers API

#### 1. Create Voucher
- **URL**: `POST /api/vouchers`
- **Auth**: Required (ADMIN role)
- **Request Body**:
```json
{
  "code": "DISCOUNT10",
  "description": "10% discount",
  "discountType": "PERCENTAGE",
  "discountValue": 10,
  "minOrderValue": 100000,
  "maxDiscountAmount": 50000,
  "startDate": "2024-01-01T00:00:00",
  "endDate": "2024-12-31T23:59:59",
  "usageLimit": 100,
  "usedCount": 0,
  "active": true
}
```
- **Response**:
```json
{
  "message": "Voucher created successfully",
  "result": {
    "id": 1,
    "code": "DISCOUNT10",
    "description": "10% discount",
    "discountType": "PERCENTAGE",
    "discountValue": 10,
    "minOrderValue": 100000,
    "maxDiscountAmount": 50000,
    "startDate": "2024-01-01T00:00:00",
    "endDate": "2024-12-31T23:59:59",
    "usageLimit": 100,
    "usedCount": 0,
    "active": true,
    "createdAt": "2024-01-01T00:00:00",
    "updatedAt": "2024-01-01T00:00:00"
  }
}
```

#### 2. Update Voucher
- **URL**: `PUT /api/vouchers/{id}`
- **Auth**: Required (ADMIN role)
- **Request Body**: Same as Create Voucher
- **Response**: Same structure as Create Voucher with message "Voucher updated successfully"

#### 3. Delete Voucher
- **URL**: `DELETE /api/vouchers/{id}`
- **Auth**: Required (ADMIN role)
- **Response**:
```json
{
  "message": "Voucher deleted successfully"
}
```

#### 4. Get Voucher by ID
- **URL**: `GET /api/vouchers/{id}`
- **Auth**: Not required
- **Response**: Same structure as Create Voucher with message "Voucher details"

#### 5. Get Voucher by Code
- **URL**: `GET /api/vouchers/code/{code}`
- **Auth**: Not required
- **Response**: Same structure as Create Voucher with message "Voucher details"

#### 6. Get All Vouchers (Admin)
- **URL**: `GET /api/vouchers?page={page}&limit={limit}`
- **Auth**: Required (ADMIN role)
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
- **Response**:
```json
{
  "message": "All vouchers",
  "result": {
    "result": [/* array of vouchers */],
    "total": 50,
    "page": 1,
    "size": 12,
    "totalPages": 5
  }
}
```

#### 7. Get Active Vouchers
- **URL**: `GET /api/vouchers/active?page={page}&limit={limit}`
- **Auth**: Not required
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
- **Response**: Same structure as Get All Vouchers with message "Active vouchers"

---

## Common Response Structures

### ApiResponse
All endpoints return responses wrapped in an `ApiResponse` object:
```json
{
  "code": 1000,
  "message": "Success message",
  "result": {/* actual data */}
}
```

### PaginatedResponse
Endpoints that return paginated data use this structure:
```json
{
  "result": [/* array of items */],
  "total": 100,
  "page": 1,
  "size": 12,
  "totalPages": 9
}
```

### Error Response
```json
{
  "code": 4001,
  "message": "Error message",
  "result": null
}
```

---

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

To obtain a token, use the `/auth/token` endpoint with valid credentials.

---

## Notes

1. **Pagination**: Default page is 1, default limit is 12
2. **CORS**: All services allow cross-origin requests from any origin (`*`)
3. **Date Format**: ISO 8601 format (e.g., `2024-01-01T00:00:00`)
4. **Currency**: All prices are in VND (Vietnamese Dong)
5. **Order Status**: PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED
6. **Payment Status**: UNPAID, PAID, REFUNDED
7. **Payment Methods**: CREDIT_CARD, DEBIT_CARD, CASH_ON_DELIVERY, BANK_TRANSFER
