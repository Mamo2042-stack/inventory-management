function deleteStorage( appData, storageId ) {
    const selectedStorage = appData.storages.find(storage => storage.id === storageId);
    if(!selectedStorage){
        return {
            success: false,
            error: "NO_STORAGE_FOUND"
        }
    }

    const hasItems = appData.items.some(item => item.storageId === storageId);

    if(hasItems){
        return {
            success: false,
            error: "ITEM_EXIST"
        }
    }

    const updatedData = {
        ...appData,
        storages: appData.storages.filter(storage => storage.id !== storageId)
    }

    return {
        success: true,
        data: updatedData
    }
}
export default deleteStorage;