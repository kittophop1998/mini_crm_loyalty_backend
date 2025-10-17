import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/response';
import { HTTP_STATUS } from '../constants/httpStatus';

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log error details for debugging
  console.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Handle different types of errors
  if (err instanceof AppError) {
    return errorResponse(res, err.message, err.statusCode);
  }

  // Handle Prisma errors
  if (err.code === 'P2002') {
    return errorResponse(res, 'Unique constraint violation', HTTP_STATUS.CONFLICT);
  }

  if (err.code === 'P2025') {
    return errorResponse(res, 'Record not found', HTTP_STATUS.NOT_FOUND);
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return errorResponse(res, 'Invalid token', HTTP_STATUS.UNAUTHORIZED);
  }

  if (err.name === 'TokenExpiredError') {
    return errorResponse(res, 'Token expired', HTTP_STATUS.UNAUTHORIZED);
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return errorResponse(res, 'Validation failed', HTTP_STATUS.BAD_REQUEST, err.details);
  }

  // Default error response
  return errorResponse(
    res, 
    'Internal Server Error', 
    HTTP_STATUS.INTERNAL_SERVER_ERROR
  );
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
