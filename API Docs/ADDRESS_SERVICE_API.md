## Address Management APIs

### 1. Create Address
- **URL**: `POST /api/v1/profile/addresses`
- **Auth**: Required (JWT Token)
- **Request Body**:
```json
{
  "receiverName": "Nguyen Van A",
  "phone": "0123456789",
  "addressLine": "123 Nguyen Trai",
  "province": "Hanoi",
  "district": "Thanh Xuan",
  "ward": "Nhan Chinh",
  "isDefault": false
}
```
- **Response**:
```json
{
  "code": 1000,
  "result": {
    "id": 1,
    "userId": "user123",
    "receiverName": "Nguyen Van A",
    "phone": "0123456789",
    "addressLine": "123 Nguyen Trai",
    "province": "Hanoi",
    "district": "Thanh Xuan",
    "ward": "Nhan Chinh",
    "isDefault": false
  }
}
```

### 2. Update Address
- **URL**: `PUT /api/v1/profile/addresses/{addressId}`
- **Auth**: Required (JWT Token)
- **Path Parameters**:
  - `addressId` (required): Address ID
- **Request Body**:
```json
{
  "receiverName": "Nguyen Van B",
  "phone": "0987654321",
  "addressLine": "456 Le Loi",
  "province": "Ho Chi Minh",
  "district": "District 1",
  "ward": "Ben Nghe",
  "isDefault": true
}
```
- **Response**:
```json
{
  "code": 1000,
  "result": {
    "id": 1,
    "userId": "user123",
    "receiverName": "Nguyen Van B",
    "phone": "0987654321",
    "addressLine": "456 Le Loi",
    "province": "Ho Chi Minh",
    "district": "District 1",
    "ward": "Ben Nghe",
    "isDefault": true
  }
}
```

### 3. Get Address by ID
- **URL**: `GET /api/v1/profile/addresses/{addressId}`
- **Auth**: Required (JWT Token)
- **Path Parameters**:
  - `addressId` (required): Address ID
- **Response**:
```json
{
  "code": 1000,
  "result": {
    "id": 1,
    "userId": "user123",
    "receiverName": "Nguyen Van A",
    "phone": "0123456789",
    "addressLine": "123 Nguyen Trai",
    "province": "Hanoi",
    "district": "Thanh Xuan",
    "ward": "Nhan Chinh",
    "isDefault": false
  }
}
```

### 4. Get My Address
- **URL**: `GET /api/v1/profile/addresses/my-address`
- **Auth**: Required (JWT Token)
- **Description**: Get the first address of current user
- **Response**:
```json
{
  "code": 1000,
  "result": {
    "id": 1,
    "userId": "user123",
    "receiverName": "Nguyen Van A",
    "phone": "0123456789",
    "addressLine": "123 Nguyen Trai",
    "province": "Hanoi",
    "district": "Thanh Xuan",
    "ward": "Nhan Chinh",
    "isDefault": false
  }
}
```

### 5. Get My Default Address
- **URL**: `GET /api/v1/profile/addresses/my-address/default`
- **Auth**: Required (JWT Token)
- **Description**: Get the default address of current user
- **Response**:
```json
{
  "code": 1000,
  "result": {
    "id": 2,
    "userId": "user123",
    "receiverName": "Nguyen Van B",
    "phone": "0987654321",
    "addressLine": "456 Le Loi",
    "province": "Ho Chi Minh",
    "district": "District 1",
    "ward": "Ben Nghe",
    "isDefault": true
  }
}
```

### 6. Get All My Addresses
- **URL**: `GET /api/v1/profile/addresses/my-addresses`
- **Auth**: Required (JWT Token)
- **Description**: Get all addresses of current user
- **Response**:
```json
{
  "code": 1000,
  "result": [
    {
      "id": 1,
      "userId": "user123",
      "receiverName": "Nguyen Van A",
      "phone": "0123456789",
      "addressLine": "123 Nguyen Trai",
      "province": "Hanoi",
      "district": "Thanh Xuan",
      "ward": "Nhan Chinh",
      "isDefault": false
    },
    {
      "id": 2,
      "userId": "user123",
      "receiverName": "Nguyen Van B",
      "phone": "0987654321",
      "addressLine": "456 Le Loi",
      "province": "Ho Chi Minh",
      "district": "District 1",
      "ward": "Ben Nghe",
      "isDefault": true
    }
  ]
}
```

