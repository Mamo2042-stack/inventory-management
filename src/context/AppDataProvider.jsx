import { useState, useEffect } from 'react';
import { AppDataContext } from './AppDataContext';
import { saveAppData } from '../persistence/saveAppData';
import { loadAppData } from '../persistence/loadAppData';

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

        if(loadStatus === "retrieved") {
            setLoadStatus("loaded");
            return;
        }

        const result = saveAppData(appData);
        setLoadStatus(result);
    }, [appData])

    function resetAppData(){
        const initialData = {
            storages: [],
            items: [],
            inventoryHistory: []
        };

        setAppData(initialData);
        setLoadStatus("missing");
    }

    const value = { appData, setAppData, loadStatus, setLoadStatus, resetAppData };

    return (
        <AppDataContext.Provider value={value}>
            {children}
        </AppDataContext.Provider>
    )
}


