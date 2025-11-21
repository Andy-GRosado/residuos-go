import { ICreatedByModel, IFromSupabase } from "./supabase.model";

interface IBoundingBox {
    label: string
    x: number,
    y: number,
    width: number,
    height: number,
}

export interface IReport {
    title: string,
    description: string,
    state: string,
    issues: string[]
    latitude: Float32Array,
    longitude: Float32Array,
    image_url: string,
    bounding_boxes: IBoundingBox[],
}

export interface ILongReport extends IFromSupabase, ICreatedByModel {
    title: string,
    description: string,
    state: string,
    issues: string[]
    latitude: Float32Array,
    longitude: Float32Array,
    image_url: string,
    bounding_boxes: IBoundingBox[],
}

export interface IReportStatus extends IFromSupabase, ICreatedByModel {
    report_id: string,
    created_by: string
}
