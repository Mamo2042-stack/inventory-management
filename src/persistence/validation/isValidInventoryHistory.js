import { isValidDate } from "./isValidDate";

export function isValidInventoryHistory(history){
    if (
        history === null ||
        typeof history !== "object" ||
        Array.isArray(history)
    ) {
        return false;
    }     
    
    if(
        !Object.hasOwn(history, "id") ||
        !Object.hasOwn(history, "itemId") ||
        !Object.hasOwn(history, "userAction") ||
        !Object.hasOwn(history, "previousQuantity") ||
        !Object.hasOwn(history, "newQuantity") ||
        !Object.hasOwn(history, "timeStamp")
    ){
        return false;
    }

    const { id, itemId, userAction, previousQuantity, newQuantity, timeStamp } = history;

    if(
        typeof id !== "string" ||
        typeof itemId !== "string" ||
        typeof userAction !== "string" ||
        typeof previousQuantity !== "number" ||
        typeof newQuantity !== "number" ||
        typeof timeStamp !== "string"
    ){
        return false;
    }

    if(userAction !== ("INCREASE_QUANTITY" || "DECREASE_QUANTITY" || "RECEIVE_FULL_ORDER" || "RECEIVE_PARTIAL_ORDER")){
        return false;
    }

    if(!Number.isSafeInteger(previousQuantity) || !Number.isSafeInteger(newQuantity)){
        return false;
    }

    if(previousQuantity < 0 || previousQuantity > 10000){
        return false;
    }

    if(newQuantity < 0 || newQuantity > 10000){
        return false;
    }

    if(!isValidDate(timeStamp)){
        return false;
    }

    return true;
} 