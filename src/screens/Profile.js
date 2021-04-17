import React, {useEffect, useState} from 'react';
import { TextInput } from 'react-native';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from '../components/DatePicker/DatePicker';
import { RadioButton } from 'react-native-paper';
import firebase from 'react-native-firebase';

const Profile = (props) => {
    const [uids, setUids] = useState('')
    const [birthday, setBirthday] = useState('2021/12/11')
    const [gender, setGender] = useState('male')
    const [email, setEmail] = useState('admin@gmail.com')
    const [tel, setTel] = useState('0963526978')
    const [name, setName] = useState('Nguyễn Đức Khánh')
    const [address, setAddress] = useState('')
    const [isEdit, setIsEdit] = useState(false)

    const [type, setType] = useState('')

    useEffect(async () => {
        getData()
    }, [])

    const getData = async () => {
        firebase.auth().onAuthStateChanged(user => {
            if(!user) return props.navigation.navigate('Login')
        })
        if(props.route && props.route.params && props.route.params.type == 'myProfile') {
            let user = firebase.auth()
            if(!user) return props.navigation.navigate('Login')

            let uid = user['_user']['uid']
            setUids(uid)
            let userData = await firebase.firestore()
                    .collection('users')
                    .doc(uid)
                    .get()
            if(!userData['_data']) {
                Alert.alert('Không tìm thấy thông tin người dùng!')
                return props.navigation.navigate('Login')
            }
            setBirthday(userData['_data']['birthday'])
            setName(userData['_data']['name'])
            setGender(userData['_data']['gender'])
            setTel(userData['_data']['tel'])
            setEmail(user['_user']['email'])
            setType(props.route.params.type)
        }

        if(props.route && props.route.params && props.route.params.type == 'account') {
            let user = firebase.auth()
            if(!user) return props.navigation.navigate('Login')

            let uid = user['_user']['uid']
            setUids(uid)
            let userData = await firebase.firestore()
                    .collection('users')
                    .doc(uid)
                    .get()
            if(!userData['_data']) {
                Alert.alert('Không tìm thấy thông tin người dùng!')
                return props.navigation.navigate('Login')
            }
            setBirthday(userData['_data']['birthday'])
            setName(userData['_data']['name'])
            setGender(userData['_data']['gender'])
            setTel(userData['_data']['tel'])
            setEmail(user['_user']['email'])
            setType(props.route.params.type)
        }
    }

    const onUpdateMyProfile = () => {
        if(!uids) return Alert.alert('Không tìm thấy thông tin người dùng!')

        let dataSend = {}
        if(address) dataSend['address'] = address
        if(gender) dataSend['gender'] = gender
        if(tel) dataSend['tel'] = tel
        if(dataSend) {
            firebase.firestore()
                    .collection('users')
                    .doc(uids)
                    .update(dataSend)
                    .then(() => {
                        getData()
                        setIsEdit(false)
                    })
        }
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
                        {
                            props.route.params.type === 'myProfile' && 
                            <TouchableOpacity 
                                style={{marginLeft: -30, marginTop: 13}} 
                                onPress={() => {}}
                            >
                                <LinearGradient colors={['#f26a50', '#f20042', '#f20045']} style={{width: 30, height: 30,borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
                                    <Icon style={{}} name="pencil-outline" size={18} color="#fff"/>
                                </LinearGradient>
                            </TouchableOpacity>
                        }

                        {
                            props.route.params.type !== 'myProfile' && 
                            <TouchableOpacity 
                                style={{marginLeft: -60, marginTop: 95}} 
                                onPress={() => {}}
                            >
                                <LinearGradient colors={['#f26a50', '#f20042', '#f20045']} style={{width: 30, height: 30,borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
                                    <Icon style={{}} name="add-outline" size={18} color="#fff"/>
                                    {/* <Icon style={{}} name="checkmark-outline" size={18} color="#fff"/> */}
                                </LinearGradient>
                            </TouchableOpacity>
                        }

                    </View>
                </View>

                <Text style={{
                    fontSize: 35,
                    textAlign: 'center'
                }}>{name}</Text>

                <View>
                    <DatePicker model={birthday} setDate={setBirthday} label='Ngày sinh:' disabled={!isEdit}/>
                </View>

                <View style={styles.nomalField}>
                    <Text style={styles.title}> Giới tính:</Text>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 10,
                        paddingLeft: 10,
                        backgroundColor: '#fff'
                    }}>
                        <RadioButton 
                            value="male"
                            status={ gender === 'male' ? 'checked' : 'unchecked'}
                            onPress={() => setGender('male')}
                            color="#f20045"
                            disabled={!isEdit}
                        /><Text style={{marginRight: 30}}>Nam</Text>
                        <RadioButton 
                            value="female"
                            status={ gender === 'female' ? 'checked' : 'unchecked'}
                            onPress={() => setGender('female')}
                            color="#f20045"
                            disabled={!isEdit}
                        /><Text>Nữ</Text>
                    </View>
                </View>

                <View style={styles.nomalField}>
                    <Text style={styles.title}> Số điện thoại:</Text>
                    <View style={styles.backgroundInput}>
                        <TextInput 
                            placeholder='Số điện thoại'
                            style={{
                                fontSize: 16,
                            }}
                            value={tel}
                            onChangeText={setTel}
                            editable={isEdit}
                        />
                    </View>
                </View>

                <View style={styles.nomalField}>
                    <Text style={styles.title}> Email:</Text>
                    <View style={styles.backgroundInput}>
                        <TextInput 
                            placeholder='Email'
                            style={{
                                fontSize: 16,
                            }}
                            value={email}
                            onChangeText={setEmail}
                            editable={false}
                        />
                    </View>
                </View>

                <View style={styles.nomalField}>
                    <Text style={styles.title}> Địa chỉ:</Text>
                    <View style={styles.backgroundInput}>
                        <TextInput 
                            placeholder='Địa chỉ'
                            style={{
                                fontSize: 16,
                            }}
                            value={address}
                            onChangeText={setAddress}
                            editable={isEdit}
                        />
                    </View>
                </View>

                {
                    !isEdit &&
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => {
                            setIsEdit(true)
                        }}
                    >
                        <LinearGradient colors={['#f26a50', '#f20042', '#f20045']} style={styles.gradient}>
                            <Text style={styles.text}>
                                    Chỉnh sửa</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                }

                <View style={{flexDirection: 'row'}}>
                {
                    isEdit &&
                    <TouchableOpacity 
                        style={[styles.button1, {marginLeft: '10%'}]} 
                        onPress={() => onUpdateMyProfile()}
                    >
                        <LinearGradient colors={['#f26a50', '#f20042', '#f20045']} style={styles.gradient}>
                            <Text style={styles.text}>
                                    Lưu</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                }

                {
                    isEdit &&
                    <TouchableOpacity 
                        style={[styles.button1, {marginLeft: '10%'}]} 
                        onPress={() => {
                            setIsEdit(false)
                        }}
                    >
                        <LinearGradient colors={['#ff000c', '#ff000c', '#ff000c']} style={styles.gradient}>
                            <Text style={styles.text}>
                                    Hủy</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                }
                </View>

            </View>
        </ScrollView>
    ) 
}

export default Profile

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
        marginBottom: 10
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
    }
})