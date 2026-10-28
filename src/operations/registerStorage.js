function registerStorage(appData, storageData){
    const {name} = storageData;
    const normalizedName = name.trim().normalize("NFKC");

    //Validation//
    if(!name.trim()){
        return {
            success: false,
            error: "EMPTY_STRING"
        }
    }

    if(normalizedName.length > 15){
        return {
            success: false,
            error: "TOO_MANY_LETTERS"
        };
    }

    const isDuplicate = appData.storages.some(
        storage => 
            storage.name.trim().normalize("NFKC") === normalizedName
    );

    if(isDuplicate){
        return {
            success: false,
            error: "DUPLICATE_NAME"
        }
    }
    //End Validation//

    const newStorage = {
        id: crypto.randomUUID(),
        name: name
    }

    const updatedData = {
        ...appData,
        storages: [
            ...appData.storages,
            newStorage
        ]
    }

    return {
        success: true,
        data: updatedData
    };
}

export default registerStorage;