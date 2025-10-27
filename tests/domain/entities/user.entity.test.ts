// tests/domain/entities/user.entity.test.ts
import bcrypt from "bcrypt";
import { IUser, UserEntity } from "../../../src/domain/entities/user.entity";

// Mock bcrypt
jest.mock("bcrypt", () => ({
    compareSync: jest.fn(),
}));

describe("UserEntity", () => {
    const mockUser: IUser = {
        id: "02482h42",
        email: "test@example.com",
        password: "hashedPassword123",
        created_at: new Date('2023-01-01'),
    };

    describe("Constructor", () => {
        it("should create a UserEntity with the provided user data", () => {
            const userEntity = new UserEntity(
                mockUser.id,
                mockUser.email,
                mockUser.password,
                mockUser.created_at
            );

            expect(userEntity.raw).toEqual(mockUser);
            expect(userEntity.getEmail).toBe("test@example.com");
        });
    });

    describe("raw getter", () => {
        it("should return the raw user data", () => {
            const userEntity = new UserEntity(
                mockUser.id,
                mockUser.email,
                mockUser.password,
                mockUser.created_at
            )

            const rawData = userEntity.raw;

            expect(rawData).toEqual(mockUser);
            expect(rawData.email).toBe("test@example.com");
        });
    });

    describe("getEmail getter", () => {
        it("should return the user email", () => {
            const userEntity = UserEntity.create(mockUser);

            expect(userEntity.getEmail).toBe("test@example.com");
        });
    });

    describe("isPassword", () => {
        it("should return true when password matches", () => {
            (bcrypt.compareSync as jest.Mock).mockReturnValue(true);
            const userEntity = UserEntity.create(mockUser);

            const result = userEntity.isPassword("correctPassword");

            expect(bcrypt.compareSync).toHaveBeenCalledWith(
                "correctPassword",
                mockUser.password
            );
            
            expect(result).toBe(true);
        });

        it("should return false when password does not match", () => {
            (bcrypt.compareSync as jest.Mock).mockReturnValue(false);
            const userEntity = UserEntity.create(mockUser);

            const result = userEntity.isPassword("wrongPassword");

            expect(bcrypt.compareSync).toHaveBeenCalledWith(
                "wrongPassword",
                mockUser.password
            );
            expect(result).toBe(false);
        });
    });
});
