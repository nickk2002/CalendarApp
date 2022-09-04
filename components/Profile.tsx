import {Pressable, StyleSheet, View} from "react-native";
import React, {useState} from "react";
import {MyText} from "./Ceva";
import {themeHook, themeStorageKey} from "./theme";
import {Entypo, Ionicons} from "@expo/vector-icons";
import {colors} from "../colors";
import {SafeAreaView} from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ViewFunction(props: { icon, text: string, enable: boolean, onPress: () => void }) {
    const [theme] = themeHook();
    return (
        <Pressable style={styles.themeOption} onPress={() => {
            props.onPress();
        }}>
            {props.icon}
            <MyText style={styles.themeText}>{props.text}</MyText>
            <View style={[styles.pressable, {borderColor: theme === 'white' ? '#484848' : "#a7a7a7"}]}>
                {props.enable ?
                    <View style={[styles.selected, {backgroundColor: theme === 'white' ? '#4f4f4f' : "#cacaca"}]}/> :
                    <></>
                }
            </View
            >
        </Pressable>
    )
}


export default function Profile() {
    const [theme, setTheme] = themeHook();
    const [useLight, setUseLight] = useState(theme === 'white');
    const [useDark, setUseDark] = useState(theme === 'dark');
    const setThemeWhite = () => {
        setTheme("white");
        setUseDark(false);
        setUseLight(true);
        AsyncStorage.setItem(themeStorageKey,"white")
    }
    const setThemeDark = () => {
        setTheme("dark");
        setUseLight(false);
        setUseDark(true);
        AsyncStorage.setItem(themeStorageKey,"dark")
    }
    const iconColor = () => {
        return theme === 'white' ? 'black' : 'grey';
    }

    return (
        <SafeAreaView style={{marginHorizontal: 10}}>
            <MyText style={{fontSize: 15, marginBottom: 15}}>Choose Theme</MyText>
            <View style={{
                backgroundColor: theme === 'white' ? colors.lightgrey : colors.otherblack,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: theme === 'white' ? '#c7c7c7' : '#6b6b6b'
            }}>
                <ViewFunction icon={<Entypo name="light-up" size={20} color={iconColor()}/>} text="Light"
                              enable={useLight}
                              onPress={setThemeWhite}/>
                <View style={{height: 1, backgroundColor: theme == 'white' ? '#c7c7c7' : '#6b6b6b', width: '100%'}}/>
                <ViewFunction icon={<Ionicons name="moon" size={20} color={iconColor()}/>} text="Dark" enable={useDark}
                              onPress={setThemeDark}
                />
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    themeOption: {
        flexDirection: "row",
        alignItems: 'center',
        padding: 10,
    },
    themeText: {
        fontSize: 15,
        marginLeft: 10,
    },
    pressable: {
        position: "absolute",
        right: 10,
        height: 20,
        width: 20,
        borderRadius: 50,
        borderWidth: 1,
    },
    selected: {
        margin: 2,
        borderRadius: 50,
        flex: 1,
    }
})