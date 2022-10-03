import {beforeEach, describe, expect, test} from '@jest/globals';
import {prettyPrintDifferenceTime} from "../Utils";
import {i18n} from "dateformat"
import {Time} from "../Time";

function checkDateEqualsTime(date: Date, time: Time) {
    expect(date.getDate()).toBe(time.day);
    expect(date.getHours()).toBe(time.hour);
    expect(date.getMinutes()).toBe(time.minutes);
    expect(date.getFullYear()).toBe(time.year);
    const monthName = i18n.monthNames[date.getMonth()];
    expect(monthName).toBe(time.month);
}

describe("Time Tests", () => {
    describe("format Hour time", () => {
        let time;
        beforeEach(() => {
            time = new Time(2022, "Aug", 10, 10, 15)
        });
        test('format Hour time normal', () => {
            expect(time.formatHourTime()).toBe("10:15");
        })
        test('format Hour time minutes < 10', () => {
            time.minutes = 2;
            expect(time.formatHourTime()).toBe("10:02");
        })
        test('format Hour time hour < 10', () => {
            time.hour = 8;
            expect(time.formatHourTime()).toBe("08:15");
        })
        test('format Hour time hour < 10, time < 10', () => {
            time.hour = 8;
            time.minutes = 5;
            expect(time.formatHourTime()).toBe("08:05");
        })
    })

    describe("Display time format", () => {
        test("Convert to Date", () => {
            let time = new Time(1900, "Sep", 2, 10, 15);
            const date = time.convertToDate();
            checkDateEqualsTime(date, time);
        })
        test("Parse time from Date Object for Date = Now()", () => {
            const date = new Date();
            const dateString = date.toString();
            const time = Time.parseTime(dateString);
            checkDateEqualsTime(date, time)
        })
        test("Parse time from Date Object for Set Date", () => {
            const date = new Date('4-10-1995 12:00');
            const dateString = date.toString();
            const time = Time.parseTime(dateString);
            console.log(date.getDate());
            checkDateEqualsTime(date, time)
        })
        test("Today method", () => {
            expect(Time.today()).toEqual(Time.parseTime(new Date()));
        })
    })
    describe("Time with Hour/Minuntes", () => {

        test("Time With hour ", () => {
            expect(Time.today().withHour(10)).toHaveProperty("hour", 10);
            expect(Time.today().withHour(10)).toHaveProperty("minutes", 0);
        })
        test("Time With hour does not change initial", () => {
            const time = new Time(12, "Aug", 12, 13, 14);
            time.withHour(10);
            expect(time.minutes).not.toBe(10);
        })
        test("Time with hour + min", () => {
            const time = new Time(12, "Aug", 12, 13, 10);
            const min = 14, hour = 10;
            const otherTime = time.withHoursMinutes(hour, min);
            expect(time.minutes).not.toBe(min);
            expect(time.hour).not.toBe(hour);

            expect(otherTime.minutes).toBe(min);
            expect(otherTime.hour).toBe(hour);
        })
    })
    describe("Time difference", () => {

        test("difference time with same hour has `hours`", () => {
            const time1 = {
                hour: 10,
                minutes: 15
            };
            const time2 = {
                hour: 20,
                minutes: 15
            };
            expect(prettyPrintDifferenceTime(time1, time2)).toBe("10 hours")
        })
        test("difference time with 1 hour difference", () => {
            const time1 = {
                hour: 10,
                minutes: 15
            };
            const time2 = {
                hour: 11,
                minutes: 15
            };
            expect(prettyPrintDifferenceTime(time1, time2)).toBe("1 hour")
        })
        test("difference time with 2 hours 20 min diff", () => {
            const time1 = {
                hour: 10,
                minutes: 15
            };
            const time2 = {
                hour: 12,
                minutes: 35
            };
            expect(prettyPrintDifferenceTime(time1, time2)).toBe("2 hours 20 min")
        })
        test("difference time with 0 hours 10 min diff", () => {
            const time1 = {
                hour: 10,
                minutes: 15
            };
            const time2 = {
                hour: 10,
                minutes: 25
            };
            expect(prettyPrintDifferenceTime(time1, time2)).toBe("10 min")
        })
    })
})
