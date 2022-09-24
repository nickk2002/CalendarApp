import {Modal, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {navigateBack} from "../RootNavigation";
import {cuvinteHook, storeCuvinteAsync, themeHook} from "./global";
import {MyText, MyTextInput} from "./Ceva";
import {colors} from "../colors";


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
            <View style={{flex: 1}}>
                <TouchableWithoutFeedback onPress={() => navigateBack()}>
                    <View style={{
                        flex: 0.2,
                        backgroundColor: theme == 'white' ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.8)"
                    }}>
                    </View>
                </TouchableWithoutFeedback>
                <ScrollView style={{
                    flex: 1,
                    borderWidth: 1,
                    paddingHorizontal: 10,
                    width: "100%",
                    backgroundColor: theme == 'white' ? "white" : "black",
                    // alignItems: 'center'
                }}>
                    <View style={{alignItems: 'center'}}>

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
                            {header}
                        </MyTextInput>
                    </View>
                    <Text style={{
                        backgroundColor: theme == 'white' ? colors.lightgrey : "#4a4949",
                        color: theme == 'white' ? colors.textgrey : 'white',
                        padding: 10,
                        width: '100%',
                        fontSize: 11,
                        marginBottom:20,
                    }}>Begin Text</Text>
                    <MyTextInput style={{
                        color: theme === 'white' ? 'black' : 'white',
                        textAlignVertical: 'top',
                        minHeight: 100
                    }} onChangeText={(text) => {
                        route.params.text = text;
                    }}>{text}</MyTextInput>
                    <Text style={{
                        backgroundColor: theme == 'white' ? colors.lightgrey : "#4a4949",
                        color: theme == 'white' ? colors.textgrey : 'white',
                        padding: 10,
                        width: '100%',
                        marginVertical:20,
                        fontSize: 11,
                    }}>End Text</Text>
                    <View style={{width: "100%",alignItems:'center'}}>
                        <TouchableOpacity style={{
                            width: 100,
                            padding: 10,
                            borderRadius: 5,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: theme == 'white' ? colors.lightgrey : "#4a4949"
                        }}
                          onPress={() => {
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
                          }}><MyText>Update</MyText></TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    )
}