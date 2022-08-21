import {StyleSheet, Text, View} from "react-native";
import {
    compareTime,
    formatHourTime,
    getHourDifference,
    getToday,
    getTodayDayMonth,
    getTodayWithThisHour,
    time
} from "../Utils";
import {colors} from "../colors";
import React, {useEffect, useState} from "react";
import CalendarItem, {CalendarItemType} from "./CalendarItem";


const timeHeight = 100;
const spaceBetween = 2;
const initialTimeHour = 7;

interface Schedule {
    givenTasks: CalendarItemType[],
    callbackTaskPressed: (arg0: CalendarItemType) => void
}

export default function RenderSchedule(props: Schedule) {
    const [tasks, setTasks] = useState(props.givenTasks);
    const sortAndFilterTasks = () => {
        console.log("Updated tasks");
        const filtered = props.givenTasks.filter((task) =>
            task.startTime.month === getToday().month && task.startTime.day === getToday().day
        );
        filtered.sort((task1, task2) => {
            const diff = getHourDifference(task1.startTime, task2.startTime);
            if (diff > 0)
                return -1;
            if (diff == 0)
                return 0;
            return 1;
        });
        setTasks(filtered);
    }
    useEffect(sortAndFilterTasks, [props.givenTasks]);
    const renderTasks = (timeHeight: number, spaceBetween: number) => {
        const toRender = [];
        let previousHour: time = getTodayWithThisHour(initialTimeHour);

        for (const task of tasks) {
            if (!compareTime(previousHour, task.startTime)) {
                toRender.push(
                    <View key={previousHour.hour * 60 + previousHour.minutes}
                          style={{
                              height: timeHeight * getHourDifference(previousHour, task.startTime),
                              width: '100%',
                              paddingBottom: spaceBetween,
                          }}>
                        <CalendarItem
                            startTime={previousHour}
                            isFreeTime
                            handlePress={() => console.log("Hey there")}
                            endTime={task.startTime}
                        />
                    </View>
                );
            }
            previousHour = JSON.parse(JSON.stringify(previousHour));
            previousHour.hour = task.endTime.hour;
            previousHour.minutes = task.endTime.minutes;
            toRender.push(
                <View key={task.startTime.hour * 60 + task.startTime.minutes}
                      style={{
                          height: getHourDifference(task.startTime, task.endTime) * timeHeight,
                          width: '100%',
                          paddingBottom: spaceBetween,
                      }}>
                    <CalendarItem
                        handlePress={() => props.callbackTaskPressed(task)}
                        header={task.header}
                        description={task.description}
                        startTime={task.startTime}
                        endTime={task.endTime}
                        color={task.color}
                    />
                </View>
            );
        }
        return toRender;
    }

    function renderTime() {
        const timestamps = [];
        const hours: time[] = [getTodayWithThisHour(initialTimeHour)];
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
                <View style={{flexDirection: "column", height: timeHeight * getHourDifference(hour, nextHour)}}
                      key={hour.minutes + hour.hour * 60}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center"
                        }}>
                        <Text style={styles.time}>{formatHourTime(hour)} </Text>
                        <View style={{width: 10, height: 1, backgroundColor: colors.textgrey}}/>
                    </View>
                </View>
            );
        });
        const currentHour: time = getToday();
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
                {/*        <Text style={[styles.time, {color: colors.red}]}>{formatHourTime(currentHour)} </Text>*/}
                {/*        <View style={{width: 10, height: 1.2, backgroundColor: colors.red}}/>*/}
                {/*    </View>*/}
                {/*</View>*/}
            </View>
        );
    }

    return (
        <View>
            <Text style={{fontSize: 25, fontWeight: "bold", textAlign: "center"}}>Today, {getTodayDayMonth()}</Text>
            <View style={{flex: 1, flexDirection: 'row', marginTop: 20, marginLeft: 5}}>
                {renderTime()}
                <View style={{flex: 1}}>
                    {renderTasks(timeHeight, spaceBetween)}
                </View>
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
