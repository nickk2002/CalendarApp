import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from "react";
import {colors} from "../colors";
import HourIntervalDisplay, {TimeInterval} from "./HourIntervalDisplay";
import {time} from "../Utils";

export interface CalendarItemType extends TimeInterval {
    color?: string;
    header?: string;
    description?: string;
    isFreeTime?: boolean;
    handlePress?: () => void;
    timeChanged?: time,
}

function RenderLine(props: { color: string }) {
    return (
        <View style={{position: "absolute", height: '100%', width: 3, paddingTop: '300%', paddingBottom: '300%'}}>
            <View style={[styles.line, {backgroundColor: props.color}]}/>
        </View>
    )
}

export default function CalendarItem(props: CalendarItemType) {
    if (props.isFreeTime) {
        return (
            <View style={styles.containerFreeTime}>
                <RenderLine color="green"/>
                <View style={{padding: 15, flex: 1}}>
                    <Text style={styles.header}>Free</Text>

                    <HourIntervalDisplay startTime={props.startTime}
                                         endTime={props.endTime}/>
                    {/*<Text style={{*/}
                    {/*    position: 'absolute',*/}
                    {/*    bottom: 0,*/}
                    {/*    left: 0,*/}
                    {/*    margin: 15,*/}
                    {/*    padding: 5,*/}
                    {/*    borderRadius: 10,*/}
                    {/*    backgroundColor: '#E9E9E9',*/}
                    {/*    fontSize: 15,*/}
                    {/*    color: '#8B8B8B'*/}
                    {/*}}> University*/}
                    {/*</Text>*/}
                </View>
            </View>
        );
    }
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => props.handlePress()} style={styles.container}>
            <RenderLine color={props.color}/>
            <View style={{margin: 15, flex: 1, overflow: 'hidden'}}>
                <Text style={styles.header}>{props.header}</Text>
                <Text style={styles.description}>{props.description}</Text>
            </View>
            <HourIntervalDisplay startTime={props.startTime} endTime={props.endTime}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    containerFreeTime: {
        flex: 1,
        backgroundColor: colors.lightgrey,
        borderRadius: 10,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: colors.lightgrey,
        borderRadius: 10,
        justifyContent: 'center',
    },
    line: {
        height: '100%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: 'red',
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        marginTop: 5,
        fontSize: 15,
        color: '#7C7C7C',
    },
});
