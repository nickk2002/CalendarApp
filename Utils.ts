import dateFormat from "dateformat";

export type time = {
    day: number,
    month: string,
    hour: number,
    minutes: number,
}

export function formatHourTime(time: time) {
    const hourString = time.hour >= 10 ? time.hour : "0" + time.hour;
    const minuteString = time.minutes >= 10 ? time.minutes : "0" + time.minutes;
    return hourString + ":" + minuteString;
}

export function getTodayDayMonth() {
    return dateFormat(Date(), "d mmmm");
}

export function padZero(num: number) {
    if (num < 10)
        return '0' + num;
    return num;
}

export function displayTimeToDateFormat(time: time) {
    return `${time.day} ${time.month}, ${padZero(time.hour)} :${padZero(time.minutes)}`
}

export function createJsDateFromTimeFormat(time: time): Date {
    return new Date()
}

export function getToday(): time {
    const now = Date();
    return parseIntoTimeObject(now);
}

export const dateFormatString = "d mmm, HH:MM";

export function parseStringToTimeObject(dateString: string) {
    const [day, month] = dateString.split(",")[0].split(" ")
    const [hour, minute] = dateString.split(",")[1].split(":")
    return {
        day: parseInt(day),
        month: month,
        hour: parseInt(hour),
        minutes: parseInt(minute)
    }
}

export function parseIntoTimeObject(date: string | Date): time {
    const dateString: string = dateFormat(date, dateFormatString);
    return parseStringToTimeObject(dateString);
}

export function getTodayWithThisHour(hour: number): time {
    const now = Date();
    const dateString: string = dateFormat(now, dateFormatString);
    const [day, month] = dateString.split(",")[0].split(" ")
    return {
        day: parseInt(day),
        month: month,
        hour: hour,
        minutes: 0
    }
}

export function getTodayWithThisHourMinutes(hour: number, minutes: number): time {
    const now = Date();
    const dateString: string = dateFormat(now, dateFormatString);
    const [day, month] = dateString.split(",")[0].split(" ")
    return {
        day: parseInt(day),
        month: month,
        hour: hour,
        minutes: minutes
    }
}

export function compareTime(time1: time, time2: time) {
    return time1.day === time2.day && time1.hour == time2.hour
        && time1.minutes == time2.minutes && time1.month == time2.month;

}

export function getHourDifference(time1: time, time2: time) {
    const minutes2 = 60 * time2.hour + time2.minutes;
    const minutes1 = 60 * time1.hour + time1.minutes;
    const minuteDif = minutes2 - minutes1;
    return minuteDif / 60;
}