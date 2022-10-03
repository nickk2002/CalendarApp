import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {themeHook} from "../src/global/global";
import {navigate} from "./RootNavigation";
import {MyText} from "./Ceva";

export default function NavigationBar() {
    const [theme] = themeHook();
    const styles = getStyles(theme);
    return (<View style={styles.nav}>
        <TouchableOpacity
            onPress={() => navigate("Today")}
            style={styles.navitem}><MyText>Today</MyText></TouchableOpacity>
        <TouchableOpacity onPress={() => navigate("Dumnezeu")}
                          style={styles.navitem}><MyText>Ceva</MyText></TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('AddTask')} style={styles.navitem}>
            <View style={styles.circle}>
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
    </View>)
}
const getStyles = (theme) => StyleSheet.create({
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
    },
    circle:{
        width: 40,
        height: 40,
        borderRadius: 100,
        borderWidth: 2.5,
        borderColor: theme == 'white' ? "#5B5B5B" : "#999999",
        justifyContent: "center",
        alignItems: "center"
    }
});
