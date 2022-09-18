import {Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {themeHook} from "./theme";
import {DeleteButton} from "./TaskPopup/DeleteButton";

function Header(props: { text?, placeholder?, onChangeText? }) {
    return <MyText style={{fontWeight:"bold",fontSize:19}}>{props.text}</MyText>
    if (props.text)
        return <MyTextInput
            style={{fontWeight: "bold", fontSize: 19}}>{props.text}</MyTextInput>
    return <MyTextInput placeholder={props.placeholder} style={{fontWeight: "bold", fontSize: 19}}/>
}


export function MyText(props: { style?, children, show? }) {
    const [theme] = themeHook();
    const defaultColor = theme === 'white' ? 'black' : 'white';
    if ('show' in props && !props.show)
        return <></>
    return <Text {...props} style={[{color: defaultColor}, props.style]}>{props.children}</Text>
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
        return <TextInput {...props} multiline placeholderTextColor={backgroundColorPlaceHolder()}
                          style={[{color: defaultColor}, props.style]}>{props.children}</TextInput>
    return <TextInput {...props} multiline placeholderTextColor={backgroundColorPlaceHolder()}
                      style={[{color: defaultColor}, props.style]}/>
}

function Separator() {
    return <View style={styles.separator}/>
}

function CuvantScurt(props) {
    return (<MyText style={{fontStyle: 'italic'}}>"{props.MyText}"</MyText>)
}

function Italic(props: { children: React.ReactNode }) {
    return (<MyText style={{fontStyle: 'italic'}}>{props.children}</MyText>)
}

function Bold(props: { children: React.ReactNode }) {
    return (<MyText style={{fontWeight: 'bold'}}>{props.children}</MyText>)
}


export default function Dumnezeu() {
    const [cuvinte, setCuvinte] = useState([]);

    function CuvantMare(cuvant: { header?, text? }) {
        return <>
            <Separator/>
            <TouchableOpacity onLongPress={() => console.log("Long press")}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        {cuvant.header ?
                            <Header text={cuvant.header}/> :
                            <Header placeholder="Doamne ajuta-ma" onChangeText={(text) => cuvant.header = text}/>
                        }
                    </View>

                    <DeleteButton isVisible onDelete={() => {
                        deleteCuvant(cuvant)
                    }} message={"Stergi cuvantul?"}/>
                </View>
                {cuvant.text ?
                    <MyTextInput value={cuvant.text}/> :
                    <MyTextInput placeholder="Doamne, iti multumesc" onChangeText={(text) => cuvant.text = text}/>
                }
            </TouchableOpacity>
        </>
    }

    function addCuvant() {
        cuvinte.push(
            {}
        );
        setCuvinte([...cuvinte]);
    }

    function deleteCuvant(cuvant: { header?, text? }) {
        setCuvinte(cuvinte.filter((other) => other.header != cuvant.header || other.text != cuvant.text));
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
                    <MyText>Am incredere in Tine Domane. Orice s-ar intampla Tu stii totul deci este bine pentru
                        mine.
                        Nu ma voi teme de nimic si orice necaz si suferinta as avea Iti multumesc Tie.Acest dar al
                        increderii ma face sa nu imi mai fie frica de moarte si sa fiu gata in orice secunda pentru ea.
                        Si daca se prabuseste avionul si ajung in mare si daca facem accident de masina si daca nu
                        am unde sa stau,si daca cineva imi spune un cuvant urat, toate le primesc cu drag ca de la Tine,
                        Dumnezeul meu.
                        Doamne, in Tine imi pun toata nadejdea si speranta pe care o am si stiu ca nu ma vei rusina.
                        Dovada sunt toate minunile pe care le-ai facut cu Mine, si recunosc ca sunt cu adevarat
                        nevrednic
                        de ele.
                    </MyText>
                </View>

                <View style={styles.explicatie}>
                    <MyText style={{fontWeight: "bold"}}>Smerenie</MyText>
                    <MyText>Fii atent la cuvantul <MyText style={{fontStyle: "italic"}}>"pacatos" </MyText> pe care
                        il
                        spui.
                        Gandeste-te de
                        cate ori ai judecat pe ceilalti si de cate ori te-ai simtit foarte departe de Dumnezeu.
                        Aminteste-ti de noaptea
                        in care nu puteai sa dormi pentru ca simteai ca ai demon in tine. Aminteste-ti ca ai citit de
                        doua ori despre
                        slava desarta si despre faptul ca te mandresti ca faci fapte ale credintei in exterior si judeci
                        pe ceilalti.
                        <MyText style={{fontWeight: "bold"}}>Nebunule!, pentru ce vezi paiul din ochiul ceiluilalt si nu
                            vezi
                            cat de mandru esti in tot cea ce faci.Oare ce te poti mandri daca intr-o secunda Dumnezeu
                            poate sa iti
                            ia tot? Oare nu ai primit de la Dumnezeu fiecare lucru? Oare nu era sa te sinucizi si
                            Dumnezeu te-a salvat?
                            Pe astea le uiti dar cand cineva vorbeste despre masini sau despre case ti se pare
                            pacat.</MyText>
                        Cu toate aceste rele pe care le faci si continui sa le faci Dumnezeu nu te trimite in iad.
                        Si inca mai mult de atat, iti da o sansa in fiecare zi sa te indrepti, sa ai timp de rugaciune.
                        Doamne, ai mila de mine ca pacatos sunt. Miluieste-ma asa cum Poti.
                    </MyText>
                </View>
            </View>
            <Separator/>
            <Header text="Relatie cu Dumnezeu"/>
            <View>
                <MyText>Nu uita niciodata de acest lucru esential. <MyText style={{fontWeight: "bold"}}> R</MyText>elatie
                    cu
                    <MyText style={{fontWeight: "bold"}}> R</MyText> mare spunea parintele Sofronie. Totul se face cu
                    gandul
                    la Dumnezeu.
                    Ca te rogi cu rugaciunea mintii, ca mananci, ca codezi, ca te gandesti, ca ai pacatuit, ca esti cu
                    altii si nu
                    te poti ruga bine. Este in relatie cu Dumnezeu. Asa cum ai fost in relatie cu Alexandra, asa esti in
                    relatie cu Dumnezeu.
                    Dumnezeu nu vrea sa vada formalism. Nu faci rugaciunile seara si dimienata doar sa le faci. <MyText
                        style={{fontWeight: "bold"}}>De ce? De ce postesti? De ce mergi la biserica? De ce te
                        rogi? </MyText>
                    Relatia cu Dumnezeu se intretine. Este ceva de lunga durata.
                </MyText>
                <MyText>Cand simti ca nu mai ai putere in rugaciune opreste-te:
                    <CuvantScurt
                        MyText={"De ce te rogi? Cui Te rogi? De ce Te rogi? Te rogi tu oare lui Iisus preadulce? Te rogi Celui care a Facut Cerul si Pamantul?" +
                            "Te rogi celui care Te-a facut pe tine? Cel mai probabil raspunsul va fi nu la aceste intrebari"}/>
                </MyText>
            </View>
            <Separator/>
            <Header text="Minuni intamplate"/>
            <View>
                <MyText>1.Camera din Delft de pe Leeghwaterstraat era extraordinara si m-am bucurat tare mult de ea.
                    Mai ales cand cantam la pian. E o poza foarte frumoasa facuta de mami atunci. Imi amintesc de Max
                    care se plangea ca nu a gasit o camera asa buna.
                </MyText>
                <MyText>2.L-am intalnit pe Piotr care seamana extraordinar de mult cu mine. Acest om este cu siguranta
                    de
                    la Dumnezeu si este trimis special. Ii place matematica, cubul rubic, gatitul. Ma inteleg foarte
                    bine
                    cu el si este si el cu frica de Dumnezeu. Il judec foarte mult si din aceasta cauza am creat un zid
                    in fata
                    lui din pacate. Doamne te rog ajuta-ma sa scap de acest lucru.
                </MyText>
                <MyText>3.In primul semestru la facultate in anul 1 am luat
                    <MyText style={{fontWeight: "bold"}}> 10,10,10</MyText> pentru ca s-a rugat Luca pentru mine la
                    biserica.Acum
                    fiind in anul 2, am fost selectat ca TA. Ce frumos le aranjeaza Dumnezeu pe toate. Notele nu ar
                    trebui
                    sa reprezinte un scop. Impreuna cu Dumnezeu le-am obtinut, impreuna cu El ma voi si bucura.
                    Multumesc Doamne!
                </MyText>
                <MyText>4. In timpul examenului de teorie de la <MyText style={{fontWeight: "bold"}}>OOP</MyText> m-am
                    trezit
                    cu telefonul
                    pe masa uitat acolo. Dumnezeu m-a ajutat astfel incat sa nu fiu descalificat.
                </MyText>
                <MyText>
                    5. Mergeam cu Piotr la cursul de IDM dimineata in cladirea GeoScience si dintr-o data bicicleta a
                    inceput sa huruie.
                    Era clar ca era ceva cu ea. Cand s-a terminat cursul trebuia sa mergem la cladirea de Comptuer
                    Science.
                    Am spus <MyText style={{fontWeight: "bold"}}>Doamne, fa o minune cu bicicleta, stiu ca e stricata.
                    Repar-o</MyText>.
                    Am luat bicicleta si am inceput sa merg. Era reparata. Nu scotea niciun sunet. Mergea bine.
                    Cand iti pui increderea totala si fara indoiele in Dumnezeu acesta asculta mereu.
                </MyText>
                <MyText>
                    6. Voiam sa merg cu bicicleta la biserica la Schidam dar roata din spate de la bicicleta era
                    ciudata.
                    Tot ma apasa ceva pe scaun cand mergeam cu bicicleta. Am fost sa cumpar niste banane si alte lucruri
                    pentru biserica
                    sa le duc si tot facea asa bicicleta. M-am si oprit sa vad ce are dar nu mi-am dat seama. Era roata
                    din spate dezumflata.
                    Si am inceput sa merg spre Schidam, neincrezator. <MyText style={{fontStyle: "italic"}}>"Ce sa fac
                    daca bicicleta era stricata"</MyText>
                    Si am zis Doamne te rog vreau sa vin la Tine, ajuta-ma. Si am mers 15 km cu roata dezumflata pana la
                    biserica fara nicio problema.
                </MyText>
                <MyText>7. Am dat un euro unui sarac cu gandul sa il dau pentru Iisus Hristos si am primit 100 inapoi de
                    la Felix in ziua aceea.
                </MyText>
            </View>
            <Separator/>
            <Header text="Rugaciuni imbarbatare"/>
            <View>
                <MyText>1. <CuvantScurt
                    MyText="Slava tie Doamne, pentru tot.Pentru pacatele mele s-a intamplat asta."/>
                </MyText>
                <MyText>2. <CuvantScurt
                    MyText="Am parte de un necaz. Yes. Trebuie sa ma bucur de asta pentru ca L-am rugat pe Dumnezeu sa imi trimita"/></MyText>
                <MyText>3. <CuvantScurt
                    MyText="Dumnezeul tuturor a fost batut si batjocorit, sa ma bucur pentru asta cand si eu sufar"/></MyText>
                <MyText>4. <CuvantScurt
                    MyText={"Si suferinta asta va trace, dar cum te vei infatisa inainte lui Dumnezeu. Cum vei raspunde la judecata?" +
                        "Ce speranta ai? In cine iti pui nadejdea? In programare pre care pretinzi ca o stii?.  Doar Dumnezeu Te poate milui.Cere de la el iertare"}/></MyText>
                <MyText>5. <CuvantScurt
                    MyText={"Nu te increzi in Dumnezeu? Atunci slujesti diavolului. Dupa atatea minuni facute cu tine inca ai impresia ca o coincidenta." +
                        "Necredinta este o nebunie, duce la moarte si la iad.Toata nadejdea la Dumnezeu si la Maica Domnului.Doar diavolul iti trimite aceste ganduri.Roaga-te iarasi " +
                        "cu rugaciunea lui Iisus si pune acentul pe pacatos, ca doar asta esti."}/></MyText>
                <MyText>6. <CuvantScurt
                    MyText={"Doamne, Tu esti totul pentru Mine.Sunt trist si abatut dar Tu ma sprijini.Tu este Cel Puternic, Tu niciodata nu m-ai dezamagit. In tine im pun toata speranta.Imi inchin Tie viata." +
                        "Cu noi este Dumnezeu, intelegeti neamuri si va plecati.De ce imi va fi oare frica? De diavol? Dumnezeu a calcat moartea si pe diavol l-a surpat. Dumnezeu a biruit totul si eu voi face la fel cu El.Doamne slava tie"}/>
                </MyText>
                <MyText>7. <CuvantScurt
                    MyText={"Doamne, string catre Tine si vreau sa iti spun ca esti totul, totul pentru mine.Nu ma intereseaza ce gandesc altii eu vreau sa fiu cu Tine" +
                        ",vreau mereu sa simt Duhul Tau cel Sfant.Nu vreau sa pacatuiesc, vreau sa fac numai si numai Voia Ta.Doamne cat de mult poti iubi un pacatos. Dumnezeul meu," +
                        "Dumnezeul la toata lumea, te rog ramai cu mine.Ma bucur asa de mult cand esti cu mine si am atata energie si forta incat nu imi este frica de nimeni si nimic. " +
                        "Cu Tine, Doamne, iau la atac toata lumea si nu ma tem de nimic.Stiu ca Tu ma vei sprijini si ma vei ajuta sa vin spre Tine. Stii ca sunt neputinicios, Tu stii si faptul" +
                        " ca acum citesc aceste randuri pentru ca am trebuinta de imbarbatare. Tu stii totul, si ma iubesti cat nu imi pot imagina. Vreau sa am o relatie cu Tine."
                    }/></MyText>
            </View>
            <Separator/>
            <Header text="Citate foarte frumoase"/>

            <View>
                <MyText>1. <CuvantScurt
                    MyText="Ma intereseaza ce gandeste Dumnezeu, restul sunt detalii."/>
                </MyText>
                <MyText>2. <CuvantScurt
                    MyText="Dumnezeu S-a facut totul pentru tine, asa ca fa-te si tu totul pentru El."/></MyText>
                <MyText>3. <CuvantScurt
                    MyText="Intamplarea este pseudonimul lui Dumnezeu atunci cand nu vrea sa semneze"/></MyText>
                <MyText>4. <CuvantScurt
                    MyText="Oamenii trebuie cunoscuti pentru a fi iubiti. Dumnezeu trebuie iubit pentru a fi cunoscut"/></MyText>
                <MyText>5. <CuvantScurt
                    MyText="Dumnezeu ti-a daruit atatea secunde astazi.Ai folosit vreuna ca sa spui 'multumesc'?"/></MyText>
                <MyText>6. <CuvantScurt
                    MyText="Dumnezeu fara noi ramane tot Dumnezeu.Noi fara Dumnezeu sunt nimic."/></MyText>
            </View>
            <Separator/>
            <Header text="Un cuvant oarecare"/>
            <MyText>Doamne, stiu ca astazi am petrecut mult timp codand si nu m-am rugat neincetat asa cum as fi vrut.
                Nu am vrut sa te supar. Am fost captivat de lucrul la aceasta aplicatie si am incercat sa Te implic cat
                de mult
                am putut in acest lucru.Te rog sa nu Te superi pe mine pacatosul</MyText>
            <Separator/>
            <Header text="Cand pierd Harul"/>
            <Italic>Doamne, iti multumesc ca ma simt asa. Doar in starea asta pot sa vad cat de pacatos sunt. Inainte de
                a citi
                rugaciunea vreau sa ma incredintez cu toata inima si toata puterea mea ca Tu stii in ce stare ma aflu si
                asta este voia Ta.
                Daca asta este voia Ta, atunci ma bucur ca trec printr-un 'necaz' si ma incredintez cu totul Tie. Pentru
                pacatele mele cele multe
                simt asta. Mai bine sufar aici decat in iad :)</Italic>
            <Italic>Doamne, fara Harul tau nu pot sa fac nimic. Nu pot sa ma rog, nu pot sa ii iubesc pe ceilalti, nu
                pot sa Te iubesc pe Tine. Ii judec pe ceilalti, sunt manios, trist, nemultumit. Doamne iti multumesc
                pentru acest
                moment pe care il am pentru ca asa pot sa vad cat de pacatos, mic si neinsemnat sunt.
                Harul Tau si Sfantul Duh ma transforma intr-un alt om nou, duhovnicesc, dar nu sunt vrednic de acest
                lucru chiar daca Tu ingadui
                asta. Uitandu-ma la starea in care ma aflu acum si la ce simt imi dau seama ca nu am nicio virtute pe
                care pretind ca o am
                atunci cand Harul Tau este peste mine. Vazand toate astea, cu parere de rau si tristete iti marturisesc
                pacatosenia mea si toate
                pacatele mele le spun ca Tu sa ma miluiesti.
            </Italic>
            <Italic> - Am impresia ca fac lucruri bune si placute inaintea Ta. Sunt bolnav de <Bold>mandrie si slava
                desarta.</Bold>
            </Italic>
            <Italic> - Gandurile mele de multe ori se indreapta spre ce face celalalt si la <Bold>judecarea si
                osandirea</Bold> lui. Incalc porunca Ta Doamne. Sunt neputincios si
                fac acest lucru foarte des. Ajuta-ma!
            </Italic>
            <Italic> - Nu am <Bold>Incredere</Bold> in Tine statornica si atunci cand nu am Harul Tau simt ca m-ai
                parasit si
                ca Esti undeva departe.
            </Italic>
            <Italic> - Nu te <Bold>iubesc</Bold> Doamne si nu esti totul pentru mine. Mai degraba informatica sau
                programarea
                sunt mai importante decat a ma ruga si a vorbi cu Tine.
            </Italic>
            <Italic> - Sunt desfranat si pot sa cad in pacat oricand. Te rog Doamne, nu ma lasa!</Italic>
            <Italic> - Sunt un fariseu adevarat, vrednic de osanda si de chinurile iadului. Iisuse prea dulce, ai mila
                de mine!</Italic>
            <Italic> - Nu ma gandesc la moartea si la judecata de Apoi. Am impresia ca sunt 'pregatit' cu atatea pacate.
                Doamne ajuta-ma!</Italic>
            <Italic> - Nu imi este catusi de putin frica de Tine, Doamne. Fac atatea lucrurile rele cu buna stiinta si
                las atatea ganduri de desfranare sa intre
                in inima mea.<Bold>Pana cand ma vei rabda?</Bold>
            </Italic>
            <Italic> - Ma cred mai presus de ceilalti in conditiile in care am fost pe punctul de a ma sinucide si de
                ajunge imediat in iad, la munci vesnice.</Italic>
            <Bold>
                Fara Duhul Sfant nu fac nimic bun si demn de lauda. Ma simt gol pe dinauntru si fara putere.
                Doamne, vezi starea mea slaba, vezi cat de neputincios sunt cu trupul dar si cu sufletul.
                Te rog, asculta rugaciunea mea si ma miluieste.
            </Bold>
            <Separator/>
            <Header text="Rugaciune pentru Har"/>
            <Italic>
                Doamne, sunt prea necurat pentru a primi Harul Tau, dar nadajduiesc catre Tine ca nu ma vei trece cu
                vederea. Trimite Duhul Tau cel sfant peste mine ca sa nu ii mai smintesc pe ceilalti din jurul meu cu
                pacatele mele, ci sa ii pot iubi din toata inima si sa Te pot lauda si slavi, ca Tu esti Dumnezeul meu
                cel Iubit intru care eu imi incredintez viata.Amin.
            </Italic>
            {cuvinte.map((item, index) => {
                return <CuvantMare key={index} header={item.header} text={item.text}/>
            })}
            <Button title="Add new" onPress={addCuvant}/>
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
