function receiveOrder(appData, itemId, orderId, newReceivedQuantity){
    const selectedItem = appData.items.find(item => item.id === itemId);

    if(!selectedItem){
        return {
            success: false,
            error: "NO_ITEM_FOUND"
        }
    }

    const selectedOrder = selectedItem.pendingOrders.find(order => order.id === orderId);

    if(!selectedOrder){
        return {
            success: false,
            error: "NO_ORDER_FOUND"
        }
    }

    const { orderedQuantity, receivedQuantity } = selectedOrder;
    const remaining = Math.round((orderedQuantity - receivedQuantity) * 10) / 10;
    const beforeAdd = selectedItem.quantity;


    if(remaining <= 0){
        return {
            success: false,
            error: "INVALID_PENDING_ORDER"
        }
    }

    if(newReceivedQuantity === ""){
        return {
            success: false,
            error: "EMPTY_INPUT"
        }
    }

    if(Number(newReceivedQuantity) <= 0){
        return {
            success: false,
            error: "INVALID_QUANTITY"
        }
    }

    if(Number(newReceivedQuantity) > remaining){
        return {
            success: false,
            error: "INSUFFICIENT_QUANTITY"
        }
    }
  

    const isFullyReceived = remaining === Number(newReceivedQuantity);

// new inventory hisotory //    
    const newInventoryHistory = {
        id: crypto.randomUUID(),
        itemId: itemId,
        userAction: isFullyReceived ? "RECEIVE_FULL_ORDER" : "RECEIVE_PARTIAL_ORDER",
        previousQuantity: beforeAdd,
        newQuantity: Math.round((selectedItem.quantity + Number(newReceivedQuantity)) * 10) / 10,
        timestamp: new Date().toISOString()
    }

// full receiving //
    if(isFullyReceived){
        const updatedOrderList = selectedItem.pendingOrders.filter(order => order.id !== orderId);
        const updatedData = {
            ...appData,
            items: appData.items.map(item => {
                if(item.id === itemId){
                    return {
                        ...item,
                        quantity: Math.round((beforeAdd + Number(newReceivedQuantity)) * 10) / 10,
                        pendingOrders: updatedOrderList
                    }
                }
                return item;
            }),
            inventoryHistory: [
                ...appData.inventoryHistory,
                newInventoryHistory
            ]
        }

        return {
            success: true,
            type: "FULL",
            data: updatedData
        }
    }

// partial receiving //
    const updatedPendingOrder = {
        ...selectedOrder,
        receivedQuantity: Math.round((receivedQuantity + Number(newReceivedQuantity)) * 10) / 10
    }

    const updatedData = {
        ...appData,
        items: appData.items.map(item => {
            if(item.id === itemId){
                return {
                    ...item,
                    quantity: Math.round((beforeAdd + Number(newReceivedQuantity)) * 10) / 10,
                    pendingOrders: item.pendingOrders.map(order => {
                        if(order.id === orderId){
                            return updatedPendingOrder;
                        }
                        return order;
                    })
                }
            }
            return item;
        }),
        inventoryHistory: [
            ...appData.inventoryHistory,
            newInventoryHistory
        ]
    }

    return {
        success: true,
        type: "PARTIAL",
        data: updatedData
    }
}

export default receiveOrder;