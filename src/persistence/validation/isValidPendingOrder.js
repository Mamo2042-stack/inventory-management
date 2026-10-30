import { isValidDate } from "./isValidDate";

export function isValidPendingOrder(order){
    if (
        order === null ||
        typeof order !== "object" ||
        Array.isArray(order)
    ) {
        return false;
    }

    if(
        !Object.hasOwn(order, "id") ||
        !Object.hasOwn(order, "orderedQuantity") ||
        !Object.hasOwn(order, "receivedQuantity") ||
        !Object.hasOwn(order, "orderDate")
    ) {
        return false;
    }

    const { id, orderedQuantity, receivedQuantity, orderDate } = order;

    if(
        typeof id !== "string" ||
        typeof orderedQuantity !== "number" ||
        typeof receivedQuantity !== "number" ||
        typeof orderDate !== "string"
    ) {
        return false;
    }

    if(id.trim() === ""){
        return false;
    }

    if(!Number.isSafeInteger(orderedQuantity) || !Number.isSafeInteger(receivedQuantity)){
        return false;
    }

    if(
        orderedQuantity <= 0 ||
        orderedQuantity > 1000
    ) {
        return false;
    }

    if(
        receivedQuantity < 0 ||
        receivedQuantity > orderedQuantity
    ) {
        return false;
    }

    if(!isValidDate(orderDate)){
        return false;
    }
    
    return true;
}