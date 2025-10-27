
export class ReportWithoutObjectsDetectedException extends Error {
    constructor() {
        super(`The report has not any object detected`);
        this.name = 'ReportWithoutObjectsDetectedException';
    }
}
