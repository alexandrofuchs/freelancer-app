import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthenticateProvider from './contexts/UserContext';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import AppProvider from './contexts/AppContext';

import Routes from './routes';
import { SafeAreaView } from 'react-native-safe-area-context';

const theme = {
        ...DefaultTheme,
        roundness: 2,
        colors: {
                ...DefaultTheme.colors,
                primary: '#3498db',
                accent: '#f1c40f',
        },
};

export default function App() {
        return (               
                <PaperProvider theme={theme}>
                        <AuthenticateProvider>
                                {/* <AppProvider> */}
                                        <NavigationContainer>
                                                <Routes />
                                        </NavigationContainer>
                                {/* </AppProvider> */}
                        </AuthenticateProvider>
                </PaperProvider>               
        );
}

