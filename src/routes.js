import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { useAuthenticate } from './contexts/UserContext';
import { useApp } from './contexts/AppContext';
import AppBar from './components/AppBar';

import ServicePage from './pages/Service';
import UserPage from './pages/User';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import LoadingPage from './pages/Loading';
import HomePage from './pages/Home';
import UserUpdate from './pages/User/UserUpdate';
import UserPresentation from './pages/User/UserPresentation';
import { View } from 'react-native';
import ViewProfile from './pages/User/ViewProfile';

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
                        <Stack.Navigator 
                            initialRouteName={'Home'} 
                            screenOptions={{
                                header: (props) => <AppBar {...props} />,
                            }}
                        >
                            <Stack.Screen name="Home" component={HomePage} />  
                            <Stack.Screen name="Service" component={ServicePage} options={{title: 'Serviços'}} />
                            <Stack.Screen name="UserAccount" component={UserPage} options={{title: 'Conta'}} /> 
                            <Stack.Screen name="UserUpdate" component={UserUpdate} options={{title: 'Atualizar Dados'}}/>  
                            <Stack.Screen name="UserPresentation" component={UserPresentation} options={{title: 'Editar Apresentação' }} />                     
                            <Stack.Screen name="UserProfile" component={ViewProfile} options={{title: 'Apresentação' }} />                     
                        </Stack.Navigator>
                    ) :
                    (
                        <Stack.Navigator 
                            initialRouteName={'SignIn'}
                            screenOptions={{
                                header: (props) => <AppBar {...props} />,
                            }}
                        >
                            <Stack.Screen name="SignIn" component={SignInPage} options={{ title: 'Entrar' }} />
                            <Stack.Screen name="SignUp" component={SignUpPage} options={{ title: 'Criar Conta' }} />
                        </Stack.Navigator>
                    )
            }
        </>
    );
}