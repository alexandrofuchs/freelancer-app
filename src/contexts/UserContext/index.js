import React, { useState, createContext, useContext, useEffect } from 'react';
import Api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { useApp } from '../AppContext';

const AuthenticateContext = createContext({
        signed: false,
        signIn: (email, password) => {},
        signOut: null,
        signInError: null,
});

export default function AuthenticateProvider({ children }) {

        const [authenticatedUser, setAuthenticatedUser] = useState(null);
        const [signInError, setSignInError] = useState('');
        
        const { setLoading } = useApp();

        
        const signIn = async (email, password) => {
                setLoading(true);
                const res = await Api.post('/users/authenticate', {
                        email,
                        password,
                });

                if (!!res.data) {

                        Api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

                        let decoded = await jwtDecode(res.data.token);

                        const jsonValue = JSON.stringify(decoded);

                        await AsyncStorage.setItem('@auth:token', res.data.token);
                        await AsyncStorage.setItem('@auth:user', jsonValue);

                        setAuthenticatedUser(decoded);

                } else {
                        console.log(res);
                        if(res.error){
                                setSignInError(res.error);
                        }
                }
                setLoading(false);

        }

        const signOut = () => {
                setAuthenticatedUser(null);
                AsyncStorage.clear();
        }

        useEffect(() => {                
                const validateToken = async () => {
                        setLoading(true);
                        const token = await AsyncStorage.getItem('@auth:token');
                        const user = await AsyncStorage.getItem('@auth:user');

                        if (token && user) {
                                Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                                const res = await Api.get('/users/validate');

                                if (res.error) {
                                        signOut();
                                        return;
                                }
                                if (res.data) {
                                        setAuthenticatedUser(JSON.parse(user));
                                }
                        }
                        setLoading(false);
                }
                validateToken();
                
        }, [])

        return (
                <AuthenticateContext.Provider value={{
                        signed: !!authenticatedUser,
                        signIn,
                        signOut,
                        signInError,
                }}
                >
                        {children}
                </AuthenticateContext.Provider>
        )
}

export const useAuthenticate = () => {
        const context = useContext(AuthenticateContext);

        return context;
}