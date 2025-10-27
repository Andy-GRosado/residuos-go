import bcrypt from "bcrypt";
import { EntityStringId } from "../vo/entity-id.vo";

export class UserId extends EntityStringId {}

export class UserEntity {
    private _id: UserId;
    private _email: string;
    private _password: string;
    private _created_at: Date;
    
    constructor(id: UserId, email: string, password: string, created_at: Date) {
        this._id = id;
        this._email = email;
        this._password = password;
        this._created_at = created_at;
    }

    static create(email: string, password: string) {
        return new UserEntity(UserId.generate(), email, password, new Date());
    }

    static reconstitute(props: { id: string, email: string; password: string, date: Date }) {
        return new UserEntity(
            new UserId(props.id),
            props.email,
            props.password,
            props.date,
        );
    }

    isPassword(password: string): boolean {
        const matched_password = bcrypt.compareSync(password, this.password);
        return matched_password;
    }

    public get id(): UserId {
        return this._id;
    }

    public get email(): string {
        return this._email;
    }

    public get password(): string {
        return this._password;
    }

    public get created_at(): Date {
        return this._created_at;
    }
}
