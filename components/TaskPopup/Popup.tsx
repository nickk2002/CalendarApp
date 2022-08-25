import React from "react";
import {Modal, TouchableWithoutFeedback, View} from "react-native";
import {CalendarItemType} from "../CalendarItem";

import {themeHook} from "../theme";
import ActualContent from "./ActualModalContent";


export type PopupSettings = {
    onSubmit: (arg0: CalendarItemType) => void,
    activate?: boolean,
    editTask?: CalendarItemType,
    onDeleteTask?: (arg0: CalendarItemType) => any
    onDismiss: () => void;
}
const Popup = (props: PopupSettings) => {
    const [theme] = themeHook();


    function pressedOutside() {
        props.onDismiss();
    }

    // END
    return (
        <Modal
            animated
            animationType="fade"
            transparent
            visible={props.activate}
        >
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <TouchableWithoutFeedback onPress={pressedOutside}>
                        <View style={{
                            flex: 0.6,
                            backgroundColor: theme == 'white' ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.6)"
                        }}/>
                    </TouchableWithoutFeedback>
                    <ActualContent onDismiss={props.onDismiss} editTask={props.editTask} onSubmit={props.onSubmit}
                                   onDeleteTask={props.onDeleteTask}/>
                </View>
            </View>
        </Modal>
    )
};


export default Popup;