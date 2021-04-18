import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import DatePicker from '../components/DatePicker/DatePicker';
import { RadioButton } from 'react-native-paper';
import firebase from 'react-native-firebase';

const SignUp = (props) => {
    const [password, setPassword] = useState('111111')
    const [confirmPassword, setConfirmPassword] = useState('111111')
    const [email, setEmail] = useState('user2@gmail.com')
    const [tel, setTel] = useState('0963582584')
    const [name, setName] = useState('Nguyễn Đức Khánh')
    const [birthday, setBirthday] = useState('2000/12/11')
    const [gender, setGender] = useState('male')
    const [photo, setPhoto] = useState({})

    const choosePhoto = () => {
        const options = {
            mediaType: 'photo'
        }

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
              alert('User cancelled camera picker');
              return;
            } else if (response.errorCode == 'camera_unavailable') {
              alert('Camera not available on device');
              return;
            } else if (response.errorCode == 'permission') {
              alert('Permission not satisfied');
              return;
            } else if (response.errorCode == 'others') {
              alert(response.errorMessage);
              return;
            }
            setPhoto(response);
        })
    }

    const onSignup = () => {
        if(!password || !confirmPassword || !email || !tel || !name || !birthday) return Alert.alert('Vui lòng nhập đủ thông tin cần thiết !')
        if(password !== confirmPassword) return Alert.alert('Mật khẩu nhập vào không khớp!')
        firebase.auth().createUserWithEmailAndPassword(email, password).then(res => {
            console.log(JSON.stringify(res))
            let newUser = {
                name: name,
                tel: tel,
                email: email,
                birthday: birthday,
                gender: gender,
                photo: '',
                status: 'online'
            }
            if(res['user']['uid']) {
                firebase.firestore()
                        .collection('users')
                        .doc(res['user']['uid'])
                        .set(newUser)
                        .then(() => {
                            props.navigation.navigate('Profile', {
                                type: 'myProfile'
                            })
                        })
                        .catch(err => {
                            Alert.alert(err['message'])
                            // console.log(err)
                        })
            }
        }).catch(err => {
            // console.log(err)
            Alert.alert(err['message'])
        })
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if(user) return props.navigation.navigate('Home')
        })
    })

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{paddingHorizontal: 10, marginBottom: 80}}>
                <View>
                    <Text style={styles.title}>Welcome!</Text>
                </View>

                <View style={{height: 100, marginBottom: 30}}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        flex: 1
                    }}>
                        <Image
                            source={photo.uri ?  {uri: photo.uri} : require('../assets/avatar.jpg')}
                            style={{
                                width: 100,
                                height: 100,
                                marginVertical: 15,
                                borderRadius: 50,
                            }}
                        />
                        <TouchableOpacity 
                            style={{marginLeft: -30, marginTop: 13}} 
                            onPress={() => choosePhoto()}
                        >
                            <LinearGradient colors={['#f26a50', '#f20042', '#f20045']} style={{width: 30, height: 30,borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
                                <Icon style={{}} name="pencil-outline" size={18} color="#fff"/>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>

                <View>

                    <View style={styles.inputSection}>
                        <Icon style={styles.inputIcon} name="person-outline" size={20} color="#f20042"/>
                        <TextInput
                            placeholder='Tên người dùng'
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <View style={styles.inputSection}>
                        <Icon style={styles.inputIcon} name="call-outline" size={20} color="#f20042"/>
                        <TextInput
                            placeholder='Số điện thoại'
                            style={styles.input}
                            value={tel}
                            onChangeText={setTel}
                        />
                    </View>

                    <View style={styles.inputSection}>
                        <Icon style={styles.inputIcon} name="mail-outline" size={20} color="#f20042"/>
                        <TextInput
                            placeholder='Email'
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={styles.inputSection}>
                        <Icon style={styles.inputIcon} name="lock-closed-outline" size={20} color="#f20042"/>
                        <TextInput
                            placeholder='Mật khâu'
                            secureTextEntry={true}
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    <View style={styles.inputSection}>
                        <Icon style={styles.inputIcon} name="lock-closed-outline" size={20} color="#f20042"/>
                        <TextInput
                            placeholder='Xác nhận mật khâu'
                            secureTextEntry={true}
                            style={styles.input}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                    </View>

                    <DatePicker model={birthday} setDate={setBirthday} label='Ngày sinh:'/>

                    <View style={{marginTop: 20}}>
                        <Text style={{
                            fontSize: 18
                        }}> Giới tính:</Text>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingTop: 20
                        }}>
                            <RadioButton 
                                value="male"
                                status={ gender === 'male' ? 'checked' : 'unchecked'}
                                onPress={() => setGender('male')}
                                color="#f20045"
                            /><Text style={{marginRight: 30}}>Nam</Text>
                            <RadioButton 
                                value="female"
                                status={ gender === 'female' ? 'checked' : 'unchecked'}
                                onPress={() => setGender('female')}
                                color="#f20045"
                            /><Text>Nữ</Text>
                        </View>
                    </View>

                    <Text 
                        style={{textAlign: 'right', marginTop: 5, fontSize: 15}}
                        onPress={() => {
                            props.navigation.navigate('ForgotPassword')
                        }}
                    >
                        Forgot password?
                    </Text>

                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => onSignup()}
                    >
                        <LinearGradient colors={['#f26a50', '#f20042', '#f20045']} style={styles.gradient}>
                            <Text style={styles.text}>
                                    Đăng ký</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <View style={{flexDirection:'row', marginTop: 30, width:'50%', marginHorizontal: '25%', alignItems: 'center'}}>
                        <Text style={{fontSize: 15}}>Have an account?</Text>
                        <Text 
                            style={{fontSize: 17, color: 'blue'}}
                            onPress={() => {
                                props.navigation.navigate('Login')
                            }}
                        >
                            Login
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default SignUp

const styles = StyleSheet.create({
    inputSection: {
        flexDirection: 'row',
        paddingHorizontal:10,
        paddingVertical: 0,
        backgroundColor: '#fff',
        borderRadius:40,
        marginTop: 20,
        height: 50,
        alignItems: 'center',
    },
    inputIcon: {
        padding: 10,
    },
    gradient:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 40
    },
    input:{
        fontFamily:'Montserrat_600SemiBold',
        fontSize:18,
        color:'#f20042',
    },
    button: {
        width: '70%',
        marginLeft:'15%',
        marginTop: 40,
        height: 50,
    },
    title: {
        textAlign: 'center',
        fontSize: 40,
        fontFamily: 'Montserrat_600SemiBold',
        fontWeight: 'bold',
        color: 'black',
        marginTop: 70
    },
    text: {
        color: 'white',
        fontSize: 20,
    }
})