import React, {UseState} from 'react';
import { View, Text, ScrollView } from 'react-native';

import Received from './Received';
import Sent from './Sent';
import LastOnline from './LastOnline';

const ChatPanel = ({itemPic, dataMessage}) => {
    const txt = []
    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            <LastOnline  checkedOn='Yesterday'/>
            <Received 
                image={itemPic}
                message={dataMessage[0]}
            />
            <Sent
                message={dataMessage[1]}
            />
            <Received 
                image={itemPic}
                message={dataMessage[2]}
            />
                <Sent
                message={dataMessage[3]}
            />
            <LastOnline  checkedOn='Today'/>
            <Received 
                image={itemPic}
                message={dataMessage[4]}
            />
            <View>
                {txt}
            </View>
        </ScrollView>
    )
}

export default ChatPanel