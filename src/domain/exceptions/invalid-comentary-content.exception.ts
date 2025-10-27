export class CommentaryContentEmptyException extends Error {
    constructor() {
        super("Commentary content cant be empty");
        this.name = 'CommentaryContentEmptyException';
    }
}

export class CommentaryContentTooLongException extends Error {
    constructor(max_characters: number) {
        super(`Commentary content too long, maximum ${max_characters} characters`);
        this.name = 'CommentaryContentTooLongException';
    }
}
