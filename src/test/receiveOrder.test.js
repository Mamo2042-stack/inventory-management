import { describe, it, expect } from "vitest";
import { testAppData } from "./fixtures";
import receiveOrder from "../operations/receiveOrder";

const appData = testAppData;

describe("receiveOrder.js", () => {
    it("should return an object with updated data when input is valid", () => {

        const result = receiveOrder(
            appData,
            "item-1",
            301,
            3
        )

        expect(result.type).toBe("PARTIAL");
    });

    it("should remove the order when it's fully received", () => {
        
        console.log(appData)

        const result = receiveOrder(
            appData,
            "item-1",
            301,
            5
        )

        console.log(result.data.items.find(item => item.id === "item-1"))

        expect(result.type).toBe("FULL")
    });

    it("should return an error object when input quantity is over the remaining quantity", () => {
        
        const result = receiveOrder(
            appData,
            "item-1",
            301,
            6
        )

        expect(result.error).toBe("INSUFFICIENT_QUANTITY");
    });
})