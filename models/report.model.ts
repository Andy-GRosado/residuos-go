import { IBaseModel, ICreatedByModel, IShortCreatedByModel } from "./base.model";

interface IBoundingBox {
    label: string
    x: number,
    y: number,
    width: number,
    height: number,
}

export interface IShortReport extends IBaseModel, IShortCreatedByModel {
    title: string,
    description: string,
    state: string,
    issues: string[]
    latitude: Float32Array,
    longitude: Float32Array,
    image_url: string,
    bounding_boxes: IBoundingBox[],
}

export interface IReport extends IBaseModel, ICreatedByModel {
    title: string,
    description: string,
    state: string,
    issues: string[]
    latitude: Float32Array,
    longitude: Float32Array,
    image_url: string,
    bounding_boxes: IBoundingBox[],
}
