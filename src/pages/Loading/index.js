import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Colors, useTheme } from 'react-native-paper';

export default function LoadingPage(){
    
    const { colors } = useTheme();

    return(
        <View style={{ padding: 60, backgroundColor: colors.primary, flex: 1, width: '100%'}} >
            <ActivityIndicator animating={true} color={Colors.white}  size={100}/>
        </View>
    )
}
