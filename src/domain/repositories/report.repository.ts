import { ReportEntity, ReportId } from "../entities/report.entity";
import { UserId } from "../entities/user.entity";
import { GeographicArea } from "../vo/geographic-area.vo";
import { ReportStatus } from "../vo/report-status.vo";
import { TimeRange } from "../vo/time-range.vo";

export interface IReportRepository {
    findById(id: ReportId): Promise<ReportEntity | null>;
    findByOwner(owner: UserId): Promise<ReportEntity[]>;
    save(report: ReportEntity): Promise<void>;
    delete(report: ReportEntity): Promise<void>;

    findReportsInArea(area: GeographicArea): Promise<ReportEntity[]>;
    findActiveReports(owner: UserId): Promise<ReportEntity[]>;
    findReportsByStatus(
        owner: UserId,
        status: ReportStatus
    ): Promise<ReportEntity[]>;
    getReportByTimeRange(timeRange: TimeRange): Promise<ReportEntity>;
}
