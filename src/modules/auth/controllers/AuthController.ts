import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpStatus";
import { errorResponse, successResponse } from "../../../utils/response";
import { LoginUseCase } from "../usecases/LoginUseCase";
import { CreateUserUseCase } from "../../user/usecases/CreateUserUseCase";

export class AuthController {
    constructor(
        private loginUC: LoginUseCase,
        private userUC: CreateUserUseCase
    ) { }

    async login(req: Request, res: Response) {
        try {
            const result = await this.loginUC.execute(req.body.username, req.body.password);

            return successResponse(res, result, 'Login successful', HTTP_STATUS.OK);
        } catch (err: any) {
            return errorResponse(res, 'Login failed', HTTP_STATUS.BAD_REQUEST, err.message);
        }
    }

    async register(req: Request, res: Response) {
        try {
            const result = await this.userUC.execute(req.body);

            return successResponse(res, result, 'Registration successful', HTTP_STATUS.CREATED);
        } catch (err: any) {
            return errorResponse(res, 'Registration failed', HTTP_STATUS.BAD_REQUEST, err.message);
        }

    }
}