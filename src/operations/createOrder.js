import { isValidQuantity } from "../utils/isValidQuantity";

function createOrder ( appData, itemId, orderData ){
    const selectedItem = appData.items.find(item => item.id === itemId);


    //Validation//

    if(!selectedItem){
        return {
            success: false,
            error: "ITEM_NOT_FOUND"
        }
    }

    if(selectedItem.replenishmentMethod !== "ORDER"){
        return {
            success: false,
            error: "CAN_NOT_ORDER"
        }
    }

    const isValid = isValidQuantity(orderData);

    if(!isValid){
        return {
            success: false,
            error: "INVALID_NUMBER"
        }
    }

    if(orderData.trim() === ""){
        return {
            success: false,
            error: "EMPTY_INPUT"
        }
    }

    if(Number(orderData) <= 0 || Number(orderData) > 100){
        return {
            success: false,
            error: "INVALID_QUANTITY"
        }
    }

    
    //End of Validation//

    const newOrder = {
        id: crypto.randomUUID(),
        orderedQuantity: Number(orderData) * 10,
        receivedQuantity: 0,
        orderDate: new Date().toISOString()
    }

    const updatedData = {
        ...appData,
        items: appData.items.map(item => 
            item.id === itemId 
                ? {
                    ...item,
                    pendingOrders: [
                        ...(item.pendingOrders ?? []),
                        newOrder
                    ]
                }
                : item
        )
    }

    return {
        success: true,
        data: updatedData
    }
}

export default createOrder;