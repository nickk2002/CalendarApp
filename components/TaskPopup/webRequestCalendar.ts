import {readXMLRequest} from "../../calendarParser";
import {CalendarItemType} from "../Schedule/CalendarItem";
import {JSONEquals} from "../../Utils";
import clone from "just-clone";

export default function webRequest(parsedTasks,callback:()=>any, callbackNewTasks: (newTasks) => any,fail:()=>any) {
    console.log("Starting web request")
    readXMLRequest((tasksFromCalendar) => {
        let currentTasks: CalendarItemType[] = [];
        if (parsedTasks !== null)
            currentTasks = clone(parsedTasks);
        for (const calendarItem of tasksFromCalendar) {
            if (currentTasks.filter(item => JSON.stringify(item) === JSON.stringify(calendarItem)).length == 0) {
                const before = currentTasks.filter(item =>
                    JSONEquals(item.startTime, calendarItem.startTime) && JSONEquals(item.endTime, calendarItem.endTime)
                    && item.isFromCalendar == calendarItem.isFromCalendar);
                if (before.length > 0) {
                    // save description
                    calendarItem.description = before[0].description
                    const index = currentTasks.indexOf(before[0]);
                    currentTasks.splice(index, 1)
                }
                currentTasks.push(calendarItem);
            }
        }
        if (!JSONEquals(currentTasks, parsedTasks)) {
            callbackNewTasks(currentTasks);
        }
        callback();
        console.log("Done with web request");
    });

    fail();

}