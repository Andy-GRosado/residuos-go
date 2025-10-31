import { IBaseModel, ICreatedByModel, IShortCreatedByModel } from "./base.model"

export interface IShortComment extends IBaseModel, IShortCreatedByModel {
    report_id: string,
    content: string,
    created_by: string
}

export interface IComment extends IBaseModel, ICreatedByModel {
    id: string,
    created_at: Date,
    report_id: string,
    content: string,
    created_by: string
}
