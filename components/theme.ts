import GlobalStore from "react-native-global-state-hooks";
import {Appearance} from "react-native";
import {parseIntoTimeObject} from "../Utils";
import {CalendarItemType} from "./Schedule/CalendarItem";

const theme = Appearance.getColorScheme();
export let defaultTheme = 'dark';
if (theme === 'light')
    defaultTheme = 'white'
const themeStore = new GlobalStore(defaultTheme);
export const themeHook = themeStore.getHook()

const taskStore = new GlobalStore<CalendarItemType[], string>([], null, "GLOBAL_TASKS");
export const taskHook = taskStore.getHook()


const filteredTaskStore = new GlobalStore<CalendarItemType[],string>([],null,"Filtered_TASKS");
export const filteredTasksHook = filteredTaskStore.getHook()

const currentDay = new GlobalStore(parseIntoTimeObject(Date()));
export const calendarDayHook = currentDay.getHook()