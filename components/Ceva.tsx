import {ScrollView, StyleSheet, Text, View} from "react-native";

function Header(props) {
    return <Text style={{fontWeight: "bold", fontSize: 19}}>{props.text}</Text>
}

function Separator() {
    return <View style={styles.separator}/>
}

function CuvantScurt(props) {
    return (<Text style={{fontStyle: 'italic'}}>"{props.text}"</Text>)
}

function NumberedList(props) {
    return (
        props.elements.map(
            (el, i) => {
                <Text>{i + 1}. {el}</Text>
            }
        )
    )
}

export default function Dumnezeu() {
    return (
        <ScrollView style={{paddingLeft: 5, paddingRight: 5}}>
            <View style={styles.rugaciunea}>
                <Text style={{fontSize: 16}}><Text style={{fontWeight: "bold"}}>Doamne, </Text>Iisuse Hristoase, Fiul
                    lui Dumnezeu, miluieste-ma pe mine pacatosul.</Text>
                <Text style={{textAlignVertical: "center", marginTop: 10, opacity: 0.7}}>Spune mereu, cu frica si cu
                    dragoste</Text>
            </View>
            <View style={{flexDirection: "row", flex: 1,}}>
                <View style={styles.explicatie}>
                    <Text style={{fontWeight: "bold"}}>Incredere</Text>
                    <Text>Am incredere in Tine Domane. Orice s-ar intampla Tu stii totul deci este bine pentru mine.
                        Nu ma voi teme de nimic si orice necaz si suferinta as avea Iti multumesc Tie.Acest dar al
                        increderii ma face sa nu imi mai fie frica de moarte si sa fiu gata in orice secunda pentru ea.
                        Si daca se prabuseste avionul si ajung in mare si daca facem accident de masina si daca nu
                        am unde sa stau,si daca cineva imi spune un cuvant urat, toate le primesc cu drag ca de la Tine,
                        Dumnezeul meu.
                        Doamne, in Tine imi pun toata nadejdea si speranta pe care o am si stiu ca nu ma vei rusina.
                        Dovada sunt toate minunile pe care le-ai facut cu Mine, si recunosc ca sunt cu adevarat
                        nevrednic
                        de ele.
                    </Text>
                </View>

                <View style={styles.explicatie}>
                    <Text style={{fontWeight: "bold"}}>Smerenie</Text>
                    <Text>Fii atent la cuvantul <Text style={{fontStyle: "italic"}}>"pacatos" </Text> pe care il spui.
                        Gandeste-te de
                        cate ori ai judecat pe ceilalti si de cate ori te-ai simtit foarte departe de Dumnezeu.
                        Aminteste-ti de noaptea
                        in care nu puteai sa dormi pentru ca simteai ca ai demon in tine. Aminteste-ti ca ai citit de
                        doua ori despre
                        slava desarta si despre faptul ca te mandresti ca faci fapte ale credintei in exterior si judeci
                        pe ceilalti.
                        <Text style={{fontWeight: "bold"}}>Nebunule!, pentru ce vezi paiul din ochiul ceiluilalt si nu
                            vezi
                            cat de mandru esti in tot cea ce faci.Oare ce te poti mandri daca intr-o secunda Dumnezeu
                            poate sa iti
                            ia tot? Oare nu ai primit de la Dumnezeu fiecare lucru? Oare nu era sa te sinucizi si
                            Dumnezeu te-a salvat?
                            Pe astea le uiti dar cand cineva vorbeste despre masini sau despre case ti se pare
                            pacat.</Text>
                        Cu toate aceste rele pe care le faci si continui sa le faci Dumnezeu nu te trimite in iad.
                        Si inca mai mult de atat, iti da o sansa in fiecare zi sa te indrepti, sa ai timp de rugaciune.
                        Doamne, ai mila de mine ca pacatos sunt. Miluieste-ma asa cum Poti.
                    </Text>
                </View>
            </View>
            <Separator/>
            <Header text="Relatie cu Dumnezeu"/>
            <View>
                <Text>Nu uita niciodata de acest lucru esential. <Text style={{fontWeight: "bold"}}> R</Text>elatie cu
                    <Text style={{fontWeight: "bold"}}> R</Text> mare spunea parintele Sofronie. Totul se face cu gandul
                    la Dumnezeu.
                    Ca te rogi cu rugaciunea mintii, ca mananci, ca codezi, ca te gandesti, ca ai pacatuit, ca esti cu
                    altii si nu
                    te poti ruga bine. Este in relatie cu Dumnezeu. Asa cum ai fost in relatie cu Alexandra, asa esti in
                    relatie cu Dumnezeu.
                    Dumnezeu nu vrea sa vada formalism. Nu faci rugaciunile seara si dimienata doar sa le faci. <Text
                        style={{fontWeight: "bold"}}>De ce? De ce postesti? De ce mergi la biserica? De ce te
                        rogi? </Text>
                    Relatia cu Dumnezeu se intretine. Este ceva de lunga durata.
                </Text>
                <Text>Cand simti ca nu mai ai putere in rugaciune opreste-te:
                    <CuvantScurt
                        text={"De ce te rogi? Cui Te rogi? De ce Te rogi? Te rogi tu oare lui Iisus preadulce? Te rogi Celui care a Facut Cerul si Pamantul?" +
                            "Te rogi celui care Te-a facut pe tine? Cel mai probabil raspunsul va fi nu la aceste intrebari"}/>
                </Text>
            </View>
            <Separator/>
            <Header text="Minuni intamplate"/>
            <View>
                <Text>1.Camera din Delft de pe Leeghwaterstraat era extraordinara si m-am bucurat tare mult de ea.
                    Mai ales cand cantam la pian. E o poza foarte frumoasa facuta de mami atunci. Imi amintesc de Max
                    care se plangea ca nu a gasit o camera asa buna.
                </Text>
                <Text>2.L-am intalnit pe Piotr care seamana extraordinar de mult cu mine. Acest om este cu siguranta de
                    la Dumnezeu si este trimis special. Ii place matematica, cubul rubic, gatitul. Ma inteleg foarte
                    bine
                    cu el si este si el cu frica de Dumnezeu. Il judec foarte mult si din aceasta cauza am creat un zid
                    in fata
                    lui din pacate. Doamne te rog ajuta-ma sa scap de acest lucru.
                </Text>
                <Text>3.In primul semestru la facultate in anul 1 am luat
                    <Text style={{fontWeight: "bold"}}> 10,10,10</Text> pentru ca s-a rugat Luca pentru mine la
                    biserica.Acum
                    fiind in anul 2, am fost selectat ca TA. Ce frumos le aranjeaza Dumnezeu pe toate. Notele nu ar
                    trebui
                    sa reprezinte un scop. Impreuna cu Dumnezeu le-am obtinut, impreuna cu El ma voi si bucura.
                    Multumesc Doamne!
                </Text>
                <Text>4. In timpul examenului de teorie de la <Text style={{fontWeight: "bold"}}>OOP</Text> m-am trezit
                    cu telefonul
                    pe masa uitat acolo. Dumnezeu m-a ajutat astfel incat sa nu fiu descalificat.
                </Text>
                <Text>
                    5. Mergeam cu Piotr la cursul de IDM dimineata in cladirea GeoScience si dintr-o data bicicleta a
                    inceput sa huruie.
                    Era clar ca era ceva cu ea. Cand s-a terminat cursul trebuia sa mergem la cladirea de Comptuer
                    Science.
                    Am spus <Text style={{fontWeight: "bold"}}>Doamne, fa o minune cu bicicleta, stiu ca e stricata.
                    Repar-o</Text>.
                    Am luat bicicleta si am inceput sa merg. Era reparata. Nu scotea niciun sunet. Mergea bine.
                    Cand iti pui increderea totala si fara indoiele in Dumnezeu acesta asculta mereu.
                </Text>
                <Text>
                    6. Voiam sa merg cu bicicleta la biserica la Schidam dar roata din spate de la bicicleta era
                    ciudata.
                    Tot ma apasa ceva pe scaun cand mergeam cu bicicleta. Am fost sa cumpar niste banane si alte lucruri
                    pentru biserica
                    sa le duc si tot facea asa bicicleta. M-am si oprit sa vad ce are dar nu mi-am dat seama. Era roata
                    din spate dezumflata.
                    Si am inceput sa merg spre Schidam, neincrezator. <Text style={{fontStyle: "italic"}}>"Ce sa fac
                    daca bicicleta era stricata"</Text>
                    Si am zis Doamne te rog vreau sa vin la Tine, ajuta-ma. Si am mers 15 km cu roata dezumflata pana la
                    biserica fara nicio problema.
                </Text>
                <Text>7. Am dat un euro unui sarac cu gandul sa il dau pentru Iisus Hristos si am primit 100 inapoi de
                    la Felix in ziua aceea.
                </Text>
            </View>
            <Separator/>
            <Header text="Rugaciuni imbarbatare"/>
            <View>
                <Text>1. <CuvantScurt
                    text="Slava tie Doamne, pentru tot.Pentru pacatele mele s-a intamplat asta."/>
                </Text>
                <Text>2. <CuvantScurt
                    text="Am parte de un necaz. Yes. Trebuie sa ma bucur de asta pentru ca L-am rugat pe Dumnezeu sa imi trimita"/></Text>
                <Text>3. <CuvantScurt
                    text="Dumnezeul tuturor a fost batut si batjocorit, sa ma bucur pentru asta cand si eu sufar"/></Text>
                <Text>4. <CuvantScurt
                    text={"Si suferinta asta va trace, dar cum te vei infatisa inainte lui Dumnezeu. Cum vei raspunde la judecata?" +
                        "Ce speranta ai? In cine iti pui nadejdea? In programare pre care pretinzi ca o stii?.  Doar Dumnezeu Te poate milui.Cere de la el iertare"}/></Text>
                <Text>5. <CuvantScurt
                    text={"Nu te increzi in Dumnezeu? Atunci slujesti diavolului. Dupa atatea minuni facute cu tine inca ai impresia ca o coincidenta." +
                        "Necredinta este o nebunie, duce la moarte si la iad.Toata nadejdea la Dumnezeu si la Maica Domnului.Doar diavolul iti trimite aceste ganduri.Roaga-te iarasi " +
                        "cu rugaciunea lui Iisus si pune acentul pe pacatos, ca doar asta esti."}/></Text>
                <Text>6. <CuvantScurt
                    text={"Doamne, Tu esti totul pentru Mine.Sunt trist si abatut dar Tu ma sprijini.Tu este Cel Puternic, Tu niciodata nu m-ai dezamagit. In tine im pun toata speranta.Imi inchin Tie viata." +
                        "Cu noi este Dumnezeu, intelegeti neamuri si va plecati.De ce imi va fi oare frica? De diavol? Dumnezeu a calcat moartea si pe diavol l-a surpat. Dumnezeu a biruit totul si eu voi face la fel cu El.Doamne slava tie"}/>
                </Text>
                <Text>7. <CuvantScurt
                    text={"Doamne, string catre Tine si vreau sa iti spun ca esti totul, totul pentru mine.Nu ma intereseaza ce gandesc altii eu vreau sa fiu cu Tine" +
                        ",vreau mereu sa simt Duhul Tau cel Sfant.Nu vreau sa pacatuiesc, vreau sa fac numai si numai Voia Ta.Doamne cat de mult poti iubi un pacatos. Dumnezeul meu," +
                        "Dumnezeul la toata lumea, te rog ramai cu mine.Ma bucur asa de mult cand esti cu mine si am atata energie si forta incat nu imi este frica de nimeni si nimic. " +
                        "Cu Tine, Doamne, iau la atac toata lumea si nu ma tem de nimic.Stiu ca Tu ma vei sprijini si ma vei ajuta sa vin spre Tine. Stii ca sunt neputinicios, Tu stii si faptul" +
                        " ca acum citesc aceste randuri pentru ca am trebuinta de imbarbatare. Tu stii totul, si ma iubesti cat nu imi pot imagina. Vreau sa am o relatie cu Tine."
                    }/></Text>
            </View>
            <Separator/>
            <Header text="Citate foarte frumoase"/>

            <View>
                <Text>1. <CuvantScurt
                    text="Ma intereseaza ce gandeste Dumnezeu, restul sunt detalii."/>
                </Text>
                <Text>2. <CuvantScurt
                    text="Dumnezeu S-a facut totul pentru tine, asa ca fa-te si tu totul pentru El."/></Text>
                <Text>3. <CuvantScurt
                    text="Intamplarea este pseudonimul lui Dumnezeu atunci cand nu vrea sa semneze"/></Text>
                <Text>4. <CuvantScurt
                    text="Oamenii trebuie cunoscuti pentru a fi iubiti. Dumnezeu trebuie iubit pentru a fi cunoscut"/></Text>
                <Text>5. <CuvantScurt
                    text="Dumnezeu ti-a daruit atatea secunde astazi.Ai folosit vreuna ca sa spui 'multumesc'?"/></Text>
                <Text>6. <CuvantScurt
                    text="Dumnezeu fara noi ramane tot Dumnezeu.Noi fara Dumnezeu sunt nimic."/></Text>
            </View>
            <Separator/>
            <Header text="Un cuvant oarecare"/>
            <Text>Doamne, stiu ca astazi am petrecut mult timp codand si nu m-am rugat neincetat asa cum as fi vrut.
                Nu am vrut sa te supar. Am fost captivat de lucrul la aceasta aplicatie si am incercat sa Te implic cat
                de mult
                am putut in acest lucru.Te rog sa nu Te superi pe mine pacatosul</Text>
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
