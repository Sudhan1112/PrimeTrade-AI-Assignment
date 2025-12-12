import { validationResult } from 'express-validator';
import { errorResponse } from '../utils/response.js';

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorDetails = errors.array().map(err => ({
            field: err.path,
            message: err.msg
        }));

        return errorResponse(res, 400, 'Validation Error', errorDetails);
    }
    next();
};

export default validate;
