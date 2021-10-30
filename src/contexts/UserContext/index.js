import React, { useState, createContext, useContext, useEffect } from 'react';
import Api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

const AuthenticateContext = createContext({
        signed: false,
        signIn: null,
        signOut: null,
});

export default function AuthenticateProvider({ children }) {

        const [authenticatedUser, setAuthenticatedUser] = useState(null);

        const signIn = async () => {

                const res = await Api.post('/users/authenticate', {
                        email: 'alexandrofuchs2@mail.com',
                        password: 'abc123456789',
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
                }

        }

        const signOut = () => {
                setAuthenticatedUser(null);
                AsyncStorage.clear();
        }

        useEffect(() => {
                const validateToken = async () => {
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

                }
                validateToken();
        }, [])

        return (
                <AuthenticateContext.Provider value={{
                        signed: !!authenticatedUser,
                        signIn,
                        signOut
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