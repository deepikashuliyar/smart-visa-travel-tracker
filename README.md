# Smart Visa & Travel Document Tracker

A web-based travel document management and compliance tracking system that helps travelers manage passports, visas, insurance, vaccination records, uploaded documents, expiry dates, reminders, and travel history in one centralized platform.

---

## 📌 Project Overview

Travelers often need to manage several important documents and deadlines such as passports, visas, travel insurance, and vaccination certificates.

Missing an expiry date or renewal deadline can cause travel disruptions.

The Smart Visa & Travel Document Tracker provides a centralized solution to:

- Manage travel documents
- Track expiry dates
- Upload important files
- Generate expiry reminders
- Maintain travel history
- Check destination requirements
- Monitor travel compliance
- Provide administrative analytics

### 🔐 Authentication

- User registration
- User login
- JWT authentication
- Password hashing using bcrypt
- Protected routes
- Role-based access control
- Logout

### 🛂 Passport Management

- Add passport
- View passport
- Edit passport
- Delete passport
- Track passport expiry

### 🛃 Visa Management

- Add visa
- View visa
- Edit visa
- Delete visa
- Track visa expiry
- Visa status management

### 🏥 Insurance Management

- Add insurance
- View insurance
- Edit insurance
- Delete insurance
- Track insurance expiry

### 💉 Vaccination Management

- Add vaccination record
- View vaccination record
- Edit vaccination record
- Delete vaccination record
- Track vaccination expiry

### 📁 Document Vault

- Upload travel documents
- Store document information
- Set expiry dates
- View uploaded files
- Delete documents
- File type validation
- File size validation

Supported formats:

- PDF
- JPG
- JPEG
- PNG

🔔 Reminder System

The application provides expiry reminders for:

90 days
60 days
30 days

Users can configure:

Email notifications
30-day reminders
60-day reminders
90-day reminders

The system also prevents duplicate expiry reminders.

✈️ Travel History

Users can:

Add travel records
View travel history
Edit travel records
Delete travel records


🌍 Destination Checklist

Destination-specific travel requirements can be checked for supported locations including:

📊 Dashboard

The dashboard provides:

Total documents
Valid documents
Expiring documents
Expired documents
Urgent alerts
Upcoming reminders
Destination checklist
Travel information
Schengen travel information
Admin Module

Administrators can access:

Admin Dashboard
User Management
Compliance Monitoring
Analytics


🛠️ Technology Stack
Frontend
React.js
Vite
JavaScript
CSS3
React Router
Axios

Backend
Node.js
Express.js
Database
PostgreSQL
Prisma ORM
Authentication
JWT
bcrypt
File Upload
Multer
Scheduling
node-cron

🏗️ Architecture

Backend Architecture

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

Frontend Architecture

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

📂 Project Structure
smart-visa-travel-tracker/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── .env
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── jobs/
│   │   ├── prisma/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── .env
│
├── docs/
│   ├── PRD.md
│   ├── API_DOCUMENTATION.md
│   ├── DATABASE_DESIGN.md
│   └── TESTING.md
│
├── .gitignore
└── README.md
🗄️ Database

The application uses PostgreSQL with Prisma ORM.

The database contains:

User
Passport
Visa
Insurance
Vaccination
TravelHistory
Reminder
ReminderPreference
Document

👩‍💻 Project Status

Status: Development completed and major functionality tested successfully.

The project has successfully completed functional testing, integration testing, and responsive UI testing.

The next stage is deployment and final project presentation preparation.
