# Identity Service API Documentation

Base URL: `/auth`, `/users`, `/roles`, `/permissions`

---

## Authentication API

### 1. Login (Get Token)
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

### 2. Introspect Token
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

### 3. Refresh Token
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

### 4. Logout
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

## Users API

### 1. Create User
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
  "email": "user@example.com",
  "phone": "0123456789",
  "avatar": "http://example.com/avatar.jpg",
  "status": 1,
  "roles": ["USER"]
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
    "roles": [
        {
            "name": "USER",
            "description": "User role",
            "permissions": []
        }
    ]
  }
}
```

### 2. Get All Users
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

### 3. Get User by ID
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
    "roles": [
        {
            "name": "USER",
            "description": "User role",
            "permissions": []
        }
    ]
  }
}
```

### 4. Get My Info
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
    "roles": [
        {
            "name": "USER",
            "description": "User role",
            "permissions": []
        }
    ]
  }
}
```

### 5. Update User
- **URL**: `PUT /users/{userId}`
- **Auth**: Not required
- **Request Body**:
```json
{
  "password": "newpassword123",
  "firstName": "John",
  "lastName": "Doe",
  "dob": "1990-01-01",
  "roles": ["USER", "ADMIN"]
}
```
- **Response**: Same structure as Get User by ID

### 6. Delete User
- **URL**: `DELETE /users/{userId}`
- **Auth**: Not required
- **Response**:
```json
{
  "result": "User has been deleted"
}
```

### 7. Change Password
- **URL**: `PUT /users/{userId}/change-password`
- **Auth**: Required
- **Request Body**:
```json
{
  "oldPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```
- **Response**: Same structure as Get User by ID
```

---

## Roles API

### 1. Create Role
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

### 2. Get All Roles
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

### 3. Delete Role
- **URL**: `DELETE /roles/{role}`
- **Auth**: Not required
- **Response**:
```json
{}
```

---

## Permissions API

### 1. Create Permission
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

### 2. Get All Permissions
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

### 3. Delete Permission
- **URL**: `DELETE /permissions/{permission}`
- **Auth**: Not required
- **Response**:
```json
{}
```

---

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

To obtain a token, use the `/auth/token` endpoint with valid credentials.
