import bcrypt from "bcrypt";

export interface IUser {
    email: string;
    password: string;
    created_at: string;
}

class User {
    private raw_user: IUser;

    constructor(user: IUser) {
        this.raw_user = user;
    }

    get raw() {
        return this.raw_user;
    }

    get getEmail() {
        return this.raw_user.email;
    }

    isPassword(password: string): boolean {
        const matched_password = bcrypt.compareSync(
            password,
            this.raw_user.email
        );
        return matched_password;
    }
}
