function registerItem (appData, itemData) {
    const {name, storageId, category, expectedQuantity, replenishmentMethod, storageUnit} = itemData;
    let result = {
        success: false,
        error: []
    }
    //Validation//
    const normalizedName = name.trim().normalize("NFKC");
    const isDuplicate = appData.items.some(item => 
        item.name.normalize("NFKC") === normalizedName
    );
    if(isDuplicate){
        result.error.push("DUPLICATE_NAME");
    }

    const doesStorageExist = appData.storages.some(storage => storage.id === storageId);
    if(!doesStorageExist){
        result.error.push("NO_STORAGE");
    }

    if(expectedQuantity && Number(expectedQuantity) < 0){
        result.error.push("INVALID_EXPEC_NUM");
    }


    if(result.error.length){
        return result;
    }
    //End of Validation//

    let newItem = {
        id: crypto.randomUUID(),
        name: name,
        storageId: storageId,
        quantity: 0,
        expectedQuantity: Number(expectedQuantity),
        replenishmentMethod: replenishmentMethod,
        category: category,
        storageUnit: storageUnit,
    }

    if(replenishmentMethod === "ORDER"){
        newItem = {
            ...newItem,
            pendingOrders: []
        }
    }

    const updatedData = {
        ...appData,
        items: [
            ...appData.items,
            newItem
        ]
    }

    result = {
        success: true,
        data: updatedData
    }

    return result;
}

export default registerItem;