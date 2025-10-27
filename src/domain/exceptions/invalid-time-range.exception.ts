
export class TimeRangeEndTimeBeforeStartTimeException extends Error {
    constructor(start_time: Date, end_time: Date) {
        super(`End time (${end_time.getUTCDate()}) before (${start_time.getUTCDate()})`);
        this.name = 'TimeRangeEndTimeBeforeStartTimeException';
    }
}
