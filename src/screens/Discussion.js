import React, {useEffect, useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import {View, Text, Image, StyleSheet} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {dataMessageConst} from '../api/data';
import firebase from 'react-native-firebase';

import Header from '../components/Discussion/Header';
import ChatPanel from '../components/Discussion/ChatPanel';
import Input from '../components/Discussion/InputChat';

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
}

const Discussion = ({ route, navigation }) =>  {
    const [uid, setUid] =  useState('')
    const [inputMessage, setInputMessage] = useState('abc')
    const [chats, setChats] = useState({})
    const [listMessage, setListMessage] = useState([])
    const [chatName, setChatName] = useState('')
    const [chatPhoto, setChatPhoto] = useState('')
    const preState = usePrevious({chats})

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if(!user) return navigation.navigate('Login')
            await setUid(user['uid'])
            await getChats()
            if(JSON.stringify(preState.chats) !== JSON.stringify(chats)) {
                await getMessage()
            }
        })
        setChatName(route.params.chatName)
        setChatPhoto(route.params.chatPhoto)
    }, [uid, chats])

    const getMessage = () => {
        if(!chats) return
        firebase.firestore()
                .collection('messages')
                .where('chat_id', '=', chats['id'])
                .onSnapshot(querySnapshot => {
                    setListMessage( querySnapshot.docs.map(doc => {
                        const data = doc.data()
                        return {
                            id: doc.id,
                            ...data
                        }
                    }).sort((a, b) =>
                        a['create'] > b['create'] ? 1 : -1
                    ))
                })
    }

    const sendMessage = () => {
        //check have chat exis:
        // TH chat vs tk
        if(Object.keys(chats).length === 0) {
            const newChat = {
                members: [uid, route.params.userId],
                admin: uid,
                name: '',
                photo: ''
            }
            firebase.firestore()
                    .collection('chats')
                    .add(newChat)
                    .then(async(res) => {
                        const newMessage = {
                           message: inputMessage,
                           auth: uid,
                           chat_id: res.id,
                           create: Date.now(),
                           status: 'unread'
                        }
                        firebase.firestore()
                                .collection('messages')
                                .add(newMessage)
                    })
        } else {
            const newMessage = {
                message: inputMessage,
                auth: uid,
                chat_id: chats.id,
                create: Date.now(),
                status: 'unread'
            }
            firebase.firestore()
                    .collection('messages')
                    .add(newMessage)
        }
    };

    const getChats = () => {
        // if type = user
        if(route.params.type === 'user')
            firebase.firestore()
                    .collection('chats')
                    .onSnapshot(querySnapshot => {
                        querySnapshot.docs.forEach(doc => {
                            if(doc.data()['members'].length == 2 && doc.data()['members'].includes(route.params.userId) && doc.data()['members'].includes(uid)) {
                                setChats({
                                    id: doc.id,
                                    ...doc.data()
                                })
                                return
                            }
                        })
                    })
    }

    return(
        <View style={styles.container}>
            <View style={styles.main}>
                <Header
                    itemPic={chatPhoto}
                    itemName={chatName}
                    onPressBack={() => {
                        navigation.goBack()
                    }}
                    navigation={navigation}
                />
                <ChatPanel
                    itemPic={chatPhoto}
                    dataMessage={listMessage}
                    uid={uid}
                />
            </View>
            <Input
                inputMessage={inputMessage}
                setMessage={(inputMessage) => setInputMessage(inputMessage)}
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