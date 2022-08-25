import {Pressable, StyleSheet, View} from "react-native";
import React, {useState} from "react";
import {MyText} from "./Ceva";
import {themeHook} from "./theme";
import {Entypo, Ionicons} from "@expo/vector-icons";

function ViewFunction(props: { icon, text: string }) {
    const [pressed, setPressed] = useState(false);
    return (
        <Pressable style={styles.themeOption} onPress={() => setPressed(!pressed)}>
            {props.icon}
            <MyText style={styles.themeText}>{props.text}</MyText>
            <View style={styles.pressable}>
                {pressed ?
                    <View style={styles.selected}>

                    </View> :
                    <></>
                }
            </View
            >
        </Pressable>
    )
}

function Seperator() {
    return (
        <View style={styles.separator}/>
    )
}

export default function Profile() {
    const [useDarkTheme, setUseDarkTheme] = useState(false);
    const [theme, setTheme] = themeHook();
    const toggleSwitch = () => {
        setUseDarkTheme(!useDarkTheme);
        if (theme === 'white')
            setTheme('dark');
        else {
            setTheme('white');
        }
    }
    return (
        <View>
            <MyText style={{fontSize: 15, marginBottom: 15}}>Theme</MyText>
            <View style={styles.themeView}>
                <ViewFunction icon={<Entypo name="light-up" size={20} color="grey"/>} text="Light"/>
                <Seperator/>
                <ViewFunction icon={<Ionicons name="moon" size={20} color='grey'/>} text="Dark"/>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({

    themeView: {
        borderWidth: 1,
        borderColor: 'grey',
        backgroundColor: '#161B21'
    },
    themeOption: {
        borderWidth: 1,
        flexDirection: "row",
        alignItems: 'center',
        padding: 10,
    },
    themeText: {
        fontSize: 20,
        marginLeft: 10,
        color: "#D6DDE5"
    },
    pressable: {
        position: "absolute",
        right: 10,
        height: 20,
        width: 20,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#D6DDE5"
    },
    selected: {
        margin: 2,
        borderRadius: 50,
        flex: 1,
        backgroundColor: "white"
    },
    separator: {
        width: '100%',
        borderColor: 'red',
        height: 2,
        backgroundColor: 'grey'
    }
})