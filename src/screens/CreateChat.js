import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'

import InputSearch from '../components/CreateChat/InputSearch';
import ListUser from '../components/CreateChat/ListUser';
import { users } from '../api/data'

const CreateChat = (props) => {
    return(
        <View style={styles.gradient}>
             <TouchableOpacity
                onPress={props.navigation.navigator}
            >
                <Icon name='left' color='#000119' size={24}/>
            </TouchableOpacity>
            <InputSearch/>
            <ListUser
                ListUser={users}
            />
        </View>
    )
}

export default CreateChat

const styles = StyleSheet.create({
    gradient:{
        height:'100%',
        position:"absolute",
        left:0,
        right:0,
        top:0,
        paddingHorizontal:20,
        paddingTop:30,
        backgroundColor: '#fff'
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
})