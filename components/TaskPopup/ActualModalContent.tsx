import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import dateFormat from "dateformat";
import {
    createJsDateFromTimeFormat,
    dateFormatString,
    displayTimeToDateFormat,
    getToday,
    getTodayWithThisHour,
    parseIntoTimeObject,
    prettyPrintDifferenceDate,
    prettyPrintTime
} from "../../Utils";

import {MyText} from "../Ceva";
import React, {useEffect, useState} from "react";
import {themeHook} from "../theme";
import {colors} from "../../colors";
import {CalendarItemType} from "../CalendarItem";
import {PopupSettings} from "./Popup";
import EventTimeLabels from "./EventTimeLabels";
import EventOption from "./EventOptions";
import ColorPicker from "./ColorPicker";
import {DeleteButton} from "./DeleteButton";


export default function ActualContent(props: PopupSettings) {
    const [taskHeader, setTaskHeader] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    const [theme] = themeHook();

    const [isDatePickerVisibleStart, setStartDateVisibility] = useState(false);
    const [isDatePickerVisibleEnd, setDatePickerVisibilityEnd] = useState(false);
    const [startTime, setStartTime]: [string, any] = useState(createJsDateFromTimeFormat(getTodayWithThisHour(10)).toString());
    const [endTime, setEndTime]: [string, any] = useState(createJsDateFromTimeFormat(getTodayWithThisHour(12)).toString());

    const [taskColor, setTaskColor] = useState("magenta");
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
        if (props.editTask) {
            setStartTime(createJsDateFromTimeFormat(props.editTask.startTime).toString());
            setEndTime(createJsDateFromTimeFormat(props.editTask.endTime).toString());
        }
    })


    function createTask() {
        const newtask: CalendarItemType = {
            header: taskHeader,
            description: taskDescription,
            startTime: parseIntoTimeObject(startTime),
            endTime: parseIntoTimeObject(endTime),
            color: taskColor,
            timeChanged: getToday()
        }
        props.onSubmit(newtask);
    }


    function editTask() {
        console.log("editing a task! at", getToday());
        props.editTask.timeChanged = getToday();
        props.onSubmit(props.editTask);
    }

    function renderHeader() {
        return (props.editTask ?
                <TextInput
                    onChangeText={(content) => props.editTask.header = content}
                    style={[styles.headerTextInput, {color: backgroundColor()}]}>
                    {props.editTask.header}
                </TextInput>
                :
                <TextInput
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
            console.log("min " + props.editTask.timeChanged.minutes)
            return (<MyText style={{
                padding: 10,
                color: colors.textgrey
            }}>
                Last
                Changed {prettyPrintTime(props.editTask.timeChanged)} </MyText>)
        }
        return <></>
    }

    function handleConfirmStart(date: Date) {
        props.editTask ? props.editTask.startTime = parseIntoTimeObject(date) : setStartTime(date);
        setStartDateVisibility(false);
    }

    function handleConfirmEnd(date: Date) {
        props.editTask ? props.editTask.endTime = parseIntoTimeObject(date) : setStartTime(date);
        setDatePickerVisibilityEnd(false);
    }

    const displayInitialStartDate = () => {
        return props.editTask ? displayTimeToDateFormat(props.editTask.startTime) : dateFormat(startTime, dateFormatString);
    }
    const displayInitialEndDate = () => {
        return props.editTask ? displayTimeToDateFormat(props.editTask.endTime) : dateFormat(endTime, dateFormatString);
    }
    return (
        <View style={[styles.actualView, {backgroundColor: theme === 'white' ? "#FFFFFF" : "#2f2f2f"}]}>
            <View style={styles.padding}>
                {/*Header*/}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => setColorPicking(!isColorPicking)}
                        style={{
                            width: 20,
                            height: 20,
                            borderRadius: 100,
                            backgroundColor: props.editTask ? props.editTask?.color : taskColor
                        }}/>
                    {renderHeader()}
                    <DeleteButton isVisible={props.editTask != undefined}
                                  onDelete={() => props.onDeleteTask(props.editTask)}
                                  message={"Confirm delete " + props.editTask.header}/>
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
                        onPress={() => setStartDateVisibility(true)}
                        label="Starts"
                        value={displayInitialStartDate()}/>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisibleStart}
                        mode="datetime"
                        isDarkModeEnabled={true}
                        date={new Date(startTime)}
                        is24Hour
                        onConfirm={handleConfirmStart}
                        onCancel={() => {
                            setStartDateVisibility(false);
                        }}
                    />

                    <EventTimeLabels onPress={() => setDatePickerVisibilityEnd(true)} label="Ends"
                                     value={displayInitialEndDate()}/>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisibleEnd}
                        mode="datetime"
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

            <View style={{backgroundColor: theme == 'white' ? colors.lightgrey : "#4a4949", padding: 10}}/>

            <EventOption name="Repeat" disableLine iconName="repeat"/>
            <EventOption name="Add Tag" disableLine iconName="add"/>
            <View style={{backgroundColor: theme == 'white' ? colors.lightgrey : "#4a4949", padding: 10}}/>

            <View style={{
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
        </View>
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
        marginLeft: 10,
    }
});
