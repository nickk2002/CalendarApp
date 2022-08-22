import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Ceva from "./components/Ceva"
import ModalTask from "./components/Popup";
import {SafeAreaView} from "react-native-safe-area-context";
import {defaultTasks} from "./components/defaultTaks";
import RenderSchedule from "./components/RenderSchedule";


export default function App() {
    const [selectedStartDate] = useState(null);
    const [page, setPage] = useState("today");
    const [isShowingAddTask, setIsShowAddTask] = useState(false);
    const [isShowingEditTask, setIsShowEditTask] = useState(false);
    const [taskBeginEdited, setTaskBeingEdited] = useState(null);

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
                return <Text>Calendar</Text>
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.tasks}>
                {showPage()}
            </View>
            <View style={styles.nav}>
                <TouchableOpacity onPress={() => setPage("today")}
                                  style={styles.navitem}><Text>Today</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setPage("Ceva")}
                                  style={styles.navitem}><Text>Ceva</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setIsShowAddTask(true)} style={styles.navitem}>
                    <View style={{
                        width: 40,
                        height: 40,
                        borderRadius: 100,
                        borderWidth: 2.5,
                        borderColor: "#5B5B5B",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <View style={{
                            width: '50%',
                            height: 2,
                            backgroundColor: '#000000',
                            position: "absolute"
                        }}/>
                        <View style={{
                            height: '50%',
                            width: 2,
                            backgroundColor: '#000000',
                            position: "absolute"
                        }}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPage("calendar")}
                                  style={styles.navitem}><Text>Calendar</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setPage("profile")}
                                  style={styles.navitem}><Text>Profile</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:20,
    },
    tasks: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
    },
    nav: {
        flex: 0.1,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 20,
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
