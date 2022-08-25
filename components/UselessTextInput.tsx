import React, {useState} from "react";
import {Button, Modal, SafeAreaView, StyleSheet, TextInput, View} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";


function Something() {
    const [text, onChangeText] = React.useState("Useless Text");
    const [number, onChangeNumber] = React.useState(null);
    const [isDatePickerVisibleStart, setDatePicker] = useState(false);
    return (
        <View>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="useless placeholder"
                keyboardType="numeric"
            />
            <Button title="Open Date picker" onPress={() => setDatePicker(true)}/>
            <DateTimePickerModal
                isVisible={isDatePickerVisibleStart}
                mode="datetime"
                isDarkModeEnabled={true}
                date={new Date}
                is24Hour
                onConfirm={() => {
                }}
                onCancel={() => {
                    setDatePicker(false);
                }}
            />
        </View>
    )
}

const UselessTextInput = () => {
    return (
        <SafeAreaView>
            <Modal>
                <Something/>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        // margin: 12,
        borderWidth: 1,
        // padding: 10,
    },
});

export default UselessTextInput;