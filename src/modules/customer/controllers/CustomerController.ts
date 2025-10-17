import { HTTP_STATUS } from "../../../constants/httpStatus";
import { successResponse } from "../../../utils/response";
import { CreateCustomerUserCase } from "../usecases/CreateCustomerUseCase";
import { GetCustomerAllUseCase } from "../usecases/GetCustomerAllUseCase";
import { GetCustomerUseCase } from "../usecases/GetCustomerUseCase";
import { AppError } from "../../../middleware/errorHandler";
import type { Request, Response } from 'express';

export class CustomerController {
    constructor(
        private createUC: CreateCustomerUserCase,
        private getUC: GetCustomerUseCase,
        private getAllUC: GetCustomerAllUseCase
    ) {}

    async create(req: Request, res: Response): Promise<Response> {
        const result = await this.createUC.execute(req.body);
        return successResponse(res, result, 'Customer created successfully', HTTP_STATUS.CREATED);
    }

    async findById(req: Request, res: Response): Promise<Response> {
        const result = await this.getUC.execute(req.params.id);
        
        if (!result) {
            throw new AppError('Customer not found', HTTP_STATUS.NOT_FOUND);
        }
        
        return successResponse(res, result, 'Customer retrieved successfully', HTTP_STATUS.OK);
    }

    async getAll(req: Request, res: Response): Promise<Response> {
        const result = await this.getAllUC.execute();
        return successResponse(res, result, 'Customers retrieved successfully', HTTP_STATUS.OK);
    }
}