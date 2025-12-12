import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey || !supabaseAnonKey) {
  console.error('Missing Supabase configuration. Check your .env file.');
  // Process might exit in strict environments, but logic will fail later otherwise
}

// Service role client (for admin operations - BYPASSES RLS)
// WARNING: Use this client only on the server-side and exclusively for admin/system tasks.
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Anon client (for regular operations - RESPECTS RLS)
// We will typically use `createClient` dynamically with the user's access token 
// to ensure RLS is enforced based on the user's identity.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
