import { PaginationLimitIncorrectException, PaginationPageIncorrectException } from "../exceptions/invalid-pagination.exception";
import { IReportQueryRepository } from "../ports/repositories/report-query.repository";
import { PaginationParams, ReportQueryParams } from "../queries/report-params.query";

export class GetHistoryReportPaginatedUseCase {
    constructor(private report_query_repository: IReportQueryRepository) {}

    validPaginationPage(pagination: PaginationParams) {
        return pagination.page > 0 && pagination.limit > 0;
    }

    validPaginationLimit(pagination: PaginationParams) {
        return pagination.page > 0 && pagination.limit > 0;
    }

    async execute(pagination_params: ReportQueryParams) {
        if (!this.validPaginationPage(pagination_params.pagination)) {
            throw new PaginationPageIncorrectException(pagination_params.pagination.page);
        }

        if (!this.validPaginationLimit(pagination_params.pagination)) {
            throw new PaginationLimitIncorrectException(pagination_params.pagination.limit);
        }

        this.report_query_repository.findPaginated(pagination_params);
    }
}
