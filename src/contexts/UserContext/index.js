import React, { useState, createContext, useContext, useEffect } from 'react';
import Api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { useApp } from '../AppContext';

const AuthenticateContext = createContext({
        userData: null,
        signed: false,
        signIn: (email, password) => { },
        signOut: null,
        upsert: (user = {id: null, email: '', password: '', firstName: '', lastName: '' }) => { },
        signInError: null,
        validateToken: () => {},
});

export default function AuthenticateProvider({ children }) {

        const [authenticatedUser, setAuthenticatedUser] = useState(null);
        const [signInError, setSignInError] = useState('');

        const { setLoading } = useApp();

        const validateToken = async () => {
                setLoading(true);

                const token = await AsyncStorage.getItem('@auth:token');
                const user = await AsyncStorage.getItem('@auth:user');

                if (token && user) {
                        Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                        const res = await Api.get('/users/validate');

                        if (res.error) {
                                signOut();
                                return setLoading(false);
                        }
                        if (res.data) {
                                await setUser(res.data.token);
                        }
                }
                setLoading(false);
        }

        const upsert = async (user) => {

                if(!!user.id){                        
                        const res = await Api.put(`/users/${user.id}`, {
                                email: user.email,
                                firstName: user.firstName,
                                lastName: user.lastName,
                        });            
                        return res;

                }else{
                        const res = await Api.post('/users', {
                                email: user.email,
                                password: user.password,
                                firstName: user.firstName,
                                lastName: user.lastName,
                        }); 
                        return res;
                }
        }

        const setUser = async (token) => {
                Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const decoded = await jwtDecode(token);
                const jsonValue = JSON.stringify(decoded);
                await AsyncStorage.setItem('@auth:token', token);
                await AsyncStorage.setItem('@auth:user', jsonValue);
                setAuthenticatedUser(decoded);
        }

        const signIn = async (email, password) => {
                setLoading(true);
                const res = await Api.post('/users/authenticate', {
                        email,
                        password,
                });

                if (!!res.data) {
                        await setUser(res.data.token);
                } else {
                        if (res.error) {
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
                
                validateToken();
                
        }, [])

        return (
                <AuthenticateContext.Provider value={{
                        userData: authenticatedUser,
                        signed: !!authenticatedUser,
                        signIn,
                        signOut,
                        upsert,
                        signInError,
                        validateToken,                     
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