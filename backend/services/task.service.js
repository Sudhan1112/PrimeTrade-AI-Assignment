import { supabase } from '../config/supabase.js';

class TaskService {
    async createTask(taskData) {
        // taskData: { user_id, title, description, status, priority }
        // Note: We use the system 'supabase' client which respects RLS if we set the session, 
        // OR we can manually enforce user_id here if we trust the API layer.
        // Given we are using Custom JWT, we can't easily injection session into 'supabase' global client safely for concurrency.
        // SO: We will INSERT using the Service Key client (admin) BUT validate ownership/permissions in Controller/Service
        // OR: We create a scoped client for the user.
        // DECISION: Since creating a fresh client is expensive-ish, and we are doing a Node API:
        // We will use the ADMIN client to perform operations, but we MUST MANUALLY ensure the 'user_id' matches the authenticated user.

        // Actually, safest is to use the `user_id` from the token as the Foreign Key.

        const { data, error } = await supabase
            .from('tasks')
            .insert(taskData)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    async getAllTasks(filter, pagination) {
        const { page, limit, status, priority, sort, userId, role } = filter;

        let query = supabase
            .from('tasks')
            .select('*', { count: 'exact' });

        // FILTERING
        // If role is 'user', enforce fetching only their tasks
        if (role !== 'admin') {
            query = query.eq('user_id', userId);
        }
        // If Admin, they can see all.

        if (status) query = query.eq('status', status);
        if (priority) query = query.eq('priority', priority);

        // SORTING
        if (sort) {
            // e.g. 'created_at' (desc is default requirement)
            query = query.order(sort, { ascending: false });
        } else {
            query = query.order('created_at', { ascending: false });
        }

        // PAGINATION
        const from = (page - 1) * limit;
        const to = from + limit - 1;
        query = query.range(from, to);

        const { data, error, count } = await query;
        if (error) throw error;

        return { tasks: data, count };
    }

    async getTaskById(id) {
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    }

    async updateTask(id, updates) {
        const { data, error } = await supabase
            .from('tasks')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    async deleteTask(id) {
        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    }

    async getStats(userId, role) {
        // Helper to get counts by status
        // If user, filter by user_id
        let query = supabase.from('tasks').select('status, id');

        if (role !== 'admin') {
            query = query.eq('user_id', userId);
        }

        const { data, error } = await query;
        if (error) throw error;

        // Aggregate in memory (efficient enough for intern task scale)
        // Or use .rpc() for performance if needed
        const stats = {
            total: data.length,
            pending: data.filter(t => t.status === 'pending').length,
            in_progress: data.filter(t => t.status === 'in_progress').length,
            completed: data.filter(t => t.status === 'completed').length,
        };
        return stats;
    }
}

export default new TaskService();
