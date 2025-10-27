import { EntityStringId } from "../vo/entity-id.vo";

interface IBoundingBox {
    label: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

export class ReportId extends EntityStringId {}

export class ReportEntity {
    private _id: ReportId;
    private _latitud: number;
    private _longitud: number;
    private _image_url: string;
    private _title: string;
    private _description: string;
    private _state: string;
    private _created_at: Date;
    private _bonding_boxes: IBoundingBox[];

    constructor(
        id: ReportId,
        latitud: number,
        longitud: number,
        image_url: string,
        title: string,
        description: string,
        state: string,
        bonding_boxes: IBoundingBox[],
        created_at: Date
    ) {
        this._id = id;
        this._latitud = latitud;
        this._longitud = longitud;
        this._image_url = image_url;
        this._title = title;
        this._description = description;
        this._state = state;
        this._created_at = created_at;
        this._bonding_boxes = bonding_boxes;
    }

    static create(
        latitud: number,
        longitud: number,
        image_url: string,
        title: string,
        description: string,
        state: string,
        bonding_boxes: IBoundingBox[]
    ) {
        return new ReportEntity(
            ReportId.generate(),
            latitud,
            longitud,
            image_url,
            title,
            description,
            state,
            bonding_boxes,
            new Date()
        );
    }

    static reconstitute(props: {
        id: string;
        latitud: number;
        longitud: number;
        image_url: string;
        bonding_boxes: {
            label: string;
            x: number;
            y: number;
            width: number;
            height: number;
        }[];
        title: string;
        description: string;
        state: string;
        created_at: Date;
    }) {
        return new ReportEntity(
            new ReportId(props.id),
            props.latitud,
            props.longitud,
            props.image_url,
            props.title,
            props.description,
            props.state,
            props.bonding_boxes,
            props.created_at
        );
    }

    public get id(): ReportId {
        return this._id;
    }

    public get latitud(): number {
        return this._latitud;
    }

    public get longitud(): number {
        return this._longitud;
    }

    public get image_url(): string {
        return this._image_url;
    }

    public get title(): string {
        return this._title;
    }

    public get description(): string {
        return this._description;
    }

    public get state(): string {
        return this._state;
    }

    public get created_at(): Date {
        return this._created_at;
    }

    public get bonding_boxes(): IBoundingBox[] {
        return this._bonding_boxes;
    }
}
