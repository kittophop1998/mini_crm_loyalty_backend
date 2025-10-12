import { HTTP_STATUS } from "../../../constants/httpStatus";
import { errorResponse, successResponse } from "../../../utils/response";
import { CreateCustomerUserCase } from "../usecases/CreateCustomerUseCase";
import { GetCustomerAllUseCase } from "../usecases/GetCustomerAllUseCase";
import { GetCustomerUseCase } from "../usecases/GetCustomerUseCase";
import type { Request, Response } from 'express';

export class CustomerController {
    constructor(
        private createUC: CreateCustomerUserCase,
        private getUC: GetCustomerUseCase,
        private getAllUC: GetCustomerAllUseCase
    ) {}

    async create(req: Request, res: Response) {
        try {
            const result = await this.createUC.execute(req.body);
            
            return successResponse(res, result, 'Customer created successfully', HTTP_STATUS.CREATED);
        } catch (err: any) {
            return errorResponse(res, 'Failed to create customer', HTTP_STATUS.BAD_REQUEST, err.message);
        }
    }

    async get(req: Request, res: Response) {
        try {
            const result = await this.getUC.execute(req.params.id);

            return successResponse(res, result, 'Customer retrieved successfully', HTTP_STATUS.OK);
        }catch(err: any) {
            return errorResponse(res, 'Failed to retrieve customer', HTTP_STATUS.NOT_FOUND, err.message);
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const result = await this.getAllUC.execute();

            return successResponse(res, result, 'Customers retrieved successfully', HTTP_STATUS.OK);
        }catch(err: any) {
            return errorResponse(res, 'Failed to retrieve customers', HTTP_STATUS.NOT_FOUND, err.message);
        }
    }
}