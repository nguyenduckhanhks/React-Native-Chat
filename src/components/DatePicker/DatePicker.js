import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

const DatePicker = (props) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        props.setDate(moment(new Date(date)).format('YYYY/MM/DD'))
        hideDatePicker();
    };

    return (
        <View style={{
            marginVertical: 10,
            marginLeft: 7,
            marginTop: 20
        }}>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                mode={'date'}
                datePickerModeAndroid={'spinner'}
            />
            <Text style={{
                fontSize: 18,
                marginBottom: 10
            }}> {props.label}</Text>
            
            <View style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
                paddingLeft: 10,
                backgroundColor: '#fff',
            }}>
                <TouchableOpacity 
                    style={{}} 
                    onPress={showDatePicker}
                    disabled={props.disabled ? props.disabled : false}
                >
                    <LinearGradient colors={['#f26a50', '#f20042', '#f20045']} style={{width: 30, height: 30,borderRadius: 5, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon style={{}} name="calendar-outline" size={18} color="#fff"/>
                    </LinearGradient>
                </TouchableOpacity>
                <Text style={{
                    fontSize: 16,
                    paddingLeft: 20
                }}>{props.model != '' ? props.model : 'YYYY/MM/DD'}</Text>
                
            </View>
        </View>
    )
}

export default DatePicker