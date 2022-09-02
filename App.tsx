import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ceva, {MyText} from "./components/Ceva"
import Popup from "./components/TaskPopup/Popup";
import RenderSchedule from "./components/Schedule/RenderSchedule";
import {taskHook, themeHook} from "./components/theme";
import Profile from "./components/Profile";
import {readXMLRequest} from "./calendarParser";
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {navigate, navigationRef} from './RootNavigation';


const Stack = createNativeStackNavigator();
export default function App() {
    const [page, setPage] = useState("today");
    const [isShowingAddTask, setIsShowAddTask] = useState(false);
    const [isShowingEditTask, setIsShowEditTask] = useState(false);
    const [taskBeginEdited, setTaskBeingEdited] = useState(null);
    const [isCalendarLoaded, setCalendarLoaded] = useState(false);
    const [theme] = themeHook();
    const [tasks, setTasks] = taskHook();

    const loadCalendar = () => {
        if (isCalendarLoaded)
            return;
        console.log("Loading calendar");
        readXMLRequest((data) => {
            setTasks(data);
            setCalendarLoaded(true);
            console.log("Loaded done!")
        });
    }
    useEffect(() => loadCalendar(), []);
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
                    backgroundColor: theme === 'white' ? 'white' : '#353535',
                },
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
                <Stack.Group screenOptions={{presentation: 'modal'}}>
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
        </NavigationContainer>
    );
}

