import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from './pages/Home';

import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import LoadingPage from './pages/Loading';

import { useAuthenticate } from './contexts/UserContext';
import { useApp } from './contexts/AppContext';


const Stack = createNativeStackNavigator();

export default function Routes() {

    const { signed } = useAuthenticate();
    const { loading } = useApp();

    // if(loading){
    //     return <LoadingPage />
    // }

    return (
        <Stack.Navigator initialRouteName={'SignIn'}>      
            {
                signed ?
                    (
                        <Stack.Screen name="Home" component={HomePage} />
                    ) :
                    (
                        <>
                            <Stack.Screen name="SignIn" component={SignInPage} options={{ title: 'Entrar' }} />
                            <Stack.Screen name="SignUp" component={SignUpPage} options={{ title: 'Criar Conta' }} />
                        </>
                    )
            }
        </Stack.Navigator>

    );
}