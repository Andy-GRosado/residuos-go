import { UserEntity } from "@/src/domain/entities/user.entity";
import { UserAlreadyRegisteredException } from "@/src/domain/exceptions/user-already-registered";
import { IUserRepository } from "@/src/domain/repositories/user.repository";
import { RegisterUserDto } from "../dtos/use-cases/user-register.dto";

export class RegisterUserUseCase {
    constructor(private user_repository: IUserRepository) {}

    async execute(new_user_dto: RegisterUserDto): Promise<UserEntity> {
        const user_registered = await this.user_repository.findByEmail(new_user_dto.email);
        if (!user_registered) {
            throw new UserAlreadyRegisteredException(new_user_dto.email);
        }

        const new_user = UserEntity.create(new_user_dto.email, new_user_dto.password);
        const new_user_added = await this.user_repository.save(new_user);
        return new_user_added;
    }
}
