import React from "react";
import {Modal, TouchableWithoutFeedback, View} from "react-native";

import {themeHook} from "../../src/global/global";
import ActualContent from "./ActualModalContent";
import {navigateBack} from "../RootNavigation";
import {CalendarItemType} from "../Schedule/CalendarItemType";
import {Time} from "../../src/business/Time";


export type PopupSettings = {
    editTask?: CalendarItemType,
    startTime: Time,
    endTime: Time,
}
const Popup = ({route}) => {
    const [theme] = themeHook();
    let editTask = null;
    if (route.params?.editTask)
        editTask = route.params.editTask;
    let startDate = null, endDate = null;
    if (route.params?.startTime) {
        startDate = route.params.startTime;
        endDate = route.params.endTime;
        console.log("Received", route.params);
    }

    function pressedOutside() {
        navigateBack();
    }

    // END
    return (
        <Modal
            animated
            animationType="fade"
            transparent
        >
            <View style={{flex: 1}}>
                <TouchableWithoutFeedback onPress={pressedOutside}>
                    <View style={{
                        flex: 0.6,
                        backgroundColor: theme == 'white' ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.6)"
                    }}/>
                </TouchableWithoutFeedback>
                <ActualContent editTask={editTask} startTime={startDate} endTime={endDate}/>
            </View>
        </Modal>
    )
};


export default Popup;