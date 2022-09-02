// noinspection JSObjectNullOrUndefined

import {CalendarItemType} from "./components/Schedule/CalendarItem";
import {parseIntoTimeObject} from "./Utils";


function parseDate(date: string) {
    const trimmed = date.trim();
    const firstPart = trimmed.split("T")[0]
    const year = firstPart.substring(0, 4);
    const month = firstPart.substring(4, 6);
    const day = firstPart.substring(6, 8);
    const secondPart = trimmed.split("T")[1]
    const hour = secondPart.substring(0, 2);
    const minute = secondPart.substring(2, 4);
    const parsedDate = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), 0);
    return parseIntoTimeObject(parsedDate);
}


export function readXMLRequest(callback: (arg0: CalendarItemType[]) => void) {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            const lines = request.responseText.split("\n");
            const data: CalendarItemType[] = parseLines(lines);
            callback(data);
        }
    }
    request.open(
        "GET",
        "https://mytimetable.tudelft.nl/ical?63076b72&group=false&eu=bmZpbGF0QHR1ZGVsZnQubmw=&h=6lycLXlBG7LTJUk7gQWSsCGOucrROA4XkcWq3JRl9CY=",
    );
    request.send();
}

function removeFromLocation(location: string, stuff: string[]) {
    for (const toRemove of stuff) {
        location = location.replace(new RegExp(toRemove, "g"), "")
    }
    return location;
}

function parseLines(lines: string[]): CalendarItemType[] {
    const events: CalendarItemType[] = [];
    let eventIndex = 0;
    let location = "";
    let event: CalendarItemType | null = null;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (location.length > 0) {
            if (line.includes(":")) {
                location = location.replace(new RegExp("\\\\", "g"), " ")
                location = removeFromLocation(location, ["EEMCS", "(^-| -)", "Lecture Hall", "Auditorium", "- A"])
                location = location.replace(new RegExp("-?\\([./\\w]+\\),?", "g"), "");
                location = location.replace(new RegExp("Aula-", "g"), "Aula")
                location = location.replace(new RegExp(" ,", "g"), ",")
                location = location.replace(new RegExp("Drebbelweg", "g"), "DW")

                event.location = location.trim();
                location = "";
            } else {
                location += line.trim();
            }
        }
        if (line.startsWith('DTSTART')) {
            const date = line.split(":");
            // @ts-ignore
            event = {startTime: parseDate(date[1])};
        } else if (line.startsWith('DTEND')) {
            const date = line.split(":");
            event.endTime = parseDate(date[1]);
        } else if (line.startsWith('SUMMARY')) {
            const title = line.split(":")[1].trim();
            if (!title.includes("-")) {
                event.header = title;
            } else {
                const splitter = title.split("-")
                event.header = splitter[1].trim();
                event.course = splitter[0].trim();
                if (splitter.length == 3) {
                    event.course = splitter[2].trim()
                    console.log(event.header)
                    console.log("Course name is:", splitter[2])
                } else {
                    const re = RegExp("[0-9]+");
                    if (!re.test(event.course)) {
                        event.header = title;
                        event.course = "";
                    }
                }
            }
        } else if (line.includes("DESCRIPTION")) {

        } else if (line.startsWith("LOCATION")) {
            location = line.split(":") [1].trim();
        } else if (lines[i].includes('END:VEVENT')) {
            event.isFromCalendar = true;
            event.color = 'red';
            const re = RegExp("[0-9]+");
            if (!re.test(event.course)) {
                event.color = 'yellow' // exam color
            }
            events[eventIndex] = event;
            event = null;
            eventIndex++;
        }
    }
    return events;
}