# 📚 Book Management System

A simple, session-based book management web app built with **Node.js**, **Express**, and **MongoDB**.  
Includes user authentication, book tracking, and order handling — all in one tidy backend stack.

---

## 🚀 Features

- 👤 User signup/login using **Passport.js** + **express-session**
- 📕 Add, view, update, and delete books
- 🛒 Place and manage customer orders
- 🔐 Passwords hashed with **bcrypt**
- 🌐 MongoDB integration via **Mongoose**
- 🧭 Organized into models, controllers, and routes

---

## 🧠 Tech Stack

- **Backend**: Node.js, Express.js  
- **Database**: MongoDB, Mongoose  
- **Auth**: Passport, Passport-Local, express-session, bcrypt  
- **Frontend**: Static HTML/CSS from `public/`

---

## 🛠️ How to Run It

```bash
# 1. Clone this repo
git clone https://github.com/Lavanyasrinivasan102000/book-management.git
cd book-management

# 2. Install dependencies
npm install

# 3. Start MongoDB locally (required)
mongod

# 4. Start the server
npm start
