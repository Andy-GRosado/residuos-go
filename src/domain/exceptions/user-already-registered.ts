
export class UserAlreadyRegisteredException extends Error {
    constructor(private email: string) {
        super(`User with email ${email} was already registered`);
        this.name = 'UserAlreadyRegisteredException';
    }
}
