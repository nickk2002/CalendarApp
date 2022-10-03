import {ScrollView, StyleSheet, Switch, TouchableOpacity, View} from "react-native";
import {
    dateFormatString,
    getDayMonth,
    getHourDifference,
    prettyPrintDayName,

} from "../../Utils";

import dateFormat from "dateformat";
import CalendarItem from "./CalendarItem";
import {MyText} from "../Ceva";
import {
    calendarDayHook,
    lastRefreshDateHook,
    storeLastCalendarRefreshDate,
    storeTasksAsync,
    taskHook,
    themeHook
} from "../global";
import {navigate} from "../../RootNavigation";

import {AntDesign, Ionicons} from '@expo/vector-icons';
import React, {useEffect, useState} from "react";
import {colors} from "../../colors";
import DateTimePicker from "react-native-modal-datetime-picker";
import Slider from "@react-native-community/slider";
import webRequest from "../TaskPopup/webRequestCalendar";
import {Time} from "../../Time";

const spaceBetween = 2;
const initialTimeHour = 7;
const normalTaskHeight = 120;

export default function RenderSchedule({navigation}) {

    const [theme] = themeHook();
    const [givenTasks] = taskHook();
    const [currentDate, setCurrentDate] = calendarDayHook();
    const [tasks, setFilteredTasks] = useState([]);
    const [lastRefreshDate] = lastRefreshDateHook();

    const [visiblePickDate, setVisiblePickDate] = useState(false);
    const [isUsingFreeTime, setIsUsingFreeTime] = useState(false);
    const [taskHeight, setTaskHeight] = useState(120);

    const [, setTasks] = taskHook();
    const [, setLastRefreshDate] = lastRefreshDateHook();
    const [doingRequest, setIsDoingRequest] = useState(false);

    function loadCalendar(parsedTasks) {
        if (doingRequest)
            return;
        setIsDoingRequest(true);
        webRequest(parsedTasks, () => {
            setIsDoingRequest(false);
            setLastRefreshDate(new Date());
            storeLastCalendarRefreshDate(Date());
        }, (newTasks) => {
            console.log("New tasks!");
            setTasks(newTasks);
            storeTasksAsync(newTasks);
        }, () => {
            setIsDoingRequest(false);
        })
    }

    useEffect(() => loadCalendar(tasks), []);
    const sortAndFilterTasks = () => {
        const filtered = givenTasks.filter((task) =>
            task.startTime.month === currentDate.month && currentDate.day === task.startTime.day &&
            task.startTime.year == currentDate.year
        );
        filtered.sort((task1, task2) => {
            const diff = getHourDifference(task1.startTime, task2.startTime);
            if (diff > 0)
                return -1;
            if (diff == 0)
                return 0;
            return 1;
        });
        console.log("Filtered tasks tasks", filtered.length, "Total", givenTasks.length);
        setFilteredTasks(filtered);
    }
    useEffect(sortAndFilterTasks, [givenTasks, currentDate]);
    useEffect(() => {
        const dayName = prettyPrintDayName(currentDate.convertToDate().toString());
        navigation.setOptions({
            title: dayName
        })
    }, [currentDate, navigation])

    const renderTasks = (timeHeight: number, spaceBetween: number) => {
        const toRender = [];
        let previousHour: Time = currentDate.withHour(initialTimeHour);
        for (const task of tasks) {
            if (!previousHour.equals(task.startTime) && isUsingFreeTime) {
                const hourCloned = Time.createTime(previousHour);
                toRender.push(
                    <View key={previousHour.minutes + previousHour.hour * 60}
                          style={{
                              height: timeHeight * getHourDifference(previousHour, task.startTime),
                              width: '100%',
                              paddingBottom: spaceBetween,
                          }}>
                        <CalendarItem
                            startTime={hourCloned}
                            isFreeTime
                            handlePress={() => {
                                navigate("AddTask", {
                                    startTime: hourCloned,
                                    endTime: task.startTime,
                                })
                            }}
                            endTime={task.startTime}
                        />
                    </View>
                );
            }
            previousHour = Time.createTime(previousHour)
            previousHour.hour = task.endTime.hour;
            previousHour.minutes = task.endTime.minutes;
            const computedHeight = isUsingFreeTime ? getHourDifference(task.startTime, task.endTime) * timeHeight : normalTaskHeight;
            toRender.push(
                <View key={JSON.stringify(task)}
                      style={{
                          height: computedHeight,
                          width: '100%',
                          paddingBottom: spaceBetween,
                      }}>
                    <CalendarItem
                        handlePress={() => {
                            navigate("AddTask", {
                                editTask: task
                            })
                        }}
                        header={task.header}
                        description={task.description}
                        startTime={task.startTime}
                        endTime={task.endTime}
                        isFromCalendar={task.isFromCalendar}
                        location={task.location}
                        course={task.course}
                        color={task.color}
                    />
                </View>
            );
        }
        return toRender;
    }

    function renderTime() {
        if (!isUsingFreeTime)
            return;
        const timestamps = [];
        const hours: Time[] = [currentDate.withHour(initialTimeHour)];
        tasks.forEach(task => {
            const last = hours[hours.length - 1];
            if (last.hour !== task.startTime.hour || last.minutes !== task.startTime.minutes)
                hours.push(task.startTime);
            hours.push(task.endTime);
        });
        hours.forEach((hour, index) => {
            if (index + 1 == hours.length)
                return;
            const nextHour = hours[index + 1];
            timestamps.push(
                <View key={hour.hour * 60 + hour.minutes}
                      style={{flexDirection: "column", height: taskHeight * getHourDifference(hour, nextHour)}}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                        <MyText style={styles.time}>{hour.formatHourTime()} </MyText>
                        <View style={{width: 10, height: 1, backgroundColor: colors.textgrey}}/>
                    </View>
                </View>
            );
        });
        const hour = hours[hours.length - 1]
        timestamps.push(
            <View key={hour.hour * 60 + hour.minutes}
                  style={{flexDirection: "column"}}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                    <MyText style={styles.time}>{hour.formatHourTime()} </MyText>
                    <View style={{width: 10, height: 1, backgroundColor: colors.textgrey}}/>
                </View>
            </View>
        );
        return (
            <View style={{marginRight: 5, marginTop: -10}}>
                {timestamps}
            </View>
        );
    }

    return (
        <View style={{margin: 5, marginTop: 10, flex: 1}}>
            <View style={{flexDirection: 'row', alignSelf: 'center', marginBottom: 10}}>
                <TouchableOpacity onPress={() => {
                    const jsDate = currentDate.convertToDate();
                    const tomorrow = jsDate.getDate() - 1;
                    jsDate.setDate(tomorrow);
                    setCurrentDate(Time.parseTime(jsDate));
                }} style={{justifyContent: 'center', paddingHorizontal: 10}}>
                    <AntDesign name="arrowleft" size={24} color={theme == 'white' ? 'black' : colors.textgrey}/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} onPress={() => setVisiblePickDate(true)}>
                    <MyText
                        style={{
                            fontSize: 25,
                            fontWeight: "bold",
                            textAlign: "center"
                        }}> {getDayMonth(currentDate.convertToDate())}
                    </MyText>
                </TouchableOpacity>
                <DateTimePicker isVisible={visiblePickDate}
                                date={currentDate.convertToDate()}
                                onConfirm={(date) => {
                                    setCurrentDate(Time.parseTime(date));
                                    setVisiblePickDate(false);
                                }}

                                onCancel={() => setVisiblePickDate(false)}/>

                <TouchableOpacity onPress={() => {
                    const jsDate = currentDate.convertToDate();
                    const tomorrow = jsDate.getDate() + 1;
                    jsDate.setDate(tomorrow);
                    setCurrentDate(Time.parseTime(jsDate));
                }} style={{justifyContent: 'center', paddingHorizontal: 10}}>
                    <AntDesign name="arrowright" size={24} color={theme == 'white' ? 'black' : colors.textgrey}/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => loadCalendar(tasks)}>
                <MyText style={{width: '100%', borderWidth: 1, textAlign: 'center'}}> Refreshed
                    at {dateFormat(lastRefreshDate, dateFormatString)} </MyText>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'column', marginRight: 20}}>
                    <MyText style={{fontSize: 15, fontWeight: 'bold'}}>Show free time</MyText>
                    <Switch style={{alignSelf: 'flex-start'}}
                            trackColor={{false: "#767577", true: "#81b0ff"}}
                            thumbColor={isUsingFreeTime ? "#033ebc" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => setIsUsingFreeTime(!isUsingFreeTime)}
                            value={isUsingFreeTime}
                    />
                </View>
                <View>
                    <MyText style={{fontSize: 15, fontWeight: 'bold'}}>Task Height</MyText>
                    <Slider
                        style={{marginLeft: 0, width: 150, height: 40, transform: [{scaleY: 1.2}, {scaleX: 1.2}]}}
                        minimumValue={60}
                        maximumValue={200}
                        onValueChange={(value) => setTaskHeight(value)}
                        step={10}
                        tapToSeek
                        minimumTrackTintColor={theme == 'white' ? "#033ebc" : "#033ebc"}
                        maximumTrackTintColor={theme == 'white' ? "#000000" : "#FFFFFF"}
                    />
                </View>
            </View>
            <ScrollView>
                {tasks.length > 0 ?
                    <View style={{flex: 1, flexDirection: 'row', marginTop: 20, marginLeft: 5}}>
                        {renderTime()}
                        <View style={{flex: 1}}>
                            {renderTasks(taskHeight, spaceBetween)}
                        </View>
                    </View>
                    :
                    <View style={styles.flexcentered}>
                        <MyText style={{fontSize: 20}}>No Tasks Today!</MyText>
                        <Ionicons style={{marginTop: 10}} name="ios-checkmark-sharp" size={32}
                                  color={theme == 'white' ? 'black' : 'grey'}/>
                    </View>
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    timeItem: {
        flexDirection: 'column',
    },
    time: {
        fontSize: 15,
        color: '#A1A1A1',
    },
    flexcentered: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
