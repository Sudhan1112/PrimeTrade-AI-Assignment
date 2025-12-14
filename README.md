# PrimeTrade AI - Advanced Task Management System

**PrimeTrade AI** is a scalable, production-ready Full-Stack Task Management Application built with a modern tech stack. It features a robust backend architecture, a stunning glassmorphic UI, role-based access control, and comprehensive security measures.

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 🚀 Technology Stack

### **Frontend**
- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS v4 (Modern Utility-First CSS)
- **Design System**: Glassmorphism, Gradient Themes, Dark Mode, Animations
- **Icons**: Lucide React
- **State Management**: React Context API (Auth & Theme)
- **Routing**: React Router DOM v6
- **Notifications**: React Hot Toast

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Custom JWT Implementation + Supabase Auth
- **Validation**: Joi
- **Security**: Helmet, Rate Limiting, CORS, HPP (HTTP Parameter Pollution), XSS Clean
- **Logging**: Winston & Morgan

---

## ✨ Key Features

### **🎨 Modern User Interface**
- **Glassmorphism Design**: Translucent cards with blur effects (`backdrop-filter`).
- **Dynamic Themes**: Built-in **Dark Mode** & Light Mode with seamless toggling.
- **Micro-interactions**: Smooth transitions (`framer-motion` style CSS animations) for hover states, modals, and page loads.
- **Responsive Layout**: Fully optimized for Desktop, Tablet, and Mobile.
- **Fixed Navigation**: Sticky navbar with blur effect for better UX.

### **🔐 Authentication & Security**
- **Secure Auth Flow**: JWT (JSON Web Tokens) based authentication with HttpOnly cookies option (configurable).
- **Role-Based Access Control (RBAC)**:
  - **User**: Can manage ONLY their own tasks.
  - **Admin**: Can view and manage ALL tasks and users.
- **Input Validation**: Strict request validation using `Joi` schemas.
- **Data Protection**: SQL Injection prevention & XSS sanitization.
- **Rate Limiting**: Protection against DDoS and brute-force attacks.

### **📊 Smart Dashboard**
- **Real-time Statistics**: Instant overview of Total, Pending, In Progress, and Completed tasks.
- **Task Management**:
  - Create, Edit, Delete tasks via a modern Modal UI.
  - Filter tasks by **Status** (Pending, In Progress, Completed) and **Priority** (Low, Medium, High).
- **Empty States**: Beautifully designed empty states when no data is available.

---

## 🛠️ Installation & Setup Guide

### **Prerequisites**
- **Node.js**: v18 or higher
- **NPM** or **Yarn**
- **Supabase Account**: For the PostgreSQL database.

### **Step 1: Clone the Repository**
```bash
git clone https://github.com/Sudhan1112/PrimeTrade-AI-Assignment.git
cd PrimeTrade-AI-Assignment
```

### **Step 2: Backend Setup**
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and add your credentials:
   ```env
   PORT=5000
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   JWT_SECRET=your_secure_random_string
   NODE_ENV=development
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### **Step 3: Frontend Setup**
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and visit: `http://localhost:5173`

---

## 📚 Project Structure

```bash
PrimeTrade-AI/
├── backend/                # Express.js Backend
│   ├── config/             # DB & Env Config
│   ├── controllers/        # Request Handlers
│   ├── middleware/         # Auth & Error Middleware
│   ├── routes/             # API Routes
│   ├── services/           # Business Logic
│   ├── utils/              # Helper Functions (Logger, etc.)
│   └── tests/              # Jest Unit Tests
│
└── frontend/               # React.js Frontend
    ├── src/
    │   ├── components/     # Reusable UI Components
    │   ├── context/        # Global State (Auth, Theme)
    │   ├── services/       # API Calls (Axios)
    │   ├── pages/          # Views (Login, Dashboard)
    │   └── index.css       # Tailwind v4 & Custom Styles
```

---

## 🧪 Running Tests

The project includes unit tests for critical backend logic using **Jest**.

```bash
cd backend
npm test
```

---

## 🛡️ API Documentation

The API follows RESTful principles. Below is a high-level overview:

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Register a new user | Public |
| **POST** | `/api/auth/login` | Login user & get Token | Public |
| **GET** | `/api/tasks` | Get all tasks (User specific) | Private |
| **POST** | `/api/tasks` | Create a new task | Private |
| **PUT** | `/api/tasks/:id` | Update a task | Private |
| **DELETE** | `/api/tasks/:id` | Delete a task | Private |

---

## 👤 Author

**Sudhan S**
- **GitHub**: [Sudhan1112](https://github.com/Sudhan1112)
- **Role**: Full Stack Developer

---

**Developed for PrimeTrade AI Assignment** 🚀
