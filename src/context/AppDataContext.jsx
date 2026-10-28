import { createContext, useContext, useState, useEffect } from 'react';
import { testAppData } from '../test/fixtures';

const AppDataContext = createContext(null);

export function AppDataProvider({ children }){
    const [appData, setAppData] = useState(() => {
        try{
            const savedData = localStorage.getItem("inventory-management:appData")
        
            if(savedData !== null) {
                return JSON.parse(savedData)
            }
        } catch (error){
            console.error("Fiailed to load saved inventorydata:", error);
        }

        return {
            storages: [],
            items: [],
            inventoryHistory: []
        };
    });

    useEffect(() => {
        try{ 
        localStorage.setItem(
            "inventory-management:appData",
            JSON.stringify(appData)
        )
    } catch (error){
        console.error("Failed to save inventory data:", error);
    }
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

