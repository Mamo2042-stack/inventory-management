function registerStorage(appData, storageData){
    const inputName = storageData.name;
    const normalizedName = inputName.trim().normalize("NFKC");

    //Validation//
    if(!inputName.trim()){
        return {
            success: false,
            error: "EMPTY_STRING"
        }
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
        name: inputName
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