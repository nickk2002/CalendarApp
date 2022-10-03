import {themeHook} from "../../src/global/global";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {MyText} from "../Ceva";
import {colors} from "../../src/global/colors";
import React from "react";

export default function EventTimeLabels(props: { value: string; label: string; onPress?: () => void; notPressable?: boolean }) {
    const [theme] = themeHook();
    const backgroundColor = () => {
        return theme == 'white' ? colors.lightgrey : "#4a4949";
    }
    return (
        <View style={{flex: 1, marginRight: 10}}>
            <MyText style={{fontSize: 12, fontWeight: "bold"}}>{props.label}</MyText>
            {props?.notPressable ?
                <View
                    style={[styles.pressable, {backgroundColor: backgroundColor()}]}>
                    <MyText style={{fontSize: 12}}>{props.value}</MyText>
                </View>
                :
                <TouchableOpacity
                    activeOpacity={0.6} onPress={() => props?.onPress()}
                    style={[styles.pressable, {backgroundColor: backgroundColor()}]}>
                    <MyText style={{fontSize: 12}}>{props.value}</MyText>
                </TouchableOpacity>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    pressable: {
        borderRadius: 5,
        padding: 5,
        alignItems: 'center',
    }
})
