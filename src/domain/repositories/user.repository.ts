import { UserEntity } from "../entities/user.entity";

export interface IUserRepository {
    findByEmail(email: string): Promise<UserEntity | undefined>;
    save(new_user: UserEntity): Promise<UserEntity>;
    delete(user: UserEntity): Promise<void>;
}
