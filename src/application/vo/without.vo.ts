export type TWithoutIdAndCreatedDate<T> = Omit<T, "id" | "created_at">;
export type TWithoutCreatedFor<T> = Omit<T, "created_for">;

export type TPaginated<T> = {
    data: T
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
};

