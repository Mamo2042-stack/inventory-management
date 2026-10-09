import { describe, it, expect } from "vitest";
import adjustInventory from "../operations/adjustInventory";

describe("adjustInventory", () => {
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
            2,
            "increase"
        );

        expect(result.data.items[0].quantity).toBe(5);

    });

    it("should return updated appData when inventory decreases", () => {
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
        2,
        "decrease"
    );

    expect(result.data.items[0].quantity).toBe(3);
    });

    it("should return error object when a quantity is below or equal to zero", () => {
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
        -2,
        "decrease"
    );

    expect(result.success).toBe(false);
    })

});