import { isValidAppData } from "./validation/isValidAppData";

const STORAGE_KEY = "inventory-management:appData"

export function saveAppData(appData){
    if(!isValidAppData(appData)){
        console.error("Invalid data is detected");
        return "unsaved_invalid";
    }

    try{ 
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(appData)
        )
        return "loaded";
    } catch (error){
        console.error("Failed to save inventory data:", error);
        return "unsaved_failure";
    }
}