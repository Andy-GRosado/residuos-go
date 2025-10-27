import { UserId } from "@/src/domain/entities/user.entity";
import {
    PaginationLimitIncorrectException,
    PaginationPageIncorrectException,
} from "../../exceptions/invalid-pagination.exception";
import { IReportQueryRepository } from "../../ports/repositories/report-query.repository";
import {
    PaginationParams,
    ReportFilters,
    ReportQueryParams,
} from "../../queries/report-params.query";

export class GetUserHistoryReport {
    constructor(
        private readonly report_query_repository: IReportQueryRepository
    ) {}

    validPaginationPage(pagination: PaginationParams) {
        return pagination.page > 0 && pagination.limit > 0;
    }

    validPaginationLimit(pagination: PaginationParams) {
        return pagination.page > 0 && pagination.limit > 0;
    }

    async execute(pagination_params: ReportQueryParams, owner_id: UserId) {
        if (!this.validPaginationPage(pagination_params.pagination)) {
            throw new PaginationPageIncorrectException(
                pagination_params.pagination.page
            );
        }

        if (!this.validPaginationLimit(pagination_params.pagination)) {
            throw new PaginationLimitIncorrectException(
                pagination_params.pagination.limit
            );
        }
        let final_pagination_params = pagination_params;
        if (!pagination_params.filters) {
            final_pagination_params = new ReportQueryParams(
                pagination_params.pagination,
                new ReportFilters(undefined, owner_id),
                pagination_params.sort
            );
        } else if (!pagination_params.filters.ownerId) {
            final_pagination_params = new ReportQueryParams(
                pagination_params.pagination,
                new ReportFilters(
                    pagination_params.filters.status ?? undefined,
                    owner_id,
                    pagination_params.filters.tags ?? undefined
                ),
                pagination_params.sort
            );
        }

        this.report_query_repository.findPaginated(final_pagination_params);
    }
}
