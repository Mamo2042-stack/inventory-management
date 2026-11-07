import { useState, useEffect, useRef } from 'react';
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

    const skipNextSave = useRef(false); // this determines whether savingData should be called in effect //

    useEffect(() => {
        if(loadStatus === "invalid"){
            return;
        }

        if(skipNextSave.current){ // skip data saving after data restoration //
            skipNextSave.current = false;
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

    function restoreAppData(data){
        skipNextSave.current = true;
        setAppData(data);
        setLoadStatus("loaded");
    }

    const value = { appData, setAppData, loadStatus, setLoadStatus, resetAppData, restoreAppData };

    return (
        <AppDataContext.Provider value={value}>
            {children}
        </AppDataContext.Provider>
    )
}


