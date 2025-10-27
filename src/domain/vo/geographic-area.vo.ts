import { InvalidGeographicAreaException } from "../exceptions/invalid-geographic-area.exception";
import { Coordinates } from "./coordinates.vo";

export class GeographicArea {
    constructor(
        private readonly northwest: Coordinates,
        private readonly southeast: Coordinates
    ) {
        if (!this.isValidArea()) {
            throw new InvalidGeographicAreaException(this.northwest, this.southeast);
        }
    }
    
    private isValidArea(): boolean {
        return this.northwest.isNorhtWeastOf(this.southeast);
    }
}
