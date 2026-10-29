export const APP_DATA_STORAGE_KEY = "inventory-management:appData";

export function createEmptyAppData() {
    return {
        storages: [],
        items: [],
        inventoryHistory: []
    };
}

function isObjectRecord(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function isValidAppData(data) {
    return (
        isObjectRecord(data) &&
        Array.isArray(data.storages) &&
        data.storages.every(isObjectRecord) &&
        Array.isArray(data.items) &&
        data.items.every(isObjectRecord) &&
        Array.isArray(data.inventoryHistory) &&
        data.inventoryHistory.every(isObjectRecord)
    );
}

/**
 * Returns an explicit status so callers can distinguish first launch from
 * corrupted data and storage-access failures.
 *
 * Pass a storage-like object in tests. In the browser, localStorage is read
 * inside the try block because accessing window.localStorage can itself throw.
 */
export function loadAppData(storageOverride) {
    try {
        const storage = storageOverride ?? window.localStorage;
        const rawData = storage.getItem(APP_DATA_STORAGE_KEY);

        if (rawData === null) {
            return {
                data: createEmptyAppData(),
                status: "missing"
            };
        }

        let parsedData;

        try {
            parsedData = JSON.parse(rawData);
        } catch (error) {
            return {
                data: createEmptyAppData(),
                status: "invalid",
                reason: "malformed-json",
                error
            };
        }

        if (!isValidAppData(parsedData)) {
            return {
                data: createEmptyAppData(),
                status: "invalid",
                reason: "invalid-structure"
            };
        }

        return {
            data: parsedData,
            status: "loaded"
        };
    } catch (error) {
        return {
            data: createEmptyAppData(),
            status: "unavailable",
            reason: "read-failed",
            error
        };
    }
}

/**
 * The first render should create an empty saved record only when no record
 * exists. It must not automatically replace data that could not be read.
 */
export function shouldSaveInitialData(loadStatus) {
    return loadStatus === "missing";
}

export function saveAppData(appData, storageOverride) {
    if (!isValidAppData(appData)) {
        return {
            success: false,
            reason: "invalid-data"
        };
    }

    try {
        const storage = storageOverride ?? window.localStorage;
        storage.setItem(APP_DATA_STORAGE_KEY, JSON.stringify(appData));

        return { success: true };
    } catch (error) {
        return {
            success: false,
            reason: "write-failed",
            error
        };
    }
}
