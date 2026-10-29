function adjustInventory (appData, itemId, changeTo) {
    const selectedItem = appData.items.find(item => item.id === itemId );

    if(!selectedItem){
        return {
            success: false,
            error: "ITEM_NOT_FOUND"
        }
    }

    const previousQuantity = selectedItem.quantity

    if(!Number.isFinite(changeTo) || changeTo < 0 || changeTo > 10000){
        return {
            success: false,
            error: "INVALID_QUANTITY"
        }
    }
  

    //Create a history records//
    const newHistory = {
        id: crypto.randomUUID(),
        itemId: itemId,
        userAction: previousQuantity < changeTo ? "INCREASE_QUANTITY" : "DECREASE_QUANTITY",
        previousQuantity: previousQuantity,
        newQuantity: changeTo,
        timestamp: new Date().toISOString()
    }

    const updatedAppData = {
        ...appData,
        items: appData.items.map(item => {
            if(item.id === itemId){
                return {
                    ...item,
                    quantity: changeTo 
                }
            }
            return item;
        }),
        inventoryHistory: [
            ...appData.inventoryHistory,
            newHistory
        ]
    }

    return {
        success: true,
        data: updatedAppData
    };
}

export default adjustInventory;