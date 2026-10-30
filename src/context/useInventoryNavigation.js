import { useContext } from "react";
import {InventoryNavigationContext} from "./InventoryNavigationContext"

export function useInventoryNavigation() {
    const context = useContext(InventoryNavigationContext);

    if (context === null) {
        throw new Error(
            "useInventoryNavigation must be used within InventoryNavigationProvider"
        );
    }

    return context;
}