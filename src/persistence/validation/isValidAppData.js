import { isValidStorage } from "./isValidStorage"
import { isValidItem } from "./isValidItem";
import { isValidInventoryHistory } from "./isValidInventoryHistory";

function isValidData(appData){
    return (
        data !== null && 
        typeof data === "object" && 
        !Array.isArray(data) &&
        Array.isArray(data.storages) &&
        Array.isArray(data.items) &&
        Array.isArray(data.inventoryHistory)
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