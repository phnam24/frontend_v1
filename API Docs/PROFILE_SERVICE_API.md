# Profile Service API Documentation

Base URL: `/users`, `/internal/users`

---

## User Profile API

### 1. Get Profile by User ID
- **URL**: `GET /users/{userId}`
- **Auth**: Not required
- **Response**:
```json
{
  "id": "profile-id-123",
  "userId": "user-id-123",
  "firstName": "John",
  "lastName": "Doe",
  "dob": "1990-01-01",
  "email": "user@example.com",
  "phone": "0123456789",
  "avatar": "http://example.com/avatar.jpg",
  "status": 1
}
```

### 2. Get All Profiles
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

## Internal User Profile API

### 1. Create Profile (Internal)
- **URL**: `POST /internal/users`
- **Auth**: Internal service only
- **Request Body**:
```json
{
  "userId": "user-id-123",
  "firstName": "John",
  "lastName": "Doe",
  "dob": "1990-01-01",
  "email": "user@example.com",
  "phone": "0123456789",
  "avatar": "http://example.com/avatar.jpg",
  "status": 1
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
  "email": "user@example.com",
  "phone": "0123456789",
  "avatar": "http://example.com/avatar.jpg",
  "status": 1
}
```
