export interface IReport {
    latitud: number;
    longitud: number;
    image_url: string;
    bonding_boxes: {
        label: string;
        x: number;
        y: number;
        width: number;
        height: number;
    }[];
    title: string;
    description: string;
    state: string;
    created_at: Date;
}

export class ReportModel {
    private raw_report: IReport;

    constructor(report: IReport) {
        this.raw_report = report;
    }

    get raw() {
        return this.raw_report;
    }
}
