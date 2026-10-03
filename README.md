# KINSHIP — Volunteer Management System

A full-stack Volunteer Management System designed to connect volunteers with community initiatives, events, and organizations.

---

## 🚀 Features

- **Authentication & Authorization**: Secure user registration and login with JWT and hashed passwords using bcrypt.
- **Volunteer Management**: Profile management, skills tracking, and availability status.
- **Event / Task Coordination**: Event listing, sign-up workflows, and participation management.
- **Responsive Modern UI**: Built with React, Vite, and modern styling.
- **RESTful API**: Clean Express.js backend with MongoDB/Mongoose.

---

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express 5**
- **MongoDB** with **Mongoose**
- **JSON Web Tokens (JWT)** for authentication
- **Bcrypt.js** for password encryption
- **CORS** & **dotenv**

### Frontend
- **React** (Vite)
- **CSS** & Modern UI components
- **Lucide Icons**

---

## 📂 Project Structure

```
Backend_Main/
├── controllers/          # Express route controllers
├── middleware/           # Auth and validation middleware
├── models/               # Mongoose data models
├── routes/               # API endpoints
├── volunteer-frontend/   # React Vite frontend application
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore configuration
├── package.json          # Backend dependencies and scripts
└── server.js             # Express server entry point
```

---

## ⚙️ Getting Started

### 1. Prerequisites
- Node.js (v18+ recommended)
- MongoDB database (local or MongoDB Atlas)

### 2. Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/kunwarbhosle07/KINSHIP_Volunteer-Management-System.git
   cd KINSHIP_Volunteer-Management-System
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   Copy `.env.example` to `.env` and fill in your configuration:
   ```bash
   cp .env.example .env
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd volunteer-frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
