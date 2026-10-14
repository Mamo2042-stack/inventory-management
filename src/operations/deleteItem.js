function deleteItem(appData, itemId){
    const doesExist = appData.items.some(item => item.id === itemId);
    if(!doesExist){
        return {
            success: false,
            error: "ITEM_NOT_FOUND"
        }
    }

    const updatedData = {
        ...appData,
        items: appData.items.filter(item => item.id !== itemId),
        inventoryHistory: appData.inventoryHistory.filter(history => history.itemId !== itemId)
    };

    return {
        success: true,
        data: updatedData
    }
}

export default deleteItem;