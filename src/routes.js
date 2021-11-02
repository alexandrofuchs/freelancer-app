import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import LoadingPage from './pages/Loading';

import ExamplePage from './pages/Example';
import HomePage from './pages/Home';

import { useAuthenticate } from './contexts/UserContext';
import { useApp } from './contexts/AppContext';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function Routes() {

    const { signed } = useAuthenticate();
    const { loading } = useApp();

    if (loading) {
        return <LoadingPage />
    }

    return (
        <>
            {
                signed ?
                    (
                        <Drawer.Navigator initialRouteName={'Home'}>
                            <Drawer.Screen name="Home" component={HomePage} />
                            <Drawer.Screen name="Example2" component={ExamplePage} />
                        </Drawer.Navigator>
                    ) :
                    (
                        <Stack.Navigator initialRouteName={'SignIn'}>
                            <Stack.Screen name="SignIn" component={SignInPage} options={{ title: 'Entrar' }} />
                            <Stack.Screen name="SignUp" component={SignUpPage} options={{ title: 'Criar Conta' }} />
                        </Stack.Navigator>
                    )
            }
        </>
    );
}