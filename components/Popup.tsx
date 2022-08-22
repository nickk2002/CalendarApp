import React, {useEffect, useState} from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {colors} from "../colors";
import {CalendarItemType} from "./CalendarItem";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import dateFormat from "dateformat";
import {
    createJsDateFromTimeFormat,
    dateFormatString,
    displayTimeToDateFormat,
    getToday,
    getTodayWithThisHour,
    parseIntoTimeObject,
    prettyPrintTime
} from "../Utils";

import {MaterialIcons} from "@expo/vector-icons"
import {BlurView} from "expo-blur";

function EventTimeLabels(props) {
    return (
        <TouchableOpacity onPress={() => props?.onPress()} style={{flex: 1, marginRight: 10}}>
            <Text style={{fontSize: 12, fontWeight: "bold"}}>{props.label}</Text>
            <View style={{
                borderRadius: 5,
                backgroundColor: colors.lightgrey,
                padding: 5,
                alignItems: 'center',
            }}>
                <Text style={{fontSize: 12}}>{props.value}</Text>
            </View>
        </TouchableOpacity>
    )
}

function EventOption(props: { name: string, iconName, disableLine?: boolean }) {
    return (
        <View style={{paddingLeft: 25}}>
            <TouchableOpacity style={{flexDirection: "row", alignItems: 'center'}}>
                <MaterialIcons name={props.iconName} size={20} color='grey'/>
                <Text style={{fontSize: 15, padding: 10, paddingLeft: 5}}>{props.name}</Text>
            </TouchableOpacity>
            {
                !props.disableLine ? <View style={{backgroundColor: colors.divider, width: '100%', height: 1}}/> : <></>
            }
        </View>
    );
}

