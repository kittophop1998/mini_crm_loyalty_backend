import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { errorResponse } from '../utils/response';
import { HTTP_STATUS } from '../constants/httpStatus';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return errorResponse(res, 'Unauthorized', HTTP_STATUS.BAD_REQUEST);
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) {
        return errorResponse(res, 'Invalid or expired token', HTTP_STATUS.BAD_REQUEST);
    }

    // attach user info to request
    (req as any).user = decoded;
    next();
};
