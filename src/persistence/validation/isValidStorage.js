 export function isValidStorage(storage){
    if (
        storage === null ||
        typeof storage !== "object" ||
        Array.isArray(storage)
    ) {
        return false;
    }

    if(!Object.hasOwn(storage, "id") || !Object.hasOwn(storage, "name")){
        return false;
    }

    const { id, name } = storage;
    if(typeof id !== "string" || typeof name !== "string"){
        return false;
    }

    if(id.trim() === "" || name.trim() === ""){
        return false;
    }

    return true;
}