import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import {View, Text, Image, StyleSheet} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {dataMessageConst} from '../api/data';

import Header from '../components/Discussion/Header';
import ChatPanel from '../components/Discussion/ChatPanel';
import Input from '../components/Discussion/InputChat';

const Discussion = ({ route, navigation }) =>  {
    const { itemName , itemPic } = route.params;
    const [inputMessage, setMessage] = useState('');

    const sendMessage = () => {
        console.log(inputMessage)
    };

    return(
        <View style={styles.container}>
            <View style={styles.main}>
                <Header
                    itemPic={itemPic}
                    itemName={itemName}
                    onPressBack={() => {
                        navigation.goBack()
                    }}
                    navigation={navigation}
                />
                <ChatPanel
                    itemPic={itemPic}
                    dataMessage={dataMessageConst}
                />
            </View>
            <Input
                inputMessage={inputMessage}
                setMessage={(inputMessage) => setMessage(inputMessage)}
                onSendPress={sendMessage}
            />
        </View>
    )
}

export default Discussion;


const styles = StyleSheet.create({
    container:{
        position:'absolute',
        left:0,
        right:0,
        top:0,
        height:"100%",
        backgroundColor:'#FFF',
    },
    main:{
        backgroundColor:'#FFF',
        height:'88%',
        paddingHorizontal:20,
        borderBottomLeftRadius:35,
        borderBottomRightRadius:35,
        paddingTop:40
    },
    headerContainer:{
        flexDirection:'row',
        alignItems:'center',
    },
    username:{
        color:"#000119",
        fontFamily:'Montserrat_700Bold',
        fontSize:20,
        flex:1,
        textAlign:'center'
    },
    avatar:{
        width:40,
        height:40,
        borderRadius:20,
    }

})