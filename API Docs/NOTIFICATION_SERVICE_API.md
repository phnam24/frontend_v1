# Notification Service API Documentation

Base URL: `/email/send`

---

## Email API

### 1. Send Email
- **URL**: `POST /email/send`
- **Auth**: Not required
- **Request Body**:
```json
{
  "to": {
    "name": "Recipient Name",
    "email": "recipient@example.com"
  },
  "subject": "Email Subject",
  "htmlContent": "<h1>Email Content</h1>"
}
```
- **Response**:
```json
{
  "result": {
    "messageId": "message-id-123"
  }
}
```

---

## Kafka Listener (Internal)

The notification service listens to Kafka topic `onboard-successful` for automatic email notifications when users are onboarded.

**Topic**: `onboard-successful`

**Event Structure**:
```json
{
  "channel": "EMAIL",
  "recipient": "user@example.com",
  "subject": "Welcome!",
  "body": "Welcome to our platform",
  "param": {}
}
```

This is an internal mechanism and not exposed as a REST API endpoint.
