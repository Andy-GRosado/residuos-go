

export interface IBaseModel {
    id: string,
    created_at: Date,
}


export interface ICreatedByModel {
    created_by: string,
    user: any,
}

export interface IShortCreatedByModel {
    created_by: string
}
