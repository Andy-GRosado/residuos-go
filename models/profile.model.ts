import { IBaseModel, ICreatedByModel, IShortCreatedByModel } from "./base.model";

export interface IShortProfile extends IBaseModel, IShortCreatedByModel {
    id: string,
    created_at: Date,
    names: string,
    last_names: string,
    username: string,
    gender: string,
    phone_number: string,
    photo_url: string,
}

export interface IProfile extends IBaseModel, ICreatedByModel {
    id: string,
    created_at: Date,
    names: string,
    last_names: string,
    username: string,
    gender: string,
    phone_number: string,
    photo_url: string,
}
