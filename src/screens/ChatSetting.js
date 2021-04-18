import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';

const ChatSetting = (props) => {
    const [uids, setUids] = useState('')
    const [photo, setPhoto] = useState('')
    const [chats, setChats] = useState('')
    const [chatName, setChatName] = useState('')
    const [chatMembers, setChatMembers] = useState([])
    const [chatAdmin, setChatAdmin] = useState('')
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if(!user) return props.navigation.navigate('Login')
        })
        let user = firebase.auth()
        if(!user) return props.navigation.navigate('Login')

        let uid = user['_user']['uid']
        setUids(uid)
        getData()
    }, [])

    const getData = () => {
        firebase.firestore()
                .collection('chats')
                .doc(props.route.params.chatId)
                .onSnapshot(async doc => {
                    setChats({
                        id: doc.id,
                        ...doc.data()
                    })
                    setChatName(doc.data()['name'])

                    firebase.firestore()
                            .collection('users')
                            .doc(doc.data()['admin'])
                            .get()
                            .then(res => {
                                setChatAdmin({
                                    id: doc.data()['admin'],
                                    ...res['_data']
                                })
                            })

                    let memberIds = doc.data()['members']
                    firebase.firestore()
                            .collection('users')
                            .onSnapshot(requestSnapshot => {
                                let arrData = []
                                requestSnapshot.docs.forEach(user => {
                                    if(memberIds.includes(user.id)) {
                                        arrData.push({
                                            id: user.id,
                                            ...user.data()
                                        })
                                    }
                                });
                                setChatMembers(arrData)
                            })
                })
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{paddingHorizontal: 10, paddingBottom: 80}}>
                <View style={{height: 100, marginBottom: 30, marginTop: 50}}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        flex: 1
                    }}>
                        <Image
                            source={require('../assets/avatar.jpg')}
                            style={{
                                width: 100,
                                height: 100,
                                marginVertical: 15,
                                borderRadius: 50,
                            }}
                        />
                        <TouchableOpacity 
                            style={{marginLeft: -30, marginTop: 13}} 
                            onPress={() => {}}
                        >
                            <LinearGradient colors={['#f26a50', '#f20042', '#f20045']} style={{width: 30, height: 30,borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
                                <Icon style={{}} name="pencil-outline" size={18} color="#fff"/>
                            </LinearGradient>
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={styles.nomalField}>
                    <Text style={styles.title}> Tên đoạn chat:</Text>
                    <View style={styles.backgroundInput}>
                        <TextInput 
                            placeholder='Tên đoạn chat'
                            style={{
                                fontSize: 16,
                            }}
                            value={chatName}
                            onChangeText={setChatName}
                            editable={isEdit}
                        />
                    </View>
                </View>
                <View style={styles.nomalField}>
                    <Text style={styles.title}> Quản trị viên:</Text>
                    <TouchableOpacity 
                        onPress={() => {
                            props.navigation.navigate('Discussion');
                        }}
                        style={styles.containerRowUser}
                    >       
                            <Image source={require('../assets/avatar.jpg')} style={styles.imageRowUser}/>
                            <View style={styles.testRowUser}>
                                <Text style={styles.usernameRowUser}>{chatAdmin.name}</Text>
                                <LinearGradient
                                    colors={['#09c6f9', '#045de9', '#045de9']}
                                    style={styles.onlineRowUser}
                                >
                                </LinearGradient>
                            </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.nomalField}>
                    <Text style={styles.title}> Thành viên:</Text>
                    {
                        chatMembers.map(user => (
                            <TouchableOpacity 
                                onPress={() => {
                                    if(uids !== user.id)
                                    props.navigation.navigate('Profile', {
                                        type: 'account',
                                        userId: user.id 
                                    });
                                }}
                                style={styles.containerRowUser}
                                key={user.id}
                            >       
                                    <Image source={require('../assets/avatar.jpg')} style={styles.imageRowUser}/>
                                    <View style={styles.testRowUser}>
                                        <Text style={styles.usernameRowUser}>{user.name}</Text>
                                        <LinearGradient
                                            colors={['#09c6f9', '#045de9', '#045de9']}
                                            style={styles.onlineRowUser}
                                        >
                                        </LinearGradient>
                                    </View>
                            </TouchableOpacity>
                        ))
                    }
                </View>

                <TouchableOpacity 
                    style={[styles.button, {marginLeft: '15%'}]} 
                    onPress={() => {
                        setIsEdit(false)
                    }}
                >
                    <LinearGradient colors={['#f26a50', '#f20042', '#f20045']} style={styles.gradient}>
                        <Text style={styles.text}>
                            Rời khỏi đoạn chat
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}
export default ChatSetting


const styles = StyleSheet.create({
    gradient:{
        height:'100%',
        position:"absolute",
        left:0,
        right:0,
        top:0,
        paddingHorizontal:20,
        paddingTop:30
    },
    nomalField: {
        marginVertical: 10,
        marginLeft: 7,
        marginTop: 20
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
        color: 'black'
    },
    backgroundInput: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingLeft: 10,
        backgroundColor: '#fff'
    },
    gradient:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 40
    },
    button: {
        width: '70%',
        marginLeft:'15%',
        marginTop: 40,
        height: 50,
    },
    button1: {
        width: '35%',
        marginTop: 40,
        height: 50,
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
    containerRowUser:{
        flexDirection:'row',
        paddingHorizontal:20,
        alignItems:'center',
        marginTop:30
    },
    imageRowUser:{
        width:50,
        height:50,
        borderRadius:25,
        marginRight: 10,
        marginLeft: -15
    },
    usernameRowUser:{
        color:'#000119',
        fontFamily:'Montserrat_700Bold',
        fontSize: 20,
        width: '80%'
    },
    testRowUser: {
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        paddingBottom: 20,
        paddingLeft: 10,
        width: '90%',
        flexDirection:'row',
    },
    onlineRowUser:{
       height:16,
       width:16,
       borderRadius:8,
       alignItems:'center',
       justifyContent:'center',
       marginRight: -5
    },
})