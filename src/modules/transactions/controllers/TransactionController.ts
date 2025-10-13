import { Request, Response } from "express";
import { GetAllTransactionUseCase } from "../usecases/GetAllTransactionUseCase";
import { errorResponse, successResponse } from "../../../utils/response";
import { HTTP_STATUS } from "../../../constants/httpStatus";
import { AddPointUseCase } from "../usecases/AddPointUseCase";

export class TransactionController {
    constructor(
        private addPointUseCase: AddPointUseCase,
        private getAllTransactionUseCase: GetAllTransactionUseCase
    ) { }

    async addPoint(req: Request, res: Response) {
        const { customerId, amount } = req.body;

        try {
            await this.addPointUseCase.execute({ customerId, amount });

            return successResponse(res, null, 'Points added successfully', HTTP_STATUS.CREATED);
        } catch (error) {
            return errorResponse(res, 'Failed to add points', HTTP_STATUS.BAD_REQUEST, (error as Error).message);
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const transactions = await this.getAllTransactionUseCase.execute();

            return successResponse(res, transactions, 'Transactions retrieved successfully', HTTP_STATUS.OK);
        } catch (error) {
            return errorResponse(res, 'Failed to retrieve transactions', HTTP_STATUS.BAD_REQUEST, (error as Error).message);
        }
    }
}