type PopupSettings = {

    onSubmit: (arg0: CalendarItemType) => void,
    activate: boolean,
    editTask?: CalendarItemType,
    onDeleteTask?: (arg0: CalendarItemType) => any
    onDismiss: () => void;
}
const palette = ['#000000', '#888888', '#ed1c24', '#d11cd5', '#1633e6', '#00aeef', '#00c85d', '#57ff0a', '#ffde17', '#f26522']
const Popup = (props: PopupSettings) => {

    const [taskHeader, setTaskHeader] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    const [isDatePickerVisibleStart, setStartDateVisibility] = useState(false);
    const [isDatePickerVisibleEnd, setDatePickerVisibilityEnd] = useState(false);
    const [startTime, setStartTime]: [string, any] = useState(createJsDateFromTimeFormat(getTodayWithThisHour(10)).toString());
    const [endTime, setEndTime]: [string, any] = useState(createJsDateFromTimeFormat(getTodayWithThisHour(12)).toString());
    const [taskColor, setTaskColor] = useState("magenta");

    useEffect(() => {
        if (props.editTask) {
            setStartTime(createJsDateFromTimeFormat(props.editTask.startTime).toString());
            setEndTime(createJsDateFromTimeFormat(props.editTask.endTime).toString());
        }
    })

    const [isColorPicking, setColorPicking] = useState(false);

    function createTask() {
        const task: CalendarItemType = {
            header: taskHeader,
            description: taskDescription,
            startTime: parseIntoTimeObject(startTime),
            endTime: parseIntoTimeObject(endTime),
            color: taskColor,
            timeChanged: getToday()
        }
        props.onSubmit(task);
    }

    function pressedOutside() {
        console.log("Pressed outside");
        props.onDismiss();
    }

    function editTask() {
        console.log("editing a task! at", getToday());
        props.editTask.timeChanged = getToday();
        props.onSubmit(props.editTask);
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
    const renderLastEditDate = () => {
        if (props.editTask && props.editTask.timeChanged) {
            console.log("min " + props.editTask.timeChanged.minutes)
            return (<Text style={{
                padding: 10,
                color: colors.textgrey
            }}>
                Last
                Changed {prettyPrintTime(props.editTask.timeChanged)} </Text>)
        }

        return <></>
    }

    function ColorPicker() {
        return (
            <Modal transparent visible={isColorPicking} animated onDismiss={() => console.log("dismiss")}
                   animationType="fade">
                <View style={{flex: 1, top: '65%', flexDirection: "row", marginLeft: 15}}>
                    {palette.map((color) => {
                        return (
                            <TouchableOpacity
                                key={color}
                                onPress={() => {
                                    if (props.editTask)
                                        props.editTask.color = color;
                                    else
                                        setTaskColor(color);
                                    setColorPicking(false);
                                }}
                                style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 100,
                                    backgroundColor: color,
                                    marginRight: 5
                                }}/>
                        );
                    })}
                </View>
            </Modal>
        )
    }

    function ActualContent() {
        return (

            <View style={styles.actualView}>
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
                        {props.editTask ?
                            <TextInput onChangeText={(content) => props.editTask.header = content}
                                       style={{
                                           fontWeight: "bold",
                                           fontSize: 20,
                                           marginLeft: 10,
                                           flex: 1,
                                       }}>
                                {props.editTask.header}
                            </TextInput>
                            :
                            <TextInput autoFocus placeholder="New Event"
                                       onChangeText={(content) => setTaskHeader(content)}
                                       style={{fontWeight: "bold", fontSize: 20, marginLeft: 10}}>
                            </TextInput>
                        }
                        {
                            props.editTask ?
                                <View style={{flex: 0.1, flexDirection: "row-reverse"}}>
                                    <TouchableOpacity onPress={() => {
                                        Alert.alert(
                                            "Confirm Delete Task " + props.editTask.header,
                                            "You can't undo this operation",
                                            [
                                                {
                                                    text: "Yes",
                                                    onPress: () => {
                                                        props.onDeleteTask(props.editTask);

                                                    }
                                                },
                                                {
                                                    text: "No",
                                                }
                                            ])
                                    }}>
                                        <MaterialIcons name='delete' color={colors.red} size={20}/>
                                    </TouchableOpacity>
                                </View>
                                : <></>
                        }
                    </View>
                    <ColorPicker/>
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
                            date={new Date(startTime)}
                            is24Hour
                            onConfirm={handleConfirmStart}
                            onCancel={() => setStartDateVisibility(false)}
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
                        <EventTimeLabels label="Duration" value="2 hours"/>
                    </View>
                </View>
                <Text style={{
                    backgroundColor: colors.lightgrey,
                    color: colors.textgrey,
                    padding: 10,
                    paddingLeft: 25,
                    fontSize: 11
                }}>NOTES</Text>
                {props.editTask ?
                    <TextInput
                        style={{paddingLeft: 25, padding: 10, fontSize: 15, maxHeight: 100}}
                        multiline
                        scrollEnabled
                        maxLength={30}
                        onChangeText={(text) => props.editTask.description = text}
                    > {props.editTask.description} </TextInput>
                    :
                    <TextInput
                        style={{paddingLeft: 25, padding: 10, fontSize: 15, maxHeight: 100}}
                        multiline
                        scrollEnabled
                        maxLength={30}
                        onChangeText={(text) => setTaskDescription(text)}
                        placeholder="Description"/>
                }
                <View style={{backgroundColor: colors.lightgrey, padding: 10}}/>
                <EventOption name="Repeat" iconName="repeat"/>
                <EventOption name="Add Tag" disableLine iconName="add"/>
                <View style={{backgroundColor: colors.lightgrey, padding: 10}}/>
                <View style={{
                    alignItems: 'center',
                    margin: 20,
                    flex: 1,
                }}>
                    <TouchableOpacity
                        style={{
                            padding: 10,
                            width: 100,
                            borderRadius: 5,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: colors.lightgrey,
                            borderWidth: 0.1
                        }}
                        onPress={() => {
                            if (!props.editTask)
                                createTask();
                            else
                                editTask();
                        }}>
                        <Text style={{color: 'black'}}>{props.editTask ? "Update Task" : "Add Task"}</Text>
                    </TouchableOpacity>
                    {
                        renderLastEditDate()
                    }
                </View>
            </View>
        )
    }

    // END
    return (
        <Modal
            animated
            animationType="fade"
            transparent
            visible={props.activate}
        >
            <TouchableWithoutFeedback onPress={pressedOutside}>
                <View style={{flex: 1}}>
                    <View style={{flex: 1}}>
                        <BlurView
                            style={styles.absolute}
                            intensity={80}
                            tint="dark"
                        >
                        </BlurView>
                        <ActualContent/>
                    </View>
                </View>

            </TouchableWithoutFeedback>
        </Modal>
    )

};

const styles = StyleSheet.create({
    actualView: {
        backgroundColor: "#FFFFFE",
        borderWidth: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flex: 1,
        top: '35%'
    },
    absolute: {
        position: "absolute",
        width:'100%',
        height:"100%",
    },
    padding: {
        padding: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
    }
});

export default Popup;