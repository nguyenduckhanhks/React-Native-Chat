import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Animated, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import firebase from 'react-native-firebase';

import {users} from '../api/data';
import UserOnline from '../components/Chat/UserOnline';
import ListChat from '../components/Chat/ListChat';

const Chat = (props) => {
    const [uid, setUid] = useState('')
    const [loading, setLoading] = useState(true)
    const [userOnline, setUserOnline] = useState([])
    const [chats, setChats] = useState({})

    const userOnlAnimate = useRef(new Animated.ValueXY()).current;
    const listChatAnimate = useRef(new Animated.ValueXY()).current;

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if(!user) return navigation.navigate('Login')

            setUid(user['uid'])
            getUserOnline()
            getChats()
            setLoading(false)  
        })

        Animated.timing(userOnlAnimate, {
            toValue:{x:-400,y:0},
            delay:1000,
            useNativeDriver:false
        }).start();

        Animated.timing(listChatAnimate, {
            toValue:{x:0,y:-300},
            delay:2000,
            useNativeDriver:false
        }).start();
    }, [uid])

    const getUserOnline = () => {
        firebase.firestore()
                .collection('users')
                .where('status', '=' , 'online')
                .onSnapshot(querySnapshot => {
                    const usersData = querySnapshot.docs.map(doc => {
                        const data = doc.data()
                        return {
                            uid: doc.id,
                            ...data
                        }
                    })
                    setUserOnline(usersData)
                })
    }

    const getChats = () => {
        firebase.firestore()
                .collection('chats')
                .where('members', 'array-contains', uid)
                .onSnapshot(async querySnapshot => {
                    const chats = {}
                    querySnapshot.docs.forEach(async doc => {
                        const data = doc.data()
                        chats[doc.id] = {
                            id: doc.id,
                            ...data
                        }
                    })
                    setChats(chats)
                    querySnapshot.docs.map(doc => {
                        getMessage(doc.id)
                        if(doc.data()['name'] === '') {
                            getNameMessage(doc.id, doc.data()['members'])
                        }
                    })
                }) 
    }

    const getMessage = async(id) => {
        return firebase.firestore()
                .collection('messages')
                .where('chat_id', '=', id)
                .onSnapshot(async querySnapshot => {
                    let count = 0
                    const messageData =  await Promise.all(querySnapshot.docs.map(doc => {
                        const data = doc.data()
                        if(doc.data()['status'] == 'unread') count++
                        return {
                            id: doc.id,
                            ...data
                        }
                    }).sort((a, b) =>
                        a['create'] > b['create'] ? 1 : -1
                    ))
                    let newChat = {}
                    Object.assign(newChat, chats)
                    newChat[id]['count'] = count
                    newChat[id]['lastMessage'] = messageData[messageData.length - 1] ? messageData[messageData.length - 1]['message'] : ''
                    newChat[id]['lastTime'] = messageData[messageData.length - 1] ? messageData[messageData.length - 1]['create'] : ''
                    setChats(newChat)
                    // console.log(newChat)
                })
    }

    const getNameMessage = (id, members) => {
        members.forEach(userid => {
            if(userid != uid) {
                firebase.firestore()
                    .collection('users')
                    .doc(userid)
                    .get()
                    .then(res => {
                        let newChat = {}
                        Object.assign(newChat, chats)
                        let newName = newChat['name']
                        if(!newName) newName = res['_data']['name']
                        else newName = newName + ', ' + res['_data']['name']
                        newChat[id]['name'] = newName
                        setChats(newChat)
                    })
            }
        })
    }

    return (
        <LinearGradient
            style={styles.gradient}
            colors={['#f26a50', '#f20042', '#f20045']}
        >
            <View style={styles.headerContainer}>
                <TouchableOpacity  onPress={() => {props.navigation.navigate('Profile', {type: 'myProfile'})}}>
                    <Image source={require('../assets/avatar.jpg')} style={styles.image}/>
                </TouchableOpacity>
                <Text style={styles.header}>Chat</Text>
                <Ionicons name='add' color='#fff' size={30} onPress={() => {
                    props.navigation.navigate('CreateChat')
                }}/>
            </View>
            <ScrollView
                horizontal
                style={styles.proContainer}
                showsHorizontalScrollIndicator={false}
            >
                {loading ? 
                    (
                        <ActivityIndicator size='small' color='#FFF'/>
                    ):(
                        <Animated.View style={[userOnlAnimate.getLayout(),styles.card]}>
                            {
                                userOnline.map((item, index) => (
                                    <UserOnline
                                        key={item.uid}
                                        username={item.name}
                                        uri={item.avatar_url}
                                    />
                                ))
                            }
                        </Animated.View>
                    )
                }
            </ScrollView>
            <View style={styles.ops}>
                <View style={styles.col}>
                    <Text style={styles.day}>Sunday</Text>
                    <Entypo name='dots-three-horizontal' color='#000119' size={30}/>
                </View>
                <ScrollView>
                    {
                        loading || Object.keys(chats).length == 0 ? (<ActivityIndicator size='large' color='#f20042'/>):
                        (
                            <Animated.View style={[listChatAnimate.getLayout(), styles.list]}>
                                {
                                    Object.keys(chats).map((key) => (
                                        <ListChat
                                            key={key}
                                            chatName={chats[key]['name']}
                                            uri={''}
                                            count={chats[key]['count'] ? chats[key]['count'] : 0}
                                            lastMessage={chats[key]['lastMessage'] ? chats[key]['lastMessage'] : ''}
                                            lastTime={chats[key]['lastTime'] ? chats[key]['lastTime'] : ''}
                                            onPress={()=>{
                                                props.navigation.navigate('Discussion');
                                            }}
                                        />
                                    ))
                                }
                            </Animated.View>
                        )
                    }
                </ScrollView>
            </View>

        </LinearGradient>
    )
}

export default Chat


const styles = StyleSheet.create({
    list:{
        marginTop:300,
    },
    card:{
        marginLeft:400,
        width:400,
        flexDirection:'row'
    },
    gradient:{
        height:'100%',
        position:"absolute",
        left:0,
        right:0,
        top:0,
        paddingHorizontal:20,
        paddingTop:30
    },
    headerContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    header:{
        fontFamily:'Montserrat_800ExtraBold',
        color:'#FFF',
        flex:1,
        fontSize:24
    },
    proContainer:{
        marginRight:-20,
        alignSelf:'center'
    },
    ops:{
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        height:500,
        backgroundColor:'#FFF',
        marginHorizontal:-20
    },
    col:{
        flexDirection:'row',
        marginTop:25,
        marginHorizontal:20,
        alignItems:'center'
    },
    day:{
        fontFamily:'Montserrat_800ExtraBold',
        color:'#000119',
        flex:1,
        fontSize:20
    },
    image:{
        width:30,
        height:30,
        borderRadius:15,
        marginRight: 10
    }
})