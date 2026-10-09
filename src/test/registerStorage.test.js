import { describe, it, expect } from "vitest";
import registerStorage from "../operations/registerStorage";

describe("registerStorage", () => {
    it("should return an error object when it receives a duplicate", () => {
        const appData = {
            storages: [
                {
                    id: 1,
                    name : "ストッカー１"
                }
            ],
            items: [],
            inventoryHistory: []
        };

        const result = registerStorage(
            appData,
            {
                name: "ストッカー1"
            }
        );

        expect(result.error).toBe("DUPLICATE_NAME");
    })
});

describe("registerStorage", () => {
    it("should return a new storage object when an input is valid", () => {
        const appData = {
            storages: [
                {
                    id: 1,
                    name : "ストッカー１"
                }
            ],
            items: [],
            inventoryHistory: []
        };

        const result = registerStorage(
            appData,
            {
                name: "ストッカー2"
            }
        );

        expect(result.success).toBe(true);
    })
});
