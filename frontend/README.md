# PrimeTrade AI Frontend Assignment

This is the client-side application for the PrimeTrade AI Backend Intern assignment. It is a React-based UI that interacts with the backend REST API to demonstrate authentication (JWT) and Task CRUD operations.

## 🚀 Features

- **Authentication**: Login and Register pages with error handling.
- **Protected Routes**: Dashboard access is restricted to authenticated users.
- **Dashboard**:
  - View list of tasks.
  - specific "Create Task" button/modal.
  - Edit and Delete functionality.
- **UI/UX**: 
  - Built with **TailwindCSS** for styling.
  - Responsive design.
  - **React Hot Toast** for notifications.

## 🛠 Technology Stack

- **Framework**: React.js (Vite)
- **Styling**: TailwindCSS
- **State Management**: Context API (AuthContext)
- **Routing**: React Router DOM
- **HTTP Client**: Fetch API / Axios (if applicable)

## 📂 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Auth/       # Login, Register
│   │   ├── Dashboard/  # Main Dashboard View
│   │   ├── Common/     # Navbar, ProtectedRoute
│   │   └── Tasks/      # Task CRUD components
│   ├── context/        # Auth & Theme Context
│   ├── services/       # API integration
│   ├── App.jsx         # Main Router
│   └── main.jsx        # Entry point
└── ...
```

## ⚙️ Setup & Installation

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env` file (or use default) if you need to change the backend URL.
    ```env
    VITE_API_URL=https://primetrade-ai-assignment-1-er4l.onrender.com/api/v1
    ```

4.  **Run the Development Server:**
    ```bash
    npm run dev
    ```

5.  **Open in Browser:**
    Go to `http://localhost:5173`

## 🔗 Connection

Ensure the [Backend](../backend) server is running on port 5000 before interacting with the application.
