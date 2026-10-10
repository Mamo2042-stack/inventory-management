import { describe, it, expect } from "vitest";
import registerItem from "../operations/registerItem";

describe("registerItem", () => {
    it("should return a new item object when all input is valid", () => {
        const appData = {
            storages: [{
                id: "1",
                name: "冷凍庫A"
            }],
            items: [
               {   
                id: 1,
                name: "ベーコン",
                storageId: "1",
                category: "meat",
                quantity: 3,
                expectedQuantity: 3,
                replenishmentMethod: "ORDER",
                storageUnit: "箱", 
                pendingOrders: []               
               }
            ],
            inventoryHistory: []
        }

        const result = registerItem(
            appData,
            {
                name: "いか",
                storageId: "1",
                category: "seafood",
                expectedQuantity: "2",
                replenishmentMethod: "ORDER",
                storageUnit: "袋",                
            }
        );

        console.log(result);

        expect(result.success).toBe(true);
    })

    it("should return a new item object with no pendingOrders attached", () => {
        const appData = {
            storages: [{
                id: "1",
                name: "冷凍庫A"
            }],
            items: [
               {   
                id: 1,
                name: "ベーコン",
                storageId: "1",
                category: "meat",
                quantity: 3,
                expectedQuantity: 3,
                replenishmentMethod: "ORDER",
                storageUnit: "箱", 
                pendingOrders: []               
               }
            ],
            inventoryHistory: []
        }

        const result = registerItem(
            appData,
            {
                name: "いか",
                storageId: "1",
                category: "seafood",
                expectedQuantity: "2",
                replenishmentMethod: "PURCHASE",
                storageUnit: "袋",                
            }
        );

        console.log(result);

        expect(result.success).toBe(true);
    })

    it("should return all types of the error", () => {
        const appData = {
            storages: [{
                id: "1",
                name: "冷凍庫A"
            }],
            items: [
               {   
                id: 1,
                name: "ベーコン",
                storageId: "1",
                category: "meat",
                quantity: 3,
                expectedQuantity: 3,
                replenishmentMethod: "ORDER",
                storageUnit: "箱", 
                pendingOrders: []               
               }
            ],
            inventoryHistory: []
        }

        const result = registerItem(
            appData,
            {
                name: "ベーコン",
                storageId: "3",
                category: "seafood",
                expectedQuantity: "-2",
                replenishmentMethod: "PURCHASE",
                storageUnit: "袋",                
            }
        );

        console.log(result);

        expect(result.success).toBe(false);
    })


})