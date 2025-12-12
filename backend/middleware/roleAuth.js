import { errorResponse } from '../utils/response.js';

export const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return errorResponse(res, 403, 'Forbidden: Admin access only');
    }
    next();
};

export const requireRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return errorResponse(res, 403, 'Forbidden: Insufficient permissions');
        }
        next();
    }
}
