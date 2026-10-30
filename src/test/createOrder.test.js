import { describe, it, expect } from "vitest";
import { testAppData } from "./fixtures";
import createOrder from "../operations/createOrder";

describe("createOrder", () => {
    const appData = testAppData;

    it("should return updated data with a new order", () => {
        const result = createOrder(
            appData,
            "item-1",
            "3" 
        )
        
        expect(result.success).toBe(true);
        expect(result.data.items.find(item => item.id === "item-1").pendingOrders.length).toBe(3);
        });

    it("should return an object that indicates error when the item's replenishment method is not ordering", () => {
        const result = createOrder(
            appData, 
            "item-2",
            "3"
        )

        expect(result.error).toBe("CAN_NOT_ORDER");
    });

    it("should return an error object when the input is below zero", () => {
        const  result = createOrder(
            appData,
            "item-1",
            "-1"
        );
        expect(result.success).toBe(false);
        expect(result.error).toBe("INVALID_QUANTITY");
    });

    it("should return an error object when the input has more than one decimal places", () => {
        const result = createOrder(
            appData,
            "item-1",
            "1.11"
        );
        expect(result.success).toBe(false);
        expect(result.error).toBe("INVALID_QUANTITY");
    });

    it("should return an error object when the input is NaN", () => {
        const result = createOrder(
            appData,
            "item-1",
            NaN
        );
        expect(result.success).toBe(false);
        expect(result.error).toBe("INVALID_QUANTITY");
    })
})