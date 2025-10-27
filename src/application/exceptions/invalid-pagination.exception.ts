export class PaginationPageIncorrectException extends Error {
    constructor(page: number) {
        super(`Incorrect pagination page ${page}`);
        this.name = "PaginationPageIncorrectException";
    }
}

export class PaginationLimitIncorrectException extends Error {
    constructor(limit: number) {
        super(`Incorrect pagination limit ${limit}`);
        this.name = "PaginationLimitIncorrectException";
    }
}
