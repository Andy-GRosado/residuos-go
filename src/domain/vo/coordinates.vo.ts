import { InvalidCoordinatesException } from "../exceptions/invalid-geographic.exception";

export class Coordinates {
    constructor(
        private readonly latitude: number,
        private readonly longitude: number
    ) {
        if (!this.isValid()) {
            throw new InvalidCoordinatesException(this.latitude, this.longitude);
        }
    }
    
    private isValid(): boolean {
        return this.latitude >= -90 && this.latitude <= 90 &&
               this.longitude >= -180 && this.longitude <= 180;
    }

    public isNorhtEastOf(coordinates: Coordinates) {
        return (coordinates.Lattitude < this.latitude && coordinates.Longitude < this.longitude)
    }

    public isNorhtWeastOf(coordinates: Coordinates) {
        return (coordinates.Lattitude < this.latitude && coordinates.Longitude > this.longitude)
    }

    get Lattitude(): number {
        return this.latitude;
    }

    get Longitude(): number {
        return this.longitude;
    }
}
