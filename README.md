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

---

## ✨ Features

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

Maximum file size:

```text
5 MB

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

Germany
France
Italy
Spain
USA
UK
Canada
Australia
Singapore
Dubai/UAE
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
👨‍💼 Admin Module

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
Deployment
Vercel
Render
PostgreSQL hosting
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
🚀 Getting Started
1. Clone the Repository
git clone <your-github-repository-url>
cd smart-visa-travel-tracker
Backend Setup

Open a terminal:

cd backend

Install dependencies:

npm install

Create the backend .env file.

Example:

DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/smart_visa_tracker"
JWT_SECRET="your_jwt_secret"
PORT=5000

Generate Prisma Client:

npx prisma generate

Run migrations:

npx prisma migrate dev

Start the backend:

npm run dev

Backend runs on:

http://localhost:5000

Health check:

http://localhost:5000/api/health
Frontend Setup

Open another terminal:

cd frontend

Install dependencies:

npm install

Start the frontend:

npm run dev

The frontend will be available at the Vite development URL shown in the terminal.

🔑 Authentication

The application uses JWT authentication.

After successful login, the JWT token is stored on the client and automatically attached to protected API requests.

Example:

Authorization: Bearer <JWT_TOKEN>

Passwords are stored using bcrypt hashing rather than plain text.

📄 Document Upload

The Document Vault accepts:

PDF
JPG
JPEG
PNG

Maximum upload size:

5 MB

Uploaded documents are stored by the backend and exposed through the configured upload route.

🔔 Reminder Scheduler

The backend uses node-cron for scheduled reminder processing.

The reminder system checks document expiry information and generates applicable reminders according to the configured reminder intervals.

Supported intervals:

90 days
60 days
30 days
🧪 Testing

The application has been tested for:

Registration
Login
JWT authentication
Protected routes
Database connectivity
Passport CRUD
Visa CRUD
Insurance CRUD
Vaccination CRUD
Document upload
Expiry tracking
Reminder system
Travel History
Destination Checklist
Dashboard
Admin module
Responsive UI

See:

docs/TESTING.md

for detailed testing documentation.

📚 Documentation

Additional project documentation:

Product Requirements
docs/PRD.md
API Documentation
docs/API_DOCUMENTATION.md
Database Design
docs/DATABASE_DESIGN.md
Testing Documentation
docs/TESTING.md
🔒 Security

The application includes:

JWT authentication
bcrypt password hashing
Protected API routes
Role-based authorization
Authenticated user data access
File upload validation
Database relationships and constraints
📱 Responsive Design

The application has been tested on:

Desktop
Tablet
Mobile

The interface is designed to provide a responsive experience across different screen sizes.

🎯 Project Goals

The main goal of the project is to provide travelers with a centralized platform for managing travel documents and compliance requirements.

The system aims to reduce:

Missed document renewals
Expired visas
Expired insurance
Missing travel documents
Forgotten reminders
🔮 Future Enhancements

Possible future improvements include:

Cloud document storage
Production email notifications
AI-powered document scanning
Automatic destination rule updates
More country-specific requirements
Advanced analytics
Mobile application
Multi-language support
👩‍💻 Project Status

Status: Development completed and major functionality tested successfully.

The project has successfully completed functional testing, integration testing, and responsive UI testing.

The next stage is deployment and final project presentation preparation.