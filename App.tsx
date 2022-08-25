import {Platform, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ceva, {MyText} from "./components/Ceva"
import ModalTask from "./components/TaskPopup/Popup";
import {SafeAreaView} from "react-native-safe-area-context";
import {defaultTasks} from "./components/defaultTaks";
import RenderSchedule from "./components/RenderSchedule";

import * as Notifications from "expo-notifications";
import {themeHook} from "./components/theme";
import Profile from "./components/Profile";
import UselessTextInput from "./components/UselessTextInput";


export default function App() {
    const [selectedStartDate] = useState(null);
    const [page, setPage] = useState("today");
    const [isShowingAddTask, setIsShowAddTask] = useState(false);
    const [isShowingEditTask, setIsShowEditTask] = useState(false);
    const [taskBeginEdited, setTaskBeingEdited] = useState(null);
    const [theme] = themeHook();
    const [tasks, setTasks] = useState(defaultTasks);

    const showPage = () => {
        switch (page) {
            case "today":
                return <ScrollView snapToStart>
                    <ModalTask activate={isShowingAddTask} onSubmit={(task) => {
                        const other = [...tasks];
                        other.push(task);
                        setTasks(other);
                        setIsShowAddTask(false);
                    }} onDismiss={() => setIsShowAddTask(false)}/>

                    <ModalTask activate={isShowingEditTask} editTask={taskBeginEdited} onSubmit={() => {
                        setIsShowEditTask(false);
                        const other = [...tasks];
                        setTasks(other);
                    }} onDeleteTask={(task) => {
                        setTasks(tasks.filter(a => JSON.stringify(a) !== JSON.stringify(task)));
                        setIsShowEditTask(false);
                    }} onDismiss={() => setIsShowEditTask(false)}
                    />
                    <RenderSchedule givenTasks={tasks}
                                    callbackTaskPressed={(task) => {
                                        setTaskBeingEdited(task);
                                        setIsShowEditTask(true);
                                    }}/>
                </ScrollView>;
            case "Ceva":
                return <Ceva/>
            case "calendar":
                return <UselessTextInput/>
            case "profile":
                return <Profile/>
        }
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 20,
            backgroundColor: theme === 'white' ? 'white' : 'black',
        },
        realContainer: {
            flex: 1,
            backgroundColor: theme === 'white' ? 'white' : 'black',
            paddingLeft: 10,
            paddingRight: 10,
        },
        nav: {
            flex: 0.1,
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 20,
            backgroundColor: theme === 'white' ? '#FFFFFF' : '#313131',
        },
        navitem: {
            color: 'black',
            fontSize: 15,
            height: "100%",
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }
    });
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.realContainer}>
                {showPage()}
            </View>
            <View style={styles.nav}>
                <TouchableOpacity onPress={() => setPage("today")}
                                  style={styles.navitem}><MyText>Today</MyText></TouchableOpacity>
                <TouchableOpacity onPress={() => setPage("Ceva")}
                                  style={styles.navitem}><MyText>Ceva</MyText></TouchableOpacity>
                <TouchableOpacity onPress={() => setIsShowAddTask(true)} style={styles.navitem}>
                    <View style={{
                        width: 40,
                        height: 40,
                        borderRadius: 100,
                        borderWidth: 2.5,
                        borderColor: theme == 'white' ? "#5B5B5B" : "#999999",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <View style={{
                            width: '50%',
                            height: 2,
                            backgroundColor: theme === 'white' ? 'black' : 'white',
                            position: "absolute"
                        }}/>
                        <View style={{
                            height: '50%',
                            width: 2,
                            backgroundColor: theme === 'white' ? 'black' : 'white',
                            position: "absolute"
                        }}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPage("calendar")}
                                  style={styles.navitem}><MyText>Calendar</MyText></TouchableOpacity>
                <TouchableOpacity onPress={() => setPage("profile")}
                                  style={styles.navitem}><MyText>Profile</MyText></TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

