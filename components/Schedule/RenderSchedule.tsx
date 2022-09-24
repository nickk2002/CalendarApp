import {ScrollView, StyleSheet, Switch, TouchableOpacity, View} from "react-native";
import {
    compareTime,
    formatHourTime,
    getDayMonth,
    getHourDifference,
    getTimeWithThisHour,
    parseIntoJsDateFromTime,
    parseIntoTimeObject,
    prettyPrintDayName,
    Time
} from "../../Utils";

import CalendarItem from "./CalendarItem";
import {MyText} from "../Ceva";
import {calendarDayHook, filteredTasksHook, taskHook, themeHook} from "../global";
import {navigate} from "../../RootNavigation";

import {AntDesign, Ionicons} from '@expo/vector-icons';
import React, {useEffect, useState} from "react";
import clone from "just-clone";
import {colors} from "../../colors";
import DateTimePicker from "react-native-modal-datetime-picker";
import Slider from "@react-native-community/slider";

const spaceBetween = 2;
const initialTimeHour = 7;
const normalTaskHeight = 120;

export default function RenderSchedule({navigation}) {

    const [theme] = themeHook();
    const [givenTasks] = taskHook();
    const [currentDate, setCurrentDate] = calendarDayHook();
    const [tasks, setFilteredTasks] = filteredTasksHook();

    const [visiblePickDate, setVisiblePickDate] = useState(false);
    const [isUsingFreeTime, setIsUsingFreeTime] = useState(false);
    const [taskHeight,setTaskHeight] = useState(120);

    const sortAndFilterTasks = () => {
        const filtered = givenTasks.filter((task) =>
            task.startTime.month === currentDate.month && currentDate.day === task.startTime.day
        );
        filtered.sort((task1, task2) => {
            const diff = getHourDifference(task1.startTime, task2.startTime);
            if (diff > 0)
                return -1;
            if (diff == 0)
                return 0;
            return 1;
        });
        console.log("Given tasks", givenTasks.length);
        setFilteredTasks(filtered);
    }
    useEffect(sortAndFilterTasks, [givenTasks, currentDate]);
    useEffect(() => {
        const dayName = prettyPrintDayName(currentDate);
        navigation.setOptions({
            title: dayName
        })
    }, [currentDate, navigation])

    const renderTasks = (timeHeight: number, spaceBetween: number) => {
        const toRender = [];
        let previousHour: Time = getTimeWithThisHour(currentDate, initialTimeHour);

        for (const task of tasks) {
            if (!compareTime(previousHour, task.startTime) && isUsingFreeTime) {
                const hourCloned = clone(previousHour);

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
            previousHour = clone(previousHour)
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
        if(!isUsingFreeTime)
            return;
        const timestamps = [];
        const hours: Time[] = [getTimeWithThisHour(currentDate, initialTimeHour)];
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
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center"
                        }}>
                        <MyText style={styles.time}>{formatHourTime(hour)} </MyText>
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
                    <MyText style={styles.time}>{formatHourTime(hour)} </MyText>
                    <View style={{width: 10, height: 1, backgroundColor: colors.textgrey}}/>
                </View>
            </View>
        );
        return (
            <View style={{marginRight: 5, marginTop: -10}}>
                {timestamps}
                {/*<View style={{*/}
                {/*    flexDirection: "column",*/}
                {/*    position: "absolute",*/}
                {/*    top: timeHeight * getHourDifference(getTodayWithThisHour(initialTimeHour), currentHour)*/}
                {/*}}>*/}
                {/*    <View*/}
                {/*        style={{*/}
                {/*            flexDirection: "row",*/}
                {/*            alignItems: "center"*/}
                {/*        }}>*/}
                {/*        <MyText style={[styles.time, {color: colors.red}]}>{formatHourTime(currentHour)} </MyText>*/}
                {/*        <View style={{width: 10, height: 1.2, backgroundColor: colors.red}}/>*/}
                {/*    </View>*/}
                {/*</View>*/}
            </View>
        );
    }

    return (
        <View style={{margin: 5, marginTop: 10, flex: 1}}>
            <View style={{flexDirection: 'row', alignSelf: 'center', marginBottom: 10}}>
                <TouchableOpacity onPress={() => {
                    const jsDate = parseIntoJsDateFromTime(currentDate);
                    const tomorrow = jsDate.getDate() - 1;
                    jsDate.setDate(tomorrow);
                    setCurrentDate(parseIntoTimeObject(jsDate));
                }} style={{justifyContent: 'center', paddingHorizontal: 10}}>
                    <AntDesign name="arrowleft" size={24} color={theme == 'white' ? 'black' : colors.textgrey}/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} onPress={() => setVisiblePickDate(true)}>
                    <MyText
                        style={{
                            fontSize: 25,
                            fontWeight: "bold",
                            textAlign: "center"
                        }}> {getDayMonth(parseIntoJsDateFromTime(currentDate))}
                    </MyText>
                </TouchableOpacity>
                <DateTimePicker isVisible={visiblePickDate}
                                date={new Date(parseIntoJsDateFromTime(currentDate))}
                                onConfirm={(date) => {
                                    setCurrentDate(parseIntoTimeObject(date));
                                    setVisiblePickDate(false);
                                }}

                                onCancel={() => setVisiblePickDate(false)}/>

                <TouchableOpacity onPress={() => {
                    const jsDate = parseIntoJsDateFromTime(currentDate);
                    const tomorrow = jsDate.getDate() + 1;
                    jsDate.setDate(tomorrow);
                    setCurrentDate(parseIntoTimeObject(jsDate));
                }} style={{justifyContent: 'center', paddingHorizontal: 10}}>
                    <AntDesign name="arrowright" size={24} color={theme == 'white' ? 'black' : colors.textgrey}/>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row'}}>
                <View style={{flexDirection:'column',marginRight:20}}>
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
                        style={{marginLeft:0,width: 150, height: 40,transform:[{scaleY:1.2},{scaleX:1.2}]}}
                        minimumValue={60}
                        maximumValue={200}
                        onValueChange={(value)=>setTaskHeight(value)}
                        step={10}
                        tapToSeek
                        minimumTrackTintColor={theme == 'white'? "#033ebc": "#033ebc"}
                        maximumTrackTintColor={theme == 'white'?"#000000":"#FFFFFF"}
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
                    <View style={{
                        height: '100%',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
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
});
