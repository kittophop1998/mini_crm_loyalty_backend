import { Request, Response, NextFunction } from 'express';
import { verifyToken, JwtPayload } from '../utils/jwt';
import { HTTP_STATUS } from '../constants/httpStatus';
import { AppError } from './errorHandler';

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      throw new AppError('Authorization header is required', HTTP_STATUS.UNAUTHORIZED);
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw new AppError('Authorization header must start with Bearer', HTTP_STATUS.UNAUTHORIZED);
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      throw new AppError('Token is required', HTTP_STATUS.UNAUTHORIZED);
    }

    const decoded = verifyToken(token);
    
    if (!decoded) {
      throw new AppError('Invalid or expired token', HTTP_STATUS.UNAUTHORIZED);
    }

    // Attach user info to request
    (req as AuthenticatedRequest).user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

// Optional middleware for routes that work with or without authentication
export const optionalAuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = verifyToken(token);
      
      if (decoded) {
        (req as AuthenticatedRequest).user = decoded;
      }
    }
    
    next();
  } catch (error) {
    // For optional auth, we don't throw errors, just continue without user
    next();
  }
};
