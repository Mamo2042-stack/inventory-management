import { useState } from "react";
import { InventoryNavigationContext } from "./InventoryNavigationContext";

export function InventoryNavigationProvider({ children }) {
    const [inventoryView, setInventoryView] = useState("item-list");
    const [deeperSection, setDeeperSection] = useState(null);
    const [anyDetailModal, setAnyDetailModal] = useState(null);

    function closeAllPanels() {
        setDeeperSection(null);
        setInventoryView("item-list");
        setAnyDetailModal(null);
    }

    const value = {
        inventoryView,
        setInventoryView,
        deeperSection,
        setDeeperSection,
        anyDetailModal,
        setAnyDetailModal,
        closeAllPanels
    };

    return (
        <InventoryNavigationContext.Provider value={value}>
            {children}
        </InventoryNavigationContext.Provider>
    );
}
