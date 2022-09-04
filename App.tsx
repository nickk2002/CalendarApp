import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ceva, {MyText} from "./components/Ceva"
import Popup from "./components/TaskPopup/Popup";
import RenderSchedule from "./components/Schedule/RenderSchedule";
import {storeTasksAsync, taskHook, tasksStorageKey, themeHook} from "./components/theme";
import Profile from "./components/Profile";
import {readXMLRequest} from "./calendarParser";
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {navigate, navigationRef} from './RootNavigation';
import FlashMessage from "react-native-flash-message";
import {StatusBar} from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Stack = createNativeStackNavigator();
export default function App() {
    const [isCalendarLoaded, setCalendarLoaded] = useState(false);
    const [readFromLocalStorage, setReadFromLocalStorage] = useState(false);
    const [theme] = themeHook();
    const [, setTasks] = taskHook();

    const loadCalendar = (parsedTasks) => {
        if (isCalendarLoaded)
            return;
        console.log("Loading calendar");
        readXMLRequest((tasksFromCalendar) => {
            setCalendarLoaded(true);
            let currentTasks = [];
            if (parsedTasks !== null)
                currentTasks = parsedTasks;
            for (const calendarItem of tasksFromCalendar) {
                if (currentTasks.filter(item => JSON.stringify(item) === JSON.stringify(calendarItem)).length == 0) {
                    currentTasks.push(calendarItem);
                }
            }
            setTasks(currentTasks);
            storeTasksAsync(currentTasks);
        });
    }
    const restoreTodosFromAsync = () => {
        if (readFromLocalStorage)
            return;
        AsyncStorage.getItem(tasksStorageKey)
            .then(stringifiedTasks => {
                const parsedTodos = JSON.parse(stringifiedTasks);
                // if (!parsedTodos || typeof parsedTodos !== 'object') return;
                setReadFromLocalStorage(true);
                if (parsedTodos && typeof parsedTodos === 'object') {
                    setTasks(parsedTodos);
                    console.log("Got from local storage", parsedTodos.length, "tasks")
                    loadCalendar(parsedTodos)
                } else {
                    loadCalendar(null);
                }
            })
            .catch(err => {
                console.warn('Error restoring todos from async');
                console.warn(err);
            });
    };
    useEffect(() => restoreTodosFromAsync(), [])
    const navTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: theme === 'white' ? 'white' : 'black',
        },
    };


    const styles = StyleSheet.create({

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
            paddingBottom: 10,
        },
        navitem: {
            fontSize: 15,
            height: "100%",
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }
    });
    return (

        <NavigationContainer ref={navigationRef} theme={navTheme}>
            <Stack.Navigator initialRouteName="Settings" screenOptions={{
                headerTintColor: theme == 'white' ? 'black' : 'white',
                headerStyle: {
                    backgroundColor: theme === 'white' ? 'white' : 'black',
                },
                headerShadowVisible: true,
                statusBarColor: theme === 'white' ? 'white' : 'black',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
                <Stack.Group screenOptions={{headerBackVisible: false}}>
                    <Stack.Screen name="Dumnezeu" component={Ceva}/>
                    <Stack.Screen name="Profile" component={Profile}/>
                    <Stack.Screen name="Today" component={RenderSchedule} options={{}}/>
                </Stack.Group>
                <Stack.Group screenOptions={{presentation: 'transparentModal'}}>
                    <Stack.Screen name="AddTask" component={Popup} options={{headerShown: false}}/>
                </Stack.Group>
            </Stack.Navigator>
            <View style={styles.nav}>
                <TouchableOpacity
                    onPress={() => navigate("Today")}
                    style={styles.navitem}><MyText>Today</MyText></TouchableOpacity>
                <TouchableOpacity onPress={() => navigate("Dumnezeu")}
                                  style={styles.navitem}><MyText>Ceva</MyText></TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('AddTask')} style={styles.navitem}>
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
                <TouchableOpacity onPress={() => navigate("Calendar")}
                                  style={styles.navitem}><MyText>Calendar</MyText></TouchableOpacity>
                <TouchableOpacity onPress={() => navigate("Profile")}
                                  style={styles.navitem}><MyText>Profile</MyText></TouchableOpacity>
            </View>
            <FlashMessage position="top"/>
            <StatusBar style={theme == 'white' ? "light" : "dark"}/>
        </NavigationContainer>
    );
}

