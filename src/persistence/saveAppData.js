const STORAGE_KEY = "inventory-management:appData"

export function saveAppData(appData){
    try{ 
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(appData)
        )
    } catch (error){
        console.error("Failed to save inventory data:", error);
    }
}