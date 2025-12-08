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
  "variantId": 1,
  "quantity": 2
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

## Orders API

### 1. Create Order
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
    "addressId": 1,
    "voucherId": 1,
    "status": "PENDING",
    "paymentMethod": "CREDIT_CARD",
    "paymentStatus": "UNPAID",
    "subtotal": 2000000,
    "discount": 0,
    "shippingFee": 30000,
    "total": 2030000,
    "note": "Please deliver in the morning",
    "createdAt": "2024-01-01T00:00:00",
    "paidAt": null,
    "shippedAt": null,
    "completedAt": null,
    "cancelledAt": null,
    "items": [
      {
        "id": 1,
        "variantId": 1,
        "quantity": 2,
        "price": 1000000,
        "subtotal": 2000000
      }
    ]
  }
}
```

### 2. Get Order by ID
- **URL**: `GET /api/orders/{id}`
- **Auth**: Required
- **Response**: Same structure as Create Order with message "Order details"

### 3. Get All Orders (Admin)
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

### 4. Get My Orders
- **URL**: `GET /api/orders/my-orders?page={page}&limit={limit}`
- **Auth**: Required
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
- **Response**: Same structure as Get All Orders with message "My orders"

### 5. Get Orders by User ID (Admin)
- **URL**: `GET /api/orders/user/{userId}?page={page}&limit={limit}`
- **Auth**: Required (ADMIN role)
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
- **Response**: Same structure as Get All Orders with message "Orders by user"

### 6. Get Orders by Status (Admin)
- **URL**: `GET /api/orders/status/{status}?page={page}&limit={limit}`
- **Auth**: Required (ADMIN role)
- **Path Parameters**:
  - `status`: Order status (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED)
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
- **Response**: Same structure as Get All Orders with message "Orders by status"

### 7. Get Orders by User and Status (Admin)
- **URL**: `GET /api/orders/user/{userId}/status/{status}?page={page}&limit={limit}`
- **Auth**: Required (ADMIN role)
- **Path Parameters**:
  - `userId`: User ID
  - `status`: Order status
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
- **Response**: Same structure as Get All Orders with message "Orders by user and status"

### 8. Update Order Status (Admin)
- **URL**: `PUT /api/orders/{id}/status?status={status}`
- **Auth**: Required (ADMIN role)
- **Query Parameters**:
  - `status`: New order status (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED)
- **Response**: Same structure as Create Order with message "Order status updated successfully"

### 9. Update Payment Status (Admin)
- **URL**: `PUT /api/orders/{id}/payment-status?status={status}`
- **Auth**: Required (ADMIN role)
- **Query Parameters**:
  - `status`: New payment status (UNPAID, PAID, REFUNDED)
- **Response**: Same structure as Create Order with message "Payment status updated successfully"

### 10. Cancel Order
- **URL**: `PUT /api/orders/{id}/cancel`
- **Auth**: Required
- **Response**: Same structure as Create Order with message "Order cancelled successfully"

---

## Vouchers API

### 1. Create Voucher
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

### 2. Update Voucher
- **URL**: `PUT /api/vouchers/{id}`
- **Auth**: Required (ADMIN role)
- **Request Body**: Same as Create Voucher
- **Response**: Same structure as Create Voucher with message "Voucher updated successfully"

### 3. Delete Voucher
- **URL**: `DELETE /api/vouchers/{id}`
- **Auth**: Required (ADMIN role)
- **Response**:
```json
{
  "message": "Voucher deleted successfully"
}
```

### 4. Get Voucher by ID
- **URL**: `GET /api/vouchers/{id}`
- **Auth**: Not required
- **Response**: Same structure as Create Voucher with message "Voucher details"

### 5. Get Voucher by Code
- **URL**: `GET /api/vouchers/code/{code}`
- **Auth**: Not required
- **Response**: Same structure as Create Voucher with message "Voucher details"

### 6. Get All Vouchers (Admin)
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

### 7. Get Active Vouchers
- **URL**: `GET /api/vouchers/active?page={page}&limit={limit}`
- **Auth**: Not required
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 12)
- **Response**: Same structure as Get All Vouchers with message "Active vouchers"

---

## Enums

### Order Status
- `PENDING`: Order is pending
- `PROCESSING`: Order is being processed
- `SHIPPED`: Order has been shipped
- `DELIVERED`: Order has been delivered
- `CANCELLED`: Order has been cancelled

### Payment Status
- `UNPAID`: Payment not received
- `PAID`: Payment received
- `REFUNDED`: Payment refunded

### Payment Method
- `CREDIT_CARD`: Credit card payment
- `DEBIT_CARD`: Debit card payment
- `CASH_ON_DELIVERY`: Cash on delivery
- `BANK_TRANSFER`: Bank transfer

---

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
