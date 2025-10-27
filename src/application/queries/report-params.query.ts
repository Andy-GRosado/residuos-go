import { UserId } from "@/src/domain/entities/user.entity";
import { ReportStatus } from "@/src/domain/vo/report-status.vo";

export class ReportQueryParams {
    constructor(
        public readonly pagination: PaginationParams,
        public readonly filters?: ReportFilters,
        public readonly sort?: SortParams
    ) {}
}

export class PaginationParams {
    constructor(
        public readonly page: number,
        public readonly limit: number
    ) {}
    
    get offset(): number {
        return (this.page - 1) * this.limit;
    }
}

export class ReportFilters {
    constructor(
        public readonly status?: ReportStatus[],
        public readonly ownerId?: UserId,
        public readonly tags?: string[]
    ) {}
}

export class SortParams {
    constructor(
        public readonly field: string,
        public readonly direction: 'asc' | 'desc'
    ) {}
}
