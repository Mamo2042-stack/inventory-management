import { describe, it, expect } from "vitest";
import { testAppData } from "./fixtures";
import receiveOrder from "../operations/receiveOrder";

const appData = testAppData;

describe("receiveOrder.js", () => {
    it("should return an object with updated data when input is valid", () => {
        const result = receiveOrder(
            appData,
            "item-1",
            "301",
            "3"
        )

        expect(result.type).toBe("PARTIAL");
        expect(result.data.items.find(item => item.id === "item-1").quantity / 10).toBe(8);
    });

    it("should return an updated data with the corresponding item's quantity and order's received quantity are updated when the order is partially received", () => {
        const result = receiveOrder(
            appData,
            "item-1",
            "301",
            "1"
        );

        expect(result.success).toBe(true);
        expect(result.type).toBe("PARTIAL");
        const selectedItem = result.data.items.find(item => item.id === "item-1");
        expect(selectedItem.quantity).toBe(60);
        const selectedOrder = selectedItem.pendingOrders.find(order => order.id === "301");
        expect(selectedOrder.receivedQuantity).toBe(60);
    })

    it("should remove the order when it's fully received", () => {
        const result = receiveOrder(
            appData,
            "item-1",
            "301",
            "5"
        )

        expect(result.type).toBe("FULL")
        expect(result.data.items.find(item => item.id === "item-1").pendingOrders.length).toBe(1);
    });

    it("should return an error object when input quantity is over the remaining quantity", () => {
        
        const result = receiveOrder(
            appData,
            "item-1",
            "301",
            "6"
        )

        expect(result.error).toBe("INSUFFICIENT_QUANTITY");
    });

    it("should return an error object when the ipnut is NaN", () => {
        const result = receiveOrder(
            appData,
            "item-1",
            "301",
            NaN
        )
        expect(result.success).toBe(false);
        expect(result.error).toBe("INVALID_NUMBER");
    });

    it("should return an error object when the input is an empty string", () => {
        const result = receiveOrder(
            appData,
            "item-1",
            "301",
            ""
        )

        expect(result.success).toBe(false);
        expect(result.error).toBe("INVALID_NUMBER");
    })

    it("should return an error object when the sum of the current and input quantity is over the capacity", () => {
        const result = receiveOrder(
            appData,
            "item-4",
            "303",
            "11"
        );

        expect(result.success).toBe(false);
        expect(result.error).toBe("INSUFFICIENT_SPACE_IN_STORAGE");
    });

    it("should remove the pending order from the item's list when the ordered quantity is fully received", () => {
        const result = receiveOrder(
            appData,
            "item-4",
            "304",
            "2"
        );
        expect(result.success).toBe(true);
        const selectedItem = result.data.items.find(item => item.id === "item-4");
        expect(selectedItem.pendingOrders.length).toBe(1);
        expect(selectedItem.quantity).toBe(9920);
    })
})