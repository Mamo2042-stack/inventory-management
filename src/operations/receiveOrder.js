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
    const remaining = orderedQuantity - receivedQuantity;
    const beforeAdd = selectedItem.quantity;


    if(remaining <= 0){
        return {
            success: false,
            error: "INVALID_PENDING_ORDER"
        }
    }

    if(newReceivedQuantity > remaining){
        return {
            success: false,
            error: "INSUFFICIENT_QUANTITY"
        }
    }
  

    const isFullyReceived = remaining === newReceivedQuantity;

    const newInventoryHistory = {
        id: crypto.randomUUID(),
        itemId: itemId,
        userAction: isFullyReceived ? "RECEIVE_FULL_ORDER" : "RECEIVE_PARTIAL_ORDER",
        previousQuantity: beforeAdd,
        newQuantity: selectedItem.quantity + newReceivedQuantity,
        timestamp: new Date().toISOString()
    }

    if(isFullyReceived){
        const updatedOrderList = selectedItem.pendingOrders.filter(order => order.id !== orderId);
        const updatedData = {
            ...appData,
            items: appData.items.map(item => {
                if(item.id === itemId){
                    return {
                        ...item,
                        quantity: beforeAdd + newReceivedQuantity,
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

    const updatedPendingOrder = {
        ...selectedOrder,
        receivedQuantity: remaining - newReceivedQuantity
    }

    const updatedData = {
        ...appData,
        items: appData.items.map(item => {
            if(item.id === itemId){
                return {
                    ...item,
                    quantity: beforeAdd + newReceivedQuantity,
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