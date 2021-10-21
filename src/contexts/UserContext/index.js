import React, { useState, createContext, useContext } from 'react';

const AuthenticateContext = createContext({
        signed: false,
        signIn: null,
        signOut: null,
});

export default function AuthenticateProvider({ children }) {

        const [authenticatedUser, setAuthenticatedUser] = useState(null);

        const signIn = () => {
                setAuthenticatedUser({ name: 'User Demo' });
        }

        const signOut = () => {
                setAuthenticatedUser(null);
        }

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