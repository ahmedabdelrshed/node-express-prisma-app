import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppError } from '../utils/AppError';

export const errorHandler: ErrorRequestHandler = (
    err: Error | AppError | any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            status: err.statusText,
            message: err.message,
        });

        return;
    }

    res.status(500).json({
        status: 'error',
        message: 'Something went wrong',
    });

    return;
}
