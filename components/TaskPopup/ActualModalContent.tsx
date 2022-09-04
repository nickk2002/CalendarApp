import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import dateFormat from "dateformat";
import {
    dateFormatString,
    displayTimeToDateFormat,
    formatHourTime,
    getHourDifference,
    getTimeWithThisHour,
    getToday,
    parseIntoJsDateFromTime,
    parseIntoTimeObject,
    prettyPrintDifferenceDate,
    prettyPrintTime,
    Time
} from "../../Utils";

import {MyText} from "../Ceva";
import React, {useEffect, useRef, useState} from "react";
import {calendarDayHook, filteredTasksHook, taskHook, themeHook} from "../theme";
import {colors} from "../../colors";
import {CalendarItemType} from "../Schedule/CalendarItem";
import {PopupSettings} from "./Popup";
import EventTimeLabels from "./EventTimeLabels";
import EventOption from "./EventOptions";
import ColorPicker, {randomColor} from "./ColorPicker";
import {DeleteButton} from "./DeleteButton";
import {navigateBack} from "../../RootNavigation";
import FlashMessage from "react-native-flash-message";
import clone from "just-clone";


export default function ActualContent(props: PopupSettings) {
    const [taskHeader, setTaskHeader] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    const [theme] = themeHook();
    const [tasks, setTasks] = taskHook();
    const [getCalendarDay] = calendarDayHook();
    const [filteredTasks] = filteredTasksHook()

    const flashMessage = useRef(null);
    const editingTaskCopy = clone(props.editTask);

    const [isDatePickerVisibleStart, setStartDateVisibility] = useState(false);
    const [isDatePickerVisibleEnd, setDatePickerVisibilityEnd] = useState(false);
    const [startTime, setStartTime]: [string, any] = useState(parseIntoJsDateFromTime(getTimeWithThisHour(getCalendarDay, 10)).toString());
    const [endTime, setEndTime]: [string, any] = useState(parseIntoJsDateFromTime(getTimeWithThisHour(getCalendarDay, 11)).toString());

    const [taskColor, setTaskColor] = useState(randomColor());
    const [isColorPicking, setColorPicking] = useState(false);

    const backgroundColor = () => {
        if (theme === 'white')
            return 'black'
        return 'white'
    }
    const backgroundColorPlaceHolder = () => {
        if (theme === 'white')
            return 'grey'
        return '#a7a7a7'
    }
    useEffect(() => {
        if (props.startTime) {
            setStartTime(parseIntoJsDateFromTime(props.startTime));
            setEndTime(parseIntoJsDateFromTime(props.endTime));
        }
    }, [])
    useEffect(() => {
        if (props.editTask) {
            setStartTime(parseIntoJsDateFromTime(props.editTask.startTime).toString());
            setEndTime(parseIntoJsDateFromTime(props.editTask.endTime).toString());
        }
    })

    function validateStartTimes(start: Time, end: Time) {
        if (getHourDifference(start, end) < 0) {
            console.log("Bad!")
            flashMessage.current.showMessage({
                message: "Start time should be smaller than end time",
                description: `Task starts at ${formatHourTime(start)} and ends at ${formatHourTime(end)}`,
                type: "danger"
            })
            return false;
        }
        console.log("I have filtered:", filteredTasks.length)
        for (const otherTask of filteredTasks) {
            if (getHourDifference(otherTask.startTime, start) > 0 && getHourDifference(start, otherTask.endTime) > 0) {
                flashMessage.current.showMessage({
                    message: "Start time overlaps with another task " + otherTask.header,
                    description: `${formatHourTime(start)} overlaps with [${formatHourTime(otherTask.startTime)}, ${formatHourTime(otherTask.endTime)}]`,
                    type: "danger"
                })
                return false;
            }
            if (getHourDifference(otherTask.startTime, end) > 0 && getHourDifference(end, otherTask.endTime) > 0) {
                flashMessage.current.showMessage({
                    message: "End time overlaps with another task " + otherTask.header,
                    description: `${formatHourTime(end)} overlaps with [${formatHourTime(otherTask.startTime)}, ${formatHourTime(otherTask.endTime)}]`,
                    type: "danger"
                })
                return false;
            }
            if (getHourDifference(otherTask.startTime, start) < 0 && getHourDifference(end, otherTask.endTime) < 0) {
                flashMessage.current.showMessage({
                    message: "Start time and end time includes " + otherTask.header,
                    description: `[${formatHourTime((start))} ${formatHourTime(end)}] includes [${formatHourTime(otherTask.startTime)}, ${formatHourTime(otherTask.endTime)}]`,
                    type: "danger"
                })
                return false;
            }
        }
        return true;
    }


    function createTask() {
        const start = parseIntoTimeObject(startTime);
        const end = parseIntoTimeObject(endTime);
        if (!validateStartTimes(start, end)) {
            return;
        }
        const newTask: CalendarItemType = {
            header: taskHeader,
            description: taskDescription,
            startTime: parseIntoTimeObject(startTime),
            endTime: parseIntoTimeObject(endTime),
            color: taskColor,
            timeChanged: getToday()
        }
        console.log("Add task");

        const copy = [...tasks];
        copy.push(newTask);
        setTasks(copy);
        navigateBack();
    }


    function editTask() {
        const start = props.editTask.startTime;
        const end = props.editTask.endTime;
        if (!validateStartTimes(start, end)) {
            props.editTask.startTime = editingTaskCopy.startTime;
            props.editTask.endTime = editingTaskCopy.endTime;
            console.log("Not valid byt rolling back", props.editTask);
            return;
        }
        props.editTask.timeChanged = getToday();
        console.log(props.editTask)
        const other = [...tasks];
        setTasks(other);
        navigateBack();
    }

    function renderHeader() {
        return (props.editTask ?
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <TextInput
                        editable={!props.editTask?.isFromCalendar}
                        onChangeText={(content) => props.editTask.header = content}
                        style={[styles.headerTextInput, {color: backgroundColor()}]}>
                        {props.editTask.header}
                    </TextInput>
                </ScrollView>
                :
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <TextInput
                        placeholderTextColor={backgroundColorPlaceHolder()}
                        placeholder="New Task"
                        onChangeText={setTaskHeader}
                        value={taskHeader}
                        style={[styles.headerTextInput, {color: backgroundColor()}]}/>
                </ScrollView>
        )
    }

    function renderDescription() {
        return (props.editTask ?
                <TextInput
                    style={{paddingLeft: 25, padding: 10, fontSize: 15, maxHeight: 100, color: backgroundColor()}}
                    multiline
                    scrollEnabled
                    maxLength={30}
                    onChangeText={(text) => props.editTask.description = text}
                > {props.editTask.description} </TextInput>
                :
                <TextInput
                    placeholderTextColor={backgroundColorPlaceHolder()}
                    style={{paddingLeft: 25, padding: 10, fontSize: 15, maxHeight: 100, color: backgroundColor()}}
                    multiline
                    scrollEnabled
                    maxLength={30}
                    onChangeText={setTaskDescription}
                    value={taskDescription}
                    placeholder="Description"/>
        )
    }

    const renderLastEditDate = () => {
        if (props.editTask && props.editTask.timeChanged) {
            return (<MyText style={{
                padding: 10,
                color: colors.textgrey
            }}>
                Last
                Changed {prettyPrintTime(props.editTask.timeChanged)} </MyText>)
        }
        return <></>
    }

    function handleConfirmStart(date) {
        setStartDateVisibility(false);
        props.editTask ? props.editTask.startTime = parseIntoTimeObject(date) : setStartTime(date);
    }

    function handleConfirmEnd(date: Date) {
        setDatePickerVisibilityEnd(false);
        props.editTask ? props.editTask.endTime = parseIntoTimeObject(date) : setEndTime(date);
    }

    const displayInitialStartDate = () => {
        return props.editTask ? displayTimeToDateFormat(props.editTask.startTime) : dateFormat(startTime, dateFormatString);
    }
    const displayInitialEndDate = () => {
        return props.editTask ? displayTimeToDateFormat(props.editTask.endTime) : dateFormat(endTime, dateFormatString);
    }
    return (
        <ScrollView style={[styles.actualView, {backgroundColor: theme === 'white' ? "#FFFFFF" : "#2f2f2f"}]}>
            <View style={styles.padding}>
                {/*Header*/}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => setColorPicking(!isColorPicking)}
                        style={{
                            width: 20,
                            height: 20,
                            borderRadius: 100,
                            marginRight: 10,
                            backgroundColor: props.editTask ? props.editTask?.color : taskColor
                        }}/>
                    {renderHeader()}
                    <DeleteButton isVisible={props.editTask != undefined}
                                  onDelete={() => {
                                      setTasks(tasks.filter(t => JSON.stringify(t) !== JSON.stringify(props.editTask)));
                                      navigateBack();
                                  }}
                                  message={"Confirm delete " + props.editTask?.header}/>
                </View>
                <ColorPicker isVisible={isColorPicking} onPressColor={(color) => {
                    if (props.editTask)
                        props.editTask.color = color;
                    else
                        setTaskColor(color);
                    setColorPicking(false);
                }}/>
                {/*Start Date End Date*/}
                <View style={{
                    marginTop: 20,
                    flexDirection: "row",
                    justifyContent: 'space-around'
                }}>
                    <EventTimeLabels
                        onPress={() => {
                            if (!props.editTask?.isFromCalendar || props.editTask === null)
                                setStartDateVisibility(true);
                        }}
                        label="Starts"
                        value={displayInitialStartDate()}/>
                    <DateTimePicker
                        isVisible={isDatePickerVisibleStart}
                        is24Hour
                        mode="time"
                        date={new Date(startTime)}
                        onConfirm={handleConfirmStart}
                        onCancel={() => {
                            setStartDateVisibility(false);
                        }}
                    />

                    <EventTimeLabels
                        onPress={() => {
                            if (!props.editTask?.isFromCalendar || props.editTask === null)
                                setDatePickerVisibilityEnd(true);
                        }}
                        label="Ends"
                        value={displayInitialEndDate()}/>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisibleEnd}
                        mode="time"
                        is24Hour
                        date={new Date(endTime)}
                        onConfirm={handleConfirmEnd}
                        onCancel={() => setDatePickerVisibilityEnd(false)}
                    />
                    <EventTimeLabels notPressable label="Duration"
                                     value={prettyPrintDifferenceDate(startTime, endTime)}/>
                </View>
            </View>
            <Text style={{
                backgroundColor: theme == 'white' ? colors.lightgrey : "#4a4949",
                color: theme == 'white' ? colors.textgrey : 'white',
                padding: 10,
                paddingLeft: 25,
                fontSize: 11
            }}>NOTES
            </Text>
            {renderDescription()}

            {/*Render Location*/}
            {props.editTask?.location ?
                <View>
                    <Text style={{
                        backgroundColor: theme == 'white' ? colors.lightgrey : "#4a4949",
                        color: theme == 'white' ? colors.textgrey : 'white',
                        padding: 10,
                        paddingLeft: 25,
                        fontSize: 11
                    }}>LOCATION
                    </Text>
                    <TextInput
                        style={{paddingLeft: 25, padding: 10, fontSize: 15, color: backgroundColor()}}
                        multiline
                        scrollEnabled
                        editable={false}
                        value={props.editTask.location}
                    />
                </View>
                :
                <></>
            }
            <View style={{backgroundColor: theme == 'white' ? colors.lightgrey : "#4a4949", padding: 10}}/>
            <EventOption name="Repeat" disableLine iconName="repeat"/>
            <EventOption name="Add Tag" disableLine iconName="add"/>
            <View style={{backgroundColor: theme == 'white' ? colors.lightgrey : "#4a4949", padding: 10}}/>

            <View style={{
                paddingVertical: 20,
                alignItems: 'center',
                justifyContent: 'space-evenly',
                flex: 1,
            }}>
                <TouchableOpacity
                    style={{
                        width: 100,
                        padding: 10,
                        borderRadius: 5,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: theme == 'white' ? colors.lightgrey : "#4a4949",
                    }}
                    onPress={() => {
                        if (!props.editTask)
                            createTask();
                        else
                            editTask();
                    }}>
                    <MyText>{props.editTask ? "Update Task" : "Add Task"}</MyText>
                </TouchableOpacity>
                {
                    renderLastEditDate()
                }
            </View>
            <FlashMessage ref={flashMessage} floating={true} position="bottom"/>
        </ScrollView>
    )
}
// styles
const styles = StyleSheet.create({
    actualView: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flex: 1,
    },
    absolute: {
        position: "absolute",
        width: '100%',
    },
    padding: {
        padding: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerTextInput: {
        fontWeight: "bold",
        fontSize: 20,
        flex: 1,
    }
});
