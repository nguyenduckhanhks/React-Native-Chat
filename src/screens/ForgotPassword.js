import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const ForgotPassword = (props) => {
    const [username, setUsername] = useState(null)

    return (
        <View
            style={{paddingHorizontal: 10}}
        >
            <View>
                <Text style={styles.title}>Reset Password!</Text>
                <Text style={{textAlign: 'center', color: 'black', fontSize: 15, padding: 20}}>Enter your username below to get paswword!</Text>
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

                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => {
                        props.navigation.navigate('Home')
                    }}
                >
                    <LinearGradient colors={['#f26a50', '#f20042', '#f20045']} style={styles.gradient}>
                        <Text style={styles.text}>
                                Lấy mật khẩu</Text>
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
    )
}

export default ForgotPassword

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