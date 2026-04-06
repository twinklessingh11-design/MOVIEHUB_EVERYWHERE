* QuickShow – Movie Ticket Booking System
A full-stack MERN-based movie ticket booking platform with real-time seat locking, secure payments, and admin analytics.

* Project Overview
QuickShow is a modern movie booking system designed to provide a seamless experience for users to browse movies, select seats, and book tickets in real time.
It follows a structured SDLC (Software Development Life Cycle) approach and implements scalable backend architecture with responsive frontend UI.

* Features
   User Authentication (JWT आधारित)
   Dynamic Movie Catalog
   Real-time Seat Selection
   10-Minute Seat Locking System
   Secure Payment Integration (Stripe/Razorpay)
   Automated Email Notifications
   Admin Dashboard & Analytics
   Responsive UI (Mobile Friendly)
   Tech Stack
   Frontend
   React.js
   Tailwind CSS / CSS
   Axios
   Backend
   Node.js
   Express.js
   Database
   MongoDB
   Authentication & Services
   JWT Authentication
   Nodemailer / SendGrid
   Inngest (Background Jobs)
   Payment Gateway
   Stripe / Razorpay

* System Architecture
   Followed 3-Level DFD (0, 1, 2)
* Modular Architecture:
Authentication Module
Movie Management
Booking System
Payment System

* Database Design
 Core Tables / Collections
  Users
Stores user authentication & profile data
Fields: user_id, username, email, password_hash, created_at
   Movies
Movie catalog managed by Admin
Fields: movie_id, title, genre, duration, rating
   Shows
Movie scheduling system
Fields: show_id, movie_id, start_time, screen_number, price
   Seats
Real-time seat tracking
Fields:
seat_id
status (Available | Locked | Booked)
lock_until (10-min expiry)
 Bookings
Transaction records
Fields: booking_id, user_id, show_id, total_amount, payment_status
