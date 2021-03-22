import React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

const InputSearch = ({inputSearch, setSearch}) => {
    return (
        <View style={styles.container}>
            <Octicons name='search' color='#fff' size={20}/>
            <TextInput
                placeholder='Tìm kiếm'
                value={inputSearch}
                onChangeText={setSearch}
                style={styles.input}
            />
        </View>
    )
}

export default InputSearch

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignSelf:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.2)',
        width:'85%',
        height: '8%',
        position:'absolute',
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:20,
        marginTop: 15,
    },
    input:{
        fontFamily:'Montserrat_600SemiBold',
        fontSize:18,
        color:'#fff',
        paddingHorizontal:10,
        paddingVertical: 0,
        flex:1,
    }
})