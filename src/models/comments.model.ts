import { ICreatedByModel, IFromSupabase, IShortCreatedByModel } from "./supabase.model"

export interface IShortComment extends IFromSupabase, IShortCreatedByModel {
    report_id: string,
    content: string,
    created_by: string
}

export interface IComment extends IFromSupabase, ICreatedByModel {
    id: string,
    created_at: Date,
    report_id: string,
    content: string,
    created_by: string
}
