import {beforeEach, describe, expect, test} from '@jest/globals';
import {formatHourTime} from "../Utils";

describe("format House time", () => {
    let time;
    beforeEach(() => {
        time = {day: 10, month: "Aug", hour: 10, minutes: 15}
    });
    test('format Hour time normal', () => {
        expect(formatHourTime(time)).toBe("10:15");
    })
    test('format Hour time minutes < 10', () => {
        time.minutes = 2;
        expect(formatHourTime(time)).toBe("10:02");
    })
    test('format Hour time hour < 10', () => {
        time.hour = 8;
        expect(formatHourTime(time)).toBe("08:15");
    })
    test('format Hour time hour < 10, time < 10', () => {
        time.hour = 8;
        time.minutes = 5;
        expect(formatHourTime(time)).toBe("08:05");
    })
})
