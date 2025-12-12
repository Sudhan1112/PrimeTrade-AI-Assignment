/**
 * Standardized API Response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {boolean} success - Success status
 * @param {string} message - Message
 * @param {Object} data - Data payload
 */
const sendResponse = (res, statusCode, success, message, data = null) => {
    const response = {
        success,
        message,
        ...(data && { data }),
        timestamp: new Date().toISOString()
    };

    res.status(statusCode).json(response);
};

export const successResponse = (res, message, data) => {
    sendResponse(res, 200, true, message, data);
};

export const createdResponse = (res, message, data) => {
    sendResponse(res, 201, true, message, data);
};

export const errorResponse = (res, statusCode, message, errorDetails = null) => {
    const response = {
        success: false,
        error: {
            code: statusCode === 500 ? 'SERVER_ERROR' : 'REQUEST_ERROR',
            message,
            statusCode,
            details: errorDetails
        },
        timestamp: new Date().toISOString()
    };

    res.status(statusCode).json(response);
};
