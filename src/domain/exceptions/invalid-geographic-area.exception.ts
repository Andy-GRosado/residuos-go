import { Coordinates } from "../vo/coordinates.vo";

export class InvalidGeographicAreaException extends Error{
    constructor(northwest: Coordinates, southeast: Coordinates) {
        super(`Invalida area from northwest (${northwest.Lattitude}, ${northwest.Longitude}), southeast (${southeast.Lattitude}, ${southeast.Longitude})`);
        this.name = 'InvalidGeographicAreaException';
    }
}
