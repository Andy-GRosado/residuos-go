import { UserEntity } from "@/src/domain/entities/user.entity";
import { UserNotRegisteredException } from "@/src/domain/exceptions/user-not-registered";
import { IUserRepository } from "@/src/domain/repositories/user.repository";
import { LoginUserDto } from "../dtos/use-cases/user-login.dto";

export class LoginUserUseCase {
    constructor(private user_repository: IUserRepository) {}

    async execute(new_user_dto: LoginUserDto): Promise<UserEntity> {
        const user_registered = await this.user_repository.findByEmail(new_user_dto.email);
        if (!user_registered) {
            throw new UserNotRegisteredException(new_user_dto.email);
        }

        return user_registered;
    }
}
