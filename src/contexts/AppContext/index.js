import React, { useState, createContext, useContext, useEffect } from 'react';

const AppContext = createContext({
        loading: false,
        setLoading: () => {}
});

export default function AppProvider({ children }) {

        const [loading, setLoading] = useState(true);
        
        return (
            <AppContext.Provider value={{
                loading,
                setLoading
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