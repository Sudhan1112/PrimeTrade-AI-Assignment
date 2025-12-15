# PrimeTrade AI Backend Assignment

This repository contains the backend implementation for the PrimeTrade AI Backend Developer Intern assignment. It is a scalable REST API built with Node.js, Express, and Supabase (PostgreSQL), featuring secure JWT authentication, Role-Based Access Control (RBAC), and CRUD operations for Task management.

## 🚀 Features

- **Authentication**: Secure User Registration and Login using JWT and Password Hashing.
- **RBAC**: Role-based middleware to distinguish between `user` and `admin` roles.
- **Task Management**: Full CRUD APIs for managing tasks with status and priority tracking.
- **Security**: 
  - Helmet for secure HTTP headers.
  - Rate Limiting to prevent abuse.
  - Input Sanitization to preventing XSS/Injection.
  - CORS configuration.
- **Scalability**: Structured for modularity (Controllers, Services, Routes) and deployment readiness.

## 🛠 Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT (JSON Web Tokens)
- **Logging**: Winston & Morgan
- **Validation**: Express Validator

## 📂 Project Structure

```
backend/
├── config/         # Configuration (Supabase, Env)
├── controllers/    # Request handlers (Auth, Tasks)
├── middleware/     # Auth, RBAC, Validation, Error Handling
├── routes/         # API Route definitions
├── utils/          # Helpers (JWT, Logger, Response)
├── docs/           # Documentation (API, HLD, LLD)
├── server.js       # Entry point
└── package.json    # Dependencies
```

## ⚙️ Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd backend
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the root directory and configure the following variables:

    ```env
    PORT=5000
    NODE_ENV=development
    
    # Supabase Configuration
    SUPABASE_URL=your_supabase_url
    SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
    SUPABASE_ANON_KEY=your_anon_key
    
    # JWT Configuration
    JWT_SECRET=your_secure_jwt_secret
    JWT_EXPIRES_IN=24h
    
    # Security (Optional)
    FRONTEND_URL=http://localhost:5173
    RATE_LIMIT_WINDOW_MS=900000
    RATE_LIMIT_MAX_REQUESTS=100
    ```

4.  **Run the Server:**
    - **Development Mode:**
      ```bash
      npm run dev
      ```
    - **Production Mode:**
      ```bash
      npm start
      ```

## 📖 API Documentation

Detailed API documentation is available in the `docs` folder:
- [API Endpoints](./docs/API_DOCUMENTATION.md)
- [High Level Design](./docs/HLD.md)
- [Low Level Design](./docs/LLD.md)
- [Postman Collection](./docs/postman_collection.json) (Import this into Postman)

## 📡 Deployment

This project is ready for deployment on platforms like Render, Vercel (Serverless), or Heroku. Ensure environment variables are correctly set in the deployment dashboard.
