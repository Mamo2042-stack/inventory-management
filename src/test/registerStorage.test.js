import { describe, it, expect } from "vitest";
import registerStorage from "../operations/registerStorage";
import { testAppData } from "./fixtures";

describe("registerStorage", () => {
    const appData = testAppData;

    it("should return an error object when it receives a duplicate", () => {
        const result = registerStorage(
            appData,
            {
                name: "Freezer A"
            }
        );

        expect(result.error).toBe("DUPLICATE_NAME");
    });

    it("should return a new storage object when an input is valid", () => {
        const result = registerStorage(
            appData,
            {
                name: "ストッカー2"
            }
        );

        expect(result.success).toBe(true);
        expect(result.data.storages.some(storage => storage.name === "ストッカー2")).toBe(true);
    });

    it("should return an error object when the input is empty", () => {
        const result = registerStorage(
            appData,
            {
                name: ""
            }
        );
        expect(result.success).toBe(false);
        expect(result.error).toBe("EMPTY_STRING");
    });

    it("should return an error object when the input name is too long", () => {
        const result = registerStorage(
            appData,
            {
                name: "AAAAAAAAAAAAAAAAAAAAAA"
            }
        );

        expect(result.success).toBe(false);
        expect(result.error).toBe("TOO_MANY_LETTERS");
    })
});
