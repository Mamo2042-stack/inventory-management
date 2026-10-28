function registerItem (appData, itemData) {
    const {name, storageId, category, expectedQuantity, replenishmentMethod, storageUnit} = itemData;
    let result = {
        success: false,
        error: []
    }
    //Validation//
    const normalizedName = name.trim().normalize("NFKC");

    if(normalizedName === ""){
        result.error.push("EMPTY_INPUT");
    }

    if(normalizedName.length > 10){
        result.error.push("TOO_MANY_LETTERS_NAME")
    }

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

    if(!storageUnit.trim()){
        result.error.push("NO_STORAGE_UNIT");
    }

    if(storageUnit.trim().length > 8){
        result.error.push("TOO_MANY_LETTERS_UNIT")
    }

    if(Number(expectedQuantity)){
        if(Number(expectedQuantity) < 0 || Number(expectedQuantity) > 100){
            result.error.push("INVALID_NUMBER");
        }
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
        expectedQuantity: Number(expectedQuantity) * 10 ?? undefined,
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