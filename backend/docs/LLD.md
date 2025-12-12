# Low-Level Design (LLD) - Backend Intern Assignment

## 1. Module Breakdown

### Core Modules
*   **server.js**: Entry point. Initialises Express app, connects middleware, and starts server.
*   **config/supabase.js**: Exports `supabase` (client) and `supabaseAdmin` (service role) instances.
*   **middleware/**:
    *   `auth.js`: Verifies JWT from Supabase. Extends `req` with `user`.
    *   `roleAuth.js`: Checks `req.user.role`.
    *   `validator.js`: Express-validator schemas for inputs.
    *   `errorHandler.js`: Catches errors and formats responses.
*   **controllers/**:
    *   `auth.controller.js`: Handles registration (via Supabase), login, profile logic.
    *   `task.controller.js`: CRUD logic, calling services.
*   **services/**:
    *   `auth.service.js`: Interfaces with Supabase Auth API.
    *   `task.service.js`: Interfaces with Supabase DB (Tasks table).

## 2. Database Tables & Schema

### Table: `public.profiles`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK, FK(auth.users) | Mirrors Supabase Auth ID |
| `name` | VARCHAR(255) | NOT NULL | User's full name |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | User's email |
| `role` | VARCHAR(20) | DEFAULT 'user' | 'user' or 'admin' |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Creation time |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | Update time |

### Table: `public.tasks`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK, DEFAULT uuid() | Task ID |
| `user_id` | UUID | FK(profiles.id) | Owner ID |
| `title` | VARCHAR(255) | NOT NULL | Task title |
| `description` | TEXT | | Detailed description |
| `status` | VARCHAR(20) | DEFAULT 'pending' | pending/in_progress/completed |
| `priority` | VARCHAR(20) | DEFAULT 'medium' | low/medium/high |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Creation time |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | Update time |

## 3. RLS Policies Logic

### Profiles
*   `SELECT`: User can view OWN profile.
*   `UPDATE`: User can update OWN profile.

### Tasks
*   `SELECT`: User views OWN tasks. Admin views ALL.
*   `INSERT`: User creates task with their own `user_id`.
*   `UPDATE`: User updates OWN task. Admin updates ALL.
*   `DELETE`: User deletes OWN task. Admin deletes ALL.

## 4. API Request/Response Formats

### Error Response Standard
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Title is required",
    "statusCode": 400,
    "details": ["Field 'title' cannot be empty"]
  },
  "timestamp": "2025-12-12T10:30:00Z",
  "path": "/api/v1/tasks"
}
```

### Success Response Standard
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

## 5. Security Implementation Details

*   **JWT Handling**:
    *   Frontend sends `Authorization: Bearer <token>`.
    *   Backend `auth.js` middleware uses `supabase.auth.getUser(token)` to verify validity.
    *   If valid, fetches user role from `public.profiles` or custom claims.
*   **Supabase Client**:
    *   Backend uses `supabase-js`.
    *   For Admin actions, use `supabaseAdmin` with Service Role Key (BYPASS RLS).
    *   For User actions, pass the user's JWT to `supabase` client to RESPECT RLS (Forwarding the user context).

## 6. Error Handling Strategy

1.  **Validation Errors**: Caught by `express-validator`, passed to `errorHandler` with 400 status.
2.  **Supabase Errors**: Wrapped in a helper to translate Supabase error codes (Postgres codes) to HTTP status.
    *   PGRST116 (JSON mismatch) -> 400
    *   23505 (Unique violation) -> 409
3.  **Auth Errors**: 401 for invalid specific tokens. 403 for role mismatch.
