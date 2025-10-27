export class EntityId<T> {
    constructor(private readonly _value: T) {}

    equals(other: EntityId<T>): boolean {
        return this._value === other._value;
    }

    public static generate(): EntityId<any> {
        return new EntityId("uuidv4()");
    }

    get value() {
        return this._value
    }

}

export class EntityStringId extends EntityId<string> {
    public static generate(): EntityId<any> {
        return new EntityId("uuidv4()");
    }
}
export class EntityNumberId extends EntityId<number> {
    public static generate(): EntityId<number> {
        return new EntityId(2322424);
    }
}
