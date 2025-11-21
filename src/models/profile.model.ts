import { ICreatedByModel, IFromSupabase, IShortCreatedByModel } from "./supabase.model";

export interface IShortProfile extends IFromSupabase, IShortCreatedByModel {
    id: string,
    created_at: Date,
    names: string,
    last_names: string,
    username: string,
    gender: string,
    phone_number: string,
    photo_url: string,
}

export interface IProfile extends IFromSupabase, ICreatedByModel {
    id: string,
    created_at: Date,
    names: string,
    last_names: string,
    username: string,
    gender: string,
    phone_number: string,
    photo_url: string,
}
