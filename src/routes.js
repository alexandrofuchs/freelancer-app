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
import ProfileEditPage from './pages/User/ProfileEdit';
import { View } from 'react-native';
import ViewProfile from './pages/User/ViewProfile';
import UserProfile from './pages/UserProfile';
import CreateServicePage from './pages/CreateService';
import ServiceOrderPage from './pages/ServiceOrder';
import ChatPage from './pages/Chat';
import ContractedServicesPage from './pages/ContractedServices';
import ReviewPage from './pages/Review';
import ContractedServicePage from './pages/ContractedService';
import UserServiceListPage from './pages/UserServiceList';
import SolicitedServicesPage from './pages/SolicitedServices';

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
                            <Stack.Screen name="UserPresentation" component={ProfileEditPage} options={{title: 'Editar Perfil' }} />                     
                            <Stack.Screen name="UserProfile" component={UserProfile} options={{title: 'Visualizar Perfil' }} />  
                            <Stack.Screen name="CreateService" component={CreateServicePage} options={{title: 'Customizar Serviço' }} /> 
                            <Stack.Screen name="ServiceOrder" component={ServiceOrderPage} options={{title: 'Solicitar Serviço' }} />
                            <Stack.Screen name="Chat" component={ChatPage} options={{title: 'Chat' }} />  
                            <Stack.Screen name="ContractedServices" component={ContractedServicesPage} options={{title: 'Serviços Contratados' }} />
                            <Stack.Screen name="Review" component={ReviewPage} options={{title: 'Avaliar Serviço' }} /> 
                            <Stack.Screen name="ContractedService" component={ContractedServicePage} options={{title: 'Solicitação de Serviço' }} /> 
                            <Stack.Screen name="UserServiceList" component={UserServiceListPage} options={{title: 'Meus Serviços' }} /> 
                            <Stack.Screen name="SolicitedServices" component={SolicitedServicesPage} options={{title: 'Solicitações' }} /> 
                            

                            {/* <Stack.Screen name="UserProfile" component={ViewProfile} options={{title: 'Visualizar Perfil' }} />                      */}
                        </Stack.Navigator>
                    ) :
                    (
                        <Stack.Navigator 
                            initialRouteName={'SignIn'}
                            screenOptions={{
                                header: (props) => <AppBar {...props} />,
                            }}
                        >
                            <Stack.Screen name="SignIn" component={SignInPage} />
                            <Stack.Screen name="SignUp" component={SignUpPage} options={{ title: 'Criar Conta' }} />
                        </Stack.Navigator>
                    )
            }
        </>
    );
}