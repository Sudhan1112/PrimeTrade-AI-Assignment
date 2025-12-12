# Scalability Strategy - Supabase & Backend Architecture

## 1. Why Supabase? (Scalability Wins)

Supabase is chosen not just as a database, but as a scalable backend-as-a-service platform that solves multiple distribution and performance challenges out of the box.

### A. Auto-Scaling Database
*   **Vertical Scaling**: underlying AWS/Platform compute can be resized with minimal downtime.
*   **Storage**: Uncapped storage scaling (up to PBs) with separation of storage and compute.

### B. Connection Pooling (PgBouncer)
*   **Problem**: Postgres creates a new process per connection, which is memory expensive (approx 10MB/conn). A direct connection limit is usually low (e.g., 100).
*   **Solution**: Supabase includes PgBouncer, a lightweight connection pooler. It maintains a pool of active connections to the database and reuses them for incoming client requests.
*   **Impact**: Supports thousands of concurrent serverless/API connections without crashing the database.

### C. Row-Level Security (RLS)
*   **Scalable Security**: Instead of application-level checks (which consume Node.js CPU cycles), security is enforced at the database kernel level.
*   **Performance**: RLS is highly optimized in Postgres. Fetches only return rows the user is allowed to see, reducing data transfer and application filtering logic.

### D. Global CDN & Edge Functions
*   **Static Assets**: Supabase Storage is backed by a global CDN, ensuring images/files are served from the edge node closest to the user.
*   **Latency**: Reduces round-trip time for static content.

## 2. API Layer Scalability

### A. Statelessness
*   The Node.js/Express API is stateless. Authentication is handled via JWT.
*   **Benefit**: We can spin up multiple instances of the backend (Horizontal Scaling) behind a load balancer without worrying about "sticky sessions".

### B. Rate Limiting
*   Implemented `express-rate-limit` (100 req/15min) to prevent abuse and protect resources from DDoS-like traffic patterns on the application layer.

## 3. Caching Strategy

1.  **Browser/Client Caching**: HTTP headers control caching of static assets.
2.  **Database Indexing**:
    *   `idx_tasks_user_id`: Optimizes "get my tasks" queries.
    *   `idx_tasks_status`: Optimizes status filtering.
    *   `idx_tasks_created_at`: Optimizes sorting/feeds.
3.  **Future Caching**: Redis can be introduced to cache frequently accessed API responses (e.g., Stats endpoints) if database load becomes a bottleneck.

## 4. Real-time Architecture

*   **Supabase Realtime**: Uses PostgreSQL's replication log (WAL) to broadcast database changes to connected clients via WebSockets.
*   **Scale**: The Realtime engine is built with Elixir (Erlang VM), known for handling millions of concurrent connections (like WhatsApp).

## 5. Security at Scale

*   **DoS Protection**: Rate limiting + Cloudflare (recommended in prod).
*   **SQL Injection**: Prevented using Parameterized Queries (via Supabase JS SDK).
*   **XSS**: Input sanitization via `express-validator` and `sanitize-html`.
