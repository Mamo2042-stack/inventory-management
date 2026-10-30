import { describe, it, expect } from "vitest";
import { testAppData } from "./fixtures";
import deleteItem from "../operations/deleteItem";

describe("deleteItem", () => {

    const appData = testAppData;

    it("should delete an item from a storage the item is stored", () => {
        const result = deleteItem(
            appData,
            "item-2"
        )
        
        expect(result.success).toBe(true);
        expect(!result.data.items.some(item => item.id === "item-2"));
    });

    it("should return error when any items are not found", () => {
        const result = deleteItem(
            appData,
            "item-111"
        )

        expect(result.success).toBe(false);
    })
})