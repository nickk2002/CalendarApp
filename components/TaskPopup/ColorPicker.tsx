import {Modal, TouchableOpacity, View} from "react-native";
import React from "react";

const palette = ['#888888', '#ed1c24', '#d11cd5', '#1633e6', '#00aeef', '#00c85d', '#57ff0a', '#ffde17', '#f26522']

export default function ColorPicker(props: { isVisible, onPressColor: (arg0: string) => void }) {
    return (
        <Modal transparent visible={props.isVisible} animated onDismiss={() => console.log("dismiss")}
               animationType="fade">
            <View style={{flex: 1, top: '65%', flexDirection: "row", marginLeft: 15}}>
                {palette.map((color) => {
                    return (
                        <TouchableOpacity
                            key={color}
                            onPress={() => props.onPressColor(color)}
                            style={{
                                width: 20,
                                height: 20,
                                borderRadius: 100,
                                backgroundColor: color,
                                marginRight: 5
                            }}/>
                    );
                })}
            </View>
        </Modal>
    )
}
