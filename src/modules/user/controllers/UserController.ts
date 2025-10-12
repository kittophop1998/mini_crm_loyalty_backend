import type { Request, Response } from 'express';
import { CreateUserUseCase } from '../usecases/CreateUserUseCase';
import { GetUserUseCase } from '../usecases/GetUserUseCase';
import { errorResponse, successResponse } from '../../../utils/response';
import { HTTP_STATUS } from '../../../constants/httpStatus';


export class UserController {
    constructor(private createUC: CreateUserUseCase, private getUC: GetUserUseCase) { }

    async create(req: Request, res: Response) {
        try {
            const result = await this.createUC.execute(req.body);
            return successResponse(res, result, 'User created successfully', HTTP_STATUS.CREATED);
        } catch (err: any) {
            return errorResponse(res, 'Failed to create user', HTTP_STATUS.BAD_REQUEST, err.message);
        }
    }

    async get(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            if (!userId) {
                return res.status(400).json({ error: 'User ID is required' });
            }
            const result = await this.getUC.execute(userId);

            return successResponse(res, result, 'User retrieved successfully', HTTP_STATUS.OK);
        } catch (err: any) {
            return errorResponse(res, 'Failed to retrieve user', HTTP_STATUS.NOT_FOUND, err.message);
        }
    }
}