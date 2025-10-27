import { ReportEntity } from "@/src/domain/entities/report.entity";
import { UserId } from "@/src/domain/entities/user.entity";
import { ReportFilters, ReportQueryParams } from "../../queries/report-params.query";
import { TPaginated } from "../../vo/without.vo";

export interface IReportQueryRepository {
    findPaginated(params: ReportQueryParams): Promise<TPaginated<ReportEntity[]>>;
    findByFilters(filters: ReportFilters): Promise<ReportEntity[]>;
    findRecentReports(owner: UserId, days: number): Promise<ReportEntity[]>;
}
