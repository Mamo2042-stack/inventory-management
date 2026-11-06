import { isValidAppData } from "./validation/isValidAppData";
import { useAppData } from "../context/useAppData";

const STORAGE_KEY = "inventory-management:appData"

export function saveAppData(appData){

    const { setLoadStatus } = useAppData();

    if(!isValidAppData(appData)){
        console.error("Invalid data is detected");
        setLoadStatus("unsaved_invalid")
        return;
    }

    try{ 
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(appData)
        )
    } catch (error){
        console.error("Failed to save inventory data:", error);
        setLoadStatus("unsaved_failure")
    }
}