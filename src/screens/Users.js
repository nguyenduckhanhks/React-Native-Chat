import React, { useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { users } from '../api/data';

import ListUser from '../components/Users/ListUser'

const Users = (props) => {
    useEffect(() => {
        
    })
    return(
        <View
            style={styles.gradient}
        >
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Mọi người</Text>
            </View>
            <TouchableOpacity
                accessibilityRole="button"
                style={styles.button}
            >
                <Text style={styles.buttonText}>
                    Đang hoạt động
                </Text>
            </TouchableOpacity>
            <ListUser
                ListUser={users}
                navigation={props.navigation}
            />
        </View>
    )
}

export default Users;


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
    headerContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    header:{
        fontFamily:'Montserrat_800ExtraBold',
        color:'#f26a50',
        flex:1,
        fontSize:24
    },
    button: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        textAlign: 'center',
        alignItems:'center',
        borderRadius: 50,
        maxHeight: 50,
        margin: 5,
        marginHorizontal: 30
    },
    buttonText: {
        color: 'black',
        fontSize: 23, 
        padding: 10
    }
})