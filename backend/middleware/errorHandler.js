import logger from '../utils/logger.js';
import { errorResponse } from '../utils/response.js';

const errorHandler = (err, req, res, next) => {
    logger.error(err.stack);

    // Handle Supabase/Postgres errors
    if (err.code && err.code.startsWith('P')) {
        // PGRST116: JSON object requested, multiple (or no) rows returned
        if (err.code === 'PGRST116') {
            return errorResponse(res, 400, 'Database Query Error: Invalid result cardinality');
        }
    }

    // Custom status code if set
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    errorResponse(res, statusCode, message, process.env.NODE_ENV === 'development' ? err : null);
};

export default errorHandler;
