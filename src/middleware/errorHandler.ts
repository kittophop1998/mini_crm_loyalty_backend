// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/response';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err.statusCode) {
    return errorResponse(res, err.message, err.statusCode, err.errors);
  }

  return errorResponse(res, 'Internal Server Error', 500);
};
