import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';

export default function LoadingPage(){
    return(
        <View style={{ margin: 50 }}>
            <ActivityIndicator animating={true} color={Colors.blue200} />
        </View>
    )
}
