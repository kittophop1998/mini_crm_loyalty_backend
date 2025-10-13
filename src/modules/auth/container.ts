import { PgUserRepository } from "../user/infrastructure/PgUserRepository";
import { CreateUserUseCase } from "../user/usecases/CreateUserUseCase";
import { AuthController } from "./controllers/AuthController";
import { LoginUseCase } from "./usecases/LoginUseCase"

export const authContainer = {
    controller() {
        const userRepo = new PgUserRepository();
        const loginUC = new LoginUseCase(userRepo);
        const userUC = new CreateUserUseCase(userRepo);

        return new AuthController(loginUC, userUC);
    }
}