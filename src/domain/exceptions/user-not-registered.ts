
export class UserNotRegisteredException extends Error {
    constructor(private readonly email: string) {
        super(`User with email ${email} was not still registered`);
        this.name = 'UserNotRegisteredException';
    }
}


