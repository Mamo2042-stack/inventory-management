import { isValidAppData } from "./validation/isValidAppData";

const STORAGE_KEY = "inventory-management:appData";

export function loadAppData(){
    try{
        const savedData = localStorage.getItem(STORAGE_KEY)
            
        if(savedData !== null) {
                    
            const parsedData = JSON.parse(savedData);
    
            if(!isValidAppData(parsedData)){
                console.error("Saved inventory data has an invalid data structure");            
                return {
                    status: "invalid",
                    data: null
                }   
            }

            return {
                status: "loaded",
                data: parsedData
            }
        }
    } catch (error){
        console.error("Failed to load saved inventorydata:", error);
        return {
            status: "invalid",
            data: null
        }
    }
    
    return {
        status: "missing",
        data: {
            storages: [],
            items: [],
            inventoryHistory: []
        }
    };
}