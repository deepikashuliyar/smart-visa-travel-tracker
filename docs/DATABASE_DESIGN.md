# Database Design

# Smart Visa & Travel Document Tracker

## 1. Database Overview

The application uses PostgreSQL as the relational database and Prisma ORM for database access.

Database name:

```text
smart_visa_tracker

Database architecture:

React Frontend
      ↓
Node.js + Express
      ↓
Prisma ORM
      ↓
PostgreSQL
2. Database Tables

The system contains the following 9 tables:

User
Passport
Visa
Insurance
Vaccination
TravelHistory
Reminder
ReminderPreference
Document
3. User Table

The User table stores registered user accounts.

Field	Type	Description
id	Int	Primary key
name	String	User name
email	String	Unique email
passwordHash	String	Hashed password
role	String	User role
createdAt	DateTime	Account creation date
updatedAt	DateTime	Last update date
Relationships

A user can have:

One Passport
Many Visas
Many Insurance records
Many Vaccination records
Many Travel History records
Many Reminders
Many Documents
One Reminder Preference
4. Passport Table

The Passport table stores passport information.

Field	Type	Description
id	Int	Primary key
userId	Int	User reference
passportNumber	String	Unique passport number
country	String	Passport country
issueDate	DateTime	Issue date
expiryDate	DateTime	Expiry date
createdAt	DateTime	Creation date
updatedAt	DateTime	Last update date
Relationship
User 1 ───── 1 Passport

Each user can have one passport.

5. Visa Table

The Visa table stores visa information.

Field	Type	Description
id	Int	Primary key
userId	Int	User reference
country	String	Visa country
visaType	String	Type of visa
visaNumber	String	Visa number
issueDate	DateTime	Issue date
expiryDate	DateTime	Expiry date
status	String	Visa status
createdAt	DateTime	Creation date
updatedAt	DateTime	Last update date
Relationship
User 1 ───── N Visa

A user can have multiple visas.

6. Insurance Table

The Insurance table stores travel insurance information.

Field	Type	Description
id	Int	Primary key
userId	Int	User reference
provider	String	Insurance provider
policyNumber	String	Policy number
issueDate	DateTime	Issue date
expiryDate	DateTime	Expiry date
coverage	String	Coverage information
createdAt	DateTime	Creation date
updatedAt	DateTime	Last update date
Relationship
User 1 ───── N Insurance
7. Vaccination Table

The Vaccination table stores vaccination records.

Field	Type	Description
id	Int	Primary key
userId	Int	User reference
vaccineName	String	Vaccine name
vaccinationDate	DateTime	Vaccination date
expiryDate	DateTime	Expiry date
certificateNumber	String	Certificate number
createdAt	DateTime	Creation date
updatedAt	DateTime	Last update date
Relationship
User 1 ───── N Vaccination
8. TravelHistory Table

The TravelHistory table stores previous and planned travel information.

Field	Type	Description
id	Int	Primary key
userId	Int	User reference
country	String	Travel destination
purpose	String	Purpose of travel
departureDate	DateTime	Departure date
returnDate	DateTime	Return date
notes	String	Additional notes
createdAt	DateTime	Record creation date
Relationship
User 1 ───── N TravelHistory
9. Reminder Table

The Reminder table stores user reminders.

Field	Type	Description
id	Int	Primary key
userId	Int	User reference
title	String	Reminder title
description	String	Reminder description
reminderDate	DateTime	Reminder date
type	String	Reminder type
isCompleted	Boolean	Completion status
createdAt	DateTime	Creation date
updatedAt	DateTime	Last update date
Relationship
User 1 ───── N Reminder
10. ReminderPreference Table

The ReminderPreference table stores reminder settings.

Field	Type	Description
id	Int	Primary key
userId	Int	User reference
emailNotifications	Boolean	Email notification setting
reminder30Days	Boolean	30-day reminder
reminder60Days	Boolean	60-day reminder
reminder90Days	Boolean	90-day reminder
createdAt	DateTime	Creation date
updatedAt	DateTime	Last update date
Relationship
User 1 ───── 1 ReminderPreference
11. Document Table

The Document table stores uploaded travel documents.

Field	Type	Description
id	Int	Primary key
userId	Int	User reference
documentType	String	Type of document
fileName	String	Uploaded file name
fileUrl	String	File location
uploadedAt	DateTime	Upload date
expiryDate	DateTime	Document expiry
Relationship
User 1 ───── N Document
12. Entity Relationship Overview
                         ┌──────────────┐
                         │     User     │
                         └──────┬───────┘
                                │
          ┌─────────────────────┼──────────────────────┐
          │          │          │          │            │
          ▼          ▼          ▼          ▼            ▼
      Passport     Visa     Insurance  Vaccination  TravelHistory
          │          │          │          │            │
          └──────────┴──────────┴──────────┴────────────┘
                                │
                         ┌──────┴───────┐
                         ▼              ▼
                     Reminder       Document
                         │
                         ▼
                ReminderPreference
13. Foreign Keys

The following tables contain a foreign key referencing User.id:

Passport
Visa
Insurance
Vaccination
TravelHistory
Reminder
ReminderPreference
Document

Example:

Passport.userId → User.id
14. Cascade Delete

User-related records use cascade deletion.

When a user is deleted, their related records can also be removed according to the configured Prisma relationships.

This maintains referential integrity.

15. Unique Constraints

The database contains important unique constraints.

User
email

must be unique.

Passport
userId
passportNumber

are unique.

ReminderPreference
userId

is unique.

16. ORM

Prisma is used as the Object-Relational Mapper.

The application follows:

Application
     ↓
Prisma Client
     ↓
PostgreSQL

Prisma handles:

Database queries
Relationships
Schema management
Migrations
Data validation at the ORM level
17. Database Migration

Prisma migrations are used to manage database schema changes.

Migration status can be checked using:

npx prisma migrate status

The database should remain synchronized with the Prisma schema.

18. Database Security

Database-related security measures include:

Passwords are stored as bcrypt hashes.
User data is associated with authenticated user IDs.
Protected API routes require JWT authentication.
Administrative functionality requires appropriate authorization.
Foreign-key relationships maintain data integrity.