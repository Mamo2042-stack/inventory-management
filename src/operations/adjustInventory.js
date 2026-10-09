function adjustInventory (appData, itemId, quantity, direction) {
    const selectedItem = appData.items.filter(item => item.id === itemId )[0];
    const previousQuantity = selectedItem.quantity
    let newQuantity;


    //Validation//
    if(!selectedItem){
        return {
            success: false,
            error: "ITEM_NOT_FOUND"
        }
    }

    if(quantity <= 0){
        return {
            success: false,
            error: "INVALID_QUANTITY"
        }
    }

    if(direction === "decrease"){
        if(quantity > selectedItem.quantity){
            return {
                success: false,
                error: "INSUFFICIENT_STOCK"
            }
        }
    }

    
    //End of the validation//

    if(direction === "increase"){
        newQuantity = selectedItem.quantity + quantity;
    } else {
        newQuantity = selectedItem.quantity - quantity;
    }

    //Create a history records//
    const newHistory = {
        id: crypto.randomUUID(),
        itemId: itemId,
        userAction: direction === "increase" ? "INCREASE_QUANTITY" : "DECREASE_QUANTITY",
        previousQuantity: previousQuantity,
        newQuantity: newQuantity,
        timestamp: new Date().toISOString()
    }

    const updatedAppData = {
        ...appData,
        items: appData.items.map(item => {
            if(item.id === itemId){
                return {
                    ...item,
                    quantity: newQuantity
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