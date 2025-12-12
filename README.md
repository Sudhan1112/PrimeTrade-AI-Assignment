# PrimeTrade AI - Backend Intern Assignment

A scalable, production-ready Task Management System built with Node.js, Express, Supabase (PostgreSQL), and React.

## 🚀 Technlogy Stack

- **Backend**: Node.js, Express.js
- **Database**: Supabase (PostgreSQL + Auth + Realtime + RLS)
- **Frontend**: React.js, Vite, Tailwind CSS
- **Authentication**: Supabase Auth + Custom JWT Role-Based Access Control

## ✨ Features

- **Full CRUD**: Create, Read, Update, Delete tasks.
- **Role-Based Access Control (RBAC)**: 
  - Users manage their own tasks.
  - Admins can manage all tasks.
- **Scalable Architecture**: Uses Supabase connection pooling and RLS.
- **Authentication**: Secure JWT-based auth flow.
- **Dashboard**: Real-time statistics and task filtering (Status, Priority).
- **Security**: Rate limiting, Helmet, Input Validation, SQL Injection protection.

## 🛠️ Prerequisites

- Node.js (v16+)
- A Supabase Account

## 📦 Setup Instructions

### 1. Supabase Setup
1. Create a new project at [Supabase](https://supabase.com).
2. Go to the **SQL Editor** in your dashboard.
3. Run the content of `backend/database/schema.sql` to create tables and triggers.
4. Run the content of `backend/database/rls-policies.sql` to enable security policies.
5. Go to **Project Settings > API** and copy the `URL` and `anon public` key and `service_role` key.

### 2. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   - Copy `.env.example` to `.env`.
   - Fill in your Supabase credentials and JWT Secret.
   ```bash
   cp .env.example .env
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📚 Documentation

- [High Level Design (HLD)](./backend/docs/HLD.md)
- [Low Level Design (LLD)](./backend/docs/LLD.md)
- [API Documentation](./backend/docs/API_DOCUMENTATION.md)
- [Scalability Strategy](./backend/docs/SCALABILITY.md)

## 🧪 Deployment

- **Backend**: Suitable for Render / Railway / AWS.
- **Frontend**: Suitable for Vercel / Netlify.
- **Database**: Managed by Supabase.

## 🛡️ Security Notes
- Row Level Security (RLS) is enabled on all tables.
- Service Role Key is used only on the backend for Admin operations.
- Input validation is enforced on all API endpoints.

---
**Author**: Sudhan S
