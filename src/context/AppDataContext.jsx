import { createContext, useState, useEffect } from 'react';
import { saveAppData } from '../persistence/saveAppData';
import { loadAppData } from '../persistence/loadAppData';

export const AppDataContext = createContext(null);

export function AppDataProvider({ children }){
    const [initialLoad] = useState(() => loadAppData());

    const [appData, setAppData] = useState(
        initialLoad.status === "invalid" ?
        null 
        :
        initialLoad.data
    );

    const [loadStatus, setLoadStatus] = useState(initialLoad.status);

    useEffect(() => {
        if(loadStatus === "invalid"){
            return;
        }

        saveAppData(appData)
    }, [appData, loadStatus])

    function resetAppData(){
        const initialData = {
            storages: [],
            items: [],
            inventoryHistory: []
        };

        setAppData(initialData);
        setLoadStatus("missing");
    }

    const value = { appData, setAppData, loadStatus, resetAppData };

    return (
        <AppDataContext.Provider value={value}>
            {children}
        </AppDataContext.Provider>
    )
}


