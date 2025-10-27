import { ReportEntity } from "@/src/domain/entities/report.entity";
import { IReportRepository } from "@/src/domain/repositories/report.repository";
import { GeographicArea } from "@/src/domain/vo/geographic-area.vo";

export class GetReportsNearLocationUseCase {
    constructor(
        private report_repository: IReportRepository,
    ) {}
    
    async execute(geographic_area: GeographicArea): Promise<ReportEntity[]> {
        const reports = await this.report_repository.findReportsInArea(geographic_area);
        return reports;
    }
}

