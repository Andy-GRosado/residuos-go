export class ReportStatus {
    constructor(public description: string) {}
}

export class AttendedReportStatus extends ReportStatus{
    constructor() {
        super("attended");
    }
}

export class ReportedReportStatus extends ReportStatus{
    constructor() {
        super("reported");
    }
}
