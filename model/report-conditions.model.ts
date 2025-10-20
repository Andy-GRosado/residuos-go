export interface IReportConditions {
    condition: "rodents" | "bad_odors" | "bad_aspect";
}

export class ReportConditionModel {
    private raw_report_condition: IReportConditions;

    constructor(report_condition: IReportConditions) {
        this.raw_report_condition = report_condition;
    }

    get raw() {
        return this.raw_report_condition;
    }
}
