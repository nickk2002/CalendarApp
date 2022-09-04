import GlobalStore from "react-native-global-state-hooks";
import {parseIntoTimeObject} from "../Utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const tasksStorageKey = "TASKS"
export const themeStorageKey = "Theme"
const themeStore = new GlobalStore('white');
export const themeHook = themeStore.getHook()

const taskStore = new GlobalStore([])
export const taskHook = taskStore.getHook()


const filteredTaskStore = new GlobalStore([])
export const filteredTasksHook = filteredTaskStore.getHook()

const currentDay = new GlobalStore(parseIntoTimeObject(Date()));
export const calendarDayHook = currentDay.getHook()



export const storeTasksAsync = newTodos => {
    const stringifiedTasks = JSON.stringify(newTodos);
    AsyncStorage.setItem(tasksStorageKey, stringifiedTasks).catch(err => {
        console.warn('Error storing todos in Async');
        console.warn(err);
    });
};
