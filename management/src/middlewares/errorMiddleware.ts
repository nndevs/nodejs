import { Request, Response, NextFunction } from 'express';

import { AppError } from '../common/appError';

export const errorMiddleware = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.isOperational ? err.statusCode : 500;
    const message = err.isOperational ? err.message : 'Something went wrong';
    
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
};