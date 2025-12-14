import { supabase, supabaseAdmin } from '../config/supabase.js';

class AuthService {
    async register(email, password, metadata) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: metadata // metadata like name, role (handled by trigger to copy to profiles)
            }
        });

        if (error) throw error;
        return data;
    }

    async login(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;
        return data;
    }

    async logout(token) {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        return true;
    }

    async getProfile(userId) {
        // Since we dropped the profiles table, we rely on Auth Metadata.
        // Getting another user's profile is not easily possible without Admin key here, 
        // but for 'getCurrentUser' we usually already have the data in the token.
        // This method might be redundant now if controller uses req.user.
        // returning null or throw to ensure we don't depend on it.
        return null;
    }

    async updateProfile(userId, updates) {
        // Update user metadata
        const { data, error } = await supabase.auth.updateUser({
            data: updates
        });

        if (error) throw error;
        // Return the updated metadata structure as 'user'
        return {
            id: data.user.id,
            email: data.user.email,
            ...data.user.user_metadata
        };
    }

    async listUsers() {
        // Use supabaseAdmin to list all users
        const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers();
        if (error) throw error;

        // Map to a cleaner structure
        return users.map(u => ({
            id: u.id,
            email: u.email,
            name: u.user_metadata?.name || u.email,
            role: u.user_metadata?.role || 'user'
        }));
    }
}

export default new AuthService();
