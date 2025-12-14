## VNPay Payment APIs

### 1. Create Payment URL
- **URL**: `POST /api/vnpay/create-payment`
- **Auth**: Not required
- **Description**: Create VNPay payment URL for an order
- **Request Body**:
```json
{
  "orderId": "12345",
  "amount": 500000
}
```
- **Response** (Success):
```json
{
  "paymentUrl": "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=50000000&vnp_Command=pay&...",
  "orderId": "12345",
  "amount": 500000,
  "message": "Tạo URL thanh toán thành công"
}
```
- **Response** (Error - Missing Order ID):
```json
{
  "message": "Order ID không được để trống"
}
```
- **Response** (Error - Invalid Amount):
```json
{
  "message": "Số tiền thanh toán phải lớn hơn 0"
}
```
- **Response** (Error - Order Not Found):
```json
{
  "message": "Đơn hàng không tồn tại hoặc không hợp lệ"
}
```

### 2. Payment Return (Callback)
- **URL**: `GET /api/vnpay/payment-return`
- **Auth**: Not required
- **Description**: VNPay callback URL after user completes payment. User will be redirected to this URL from VNPay payment gateway
- **Query Parameters** (Auto sent by VNPay):
  - `vnp_ResponseCode`: Payment response code ("00" = success)
  - `vnp_TxnRef`: Order ID
  - `vnp_TransactionNo`: VNPay transaction ID
  - `vnp_Amount`: Payment amount (multiplied by 100)
  - `vnp_BankCode`: Bank code
  - `vnp_PayDate`: Payment date (yyyyMMddHHmmss)
  - `vnp_SecureHash`: Security hash for verification
  - Other VNPay parameters...
- **Response** (Success):
```json
{
  "success": true,
  "message": "Giao dịch thành công",
  "orderId": "12345",
  "transactionId": "14012345",
  "amount": 500000,
  "responseCode": "00",
  "responseMessage": "Giao dịch thành công"
}
```
- **Response** (Failed):
```json
{
  "success": false,
  "message": "Giao dịch thất bại",
  "orderId": "12345",
  "transactionId": "14012345",
  "amount": 500000,
  "responseCode": "24",
  "responseMessage": "Khách hàng hủy giao dịch"
}
```
- **Response** (Invalid Signature):
```json
{
  "success": false,
  "message": "Chữ ký không hợp lệ. Giao dịch có thể bị giả mạo.",
  "orderId": "12345",
  "responseCode": "97",
  "responseMessage": "Invalid signature"
}
```

### 3. Payment IPN (Instant Payment Notification)
- **URL**: `GET /api/vnpay/payment-ipn`
- **Auth**: Not required
- **Description**: VNPay IPN endpoint for server-to-server payment confirmation. This is called by VNPay to confirm transaction status. This endpoint must be idempotent as VNPay may call it multiple times for the same transaction
- **Query Parameters** (Auto sent by VNPay):
  - `vnp_ResponseCode`: Payment response code ("00" = success)
  - `vnp_TxnRef`: Order ID
  - `vnp_TransactionNo`: VNPay transaction ID
  - `vnp_Amount`: Payment amount (multiplied by 100)
  - `vnp_BankCode`: Bank code
  - `vnp_PayDate`: Payment date (yyyyMMddHHmmss)
  - `vnp_SecureHash`: Security hash for verification
  - Other VNPay parameters...
- **Response** (Success):
```json
{
  "RspCode": "00",
  "Message": "Confirm Success"
}
```
- **Response** (Order Not Found):
```json
{
  "RspCode": "04",
  "Message": "Order not found"
}
```
- **Response** (Invalid Signature):
```json
{
  "RspCode": "97",
  "Message": "Checksum failed"
}
```
- **Response** (Update Failed):
```json
{
  "RspCode": "01",
  "Message": "Update order failed"
}
```
- **Response** (Internal Error):
```json
{
  "RspCode": "99",
  "Message": "Internal error: ..."
}
```

### VNPay Response Codes:
- `00`: Transaction successful
- `01`: Transaction failed
- `02`: Transaction error
- `04`: Transaction reversed (Order not found or invalid)
- `05`: Transaction is being processed by issuer
- `06`: Transaction has been requested to issuer but not yet received response
- `07`: Transaction suspected as fraud
- `09`: Customer's card/account has not registered for Internet Banking service
- `10`: Customer authentication failed more than 3 times
- `11`: Payment timeout. Please retry
- `12`: Customer's card/account is locked
- `13`: Customer entered wrong OTP. Please retry
- `24`: Customer cancelled transaction
- `51`: Customer's account has insufficient balance
- `65`: Customer's account has exceeded daily transaction limit
- `75`: Payment bank is under maintenance
- `79`: Payment amount exceeds limit
- `97`: Invalid signature
- `99`: Unknown error

### Payment Flow:
1. **Frontend** calls `POST /api/vnpay/create-payment` to get payment URL
2. **Frontend** redirects user to the payment URL
3. **User** completes payment on VNPay gateway
4. **VNPay** redirects user back to `GET /api/vnpay/payment-return` (user sees result)
5. **VNPay** also calls `GET /api/vnpay/payment-ipn` (server-to-server confirmation)
6. **Backend** updates order status to "PAID" if payment is successful

### Notes:
- All VNPay callbacks include security hash for verification
- IPN endpoint should be idempotent (handle duplicate calls)
- Payment amount in VNPay response is multiplied by 100 (need to divide by 100)
- System retries up to 3 times when updating order status fails
- IP address is automatically extracted from request headers (handles proxy/load balancer)