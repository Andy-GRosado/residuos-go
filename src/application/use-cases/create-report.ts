import { ReportEntity } from "@/src/domain/entities/report.entity";
import { UserEntity } from "@/src/domain/entities/user.entity";
import { IReportRepository } from "@/src/domain/repositories/report.repository";
import { ReportWithoutObjectsDetectedException } from "../exceptions/report-without-objects-detected.exception";


export class CreateReportDto implements Omit<IReport, 'id' | 'created_at'> {
    constructor(
        public latitud: number,
        public longitud: number,
        public image_url: string,
        public title: string,
        public description: string,
        public state: string,
        public created_at: Date,
        public bonding_boxes: { label: string; x: number; y: number; width: number; height: number; }[],
    ) {}
}

export class CreateReportUserCase {
    constructor(
        private report_history: IReportRepository,
        private user: UserEntity,
    ) {}

    hasObjectsDetected(report_dto: CreateReportDto) {
        return report_dto.bonding_boxes.length > 0
    }
    
    async execute (new_report_dto: CreateReportDto) {
        if (!this.hasObjectsDetected(new_report_dto)) {
            throw new ReportWithoutObjectsDetectedException();
        }

        const new_report = ReportEntity.create(new_report_dto)
        const report_history_service = new ReportHistoryService(this.report_history, this.user);
        await report_history_service.addNewReport(new_report);
    }
}

