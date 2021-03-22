import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

const SignUp = (props) => {
    const [username, setUsername] = useState(null)

    const [password, setPassword] = useState(null)

    return (
        <LinearGradient
            style={styles.gradient}
            colors={['#f26a50', '#f20042', '#f20045']}
        >
            <View>
                <Text style={styles.title}>Welcome!</Text>
            </View>
            <View>
                <View style={styles.inputSection}>
                    <Icon style={styles.inputIcon} name="person-outline" size={20} color="#f20042"/>
                    <TextInput
                        placeholder='Tên tài khoản'
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
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
                <Text 
                    style={{textAlign: 'right', marginTop: 5, fontSize: 15}}
                    onPress={() => {
                        props.navigation.navigate('ForgotPassword')
                    }}
                >
                    Forgot password?
                </Text>
                <Button
                    title="Đăng ký"
                    buttonStyle={styles.button}
                    onPress={() => {
                        props.navigation.navigate('Home')
                    }}
                />
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
        </LinearGradient>
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
        height:'100%',
        position:"absolute",
        left:0,
        right:0,
        top:0,
        paddingHorizontal:20,
        paddingTop:30
    },
    input:{
        fontFamily:'Montserrat_600SemiBold',
        fontSize:18,
        color:'#f20042',
    },
    button: {
        borderRadius:40,
        marginTop: 30,
        width: '80%',
        alignItems: 'center',
        height: 60,
        marginHorizontal: '10%'
    },
    title: {
        textAlign: 'center',
        fontSize: 40,
        fontFamily: 'Montserrat_600SemiBold',
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 70
    }
})