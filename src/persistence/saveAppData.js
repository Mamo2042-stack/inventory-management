import { isValidAppData } from "./validation/isValidAppData";

const STORAGE_KEY = "inventory-management:appData"

export function saveAppData(appData){

    if(!isValidAppData(appData)){
        console.error("Invalid data is detected");
        return;
    }

    try{ 
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(appData)
        )
    } catch (error){
        console.error("Failed to save inventory data:", error);
    }
}