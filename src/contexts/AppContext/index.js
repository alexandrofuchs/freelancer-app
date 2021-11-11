import React, { useState, createContext, useContext, useEffect } from 'react';

const AppContext = createContext({
        loading: false,
        darkTheme: false,
        setDarkTheme: () => {},
        setLoading: () => {}
});

export default function AppProvider({ children }) {

        const [loading, setLoading] = useState(true);
        const [darkTheme, setDarkTheme] = useState(false);
        
        return (
            <AppContext.Provider value={{
                loading,
                setLoading,
                darkTheme,
                setDarkTheme
            }}
            >
                    {children}
            </AppContext.Provider>
    )

}

export const useApp = () => {
        const context = useContext(AppContext);

        return context;
}