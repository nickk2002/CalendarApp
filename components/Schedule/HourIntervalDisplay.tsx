import {Text, View} from "react-native";
import {colors} from "../../colors";
import {formatHourTime, Time} from "../../Utils";
import React from "react";

export type TimeInterval = {
    startTime: Time, endTime: Time,
}

export default function HourIntervalDisplay(props: TimeInterval) {
    return (
        <View
            style={{
                paddingTop:3,
                flexDirection: "row", alignItems: "flex-start",
            }}>
            <Text style={{color: colors.textgrey}}>{formatHourTime(props.startTime)}</Text>

            <View style={{alignItems: 'center', justifyContent: 'center',height:20 }}>
                <View style={{
                    width: 10, height: 1, backgroundColor: colors.textgrey, marginLeft: 3, marginRight: 3
                }}/>
            </View>
            <Text style={{color: colors.textgrey}}>{formatHourTime(props.endTime)}</Text>
        </View>);
}