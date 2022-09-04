import {ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {
    compareTime,
    createJsDateFromTimeFormat,
    formatHourTime,
    getDayMonth,
    getHourDifference,
    getTimeWithThisHour,
    parseIntoTimeObject,
    prettyPrintDayName,
    Time
} from "../../Utils";

import CalendarItem from "./CalendarItem";
import {MyText} from "../Ceva";
import {calendarDayHook, filteredTasksHook, taskHook, themeHook} from "../theme";
import {navigate} from "../../RootNavigation";

import {AntDesign, Ionicons} from '@expo/vector-icons';
import React, {useEffect} from "react";
import clone from "just-clone";
import {colors} from "../../colors";

const timeHeight = 100;
const spaceBetween = 2;
const initialTimeHour = 7;

export default function RenderSchedule({navigation}) {
    // const [tasks, setTasks] = useState([]);

    const [theme] = themeHook();
    const [givenTasks] = taskHook();
    const [currentDate, setCurrentDate] = calendarDayHook();
    const [tasks, setFilteredTasks] = filteredTasksHook();

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
            if (!compareTime(previousHour, task.startTime)) {
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
            toRender.push(
                <View key={JSON.stringify(task)}
                      style={{
                          height: getHourDifference(task.startTime, task.endTime) * timeHeight,
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
                <View style={{flexDirection: "column", height: timeHeight * getHourDifference(hour, nextHour)}}>
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
        <View style={{flex: 1}}>
            <View style={{margin: 5, marginTop: 10}}>
                <View style={{flexDirection: 'row', alignSelf: 'center', marginBottom: 10}}>

                    <TouchableOpacity onPress={() => {
                        const jsDate = createJsDateFromTimeFormat(currentDate);
                        const tomorrow = jsDate.getDate() - 1;
                        jsDate.setDate(tomorrow);
                        setCurrentDate(parseIntoTimeObject(jsDate));
                    }} style={{justifyContent: 'center', paddingHorizontal: 10}}>
                        <AntDesign name="arrowleft" size={24} color={theme == 'white' ? 'black' : colors.textgrey}/>
                    </TouchableOpacity>
                    <MyText
                        style={{
                            fontSize: 25,
                            fontWeight: "bold",
                            textAlign: "center"
                        }}> {getDayMonth(createJsDateFromTimeFormat(currentDate))}</MyText>
                    <TouchableOpacity onPress={() => {
                        const jsDate = createJsDateFromTimeFormat(currentDate);
                        const tomorrow = jsDate.getDate() + 1;
                        jsDate.setDate(tomorrow);
                        setCurrentDate(parseIntoTimeObject(jsDate));
                    }} style={{justifyContent: 'center', paddingHorizontal: 10}}>
                        <AntDesign name="arrowright" size={24} color={theme == 'white' ? 'black' : colors.textgrey}/>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    {
                        tasks.length > 0 ?

                            <View style={{flex: 1, flexDirection: 'row', marginTop: 20, marginLeft: 5}}>
                                {renderTime()}
                                <View style={{flex: 1}}>
                                    {renderTasks(timeHeight, spaceBetween)}
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
