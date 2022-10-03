import {TimeInterval} from "./HourIntervalDisplay";
import {Time} from "../../src/business/Time";

export interface CalendarItemType extends TimeInterval {
    color?: string;
    header?: string;
    description?: string;
    isFreeTime?: boolean;
    handlePress?: () => void;
    timeChanged?: Time,

    location?: string;
    course?: string;
    isFromCalendar?: boolean;
}