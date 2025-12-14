# Order Service API Documentation

Base URL: `/api/cart`, `/api/orders`, `/api/vouchers`

---

## Cart API

### 1. Get My Cart
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
    "totalItems": 2,
    "totalAmount": 2000000,
    "createdAt": "2024-01-01T00:00:00",
    "updatedAt": "2024-01-01T00:00:00"
  }
}
```

### 2. Add to Cart
- **URL**: `POST /api/cart/items`
- **Auth**: Required
- **Request Body**:
```json
{
    "productId": 1,
    "variantId": 1,
    "quantity": 2,
    "price": 1000000,
    "attributesName": "Black"
}

```
- **Response**: Same structure as Get My Cart with message "Item added to cart successfully"

### 3. Update Cart Item
- **URL**: `PUT /api/cart/items/{itemId}`
- **Auth**: Required
- **Request Body**:
```json
{
  "quantity": 3
}
```
- **Response**: Same structure as Get My Cart with message "Cart item updated successfully"

### 4. Remove from Cart
- **URL**: `DELETE /api/cart/items/{itemId}`
- **Auth**: Required
- **Response**: Same structure as Get My Cart with message "Item removed from cart successfully"

### 5. Clear Cart
- **URL**: `DELETE /api/cart/clear`
- **Auth**: Required
- **Response**:
```json
{
  "message": "Cart cleared successfully"
}
```

---

## Order Management APIs

### 16. Create Order
- **URL**: `POST /api/orders`
- **Auth**: Required (JWT Token)
- **Description**: Create a new order. User ID is automatically extracted from JWT token
- **Request Body**:
```json
{
  "addressId": 1,
  "voucherCode": "SUMMER2024",
  "paymentMethod": "VNPAY",
  "shippingFee": 30000,
  "note": "Please deliver before 5 PM",
  "items": [
    {
      "productId": 10,
      "variantId": 101,
      "productName": "Nike Air Max",
      "sku": "NIKE-AM-BLK-42",
      "attributesName": "Size: 42, Color: Black",
      "quantity": 2,
      "price": 200000
    },
    {
      "productId": 11,
      "variantId": 102,
      "productName": "Adidas Ultraboost",
      "sku": "ADIDAS-UB-WHT-43",
      "attributesName": "Size: 43, Color: White",
      "quantity": 1,
      "price": 100000
    }
  ]
}
```
- **Payment Methods**: `COD`, `VNPAY`, `MOMO`
- **Response**:
```json
{
  "code": 1000,
  "message": "Order created successfully",
  "result": {
    "id": 12345,
    "userId": "user123",
    "addressId": 1,
    "voucherId": 5,
    "status": "PENDING",
    "paymentMethod": "VNPAY",
    "paymentStatus": "UNPAID",
    "subtotal": 500000,
    "discount": 50000,
    "shippingFee": 30000,
    "total": 480000,
    "note": "Please deliver before 5 PM",
    "createdAt": "2024-12-13T10:30:00",
    "paidAt": null,
    "shippedAt": null,
    "completedAt": null,
    "cancelledAt": null,
    "items": [
      {
        "variantId": 101,
        "productName": "Nike Air Max",
        "size": "42",
        "color": "Black",
        "price": 200000,
        "quantity": 2,
        "subtotal": 400000
      },
      {
        "variantId": 102,
        "productName": "Adidas Ultraboost",
        "size": "43",
        "color": "White",
        "price": 100000,
        "quantity": 1,
        "subtotal": 100000
      }
    ]
  }
}
```
- **Payment Methods**: `COD`, `VNPAY`, `MOMO`
- **Response**:
```json
{
  "code": 1000,
  "message": "Order created successfully",
  "result": {
    "id": 12345,
    "userId": "user123",
    "addressId": 1,
    "voucherId": 5,
    "status": "PENDING",
    "paymentMethod": "VNPAY",
    "paymentStatus": "UNPAID",
    "subtotal": 500000,
    "discount": 50000,
    "shippingFee": 30000,
    "total": 480000,
    "note": "Please deliver before 5 PM",
    "createdAt": "2024-12-13T10:30:00",
    "paidAt": null,
    "shippedAt": null,
    "completedAt": null,
    "cancelledAt": null,
    "items": [
      {
        "variantId": 101,
        "productName": "Nike Air Max",
        "size": "42",
        "color": "Black",
        "price": 200000,
        "quantity": 2,
        "subtotal": 400000
      },
      {
        "variantId": 102,
        "productName": "Adidas Ultraboost",
        "size": "43",
        "color": "White",
        "price": 100000,
        "quantity": 1,
        "subtotal": 100000
      }
    ]
  }
}
```

### 17. Get Order by ID
- **URL**: `GET /api/orders/{id}`
- **Auth**: Required (JWT Token)
- **Path Parameters**:
  - `id` (required): Order ID
- **Response**:
```json
{
  "code": 1000,
  "message": "Order details",
  "result": {
    "id": 12345,
    "userId": "user123",
    "addressId": 1,
    "voucherId": 5,
    "status": "PENDING",
    "paymentMethod": "VNPAY",
    "paymentStatus": "UNPAID",
    "subtotal": 500000,
    "discount": 50000,
    "shippingFee": 30000,
    "total": 480000,
    "note": "Please deliver before 5 PM",
    "createdAt": "2024-12-13T10:30:00",
    "paidAt": null,
    "shippedAt": null,
    "completedAt": null,
    "cancelledAt": null,
    "items": [/* array of order items */]
  }
}
```

### 18. Get All Orders (Admin Only)
- **URL**: `GET /api/orders?page={page}&limit={limit}`
- **Auth**: Required (JWT Token with ADMIN role)
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
- **Response**:
```json
{
  "code": 1000,
  "message": "All orders",
  "result": {
    "result": [/* array of orders */],
    "total": 150,
    "page": 1,
    "size": 12,
    "totalPages": 13
  }
}
```

### 19. Get My Orders
- **URL**: `GET /api/orders/my-orders?page={page}&limit={limit}`
- **Auth**: Required (JWT Token)
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
- **Description**: Get all orders of current user
- **Response**:
```json
{
  "code": 1000,
  "message": "My orders",
  "result": {
    "result": [/* array of orders */],
    "total": 25,
    "page": 1,
    "size": 12,
    "totalPages": 3
  }
}
```

### 20. Get Orders by User ID
- **URL**: `GET /api/orders/user/{userId}?page={page}&limit={limit}`
- **Auth**: Required (JWT Token)
- **Path Parameters**:
  - `userId` (required): User ID
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
- **Response**:
```json
{
  "code": 1000,
  "message": "User orders",
  "result": {
    "result": [/* array of orders */],
    "total": 25,
    "page": 1,
    "size": 12,
    "totalPages": 3
  }
}
```

### 21. Get Orders by Status
- **URL**: `GET /api/orders/status/{status}?page={page}&limit={limit}`
- **Auth**: Required (JWT Token)
- **Path Parameters**:
  - `status` (required): Order status (`PENDING`, `CONFIRMED`, `PROCESSING`, `SHIPPED`, `COMPLETED`, `CANCELLED`)
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
- **Response**:
```json
{
  "code": 1000,
  "message": "Orders by status",
  "result": {
    "result": [/* array of orders with specified status */],
    "total": 40,
    "page": 1,
    "size": 12,
    "totalPages": 4
  }
}
```

### 22. Get Orders by User ID and Status
- **URL**: `GET /api/orders/user/{userId}/status/{status}?page={page}&limit={limit}`
- **Auth**: Required (JWT Token)
- **Path Parameters**:
  - `userId` (required): User ID
  - `status` (required): Order status
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
- **Response**:
```json
{
  "code": 1000,
  "message": "User orders by status",
  "result": {
    "result": [/* array of orders */],
    "total": 10,
    "page": 1,
    "size": 12,
    "totalPages": 1
  }
}
```

### 23. Update Order Status (Admin Only)
- **URL**: `PUT /api/orders/{id}/status?status={status}`
- **Auth**: Required (JWT Token with ADMIN role)
- **Path Parameters**:
  - `id` (required): Order ID
- **Query Parameters**:
  - `status` (required): New order status (`PENDING`, `CONFIRMED`, `PROCESSING`, `SHIPPED`, `COMPLETED`, `CANCELLED`)
- **Response**:
```json
{
  "code": 1000,
  "message": "Order status updated",
  "result": {
    "id": 12345,
    "status": "SHIPPED",
    "shippedAt": "2024-12-13T14:30:00",
    /* other order fields */
  }
}
```

### 24. Update Payment Status (Admin Only)
- **URL**: `PUT /api/orders/{id}/payment-status?status={status}`
- **Auth**: Required (JWT Token with ADMIN role)
- **Path Parameters**:
  - `id` (required): Order ID
- **Query Parameters**:
  - `status` (required): New payment status (`UNPAID`, `PAID`, `REFUNDED`, `FAILED`)
- **Response**:
```json
{
  "code": 1000,
  "message": "Payment status updated",
  "result": {
    "id": 12345,
    "paymentStatus": "PAID",
    "paidAt": "2024-12-13T11:00:00",
    /* other order fields */
  }
}
```

### 25. Update Payment Status (Internal)
- **URL**: `PUT /api/orders/internal/{id}/payment-status?status={status}`
- **Auth**: Not required (Service-to-service only)
- **Path Parameters**:
  - `id` (required): Order ID
- **Query Parameters**:
  - `status` (required): New payment status (`UNPAID`, `PAID`, `REFUNDED`, `FAILED`)
- **Description**: Internal endpoint for payment service to update payment status after receiving payment confirmation from VNPay
- **Response**:
```json
{
  "code": 1000,
  "message": "Payment status updated",
  "result": {
    "id": 12345,
    "paymentStatus": "PAID",
    "paidAt": "2024-12-13T11:00:00",
    /* other order fields */
  }
}
```

### 26. Cancel Order
- **URL**: `DELETE /api/orders/{id}`
- **Auth**: Required (JWT Token)
- **Path Parameters**:
  - `id` (required): Order ID
- **Description**: Cancel an order. Only orders with status PENDING or CONFIRMED can be cancelled
- **Response**:
```json
{
  "code": 1000,
  "message": "Order cancelled successfully",
  "result": null
}
```

### 27. Get Sales Statistics (Admin Only)
- **URL**: `GET /api/orders/statistics/sales`
- **Auth**: Required (JWT Token with ADMIN role)
- **Description**: Get overall sales statistics including total revenue, orders count, etc.
- **Response**:
```json
{
  "code": 1000,
  "message": "Sales statistics",
  "result": {
    "totalRevenue": 15000000,
    "totalOrders": 150,
    "completedOrders": 120,
    "cancelledOrders": 10,
    "pendingOrders": 20,
    "averageOrderValue": 100000
  }
}
```

### 28. Get Variant Sold Data (Admin Only)
- **URL**: `GET /api/orders/statistics/variant-sold`
- **Auth**: Required (JWT Token with ADMIN role)
- **Description**: Get statistics of product variants sold for inventory and analytics
- **Response**:
```json
{
  "code": 1000,
  "message": "Variant sold data",
  "result": {
    "variants": [
      {
        "variantId": 101,
        "productName": "Nike Air Max",
        "size": "42",
        "color": "Black",
        "totalSold": 45,
        "totalRevenue": 9000000
      },
      {
        "variantId": 102,
        "productName": "Adidas Ultraboost",
        "size": "43",
        "color": "White",
        "totalSold": 30,
        "totalRevenue": 3000000
      }
    ]
  }
}
```

### Order Status:
```
  PENDING,
  PAID,
  SHIPPING,
  COMPLETED,
  CANCELLED
```

### Payment Status:
```
  UNPAID,
  PAID,
  REFUNDED,
  FAILED
```

### Notes:
- User ID is automatically extracted from JWT token for order creation
- Orders can only be cancelled if status is PENDING or CONFIRMED
- Payment status is automatically updated by payment service via internal endpoint
- Admin endpoints require ADMIN role in JWT token
- All list endpoints support pagination with default page=1 and limit=12