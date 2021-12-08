import React, { useState, createContext, useContext, useEffect } from 'react';
import Api from '../../services/api';
import _ from 'lodash';

const AppContext = createContext({
        loading: false,
        darkTheme: false,
        setDarkTheme: () => {},
        setLoading: () => {},
        searchService: (search) => {},
        search: null, 
        setSearch: () => {},
});

export default function AppProvider({ children }) {

        const [loading, setLoading] = useState(true);
        const [darkTheme, setDarkTheme] = useState(false);
        const [search, setSearch] = useState("");

        const searchService = (search) => {
              setSearch(search);          
        }
        
        return (
            <AppContext.Provider value={{
                loading,
                setLoading,
                darkTheme,
                setDarkTheme,
                searchService,
                setSearch,
                search,
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