import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthenticateProvider from './contexts/UserContext';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import Routes from './routes';
import AppProvider from './contexts/AppContext';

const theme = {
        ...DefaultTheme,
        roundness: 1,
        colors: {
                ...DefaultTheme.colors,
                primary: '#3498db',
                accent: '#f1c40f',
        },
};

export default function App() {
        return (
                <AppProvider>
                        <PaperProvider theme={theme}>
                                <AuthenticateProvider>
                                        <NavigationContainer>
                                                <Routes />
                                        </NavigationContainer>
                                </AuthenticateProvider>
                        </PaperProvider>
                </AppProvider>
        );
}

