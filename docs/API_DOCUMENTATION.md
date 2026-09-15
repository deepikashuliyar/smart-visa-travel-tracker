# API Documentation

# Smart Visa & Travel Document Tracker

## 1. Base URL

```text
http://localhost:5000/api

2. Authentication

Protected endpoints require a JWT token.

Authorization Header
Authorization: Bearer <JWT_TOKEN>
3. Authentication APIs
Register User
POST /auth/register
Request Body
{
  "name": "Deep Test",
  "email": "deep@example.com",
  "password": "password123"
}
Purpose

Creates a new user account.

Login
POST /auth/login
Request Body
{
  "email": "deep@example.com",
  "password": "password123"
}
Purpose

Authenticates the user and returns a JWT token.

Get Current User
GET /auth/me
Authentication

Required.

Purpose

Returns the currently authenticated user's information.

4. Passport APIs

Base route:

/passport
Get Passport
GET /passport

Authentication required.

Create Passport
POST /passport
Example Request
{
  "passportNumber": "P1234567",
  "country": "India",
  "issueDate": "2024-01-01",
  "expiryDate": "2034-01-01"
}
Update Passport
PUT /passport

Authentication required.

Delete Passport
DELETE /passport

Authentication required.

5. Visa APIs

Base route:

/visa
Get Visas
GET /visa
Create Visa
POST /visa
Example Request
{
  "country": "Germany",
  "visaType": "Schengen",
  "visaNumber": "V123456",
  "issueDate": "2026-01-01",
  "expiryDate": "2026-12-31",
  "status": "ACTIVE"
}
Update Visa
PUT /visa/:id
Delete Visa
DELETE /visa/:id
6. Insurance APIs

Base route:

/insurance
Get Insurance
GET /insurance
Create Insurance
POST /insurance
Example Request
{
  "provider": "Travel Insurance Provider",
  "policyNumber": "POL123456",
  "issueDate": "2026-01-01",
  "expiryDate": "2026-12-31",
  "coverage": "International Travel"
}
Update Insurance
PUT /insurance/:id
Delete Insurance
DELETE /insurance/:id
7. Vaccination APIs

Base route:

/vaccination
Get Vaccinations
GET /vaccination
Create Vaccination
POST /vaccination
Example Request
{
  "vaccineName": "Yellow Fever",
  "vaccinationDate": "2026-01-01",
  "expiryDate": "2036-01-01",
  "certificateNumber": "CERT123456"
}
Update Vaccination
PUT /vaccination/:id
Delete Vaccination
DELETE /vaccination/:id
8. Document APIs

Base route:

/document
Get Documents
GET /document
Upload Document
POST /document
Content Type
multipart/form-data
Supported Files
PDF
JPG
JPEG
PNG
Maximum File Size
5 MB
Form Fields
documentType
expiryDate
file
Update Document
PUT /document/:id
Delete Document
DELETE /document/:id
9. Reminder APIs

Base route:

/reminders
Get Reminders
GET /reminders
Create Reminder
POST /reminders
Example Request
{
  "title": "Passport Expiry",
  "description": "Passport is approaching expiry",
  "reminderDate": "2026-12-01",
  "type": "PASSPORT"
}
Update Reminder
PUT /reminders/:id
Delete Reminder
DELETE /reminders/:id
Reminder Preferences

The reminder system supports:

Email notifications
30-day reminders
60-day reminders
90-day reminders
10. Travel History APIs

Base route:

/travel-history
Get Travel History
GET /travel-history
Create Travel Record
POST /travel-history
Example Request
{
  "country": "Germany",
  "purpose": "Tourism",
  "departureDate": "2026-10-01",
  "returnDate": "2026-10-15",
  "notes": "Vacation"
}
Update Travel Record
PUT /travel-history/:id
Delete Travel Record
DELETE /travel-history/:id
11. Admin APIs

Base route:

/admin

Administrative endpoints require administrator authorization.

Get Users
GET /admin/users
Get Compliance Information
GET /admin/compliance
Get Analytics
GET /admin/analytics
12. Health Check
GET /health
Example Response
{
  "success": true,
  "message": "Smart Visa & Travel Document Tracker API is running"
}
13. Authentication Errors
Missing Token
{
  "message": "Authentication required"
}
Invalid Token
{
  "message": "Invalid or expired token"
}
14. API Architecture

The backend follows:

Request
   ↓
Route
   ↓
Middleware
   ↓
Controller
   ↓
Service
   ↓
Prisma
   ↓
PostgreSQL

This separation keeps authentication, business logic, database operations, and HTTP handling organized.

15. Frontend API Architecture

The frontend follows:

Page
   ↓
Component
   ↓
API Function
   ↓
Axios
   ↓
Express API