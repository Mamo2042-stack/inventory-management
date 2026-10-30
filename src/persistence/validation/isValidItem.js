import { CATEGORIES } from "../../constants/categories";
import { isValidPendingOrder } from "./isValidPendingOrder";

export function isValidItem(item){
    if (
        item === null ||
        typeof item !== "object" ||
        Array.isArray(item)
    ) {
        return false;
    }    

    if(
        !Object.hasOwn(item, "id") ||
        !Object.hasOwn(item, "name") ||
        !Object.hasOwn(item, "storageId") ||
        !Object.hasOwn(item, "quantity") ||
        !Object.hasOwn(item, "expectedQuantity") ||
        !Object.hasOwn(item, "replenishmentMethod") ||
        !Object.hasOwn(item, "category") ||
        !Object.hasOwn(item, "storageUnit") 
    ) {
        return false;
    }

    const { id, name, storageId, quantity, expectedQuantity, replenishmentMethod, category, storageUnit } = item;

    if(
        typeof id !== "string" ||
        typeof name !== "string" ||
        typeof storageId !== "string" ||
        typeof quantity !== "number" ||
        typeof expectedQuantity !== "number" ||
        typeof replenishmentMethod !== "string" ||
        typeof category !== "string" ||
        typeof storageUnit !== "string"
    ) {
        return false;
    }

    if(id.trim() === "" || storageId.trim() === ""){
        return false;
    }

    if(name.trim() === "" || name.length > 10){
        return false;
    }

    if(!Number.isSafeInteger(quantity) || quantity < 0 || quantity > 10000){
        return false;
    }

    if(!Number.isSafeInteger(expectedQuantity) || expectedQuantity < 0 || expectedQuantity > 10000){
        return false;
    }

    if(!["ORDER", "PURCHASE"].includes(replenishmentMethod)){
        return false;
    }

    if(!CATEGORIES.some(cate => cate.type === category)){
        return false;
    }

    if(storageUnit.trim() === "" || storageUnit.length > 8){
        return false;
    }

    // items with replenishMethod of PURCHASE should not have pendingOrders array //
    if(replenishmentMethod === "PURCHASE" && Object.hasOwn(item, "pendingOrders")){
        return false;
    }

    if(replenishmentMethod === "ORDER"){

        if(!Object.hasOwn(item, "pendingOrders")){
            return false;
        }

        const { pendingOrders } = item;

        if(!Array.isArray(pendingOrders) || pendingOrders === null){
            return false;
        }

        const isValidOrders = pendingOrders.every(isValidPendingOrder);

        if(!isValidOrders){
            return false;
        }
    }

    return true;
}