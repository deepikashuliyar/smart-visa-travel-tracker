# Product Requirements Document (PRD)

# Smart Visa & Travel Document Tracker

## 1. Project Overview

Smart Visa & Travel Document Tracker is a web-based application designed to help travelers manage important travel documents, monitor expiration dates, receive reminders, and maintain travel history.

The system helps prevent missed document renewals, visa expiry, travel disruptions, and compliance issues.

---

## 2. Problem Statement

Travelers often manage passports, visas, insurance documents, vaccination certificates, and other travel documents separately.

This can result in:

- Missed expiration dates
- Forgotten visa renewals
- Expired travel insurance
- Missing vaccination certificates
- Difficulty tracking previous trips
- Lack of centralized document management

The application provides a centralized platform for managing these requirements.

---

## 3. Objectives

The main objectives are:

1. Provide a centralized travel document management system.
2. Allow users to manage passport information.
3. Allow users to manage visa information.
4. Manage travel insurance details.
5. Manage vaccination records.
6. Upload and store travel-related documents.
7. Track document expiration dates.
8. Generate expiry reminders.
9. Maintain travel history.
10. Provide destination-specific checklists.
11. Provide a dashboard showing travel compliance information.
12. Provide administrative monitoring and analytics.

---

## 4. Target Users

### 4.1 Travelers

Users can:

- Register and log in.
- Manage their travel documents.
- Upload documents.
- Track expiry dates.
- View reminders.
- Manage travel history.
- Check destination requirements.

### 4.2 Administrators

Administrators can:

- View registered users.
- Monitor compliance information.
- View system analytics.
- Monitor important system statistics.

---

## 5. Functional Requirements

### 5.1 User Authentication

The system shall provide:

- User registration
- User login
- JWT-based authentication
- Password hashing using bcrypt
- Protected API routes
- User role management
- Logout functionality

---

### 5.2 Passport Management

Users shall be able to:

- Add passport details
- View passport details
- Edit passport details
- Delete passport details
- Track passport expiry

Passport information includes:

- Passport number
- Country
- Issue date
- Expiry date

---

### 5.3 Visa Management

Users shall be able to:

- Add visas
- View visas
- Edit visas
- Delete visas
- Track visa expiry

Visa information includes:

- Country
- Visa type
- Visa number
- Issue date
- Expiry date
- Status

---

### 5.4 Insurance Management

Users shall be able to:

- Add insurance details
- View insurance details
- Edit insurance details
- Delete insurance details
- Track insurance expiry

Insurance information includes:

- Provider
- Policy number
- Issue date
- Expiry date
- Coverage

---

### 5.5 Vaccination Management

Users shall be able to:

- Add vaccination records
- View vaccination records
- Edit vaccination records
- Delete vaccination records
- Track vaccination expiry where applicable

Vaccination information includes:

- Vaccine name
- Vaccination date
- Expiry date
- Certificate number

---

### 5.6 Document Vault

Users shall be able to:

- Upload travel documents
- Select document type
- Set an expiry date
- View uploaded documents
- Delete uploaded documents
- Validate uploaded file types
- Restrict uploaded file size

Supported document formats include:

- PDF
- JPG
- JPEG
- PNG

---

### 5.7 Expiry Tracking

The system shall calculate document expiry status.

Documents may be classified as:

- Valid
- Expiring Soon
- Expired

The dashboard shall display expiry-related information.

---

### 5.8 Reminder System

The system shall generate reminders for upcoming document expirations.

Reminder intervals include:

- 90 days
- 60 days
- 30 days

Users shall be able to configure reminder preferences.

The system shall avoid creating duplicate expiry reminders.

---

### 5.9 Travel History

Users shall be able to:

- Add travel records
- View travel records
- Edit travel records
- Delete travel records

Travel information includes:

- Country
- Purpose
- Departure date
- Return date
- Notes

---

### 5.10 Destination Checklist

The system shall provide destination-specific travel checklists.

The checklist may contain common travel requirements and destination-specific requirements.

Supported destinations include countries and locations such as:

- Germany
- France
- Italy
- Spain
- USA
- UK
- Canada
- Australia
- Singapore
- Dubai/UAE

---

### 5.11 Dashboard

The dashboard shall provide an overview of the user's travel compliance.

It shall display information such as:

- Total documents
- Valid documents
- Expiring documents
- Expired documents
- Urgent alerts
- Upcoming reminders
- Destination checklist access
- Schengen travel information

---

### 5.12 Admin Module

Administrators shall have access to:

- Admin dashboard
- User management
- Compliance information
- Analytics

The system shall restrict administrative functionality to authorized users.

---

## 6. Non-Functional Requirements

### 6.1 Security

The system shall use:

- JWT authentication
- bcrypt password hashing
- Protected routes
- Role-based access control
- Authenticated document access

---

### 6.2 Performance

The application should provide:

- Fast API responses
- Efficient database queries
- Responsive dashboard loading
- Efficient document management

---

### 6.3 Usability

The application shall provide:

- Simple navigation
- Clear status indicators
- User-friendly forms
- Responsive design
- Mobile, tablet, and desktop compatibility

---

### 6.4 Maintainability

The application shall follow a structured architecture.

Backend flow:

Request → Route → Middleware → Controller → Service → Prisma → PostgreSQL

Frontend flow:

Page → Component → API Function → Axios → Express API

---

## 7. Technology Stack

### Frontend

- React.js
- Vite
- JavaScript
- CSS3
- React Router
- Axios

### Backend

- Node.js
- Express.js

### Database

- PostgreSQL
- Prisma ORM

### Authentication

- JWT
- bcrypt

### Scheduling

- node-cron

### File Upload

- Multer

### Deployment

- Vercel
- Render
- PostgreSQL hosting

---

## 8. Main Application Pages

The application contains:

- Landing
- Login
- Register
- Dashboard
- Documents
- Passports
- Visas
- Insurance
- Vaccinations
- Reminders
- Travel History
- Destination Checklist
- Admin Dashboard
- Users
- Compliance
- Analytics

---

## 9. User Flow

```text
Landing Page
     ↓
Register / Login
     ↓
Dashboard
     ↓
Manage Travel Documents
     ↓
Track Expiry Dates
     ↓
Receive Reminders
     ↓
Manage Travel History
     ↓
Check Destination Requirements

10. Admin Flow
Admin Login
     ↓
Admin Dashboard
     ↓
User Management
     ↓
Compliance Monitoring
     ↓
Analytics
11. Expected Outcome

The final system should provide travelers with a centralized platform for managing travel documents, monitoring expiry dates, receiving reminders, maintaining travel history, and checking destination requirements.