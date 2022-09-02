import {CalendarItemType} from "./Schedule/CalendarItem";
import {getTodayWithThisHour, getTodayWithThisHourMinutes} from "../Utils";

export const defaultTasks: CalendarItemType[] = [
    {
        header: 'Project Z',
        description: 'Work hard',
        color: 'red',
        startTime: getTodayWithThisHour(18),
        endTime: getTodayWithThisHour(20),
    },
    // {
    //     header: 'Project Not Here',
    //     description: 'Work hard',
    //     color: 'red',
    //     startTime: {
    //         month: "Aug",
    //         day: 19,
    //         hour: 10,
    //         minutes: 2
    //     },
    //     endTime: getTodayWithThisHour(20),
    // },
    {
        header: 'Meeting',
        description: 'Prepare Speech\nTake Notes\nAsk about that\n',
        color: 'blue',
        startTime: getTodayWithThisHourMinutes(9, 30),
        endTime: getTodayWithThisHourMinutes(10, 30)
    },
    {
        header: 'Cook',
        description: 'Cook some rice with vegetables',
        color: 'yellow',
        startTime: getTodayWithThisHour(13),
        endTime: getTodayWithThisHour(14),
    },
    {
        header: 'Project X',
        description: 'Work hard',
        color: '#9D85D4',
        startTime: getTodayWithThisHour(8),
        endTime: getTodayWithThisHour(9),
    },
];
