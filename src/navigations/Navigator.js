import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'
import { Text } from 'react-native';

import Chat from '../screens/Chat';
import Discussion from '../screens/Discussion';
import Users from '../screens/Users';
import CreateChat from '../screens/CreateChat';
import Login from '../screens/Login';
import ForgotPassword from '../screens/ForgotPassword';
import SignUp from '../screens/SignUp';
import Profile from '../screens/Profile';
import ChatSetting from '../screens/ChatSetting';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="Chat" 
                component={Chat} 
                options={{
                    tabBarLabel:'Chat',
                    tabBarIcon:()=>(
                        <Icon name='chatbubbles-outline'
                        color='#f26a50'
                        size={30}/>
                    )
                }}/>
            <Tab.Screen 
                name="Users" 
                component={Users}
                options={{
                    tabBarLabel:'Mọi người',
                    tabBarIcon:()=>(
                        <Icon name='people-outline'
                        color='#f26a50'
                        size={30}/>
                    ),
                    tabBarColor:'#f26a50'
                }}/>
        </Tab.Navigator>
    )
}

const Stack = createStackNavigator();
const screenOptionStyle = {
    headerShown:false
};

const ChatStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={BottomTabNavigator} />
            <Stack.Screen name="Discussion" component={Discussion} />
            <Stack.Screen name="CreateChat" component={CreateChat} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="ChatSetting" component={ChatSetting} />
        </Stack.Navigator>
    )
}

export default ChatStackNavigator;