import { isValidQuantity } from "../utils/isValidQuantity";

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

    if(!isValidQuantity(expectedQuantity)){
        if(typeof expectedQuantity === "string"){

            if(expectedQuantity.trim() !== ""){ // excludes an empty input //
                result.error.push("INVALID_NUMBER");         
            }

        } else {
            result.error.push("INVALID_NUMBER");
        }
    } else if(Number(expectedQuantity) < 0 || Number(expectedQuantity) > 1000){
        result.error.push("INVALID_QUANTITY");
    }


    if(result.error.length){
        return result;
    }
    //End of Validation//

    const convertedExpectedQuantity = 
        expectedQuantity.trim() === "" || Number(expectedQuantity) === 0 ?
        0 :
        Number(expectedQuantity) * 10;

    let newItem = {
        id: crypto.randomUUID(),
        name: name,
        storageId: storageId,
        quantity: 0,
        expectedQuantity: convertedExpectedQuantity,
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