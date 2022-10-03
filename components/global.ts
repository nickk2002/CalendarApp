import GlobalStore from "react-native-global-state-hooks";
import {parseIntoTimeObject} from "../Utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const tasksStorageKey = "TASKS"
export const themeStorageKey = "Theme"
export const cuvinteStorageKey = "Cuvinte"
export const calendarLastDayStorageKey = "CALENDAR"

const themeStore = new GlobalStore('white');
export const themeHook = themeStore.getHook()

const taskStore = new GlobalStore([])
export const taskHook = taskStore.getHook()

const cuvinteStore = new GlobalStore([])
export const cuvinteHook = cuvinteStore.getHook()

const filteredTaskStore = new GlobalStore([])
export const filteredTasksHook = filteredTaskStore.getHook()

const currentDay = new GlobalStore(parseIntoTimeObject(Date()));
export const calendarDayHook = currentDay.getHook()

const lastRefreshDay = new GlobalStore(new Date());
export const lastRefreshDateHook = lastRefreshDay.getHook();

export const storeTasksAsync = newTodos => {
    const stringifiedTasks = JSON.stringify(newTodos);
    AsyncStorage.setItem(tasksStorageKey, stringifiedTasks).catch(err => {
        console.warn('Error storing todos in Async');
        console.warn(err);
    });
};
export const storeCuvinteAsync = newCuvinte => {
    const stringifiedTasks = JSON.stringify(newCuvinte);
    AsyncStorage.setItem(cuvinteStorageKey, stringifiedTasks).catch(err => {
        console.warn('Error storing cuvinte in Async');
        console.warn(err);
    });
}
export const storeLastCalendarRefreshDate = calendarDay =>{
    const calendar = JSON.stringify(calendarDay);
    AsyncStorage.setItem(calendarLastDayStorageKey, calendar).catch(err => {
        console.warn('Error storing calendar edit date');
        console.warn(err);
    });
}
