import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthenticateProvider from './contexts/UserContext';
import { DefaultTheme, Provider as PaperProvider, DarkTheme } from 'react-native-paper';

import Routes from './routes';
import AppProvider, { useApp } from './contexts/AppContext';

export default function App() {

        const { darkTheme } = useApp();
        //DarkTheme.colors.
        const theme = !darkTheme ? {
                ...DefaultTheme,
                roundness: 1,
                colors: {
                        ...DefaultTheme.colors,
                        primary: '#00008B',
                        accent: '#f1c40f',
                },
        } : {
                ...DarkTheme,
                roundness: 1,
                colors: {
                        ...DarkTheme.colors,
                        

                        primary: '#3333ff',
                        accent: '#f1c40f',
                },
        };

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
