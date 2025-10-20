import { ReportModel } from "./report.model";

class MapModel {
    private reports: ReportModel[];
    constructor() {
        this.reports = [];
    }

    setList(reports: ReportModel[]) {
        this.reports = reports;
    }
    
    append(...items: ReportModel[]) {
        this.reports.push(...items);
    }

    listReports() {
        return this.reports;
    }
}
