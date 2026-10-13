function createOrder ( appData, itemId, orderData ){
    const selectedItem = appData.items.find(item => item.id === itemId);


    //Validation//

    if(!selectedItem){
        return {
            success: false,
            error: "ITEM_NOT_FOUND"
        }
    }

    if(!Object.hasOwn(selectedItem, "pendingOrders")){
        return {
            success: false,
            error: "CAN_NOT_ORDER"
        }
    }

    if(Number(orderData) <= 0){
        return {
            success: false,
            error: "INVALID_NUMBER"
        }
    }
    
    //End of Validation//

    const newOrder = {
        id: crypto.randomUUID(),
        orderedQuantity: Number(orderData),
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
                        ...item.pendingOrders,
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