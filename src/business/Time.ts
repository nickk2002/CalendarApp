import dateFormat from "dateformat"


function padZero(num: number) {
    if (num < 10)
        return '0' + num;
    return num;
}

export class Time {
    minutes: number;
    hour: number;
    year: number;
    day: number;
    month: string;

    static readonly dateFormatStringForParsing = "yyyy,d mmm, HH:MM";

    static createTime(time: Time) {
        return new Time(time.year, time.month, time.day, time.hour, time.minutes);
    }

    constructor(year:number, month:string, day:number, hour:number, minutes:number) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = hour;
        this.minutes = minutes;
    }

    /**
     * Format the time as `hour:minutes`
     * hour and minutes are padded with 0s
     * @returns a string that describes the `hours:minutes`
     */
    formatHourTime() {
        const hourString = padZero(this.hour);
        const minuteString = padZero(this.minutes);
        return hourString + ":" + minuteString;
    }

    prettyPrintTime() {
        return dateFormat(this.convertToDate(), "d mmm 'At' HH:MM")
    }
    /**
     * day month, hour : minutes
     * @returns a string of the format
     */
    toDateFormat(): string {
        return `${this.day} ${this.month}, ${padZero(this.hour)} :${padZero(this.minutes)}`
    }


    /**
     * Parses the date received using the string {@link dateFormatString} as a {@link Time}
     * @param date a Date Object or a string representing the current Date
     * @returns a time representation of the date
     */
    static parseTime(date: string | Date): Time {
        const dateString: string = dateFormat(date, Time.dateFormatStringForParsing);
        return this.parseStringToTimeObject(dateString);
    }

    /**
     * @returns {@link Date} object representation of the class
     */
    convertToDate(): Date {
        return new Date(`${this.day} ${this.month} ${this.year} ${this.hour}:${this.minutes}`)
    }

    /**
     * Compares time object to another one
     * @param other  {@link Time} object
     * @returns true/false if the objects are equal
     */
    equals(other: Time) {
        return this.day === other.day && this.hour == other.hour && this.minutes == other.minutes
            && this.month == other.month && this.year == other.year;
    }


    /**
     *
     * @param dateString {@link Date} representation as a string
     * @returns {@link Time} object that corresponds to the string input
     */
    private static parseStringToTimeObject(dateString: string): Time {
        const year = dateString.split(",")[0]
        const [day, month] = dateString.split(",")[1].split(" ")
        const [hour, minute] = dateString.split(",")[2].split(":")
        return new Time(
            parseInt(year),
            month,
            parseInt(day),
            parseInt(hour),
            parseInt(minute)
        )
    }

    /**
     * @returns the {@link Time} of today using {@link Date()}
     */
    static today(): Time {
        const now = Date();
        return Time.parseTime(now);
    }

    /**
     * @param hour to force the time object to have
     * @returns a {@link Time} object that has hours equal to hour and 0 minutes
     */
    withHour(hour: number): Time {
        const timeCopy = Time.createTime(this);
        timeCopy.hour = hour;
        timeCopy.minutes = 0;
        return timeCopy;
    }

    /**
     * @param hour to force the time object to have
     * @param minutes to force the time object to have
     * @returns a {@link Time} object that has hours equal to hour and 0 minutes
     */
    withHoursMinutes(hour: number, minutes: number): Time{
        const time = Time.createTime(this);
        time.hour = hour;
        time.minutes = minutes;
        return time;
    }
}