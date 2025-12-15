# PrimeTrade AI - Advanced Task Management System

PrimeTrade AI is a scalable, production-ready Full-Stack Task Management Application built with a modern tech stack. It features a robust backend architecture, a stunning glassmorphic UI, role-based access control, and comprehensive security measures.

## 🚀 Live Demo

- **Frontend Application:** [https://prime-trade-ai-assignment.vercel.app/](https://prime-trade-ai-assignment.vercel.app/)
- **Backend API:** [https://primetrade-ai-assignment-1-er4l.onrender.com](https://primetrade-ai-assignment-1-er4l.onrender.com)

## 📸 Project Previews

| **Dashboard View** | **Task Management** |
|:---:|:---:|
| ![Dashboard Preview](PLACEHOLDER_IMAGE_URL_HERE) | ![Task Edit Modal](PLACEHOLDER_IMAGE_URL_HERE) |
| *Overview of tasks and stats* | *Creating and editing tasks* |

| **Login Screen** | **Mobile Responsiveness** |
|:---:|:---:|
| ![Login Page](PLACEHOLDER_IMAGE_URL_HERE) | ![Mobile View](PLACEHOLDER_IMAGE_URL_HERE) |
| *Secure authentication interface* | *Fully responsive design* |

---

## ✨ Key Features

### 🖥️ Frontend (React + Vite + TailwindCSS)
- **Modern Glassmorphism UI**: A visually stunning interface with blur effects, gradients, and smooth transitions.
- **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile devices.
- **Secure Authentication**: JWT-based login/register with automatic token management.
- **Smart Dashboard**: Real-time stats, task filtering (status, priority), and pagination.
- **Interactive Feedback**: Hot Toast notifications for all user actions (success, error, loading).

### ⚙️ Backend (Node.js + Express + Supabase)
- **Robust API Architecture**: Built with Scalability and Maintainability in mind (Controller-Service-Repository pattern).
- **Security First**: 
  - `Helmet` for HTTP headers security.
  - `Rate Limiting` to prevent abuse.
  - `Express Validator` for rigorous input sanitization.
  - `CORS` configured for secure cross-origin requests.
- **Database**: High-performance PostgreSQL hosted on Supabase.
- **Role-Based Access Control (RBAC)**: Distinct permissions for `Admin` and `User` roles.

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | React.js, Vite, TailwindCSS, Lucide Icons, React Hot Toast, Axios |
| **Backend** | Node.js, Express.js, Supabase (PostgreSQL), JWT, Bcrypt |
| **DevOps** | Render (Backend), Vercel (Frontend), Git, Postman |
| **Testing** | Jest, Supertest (Backend Unit & Integration Tests) |

## 📦 Project Structure

```bash
PrimeTrade-AI/
├── backend/            # Express.js Server & API Logic
│   ├── config/         # Database & Env Config
│   ├── controllers/    # Request Handlers
│   ├── services/       # Business Logic
│   ├── middleware/     # Auth, Validation, Error Handling
│   └── routes/         # API Endpoints
└── frontend/           # React Client Application
    ├── src/
    │   ├── components/ # Reusable UI Components
    │   ├── context/    # Global State (Auth)
    │   └── services/   # API Integrations
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/Sudhan1112/PrimeTrade-AI-Assignment.git
cd PrimeTrade-AI-Assignment
```

### 2. Backend Setup
```bash
cd backend
npm install
# Create .env file with your credentials (see backend/README.md)
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 📄 Documentation

- [Backend API Documentation](./backend/docs/API_DOCUMENTATION.md)
- [Frontend Setup Guide](./frontend/README.md)
- [Postman Collection](./backend/docs/postman_collection.json)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📜 License

This project is licensed under the MIT License.
