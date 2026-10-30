import { describe, it, expect } from "vitest";
import adjustInventory from "../operations/adjustInventory";
import { testAppData } from "./fixtures";

describe("adjustInventory", () => {
    const testData = testAppData;
    
    it("should return updated appData when inventory increases", () => {
        const appData = {
    storages: [
        {
            id: 1,
            name: "FreezerA"
        }
    ],
    items: [
        {
            id: "item-1", 
            name: "Bacon",
            storageId: 1,
            quantity: 3,
            expectedQuantity: 5,
            replenishmentMethod: "ORDER",
            category: "meat",
            storageUnit: "box",
            pendingOrders: []
        }
    ],
    inventoryHistory: [
    ]
};

        const result = adjustInventory(
            appData,
            "item-1",
            5
        );

        expect(result.data.items[0].quantity).toBe(5);
        expect(result.data.inventoryHistory[0].userAction).toBe("INCREASE_QUANTITY")
    });

    it("should return updated appData when inventory decrease", () => {
    const appData = {
        storages: [],
        items: [
        {
            id: "item-1",
            name: "Chicken",
            quantity: 5
        }
        ],
        inventoryHistory: []
    };

    const result = adjustInventory(
        appData,
        "item-1",
        2
    );

    expect(result.data.items[0].quantity).toBe(2);
    expect(result.data.inventoryHistory[0].userAction).toBe("DECREASE_QUANTITY");
    });

    it("should return error object when a quantity is below zero", () => {
    const appData = {
        storages: [],
        items: [
        {
            id: "item-1",
            name: "Chicken",
            quantity: 5
        }
        ],
        inventoryHistory: []
    };
    
    const result = adjustInventory(
        appData,
        "item-1",
        -2
    );

    expect(result.success).toBe(false);
    })

    it("should return a inventoryHistory with a corresponding userAction", () => {
        const appData = {
    storages: [
        {
            id: 1,
            name: "FreezerA"
        }
    ],
    items: [
        {
            id: "item-1", 
            name: "Bacon",
            storageId: 1,
            quantity: 3,
            expectedQuantity: 5,
            replenishmentMethod: "ORDER",
            category: "meat",
            storageUnit: "box",
            pendingOrders: []
        }
    ],
    inventoryHistory: [
    ]
};

        const result = adjustInventory(
            appData,
            "item-1",
            8
        );
        expect(result.data.inventoryHistory[0].userAction).toBe("INCREASE_QUANTITY")
    });

    it("should return an error object when the input is NaN", () => {
        const result = adjustInventory(
            testData,
            "item-1",
            NaN
        );

        expect(result.success).toBe(false);
        expect(result.error).toBe("INVALID_NUMBER");
    });

    it("should return an error object when the input is infinite", () => {
        const result = adjustInventory(
            testData,
            "item-1",
            Infinity
        );
        expect(result.success).toBe(false);
        expect(result.error).toBe("INVALID_NUMBER");
    })

    it("should return an error object when the input is over 10000", () => {
        const result = adjustInventory(
            testData,
            "item-1",
            10001
        );
        expect(result.success).toBe(false);
        expect(result.error).toBe("INVALID_QUANTITY");
    })
});