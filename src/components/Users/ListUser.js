import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ListUser = (props) => {
    return(
        <ScrollView style={{marginRight:-20}}>
        {
            props.ListUser.length > 0 && props.ListUser.map((item, index) => (
                <TouchableOpacity 
                    onPress={() => {
                        props.navigation.navigate('Discussion',{
                            itemId:item.id,
                            itemName:item.login,
                            itemPic:item.avatar_url
                        });
                    }}
                    style={styles.container}
                    key={item.id}
                >       
                        <Image source={{uri: item.avatar_url}} style={styles.image}/>
                        <View style={styles.test}>
                            <Text style={styles.username}>{item.login}</Text>
                            <LinearGradient
                                colors={['#09c6f9', '#045de9', '#045de9']}
                                style={styles.online}
                            >
                            </LinearGradient>
                        </View>
                </TouchableOpacity>
            ))
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
        width: '80%'
    },
    test: {
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        paddingBottom: 20,
        paddingLeft: 10,
        width: '90%',
        flexDirection:'row',
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