import React, {UseState} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient';

const Header = ({itemPic, itemName, onPressBack, navigation}) => {
    return(
        <LinearGradient
            colors={['#f26a50','#f20045']}
            style={styles.headerContainer}
        >
            <TouchableOpacity
                onPress={onPressBack}
            >
                <Icon name='left' color='#000119' size={24}/>
            </TouchableOpacity>
            <Text style={styles.username}>{itemName}</Text>
            <TouchableOpacity 
                onPress={()=>{
                    navigation.navigate('Profile', {
                        type: 'account'
                    })
                }}
            >
                <Image 
                    source={require('../../assets/avatar.jpg')} 
                    style={styles.avatar}
                />
            </TouchableOpacity>
        </LinearGradient>
    )
}

export default Header


const styles = StyleSheet.create({
    headerContainer:{
        flexDirection:'row',
        alignItems:'center',
        padding: 10,
        marginTop:-40,
        marginHorizontal: -20
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