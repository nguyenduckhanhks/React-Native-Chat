import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Profile = (props) => {
    return (
        <LinearGradient
            style={styles.gradient}
            colors={['#f26a50', '#f20042', '#f20045']}
        >
            
        </LinearGradient>
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
})