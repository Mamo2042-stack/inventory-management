import { createContext, useContext, useState, useEffect } from 'react';
import { saveAppData } from '../persistence/saveAppData';
import { loadAppData } from '../persistence/loadAppData';

const AppDataContext = createContext(null);

export function AppDataProvider({ children }){
    const [appData, setAppData] = useState(() => {
        const fetchedData = loadAppData();

        if(fetchedData.status === "invalid"){
            console.error("Data fetching is failed");
            return fetchedData.data;
        } else {
            return fetchedData.data;
        }
    });

    useEffect(() => {
        saveAppData(appData)
    }, [appData])

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

