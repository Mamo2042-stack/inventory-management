
import { createContext, useContext, useState } from "react";

const InventoryNavigationContext = createContext(null);

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

export function useInventoryNavigation() {
    const context = useContext(InventoryNavigationContext);

    if (context === null) {
        throw new Error(
            "useInventoryNavigation must be used within InventoryNavigationProvider"
        );
    }

    return context;
}
