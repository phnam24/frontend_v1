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

## Address APIs (GHN - Giao Hàng Nhanh)

### 10. Get All Provinces
- **URL**: `GET https://online-gateway.ghn.vn/shiip/public-api/master-data/province`
- **Auth**: Required (GHN Token)
- **Headers**:
  - `token`: Your GHN API token (for account authentication)
- **Response**:
```json
{
  "code": 200,
  "message": "Success",
  "data": [
    {
      "ProvinceID": 202,
      "ProvinceName": "Hồ Chí Minh",
      "CountryID": 1,
      "Code": 8,
      "NameExtension": [
        "Hồ Chí Minh",
        "TP.Hồ Chí Minh",
        "TP. Hồ Chí Minh",
        "TP Hồ Chí Minh",
        "Thành phố Hồ Chí Minh",
        "HCM",
        "hochiminh",
        "saigon",
        "sg"
      ],
      "IsEnable": 1,
      "RegionID": 1,
      "UpdatedBy": 1718600,
      "CreatedAt": "2019-12-05 15:41:26.891217",
      "UpdatedAt": "2019-12-05 15:41:26.891217",
      "CanUpdateCOD": false,
      "Status": 1
    },
    {
      "ProvinceID": 201,
      "ProvinceName": "Hà Nội",
      "CountryID": 1,
      "Code": 1,
      "NameExtension": [
        "Hà Nội",
        "Ha Noi",
        "HN",
        "hanoi"
      ],
      "IsEnable": 1,
      "RegionID": 2,
      "CanUpdateCOD": false,
      "Status": 1
    }
  ]
}
```

### 11. Get Districts by Province
- **URL**: `GET https://online-gateway.ghn.vn/shiip/public-api/master-data/district`
- **Auth**: Required (GHN Token)
- **Headers**:
  - `token`: Your GHN API token
- **Query Parameters**:
  - `province_id` (required): Province ID from province API
- **Example**: `GET https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=202`
- **Response**:
```json
{
  "code": 200,
  "message": "Success",
  "data": [
    {
      "DistrictID": 3695,
      "ProvinceID": 202,
      "DistrictName": "Thành Phố Thủ Đức",
      "Code": 3695,
      "Type": 3,
      "SupportType": 3,
      "NameExtension": [
        "TP Thủ Đức",
        "thành phố thủ đức",
        "TP. Thủ Đức",
        "TP. Thu Duc",
        "thuduc"
      ],
      "IsEnable": 1,
      "CanUpdateCOD": false,
      "Status": 1,
      "CreatedDate": "2020-12-25T08:02:27.479Z",
      "UpdatedDate": "2021-09-03T07:43:25.338Z"
    },
    {
      "DistrictID": 1442,
      "ProvinceID": 202,
      "DistrictName": "Quận 1",
      "Code": 1442,
      "Type": 1,
      "SupportType": 3,
      "NameExtension": [
        "Q. 1",
        "Quan 1",
        "Q1"
      ],
      "IsEnable": 1,
      "CanUpdateCOD": false,
      "Status": 1
    }
  ]
}
```

### 12. Get Wards by District
- **URL**: `GET https://online-gateway.ghn.vn/shiip/public-api/master-data/ward`
- **Auth**: Required (GHN Token)
- **Headers**:
  - `token`: Your GHN API token
- **Query Parameters**:
  - `district_id` (required): District ID from district API
- **Example**: `GET https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=3695`
- **Response**:
```json
{
  "code": 200,
  "message": "Success",
  "data": [
    {
      "WardCode": "90768",
      "DistrictID": 3695,
      "WardName": "Phường An Khánh",
      "NameExtension": [
        "P. An Khánh",
        "P. An Khanh",
        "ankhanh"
      ],
      "CanUpdateCOD": true,
      "SupportType": 3,
      "Status": 1,
      "CreatedDate": "2020-12-25T08:37:00.733Z",
      "UpdatedDate": "2021-09-02T17:00:03.375Z"
    },
    {
      "WardCode": "90769",
      "DistrictID": 3695,
      "WardName": "Phường Bình Chiểu",
      "NameExtension": [
        "P. Bình Chiểu",
        "P. Binh Chieu",
        "binhchieu"
      ],
      "CanUpdateCOD": true,
      "SupportType": 3,
      "Status": 1
    }
  ]
}
```

### Address Selection Flow:
1. **Get Provinces**: Call province API to get list of provinces
2. **Get Districts**: Select a province, then call district API with `province_id`
3. **Get Wards**: Select a district, then call ward API with `district_id`
4. **Save Address**: Use the selected IDs to save user's address

### Field Descriptions:
- **ProvinceID/DistrictID/WardCode**: Unique identifier for location
- **NameExtension**: Alternative names for easier search
- **IsEnable**: Whether the location is active (1 = active, 0 = inactive)
- **SupportType**: Type of delivery support (3 = full support)
- **CanUpdateCOD**: Whether COD (Cash on Delivery) is supported
- **Status**: Location status (1 = active)

### Notes:
- All APIs require GHN token in header for authentication
- Use `ProvinceID`, `DistrictID`, `WardCode` to identify locations
- `NameExtension` array contains various name formats for flexible search
- These APIs are provided by GHN (Giao Hàng Nhanh) shipping service
- Province → District → Ward hierarchy must be followed
- Store these IDs in your address records for shipping calculation