### 7. Delete Address by ID
- **URL**: `DELETE /api/v1/profile/addresses/{addressId}`
- **Auth**: Required (JWT Token)
- **Path Parameters**:
  - `addressId` (required): Address ID
- **Response**:
```json
{
  "code": 1000,
  "result": null
}
```

### 8. Delete All My Addresses
- **URL**: `DELETE /api/v1/profile/addresses/my-addresses`
- **Auth**: Required (JWT Token)
- **Description**: Delete all addresses of current user
- **Response**:
```json
{
  "code": 1000,
  "result": null
}
```

### 9. Set Default Address
- **URL**: `PUT /api/v1/profile/addresses/{addressId}/set-default`
- **Auth**: Required (JWT Token)
- **Path Parameters**:
  - `addressId` (required): Address ID to set as default
- **Description**: Set an address as default and unset other addresses
- **Response**:
```json
{
  "code": 1000,
  "result": {
    "id": 1,
    "userId": "user123",
    "receiverName": "Nguyen Van A",
    "phone": "0123456789",
    "addressLine": "123 Nguyen Trai",
    "province": "Hanoi",
    "district": "Thanh Xuan",
    "ward": "Nhan Chinh",
    "isDefault": true
  }
}
```

### Notes:
- All endpoints require JWT authentication
- Only the owner of the address can view, update, or delete it

### 10. Get All Provinces
- **URL**: `GET https://tinhthanhpho.com/api/v1/provinces`
- **Auth**: Not required
- **Query Parameters**:
  - `keyword` (optional): Search keyword or ID
  - `limit` (optional): Number of results per page (default: 20)
  - `page` (optional): Page number (default: 1)
- **Response**:
```json
{
  "success": true,
  "data": [
    {
      "code": "01",
      "name": "Hà Nội",
      "type": "Thành phố"
    },
    {
      "code": "79",
      "name": "Hồ Chí Minh",
      "type": "Thành phố"
    }
  ],
  "metadata": {
    "total": 63,
    "page": 1,
    "limit": 20
  }
}
```

### 11. Get Districts by Province
- **URL**: `GET https://tinhthanhpho.com/api/v1/provinces/{provinceCode}/districts`
- **Auth**: Not required
- **Path Parameters**:
  - `provinceCode` (required): Province code
- **Query Parameters**:
  - `keyword` (optional): Search keyword or ID
  - `limit` (optional): Number of results per page (default: 20)
  - `page` (optional): Page number (default: 1)
- **Response**:
```json
{
  "success": true,
  "data": [
    {
      "code": "001",
      "name": "Ba Đình",
      "type": "Quận",
      "province_code": "01"
    },
    {
      "code": "002",
      "name": "Hoàn Kiếm",
      "type": "Quận",
      "province_code": "01"
    }
  ],
  "metadata": {
    "total": 30,
    "page": 1,
    "limit": 20
  }
}
```

### 12. Get Wards by District
- **URL**: `GET https://tinhthanhpho.com/api/v1/districts/{districtCode}/wards`
- **Auth**: Not required
- **Path Parameters**:
  - `districtCode` (required): District code
- **Query Parameters**:
  - `keyword` (optional): Search keyword or ID
  - `limit` (optional): Number of results per page (default: 20)
  - `page` (optional): Page number (default: 1)
- **Response**:
```json
{
  "success": true,
  "data": [
    {
      "code": "00001",
      "name": "Phúc Xá",
      "type": "Phường",
      "district_code": "001",
      "province_code": "01"
    },
    {
      "code": "00004",
      "name": "Trúc Bạch",
      "type": "Phường",
      "district_code": "001",
      "province_code": "01"
    }
  ],
  "metadata": {
    "total": 15,
    "page": 1,
    "limit": 20
  }
}
```

### Notes:
- These are external APIs from `https://tinhthanhpho.com`
- No authentication required
- Use these APIs to populate province/district/ward dropdowns in address forms
- Province → District → Ward hierarchy must be followed