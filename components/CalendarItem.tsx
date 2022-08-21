import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from "react";
import {colors} from "../colors";
import HourIntervalDisplay, {TimeInterval} from "./HourIntervalDisplay";

export interface CalendarItemType extends TimeInterval {
    color?: string;
    header?: string;
    description?: string;
    isFreeTime?: boolean;
    handlePress?: () => void;
}

export default function CalendarItem(props: CalendarItemType) {
    if (props.isFreeTime) {
        return (<View style={styles.containerFreeTime}>
            <View style={[styles.line, {backgroundColor: 'green'}]}/>
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
        </View>);
    }
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => props.handlePress()} style={styles.container}>
            <View style={[styles.line, {backgroundColor: props.color}]}/>
            <View style={{padding: 15, flex: 1}}>
                <Text style={styles.header}>{props.header}</Text>
                <Text style={styles.description}>{props.description}</Text>
                <HourIntervalDisplay startTime={props.startTime} endTime={props.endTime}/>
            </View>
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
        position: 'absolute',
        height: '100%',
        paddingTop: 5,
        paddingBottom: 5,
        width: 3,
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
