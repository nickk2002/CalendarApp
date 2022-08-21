import {Text, View} from "react-native";
import {colors} from "../colors";
import {formatHourTime, time} from "../Utils";
import React from "react";

export type TimeInterval = {
    startTime: time, endTime: time,
}

export default function HourIntervalDisplay(props: TimeInterval) {
    return (<View
        style={{
            position: 'absolute', top: 0, right: 0, padding: 15, flexDirection: "row", alignItems: "center",
        }}>
        <Text style={{color: colors.textgrey}}>{formatHourTime(props.startTime)}</Text>
        <View style={{
            width: 10, height: 1, backgroundColor: colors.textgrey, marginLeft: 3, marginRight: 3
        }}/>
        <Text style={{color: colors.textgrey}}>{formatHourTime(props.endTime)}</Text>
    </View>);
}