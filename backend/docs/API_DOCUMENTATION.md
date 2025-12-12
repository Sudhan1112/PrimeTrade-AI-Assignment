# API Documentation v1

Base URL: `/api/v1`

## Authentication

### Register User
`POST /auth/register`

**Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "role": "user" // Optional, default 'user'
}
```

**Response (201)**:
```json
{
  "success": true,
  "data": {
    "user": { "id": "...", "email": "..." },
    "token": "eyJhbGciOi..."
  },
  "message": "Registration successful"
}
```

### Login
`POST /auth/login`

**Body**:
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

## Tasks

### Get All Tasks
`GET /tasks`

**Query Params**:
*   `page`: 1 (default)
*   `limit`: 10 (default)
*   `status`: pending | in_progress | completed
*   `priority`: low | medium | high
*   `sort`: created_at (desc)

**Headers**: `Authorization: Bearer <token>`

**Response (200)**:
```json
{
  "success": true,
  "data": {
    "tasks": [
      {
        "id": "...",
        "title": "Fix bug",
        "status": "pending",
        "priority": "high",
        "created_at": "..."
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "totalPages": 5
    }
  }
}
```

### Create Task
`POST /tasks`

**Body**:
```json
{
  "title": "Complete Assignment",
  "description": "...",
  "priority": "high",
  "status": "pending"
}
```

### Update Task
`PUT /tasks/:id`

Owner or Admin only. Updates full resource.

### Delete Task
`DELETE /tasks/:id`

Owner or Admin only.

## Error Codes

| Status | Code | Meaning |
| :--- | :--- | :--- |
| 400 | VALIDATION_ERROR | Invalid input data |
| 401 | UNAUTHORIZED | Missing or invalid token |
| 403 | FORBIDDEN | Authenticated but insufficient permissions (RBAC/RLS) |
| 404 | NOT_FOUND | Resource not found |
| 409 | CONFLICT | Unique constraint violation (e.g. email exists) |
| 500 | SERVER_ERROR | Internal server error |
