import dateFormat from "dateformat";

export type Time = {
    day: number,
    month: string,
    hour: number,
    minutes: number,
}

export function formatHourTime(time: Time) {
    const hourString = time.hour >= 10 ? time.hour : "0" + time.hour;
    const minuteString = time.minutes >= 10 ? time.minutes : "0" + time.minutes;
    return hourString + ":" + minuteString;
}

export function getDayMonth(date: string | Date) {
    return dateFormat(date, "d mmmm");
}

export function formatDateNormal(date: string) {
    return dateFormat(date, dateFormatString);
}

export function padZero(num: number) {
    if (num < 10)
        return '0' + num;
    return num;
}

export function displayTimeToDateFormat(time: Time) {
    return `${time.day} ${time.month}, ${padZero(time.hour)} :${padZero(time.minutes)}`
}

export function createJsDateFromTimeFormat(time: Time): Date {
    return new Date(`${time.day} ${time.month} 2022 ${time.hour}:${time.minutes}`)
}

export function prettyPrintDayName(time: Time) {
    return dateFormat(createJsDateFromTimeFormat(time), "DDDD")
}

export function getToday(): Time {
    const now = Date();
    return parseIntoTimeObject(now);
}

export function prettyPrintTime(time: Time) {
    return dateFormat(createJsDateFromTimeFormat(time), "d mmm 'At' HH:MM")
}

export function prettyPrintDifferenceDate(time1: string, time2: string) {
    return prettyPrintDifferenceTime(parseIntoTimeObject(time1), parseIntoTimeObject(time2));
}

export function prettyPrintDifferenceTime(time1: Time, time2: Time) {
    const difMinutes = time2.hour * 60 + time2.minutes - time1.hour * 60 - time1.minutes;
    if (difMinutes <= 0)
        return "No duration"
    // assume only hours/ minutes

    const hours = Math.floor(difMinutes / 60);
    const minutes = difMinutes - hours * 60;
    let finalString = "";
    if (hours > 0) {
        finalString += hours.toString() + " hour" + (hours > 1 ? "s" : "")
    }
    if (hours > 0 && minutes > 0)
        finalString += " "
    if (minutes > 0)
        finalString += minutes + " min"
    return finalString
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

export function parseIntoTimeObject(date: string | Date): Time {
    const dateString: string = dateFormat(date, dateFormatString);
    return parseStringToTimeObject(dateString);
}

export function getTimeWithThisHour(givenTime: Time, hour: number): Time {
    givenTime.hour = hour;
    givenTime.minutes = 0;
    return givenTime;
}

export function getTodayWithThisHour(hour: number): Time {
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

export function getTodayWithThisHourMinutes(hour: number, minutes: number): Time {
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

export function compareTime(time1: Time, time2: Time) {
    return time1.day === time2.day && time1.hour == time2.hour
        && time1.minutes == time2.minutes && time1.month == time2.month;

}

export function getHourDifference(time1: Time, time2: Time) {
    const minutes2 = 60 * time2.hour + time2.minutes;
    const minutes1 = 60 * time1.hour + time1.minutes;
    const minuteDif = minutes2 - minutes1;
    return minuteDif / 60;
}