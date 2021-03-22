import React from 'react';
import { Text, View, ScrollView, StyleSheet, Image } from 'react-native';
import { CheckBox } from 'react-native-elements'

const ListUser = props => {
    return (
            <ScrollView style={styles.ops}>
                <View style={styles.col}>
                    <Text style={styles.day}>Gợi ý</Text>
                </View>
            {
                props.ListUser.length > 0 && props.ListUser.map((item, index) =>
                    <View 
                        style={styles.container}
                        key={item.id}
                    >       
                            <Image source={{uri: item.avatar_url}} style={styles.image}/>
                            <View style={styles.test}>
                                <Text style={styles.username}>{item.login}</Text>
                                <CheckBox
                                    style={styles.online}
                                >
                                </CheckBox>
                            </View>
                    </View>
                )
            }
        </ScrollView>
    )
}

export default ListUser

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        paddingHorizontal:20,
        alignItems:'center',
        marginTop:30
    },
    image:{
        width:50,
        height:50,
        borderRadius:25,
        marginRight: 10,
        marginLeft: -15
    },
    username:{
        color:'#000119',
        fontFamily:'Montserrat_700Bold',
        fontSize: 20,
        width: '80%',
        alignItems: 'center',
        justifyContent:'center',
    },
    test: {
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        paddingBottom: 20,
        paddingLeft: 10,
        width: '90%',
        flexDirection:'row',
    },
    ops:{
        backgroundColor:'#FFF',
        marginHorizontal:-20,
        marginTop: 50
    },
    col:{
        flexDirection:'row',
        marginTop:25,
        marginHorizontal:20,
        alignItems:'center'
    },
    day:{
        fontFamily:'Montserrat_800ExtraBold',
        color:'#000119',
        flex:1,
        fontSize:20
    },
    online:{
       height:16,
       width:16,
       borderRadius:8,
       alignItems:'center',
       justifyContent:'center',
       marginRight: -5
    },
})