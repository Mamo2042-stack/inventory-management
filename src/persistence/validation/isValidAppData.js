import { isValidStorage } from "./isValidStorage"
import { isValidItem } from "./isValidItem";
import { isValidInventoryHistory } from "./isValidInventoryHistory";

function isValidData(appData){
    return (
        appData !== null && 
        typeof appData === "object" && 
        !Array.isArray(appData) &&
        Array.isArray(appData.storages) &&
        Array.isArray(appData.items) &&
        Array.isArray(appData.inventoryHistory)
    )
}

export function isValidAppData(appData){

    if(!isValidData(appData)){
        return false;
    }

    const { storages, items, inventoryHistory } = appData;

    return (
        storages.every(isValidStorage) &&
        items.every(isValidItem) &&
        inventoryHistory.every(isValidInventoryHistory)
    )
}