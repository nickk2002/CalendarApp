import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import dateFormat from "dateformat";
import {dateFormatString, getHourDifference, prettyPrintDifferenceDate} from "../../src/utils/Utils";

import {MyText} from "../Ceva";
import React, {useEffect, useRef, useState} from "react";
import {calendarDayHook, filteredTasksHook, storeTasksAsync, taskHook, themeHook} from "../../src/global/global";
import {colors} from "../../src/global/colors";
import {PopupSettings} from "./Popup";
import EventTimeLabels from "./EventTimeLabels";
import EventOption from "./EventOptions";
import ColorPicker, {randomColor} from "./ColorPicker";
import {DeleteButton} from "./DeleteButton";
import {navigateBack} from "../RootNavigation";
import FlashMessage from "react-native-flash-message";
import clone from "just-clone";
import {CalendarItemType} from "../Schedule/CalendarItemType";
import {Time} from "../../src/business/Time";


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
    const [startTime, setStartTime]: [string, any] = useState(getCalendarDay.withHour(10).convertToDate().toString());
    const [endTime, setEndTime]: [string, any] = useState(getCalendarDay.withHour(11).convertToDate().toString());

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
            setStartTime(props.startTime.convertToDate());
            setEndTime(props.endTime.convertToDate());
        }
    }, [])
    useEffect(() => {
        if (props.editTask) {
            setStartTime((props.editTask.startTime.convertToDate()).toString());
            setEndTime((props.editTask.endTime.convertToDate()).toString());
        }
    })

    function validateStartTimes(start: Time, end: Time) {
        if (getHourDifference(start, end) < 0) {
            flashMessage.current.showMessage({
                message: "Start time should be smaller than end time",
                description: `Task starts at ${start.formatHourTime()} and ends at ${end.formatHourTime()}`,
                type: "danger"
            })
            return false;
        }
        console.log("I have filtered:", filteredTasks.length)
        for (const otherTask of filteredTasks) {
            if (getHourDifference(otherTask.startTime, start) > 0 && getHourDifference(start, otherTask.endTime) > 0) {
                flashMessage.current.showMessage({
                    message: "Start time overlaps with another task " + otherTask.header,
                    description: `${start.formatHourTime()} overlaps with [${otherTask.startTime.formatHourTime()}, ${otherTask.endTime.formatHourTime()}]`,
                    type: "danger"
                })
                return false;
            }
            if (getHourDifference(otherTask.startTime, end) > 0 && getHourDifference(end, otherTask.endTime) > 0) {
                flashMessage.current.showMessage({
                    message: "End time overlaps with another task " + otherTask.header,
                    description: `${end.formatHourTime()} overlaps with [${otherTask.startTime.formatHourTime()}, ${otherTask.endTime.formatHourTime()}]`,
                    type: "danger"
                })
                return false;
            }
            if (getHourDifference(otherTask.startTime, start) < 0 && getHourDifference(end, otherTask.endTime) < 0) {
                flashMessage.current.showMessage({
                    message: "Start time and end time includes " + otherTask.header,
                    description: `[${(start.formatHourTime())} ${end.formatHourTime()}] includes [${otherTask.startTime.formatHourTime()}, ${otherTask.endTime.formatHourTime()}]`,
                    type: "danger"
                })
                return false;
            }
        }
        return true;
    }


    function createTask() {
        const start = Time.parseTime(startTime);
        const end = Time.parseTime(endTime);
        if (!validateStartTimes(start, end)) {
            return;
        }
        const newTask: CalendarItemType = {
            header: taskHeader,
            description: taskDescription,
            startTime: start,
            endTime: end,
            color: taskColor,
            timeChanged: Time.today()
        }
        console.log("Add task");

        const copy = [...tasks];
        copy.push(newTask);
        setTasks(copy);
        storeTasksAsync(copy);
        navigateBack();
    }


    function editTask() {
        const start = props.editTask.startTime;
        const end = props.editTask.endTime;
        if (!validateStartTimes(start, end)) {
            props.editTask.startTime = editingTaskCopy.startTime;
            props.editTask.endTime = editingTaskCopy.endTime;
            return;
        }
        props.editTask.timeChanged = Time.today();
        const other = [...tasks];
        setTasks(other);
        console.log("Start time is:", props.editTask.startTime)
        storeTasksAsync(other);
        navigateBack();
    }

    function renderHeader() {
        return (props.editTask ?
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <TextInput
                        autoFocus
                        editable={!props.editTask?.isFromCalendar}
                        onChangeText={(content) => props.editTask.header = content}
                        style={[styles.headerTextInput, {color: backgroundColor()}]}>
                        {props.editTask.header}
                    </TextInput>
                </ScrollView>
                :
                <TextInput
                    autoFocus
                    placeholderTextColor={backgroundColorPlaceHolder()}
                    placeholder="New Task"
                    onChangeText={setTaskHeader}
                    value={taskHeader}
                    style={[styles.headerTextInput, {color: backgroundColor()}]}/>
        )
    }

    function renderDescription() {
        return (props.editTask ?
                <TextInput
                    style={{paddingLeft: 25, padding: 10, fontSize: 15, color: backgroundColor()}}
                    multiline
                    scrollEnabled
                    onChangeText={(text) => props.editTask.description = text}
                > {props.editTask.description} </TextInput>
                :
                <TextInput
                    placeholderTextColor={backgroundColorPlaceHolder()}
                    style={{paddingLeft: 25, padding: 10, fontSize: 15, color: backgroundColor()}}
                    multiline
                    scrollEnabled
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
                Changed {props.editTask.timeChanged.prettyPrintTime()} </MyText>)
        }
        return <></>
    }

    function handleConfirmStart(date) {
        setStartDateVisibility(false);
        props.editTask ? props.editTask.startTime = Time.parseTime(date) : setStartTime(date);
    }

    function handleConfirmEnd(date: Date) {
        setDatePickerVisibilityEnd(false);
        props.editTask ? props.editTask.endTime = Time.parseTime(date) : setEndTime(date);
    }

    const displayInitialStartDate = () => {
        return props.editTask ? props.editTask.startTime.toDateFormat() : dateFormat(startTime, dateFormatString);
    }
    const displayInitialEndDate = () => {
        return props.editTask ? props.editTask.endTime.toDateFormat() : dateFormat(endTime, dateFormatString);
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
                                      const newTasks = tasks.filter(t => JSON.stringify(t) !== JSON.stringify(props.editTask))
                                      setTasks(newTasks);
                                      storeTasksAsync(newTasks);
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
