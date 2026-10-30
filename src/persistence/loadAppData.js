const STORAGE_KEY = "inventory-management:appData";

function isValidAppData(data){
    return (
        data !== null && 
        typeof data === "object" && 
        !Array.isArray(data) &&
        Array.isArray(data.storages) &&
        Array.isArray(data.items) &&
        Array.isArray(data.inventoryHistory)
    )
}

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