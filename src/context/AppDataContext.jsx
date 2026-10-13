import { createContext, useContext, useState } from 'react';
import { testAppData } from '../test/fixtures';

const AppDataContext = createContext(null);

export function AppDataProvider({ children }){
    const [appData, setAppData] = useState(() => structuredClone(testAppData));

    const value = { appData, setAppData };

    return (
        <AppDataContext.Provider value={value}>
            {children}
        </AppDataContext.Provider>
    )
}

export function useAppData() {
    const context = useContext(AppDataContext);

    if(context === null){
        throw new Error(
            "useAppData must be used within an AppDataProvider"
        );
    }

    return context;
}

