
export class InvalidCoordinatesException extends Error {
    constructor(lattitude: number, longitude: number) {
        super(`Invalida coordinates (${lattitude}, ${longitude})`)
        this.name = 'InvalidCoordinatesException';
    }
}
