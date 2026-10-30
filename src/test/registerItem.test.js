import { describe, it, expect } from "vitest";
import registerItem from "../operations/registerItem";
import { testAppData } from "./fixtures";

describe("registerItem", () => {
    const appData = testAppData;

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

        expect(result.success).toBe(true);
        expect(result.data.items.some(item => item.name === "いか")).toBe(true);
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
        expect(result.success).toBe(true);
        expect(Object.hasOwn(result.data.items.find(item => item.name === "いか"), "pendingOrders")).toBe(false);
    })

    it("should return an error object when the input has a invalid expected quantity", () => {
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
                name: "Bacon",
                storageId: "1",
                category: "seafood",
                expectedQuantity: "-2",
                replenishmentMethod: "PURCHASE",
                storageUnit: "袋",                
            }
        );

        expect(result.success).toBe(false);
        expect(result.error.some(err => err === "INVALID_NUMBER")).toBe(true);
    });

    it("should return an error object when the item name already exists somewhere", () => {
        const result = registerItem(
            appData,
            {
                name: "Bacon",
                storageId: "storage-1",
                category: "seafood",
                expectedQuantity: "2",
                replenishmentMethod: "ORDER",
                storageUnit: "kg",                
            }
        );

        expect(result.success).toBe(false);
        expect(result.error.some(err => err === "DUPLICATE_NAME")).toBe(true);
    });

    it("should return the corresponding errors when the item name and storage unit are too long, the storage with the passed id does not exist, and the expected quantity is over 1000", () => {
        const result = registerItem(
            appData,
            {
                name: "Appleeeeeeeee",
                storageId: "storage-999",
                category: "vegetable",
                expectedQuantity: "1001",
                replenishmentMethod: "ORDER",
                storageUnit: "AAAAAAAAAAA"
            }
        );

        expect(result.success).toBe(false);
        const { error } = result;
        expect(error.some(err => err === "TOO_MANY_LETTERS_NAME")).toBe(true);
        expect(error.some(err => err === "NO_STORAGE")).toBe(true);
        expect(error.some(err => err === "INVALID_QUANTITY")).toBe(true);
        expect(error.some(err => err === "TOO_MANY_LETTERS_UNIT")).toBe(true);
        expect(error.length).toBe(4);
    });

    it("should return an error object when the input for expected quantity is NaN and storageUnit is empty", () => {
        const result = registerItem(
            appData,
            {
                name: "Apple",
                storageId: "storage-1",
                category: "vegetable",
                expectedQuantity: NaN,
                replenishmentMethod: "ORDER",
                storageUnit: ""
            }
        );

        expect(result.success).toBe(false);
        const { error } = result;
        expect(error.some(err => err === "INVALID_NUMBER")).toBe(true);
        expect(error.some(err => err === "NO_STORAGE_UNIT")).toBe(true);
        expect(error.length).toBe(2);
    })
})