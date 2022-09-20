import {Button, Modal, TouchableWithoutFeedback, View} from "react-native";
import {navigateBack} from "../RootNavigation";
import {cuvinteHook, storeCuvinteAsync, themeHook} from "./global";
import {MyTextInput} from "./Ceva";


export default function WordModal({route}) {

    const [theme] = themeHook();
    const [cuvinte, setCuvinte] = cuvinteHook();
    const text = route.params.text;
    const header = route.params.header;
    const index = route.params.index;
    return (
        <Modal
            animated
            animationType="fade"
            transparent
        >
            <View style={{flex: 1,}}>
                <TouchableWithoutFeedback onPress={() => navigateBack()}>
                    <View style={{
                        flex: 0.2,
                        backgroundColor: theme == 'white' ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.8)"
                    }}>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{
                    flex: 1,
                    borderWidth: 1,
                    paddingHorizontal: 10,
                    backgroundColor:theme == 'white' ? "white" : "black",
                    alignItems: 'center'
                }}>
                    <View>
                        <MyTextInput
                            autoFocus
                            onChangeText={(text) => route.params.header = text}
                            style={{
                                fontWeight: 'bold',
                                fontSize: 20,
                                top: 10,
                                margin: 20,
                                textAlignVertical: 'center',
                                color: theme === 'white' ? 'black' : '#ffffff'
                            }}>
                            {header}</MyTextInput>
                    </View>
                    <View style={{width: '100%', height: 1, backgroundColor: 'grey', marginBottom: 20}}/>

                    <View style={{width: '100%',height:'60%'}}>
                        <MyTextInput style={{
                            flex:1,
                            color: theme === 'white' ? 'black' : 'white'
                        }} onChangeText={(text) => {
                            route.params.text = text;
                        }}>{text}</MyTextInput>
                    </View>
                    <View>

                        <Button title="Done Editing" onPress={() => {
                            if (index == null)
                                cuvinte.push(route.params)
                            else {
                                cuvinte[index] = {
                                    header: route.params.header,
                                    text: route.params.text
                                }
                            }
                            setCuvinte([...cuvinte])
                            navigateBack();
                            storeCuvinteAsync(cuvinte);
                        }}/>
                    </View>
                </View>
            </View>
        </Modal>
    )
}