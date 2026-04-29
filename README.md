# 🎬 Moviehub — Movie Ticket Booking System

A full-stack MERN-based movie ticket booking platform with real-time seat locking, secure payments, and admin analytics.

---

## 🚀 Project Overview

QuickShow is a modern movie booking system designed to provide a seamless experience for users to browse movies, select seats, and book tickets in real time.

It follows a structured SDLC (Software Development Life Cycle) approach and implements a scalable backend architecture with a responsive frontend UI.

---

## ✨ Features

-  User Authentication (JWT-based)
-  Dynamic Movie Catalog
-  Real-time Seat Selection
-  10-Minute Seat Locking System
-  Secure Payment Integration (Stripe / Razorpay)
-  Automated Email Notifications
-  Admin Dashboard & Analytics
-  Fully Responsive UI (Mobile Friendly)

---

## 🛠️ Tech Stack

### 💻 Frontend
- React.js  
- Tailwind CSS / CSS  
- Axios  

### 🖥️ Backend
- Node.js  
- Express.js  

### 🗄️ Database
- MongoDB  

### 🔐 Authentication & Services
- JWT Authentication  
- Nodemailer / SendGrid  
- Inngest (Background Jobs)  

### 💳 Payment Gateway
- Stripe / Razorpay  

---
## 🏗️ System Architecture
Modules
Authentication
Movie Management
Booking System
Payment System

---
## 🧱 Database Schema
- Users
user_id
username
email
password_hash
created_at
- Movies
movie_id
title
genre
duration
rating
- Shows
show_id
movie_id
start_time
screen_number
price
- Seats
seat_id
status (Available / Locked / Booked)
lock_until
- Bookings
booking_id
user_id
show_id
total_amount
payment_status

---
## 🔗 Entity Relationship

Users ────────< Bookings >──────── Shows ──────── Movies
                    │
                    │
                   Seats

---
## 🔌 API Endpoints

🔐 Authentication APIs
| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| POST   | /api/auth/register | Register new user |
| POST   | /api/auth/login    | User login        |
| GET    | /api/auth/profile  | Get user profile  |

🎬 Movie APIs
| Method | Endpoint        | Description       |
| ------ | --------------- | ----------------- |
| GET    | /api/movies     | Get all movies    |
| GET    | /api/movies/:id | Get movie by ID   |
| POST   | /api/movies     | Add movie (Admin) |
| PUT    | /api/movies/:id | Update movie      |
| DELETE | /api/movies/:id | Delete movie      |

🕒 Show APIs
| Method | Endpoint   | Description   |
| ------ | ---------- | ------------- |
| GET    | /api/shows | Get all shows |
| POST   | /api/shows | Add new show  |

🪑 Seat APIs
| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| GET    | /api/seats/:showId | Get seats for show    |
| POST   | /api/seats/lock    | Lock seats (10 min)   |
| POST   | /api/seats/release | Release expired seats |

🎟️ Booking APIs
| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| POST   | /api/bookings      | Create booking    |
| GET    | /api/bookings/user | Get user bookings |

---
## ⚙️ Core Logic
Seat Locking Flow
User selects seats
System checks availability
Seats are locked temporarily
Lock expires after 10 minutes
Payment success → Booked
Failure/timeout → Released

---
## 🔄 Workflow
Login → Browse Movies → Select Show → Choose Seats → Lock Seats → Payment → Booking Confirmed → Email Sent

## 🛡️ Security
JWT-based authentication
Password hashing (bcrypt)
Protected routes
Secure payment gateway

## ⚡ Performance
Optimized database queries
TTL-based seat locking
Async API handling
Modular structure
  
---
##  How to Run Project (Complete Setup Guide)
 1. Clone Repository
   git clone https://github.com/your-username/quickshow.git
   cd quickshow
 2. Install Dependencies
  Backend
   cd server
   npm install
 3. Setup Environment Variables
   Create .env file inside server folder
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
 
 STRIPE_KEY=your_stripe_key
 RAZORPAY_KEY=your_razorpay_key

  EMAIL_USER=your_email
  EMAIL_PASS=your_password

 4. Run Backend
    cd server
    npm run dev
    
 5. Run Frontend
    cd client
    npm start
    
   6. Open in Browser
      http://localhost:3000

      ---
## 🌍 Deployment
Frontend
Vercel
Netlify
Backend
Render
Railway
Database
MongoDB Atlas

---
## 🚧 Future Enhancements
AI-based movie recommendations
Advanced seat visualization
Multi-language support
Mobile app version


                   
