import { describe, it, expect } from "vitest";
import { testAppData } from "./fixtures";
import createOrder from "../operations/createOrder";

describe("createOrder", () => {
    it("should return updated data with a new order", () => {
        const appData = testAppData;

        const result = createOrder(
            appData,
            "item-1",
            "3" 
        )
        
        expect(result.success).toBe(true);
        console.log(result.data.items.find(item => item.id === "item-1"));
    });

    it("should return an object that indicates errro when input is invalid", () => {
        const appData = testAppData;

        const result = createOrder(
            appData, 
            "item-2",
            "3"
        )

        expect(result.error).toBe("CAN_NOT_ORDER")
 })})