import React, {useState} from 'react';
import { View, Text, ScrollView } from 'react-native';

import Received from './Received';
import Sent from './Sent';
import LastOnline from './LastOnline';

const ChatPanel = ({itemPic, dataMessage, uid}) => {
    const txt = []
    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            <LastOnline  checkedOn='Yesterday'/>
            {
                dataMessage.map(data => {
                    if(data['auth'] === uid) return (
                        <Sent
                            message={data['message']}
                            create={data['create']}
                        />
                    ) 
                    else return (
                        <Received 
                            image={itemPic}
                            message={data['message']}
                            create={data['create']}
                        />
                    )
                })
            }
            <View>
                {txt}
            </View>
        </ScrollView>
    )
}

export default ChatPanel