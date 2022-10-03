import React, {useEffect, useState} from 'react';
import Ceva from "./components/Ceva"
import Popup from "./components/TaskPopup/Popup";
import RenderSchedule from "./components/Schedule/RenderSchedule";
import {
    calendarLastDayStorageKey,
    cuvinteHook,
    cuvinteStorageKey,
    lastRefreshDateHook,
    taskHook,
    tasksStorageKey,
    themeHook,
    themeStorageKey
} from "./src/global/global";
import Profile from "./components/Profile";
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {navigationRef} from './components/RootNavigation';
import FlashMessage from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from 'expo-splash-screen';
import {StatusBar} from "expo-status-bar";
import WordModal from "./components/WordModal";
import NavigationBar from "./components/NavigationBar";

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();
export default function App() {
    const [theme] = themeHook();
    const [, setTasks] = taskHook();
    const [, setTheme] = themeHook();
    const [, setCuvinte] = cuvinteHook();
    const [, setLastRefreshDate] = lastRefreshDateHook();

    const [isLoadingComplete, setLoadingComplete] = useState(false);
    useEffect(() => {
            async function prepare() {
                try {
                    const storedTheme = await AsyncStorage.getItem(themeStorageKey);
                    if (storedTheme == 'white') {
                        setTheme("white");
                        await AsyncStorage.setItem(themeStorageKey, "white")
                    } else if (storedTheme == "dark") {
                        setTheme("dark");
                        await AsyncStorage.setItem(themeStorageKey, "dark")
                    }
                    await AsyncStorage.getItem(calendarLastDayStorageKey).then((value) => {
                        if (value) {
                            setLastRefreshDate(JSON.parse(value))
                            console.log("Setting date to", value, JSON.parse(value));
                        }
                    });
                    await restoreTodosFromAsync();
                    await restoreCuvinteFromAsync();
                } catch
                    (e) {
                    console.warn(e);
                } finally {
                    console.log("Finished loading");
                    setLoadingComplete(true);
                }
            }
            prepare();
        }, []
    );

    useEffect(() => {
        async function hide() {
            await SplashScreen.hideAsync();
        }

        if (isLoadingComplete) {
            console.log("Hiding splashscreen")
            hide();
        }
    }, [isLoadingComplete]);

    if (!isLoadingComplete) {
        return null;
    }

    async function restoreTodosFromAsync() {
        await AsyncStorage.getItem(tasksStorageKey).then(stringifiedTasks => {
            const parsedTodos = JSON.parse(stringifiedTasks);
            console.log("Todos",parsedTodos.length)
            if (!parsedTodos || typeof parsedTodos !== 'object')
                return;
            setTasks(parsedTodos);
            console.log("Done with calendar");
        }).catch(err => {
            console.warn('Error restoring todos from async');
            console.warn(err);
        });
    }

    async function restoreCuvinteFromAsync() {
        await AsyncStorage.getItem(cuvinteStorageKey).then(cuvinte => {
            if (cuvinte !== null)
                setCuvinte(JSON.parse(cuvinte));
            console.log("Done with cuvine");
        }).catch(() => {
            console.warn("Error restoring cuvinte from async");
        })
    }

    const navTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: theme === 'white' ? 'white' : 'black',
        },
    };

    return (
        <NavigationContainer ref={navigationRef} theme={navTheme}>
            <Stack.Navigator initialRouteName="Settings" screenOptions={{
                headerTintColor: theme == 'white' ? 'black' : 'white',
                headerStyle: {
                    backgroundColor: theme === 'white' ? 'white' : 'black',
                },
                statusBarColor: theme === 'white' ? 'grey' : 'black',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
                <Stack.Group screenOptions={{headerBackVisible: false}}>
                    <Stack.Screen name="Dumnezeu" component={Ceva}/>
                    <Stack.Screen name="Profile" component={Profile}/>
                    <Stack.Screen name="Today" component={RenderSchedule}/>
                </Stack.Group>
                <Stack.Group screenOptions={{presentation: 'transparentModal', headerShown: false}}>
                    <Stack.Screen name="AddTask" component={Popup}/>
                    <Stack.Screen name="AddWord" component={WordModal}/>
                </Stack.Group>
            </Stack.Navigator>
            <NavigationBar/>
            <FlashMessage position="top"/>
            <StatusBar translucent backgroundColor={theme === 'white' ? 'grey' : 'black'}/>
        </NavigationContainer>
    );
}

