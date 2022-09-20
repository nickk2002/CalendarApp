import {Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import {cuvinteHook, storeCuvinteAsync, themeHook} from "./global";
import {DeleteButton} from "./TaskPopup/DeleteButton";
import {navigate} from "../RootNavigation";

function Header(props: { text?, placeholder?, onChangeText? }) {
    return <MyText style={{fontWeight: "bold", fontSize: 19}}>{props.text}</MyText>
    if (props.text)
        return <MyTextInput
            style={{fontWeight: "bold", fontSize: 19}}>{props.text}</MyTextInput>
    return <MyTextInput placeholder={props.placeholder} style={{fontWeight: "bold", fontSize: 19}}/>
}


export function MyText(props: { style?, children, show?, nonewline? }) {
    const [theme] = themeHook();
    const defaultColor = theme === 'white' ? 'black' : 'white';
    if ('show' in props && !props.show)
        return <></>
    if (props.nonewline)

        return <Text  {...props} style={[{color: defaultColor}, props.style]}>{`${props.children}`}</Text>
    return <Text  {...props} style={[{color: defaultColor}, props.style]}>{parseItalicAndBold(props.children)}</Text>
}


export function MyTextInput(props: { style?, children?, show? }) {
    const [theme] = themeHook();
    const backgroundColorPlaceHolder = () => {
        if (theme === 'white')
            return 'grey'
        return '#a7a7a7'
    }
    const defaultColor = theme === 'white' ? 'black' : 'white';
    if ('show' in props && !props.show)
        return <></>
    if (props.children)
        return <TextInput scrollEnabled {...props} numberOfLines={10} multiline placeholderTextColor={backgroundColorPlaceHolder()}
                          style={[{color: defaultColor}, props.style]}>{props.children}</TextInput>
    return <TextInput scrollEnabled  numberOfLines={10} {...props} multiline placeholderTextColor={backgroundColorPlaceHolder()}
                      style={[{color: defaultColor}, props.style]}/>
}

function Separator() {
    return <View style={styles.separator}/>
}

function parseItalicAndBold(toShow: string) {
    const prettyShow = []
    let startIndexBold = -1;
    let startIndexItalic = -1;
    let stringToModify = "";
    for (let arrIndex = 0; arrIndex < toShow.length; arrIndex++) {
        if (toShow[arrIndex] == "*") {
            if (startIndexBold == -1)
                startIndexBold = arrIndex + 1;
            else {
                prettyShow.push(<MyText key={Math.random()} style={{fontWeight: 'bold'}}>{stringToModify}</MyText>)
                stringToModify = "";
                startIndexBold = -1
            }
        } else if (toShow[arrIndex] == "_") {
            if (startIndexItalic == -1)
                startIndexItalic = arrIndex + 1;
            else {
                prettyShow.push(<MyText key={Math.random()} style={{fontStyle: 'italic'}}>{stringToModify}</MyText>)
                stringToModify = "";
                startIndexItalic = -1
            }
        } else {
            if (startIndexBold == -1 && startIndexItalic == -1) {
                prettyShow.push(toShow[arrIndex]);
            } else {
                stringToModify += toShow[arrIndex];
            }
        }
    }
    return prettyShow
}

export default function Dumnezeu() {
    const [cuvinte, setCuvinte] = cuvinteHook();
    console.log("Cuvinte", cuvinte);

    function Cuvant(props: { header: string, text: string, index: number }) {
        return <>
            <TouchableOpacity onPress={() => {
                navigate("AddWord", {
                        text: props.text,
                        header: props.header,
                        index: props.index
                    }
                );
            }}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <Header text={props.header}/>
                    </View>
                    <DeleteButton isVisible onDelete={() => {
                        deleteCuvant(props)
                    }} message={"Stergi cuvantul?"}/>
                </View>
                <MyText>
                    {parseItalicAndBold(props.text)}
                </MyText>
            </TouchableOpacity>
            <Separator/>
        </>
    }

    function addCuvant(header, text) {
        console.log("Add something");
        navigate("AddWord", {
            text: text,
            header: header,
        })
        setCuvinte([...cuvinte]);
        storeCuvinteAsync(cuvinte);
    }

    function deleteCuvant(cuvant: { header?, text? }) {
        const newCuvinte = cuvinte.filter((other) => other.header != cuvant.header || other.text != cuvant.text);
        setCuvinte(newCuvinte);
        storeCuvinteAsync(newCuvinte);
    }

    return (
        <ScrollView style={{marginRight: 10, marginLeft: 10, marginTop: 10}} snapToEnd>
            <View style={styles.rugaciunea}>
                <MyText style={{fontSize: 16}}><MyText style={{fontWeight: "bold"}}>Doamne, </MyText>Iisuse Hristoase,
                    Fiul
                    lui Dumnezeu, miluieste-ma pe mine pacatosul.</MyText>
                <MyText style={{textAlignVertical: "center", marginTop: 10, opacity: 0.7}}>Spune mereu, cu frica si cu
                    dragoste</MyText>
            </View>
            <View style={{flexDirection: "row", flex: 1,}}>
                <View style={styles.explicatie}>
                    <MyText style={{fontWeight: "bold"}}>Incredere</MyText>
                    <MyText>Am incredere in Tine Domane. Orice s-ar intampla Tu stii totul deci este bine
                        pentru mine. Nu ma voi teme de nimic si orice necaz si suferinta as avea Iti multumesc Tie.Acest
                        dar al increderii ma face sa nu imi mai fie frica de moarte si sa fiu gata in orice secunda
                        pentru ea. Si daca se prabuseste avionul si ajung in mare si daca facem accident de masina si
                        daca nu am unde sa stau,si daca cineva imi spune un cuvant urat, toate le primesc cu drag ca de
                        la Tine, Dumnezeul meu. Doamne, in Tine imi pun toata nadejdea si speranta pe care o am si stiu
                        ca nu ma vei rusina. Dovada sunt toate minunile pe care le-ai facut cu Mine, si recunosc ca sunt
                        cu adevarat nevrednic de ele. </MyText>
                </View>
                <View style={styles.explicatie}>
                    <MyText style={{fontWeight: "bold"}}>Smerenie</MyText>
                    <MyText>Fii atent la cuvantul _"pacatos"_ pe care il spui. Gandeste-te de cate ori ai judecat pe
                    ceilalti si de cate ori te-ai simtit foarte departe de Dumnezeu. Aminteste-ti de noaptea in care nu
                    puteai sa dormi pentru ca simteai ca ai demon in tine. Aminteste-ti ca ai citit de doua ori despre
                    slava desarta si despre faptul ca te mandresti ca faci fapte ale credintei in exterior si judeci pe
                    ceilalti. *Nebunule!, pentru ce vezi paiul din ochiul ceiluilalt si nu vezi cat de mandru esti in
                    tot cea ce faci.Oare ce te poti mandri daca intr-o secunda Dumnezeu poate sa iti ia tot? Oare nu ai
                    primit de la Dumnezeu fiecare lucru? Oare nu era sa te sinucizi si Dumnezeu te-a salvat? Pe astea le
                    uiti dar cand cineva vorbeste despre masini sau despre case ti se pare pacat.* Cu toate aceste rele
                    pe care le faci si continui sa le faci Dumnezeu nu te trimite in iad. Si inca mai mult de atat, iti
                    da o sansa in fiecare zi sa te indrepti, sa ai timp de rugaciune. Doamne, ai mila de mine ca pacatos
                    sunt. Miluieste-ma asa cum Poti. </MyText>
                </View>
            </View>

            <View style={{width:'100%',height:1,marginVertical:20,backgroundColor:'grey'}}/>
            <View style={{flex:1,}}>
                {cuvinte.map((item, index) =>
                    <Cuvant key={item.header + " " + item.text} index={index} header={item.header}
                            text={item.text}/>)
                }
            </View>
            <Button title="Add new"  onPress={() => addCuvant("Doamne", "Text")}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    rugaciunea: {
        borderWidth: 2,
        borderColor: '#1b34bc',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    }
    ,
    explicatie: {
        flex: 1,
        marginTop: 20,
        alignItems: 'center',
        marginRight: 10,
    },
    separator: {
        width: "100%",
        height: 5,
        backgroundColor: 'red',
        marginTop: 10,
        marginBottom: 10,
    }
});
