import { ReportModel } from "./report.model";

export class HistoryReports {
    private reports: ReportModel[];

    constructor() {
        this.reports = [];
    }

    append(...items: ReportModel[]) {
        this.reports.push(...items);
    }

    listReports() {
        return this.reports;
    }
}
