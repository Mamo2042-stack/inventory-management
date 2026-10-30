import { describe, expect, it } from "vitest";
import deleteStorage from "../operations/deleteStorage";
import { testAppData } from "./fixtures";

const appData = testAppData;

describe("deleteStorage", () => {
    it("should return appData with a specified storage removed under valid condition", () => {
        const result = deleteStorage(
            appData,
            "storage-2"
        )

        expect(result.success).toBe(true);
        expect(!result.data.storages.some(storage => storage.id === "storage-2"))
    })

    it("should return an object with an error message when condition is not satisfied", () => {
        const result = deleteStorage(
            appData,
            "storage-1"
        )

        expect(result.error).toBe("ITEM_EXIST")
    })
})

