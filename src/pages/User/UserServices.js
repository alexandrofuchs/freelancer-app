import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAuthenticate } from '../../contexts/UserContext';

export default function UserServices() {

    const { userData } = useAuthenticate();
    
    return (
        <View>
            <Text>User Services</Text>
            <Text>{userData.firstName}</Text>
            <Text>{userData.lastName}</Text>
            <Text>{userData.email}</Text>
        </View>
    )
}
