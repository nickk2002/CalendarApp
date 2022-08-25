import {TouchableOpacity, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {MyText} from "../Ceva";
import {colors} from "../../colors";
import React from "react";

export default function EventOption(props: { name: string, iconName, disableLine?: boolean }) {
    return (
        <View style={{paddingLeft: 25}}>
            <TouchableOpacity style={{flexDirection: "row", alignItems: 'center'}}>
                <MaterialIcons name={props.iconName} size={20} color='grey'/>
                <MyText style={{fontSize: 15, padding: 10, paddingLeft: 5}}>{props.name}</MyText>
            </TouchableOpacity>
            {
                !props.disableLine ? <View style={{backgroundColor: colors.divider, width: '100%', height: 1}}/> : <></>
            }
        </View>
    );
}
