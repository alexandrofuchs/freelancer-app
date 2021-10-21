import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useAuthenticate } from '../../contexts/UserContext';

export default function HomePage({ navigation }){
    
    const { signOut } = useAuthenticate()
    
    return(
        <View>
            <Text>Home Page</Text>
            <Button onPress={signOut}>Sair</Button>
        </View>
    )
}
