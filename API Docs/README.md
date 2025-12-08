# API Documentation

This directory contains comprehensive API documentation for all microservices in the e-commerce system.

---

## Services

### 1. [Product Service](./PRODUCT_SERVICE_API.md)
Manages products, brands, categories, variants, and specifications.

**Endpoints**:
- Products CRUD operations
- Brands management
- Categories management
- Product variants
- Spec attributes
- Variant specifications

---

### 2. [Identity Service](./IDENTITY_SERVICE_API.md)
Handles authentication, user management, roles, and permissions.

**Endpoints**:
- Authentication (login, logout, token refresh, introspect)
- User management
- Role management
- Permission management

---

### 3. [Profile Service](./PROFILE_SERVICE_API.md)
Manages user profiles and profile-related operations.

**Endpoints**:
- User profile retrieval
- Internal profile creation

---

### 4. [Notification Service](./NOTIFICATION_SERVICE_API.md)
Handles email notifications and event-driven messaging.

**Endpoints**:
- Email sending
- Kafka event listener (internal)

---

### 5. [Order Service](./ORDER_SERVICE_API.md)
Manages shopping cart, orders, and vouchers.

**Endpoints**:
- Shopping cart operations
- Order management
- Voucher management

---

## Common Information

### Response Structure

All endpoints return responses wrapped in an `ApiResponse` object:
```json
{
  "code": 1000,
  "message": "Success message",
  "result": {/* actual data */}
}
```

### Paginated Response

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

To obtain a token, use the `/auth/token` endpoint in the [Identity Service](./IDENTITY_SERVICE_API.md#1-login-get-token).

---

## General Notes

1. **Pagination**: Default page is 1, default limit is 12
2. **CORS**: All services allow cross-origin requests from any origin (`*`)
3. **Date Format**: ISO 8601 format (e.g., `2024-01-01T00:00:00`)
4. **Currency**: All prices are in VND (Vietnamese Dong)

---

## Quick Links

- [Product Service API](./PRODUCT_SERVICE_API.md)
- [Identity Service API](./IDENTITY_SERVICE_API.md)
- [Profile Service API](./PROFILE_SERVICE_API.md)
- [Notification Service API](./NOTIFICATION_SERVICE_API.md)
- [Order Service API](./ORDER_SERVICE_API.md)
