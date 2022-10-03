import dateFormat from "dateformat";
import {Time} from "./Time";

type HourMinutes = {
    minutes: number,
    hour: number
}

export const dateFormatString = "d mmm, HH:MM";

export function getDayMonth(date: string | Date) {
    return dateFormat(date, "d mmmm");
}

export function prettyPrintDayName(date) {
    return dateFormat(date,"DDDD")
}
export function formatDateNormal(date: string) {
    return dateFormat(date, dateFormatString);
}

export function prettyPrintDifferenceDate(time1: string, time2: string) {
    return prettyPrintDifferenceTime(Time.parseTime(time1), Time.parseTime(time2));
}
export function prettyPrintDifferenceTime(time1: HourMinutes, time2: HourMinutes) {
    const difMinutes = time2.hour * 60 + time2.minutes - time1.hour * 60 - time1.minutes;
    if (difMinutes <= 0)
        return "No duration"
    // assume only hours/minutes
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


/*
Difference between time2 and time1
 */
export function getHourDifference(time1: HourMinutes, time2: HourMinutes) {
    const minutes2 = 60 * time2.hour + time2.minutes;
    const minutes1 = 60 * time1.hour + time1.minutes;
    const minuteDif = minutes2 - minutes1;
    return minuteDif / 60;
}

export function JSONEquals(a, b) {
    return JSON.stringify(a) === JSON.stringify(b)
}