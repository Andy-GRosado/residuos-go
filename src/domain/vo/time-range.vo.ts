import { TimeRangeEndTimeBeforeStartTimeException } from "../exceptions/invalid-time-range.exception";

export class TimeRange {
    constructor(private readonly start_time: Date, private readonly end_time: Date) {
        if (!this.validTimeRange()) {
            throw new TimeRangeEndTimeBeforeStartTimeException(start_time, end_time);
        }
    }

    validTimeRange(): boolean {
        return (this.end_time.valueOf() <= this.start_time.valueOf())
    }
}
