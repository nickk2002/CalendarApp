import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from "react";
import {colors} from "../../colors";
import HourIntervalDisplay from "./HourIntervalDisplay";
import {MyText} from "../Ceva";
import {themeHook} from "../global";
import {CalendarItemType} from "./CalendarItemType";

function RenderLine(props: { color: string }) {
    const styles = {
        line: {
            height: '100%',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            backgroundColor: 'red',
        }
    };
    return (
        <View style={{position: "absolute", height: '100%', width: 3, paddingTop: '300%', paddingBottom: '300%'}}>
            <View style={[styles.line, {backgroundColor: props.color}]}/>
        </View>
    )
}

export default function CalendarItem(props: CalendarItemType) {
    const [theme] = themeHook();
    const styles = StyleSheet.create({
        containerFreeTime: {
            flex: 1,
            backgroundColor: theme == "white" ? colors.lightgrey : colors.otherblack,
            borderRadius: 10,
            justifyContent: 'center',
        },
        container: {
            flex: 1,
            backgroundColor: theme == "white" ? colors.lightgrey : colors.otherblack,
            borderRadius: 10,
            justifyContent: 'center',
        },
        course: {
            fontWeight: "bold"
        },
        header: {
            fontSize: 18,
            flex:1,
            fontWeight: 'bold',
        },
        description: {
            marginTop: 5,
            fontSize: 15,
            color: '#7C7C7C',
        },
    });
    if (props.isFreeTime) {
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={() => props.handlePress()} style={styles.containerFreeTime}>
                <RenderLine color="green"/>
                <View style={{padding: 15, flex: 1}}>

                    <View style={{flexDirection: 'row', justifyContent: 'flex-start', overflow: "hidden"}}>
                        <MyText style={[styles.header, {flex: 1}]}>Free</MyText>
                        <HourIntervalDisplay startTime={props.startTime} endTime={props.endTime}/>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => props.handlePress()} style={styles.container}>
            <RenderLine color={props.color}/>
            <View style={{margin: 15, flex: 1, overflow: 'hidden'}}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start', overflow: "hidden"}}>
                    <MyText style={styles.header}>{props.header}</MyText>
                    <HourIntervalDisplay startTime={props.startTime} endTime={props.endTime}/>
                </View>
                <MyText show={props.course !== undefined} style={[styles.description, styles.course]}>{props.course}</MyText>
                <MyText show={props.location !== undefined} style={styles.description}>{props.location}</MyText>
                <MyText style={styles.description}>{props.description?.trim()}</MyText>
            </View>
        </TouchableOpacity>
    );
}

