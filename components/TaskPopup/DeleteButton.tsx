import {Alert, TouchableOpacity, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {colors} from "../../colors";
import React from "react";

export function DeleteButton(props: { isVisible: boolean, onDelete, message: string }) {
    return (
        props.isVisible ?
            <View style={{flex: 0.1, flexDirection: "row-reverse"}}>
                <TouchableOpacity onPress={() => {
                    Alert.alert(
                        props.message,
                        "You can't undo this operation",
                        [
                            {
                                text: "Yes",
                                style: 'destructive',
                                onPress: () => {
                                    props.onDelete()
                                }
                            },
                            {
                                text: "No",
                                style: "cancel",
                            }
                        ],
                        {}
                    )
                }}>
                    <MaterialIcons name='delete' color={colors.red} size={20}/>
                </TouchableOpacity>
            </View> : <></>
    )
}
