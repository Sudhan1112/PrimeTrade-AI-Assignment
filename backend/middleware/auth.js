import { verifyToken } from '../utils/jwtUtils.js';
import { supabase } from '../config/supabase.js';
import { errorResponse } from '../utils/response.js';

export const requireAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return errorResponse(res, 401, 'Unauthorized: No token provided');
        }

        const token = authHeader.split(' ')[1];

        // DECISION: Verify Custom JWT OR Supabase JWT?
        // Requirement says "Integration Strategy: Use Supabase Auth... Generate custom JWT with role"
        // So we assume the token is OUR custom unique JWT signed in auth.controller.js

        const decoded = verifyToken(token);

        if (!decoded) {
            // Fallback: If it's a raw Supabase token (e.g. from frontend direct usage), we could try verifying with Supabase
            // But for this assignment, we strictly follow the 'Custom JWT' requirement flow.
            return errorResponse(res, 401, 'Unauthorized: Invalid token');
        }

        // Attach user to request
        req.user = decoded;

        // Check if user still exists in Supabase (Optional security check, creates DB load)
        // const { data: { user }, error } = await supabase.auth.admin.getUserById(decoded.id); 
        // IF we need strict sync. For now, rely on JWT expiry.

        next();
    } catch (error) {
        return errorResponse(res, 500, 'Server Error during authentication');
    }
};
