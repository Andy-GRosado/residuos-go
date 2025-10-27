import {
    CommentaryContentEmptyException,
    CommentaryContentTooLongException,
} from "../exceptions/invalid-comentary-content.exception";

export class CommentaryContent {
    constructor(private readonly value: string) {
        if (!value || value.trim().length === 0) {
            throw new CommentaryContentEmptyException();
        }
        if (value.length > 1000) {
            throw new CommentaryContentTooLongException(1000);
        }
    }

    toString(): string {
        return this.value;
    }

    equals(other: CommentaryContent): boolean {
        return this.value === other.value;
    }
}
