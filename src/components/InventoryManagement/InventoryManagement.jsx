import { useState } from "react";
import ItemList from "./ItemList";
import ItemInteraction from "./ItemInteraction";
import { testAppData } from "../../test/fixtures";

function InventoryManagement(){
    const [inventoryView, setInventoryView] = useState("item-list");
    const [selectedItem, setSelectedItem] = useState(null);
    return (
        <section>
            <ItemList 
                setSelectedItem={setSelectedItem}
                setInventoryView={setInventoryView}
            />

            {inventoryView === "item" && (
                <ItemInteraction
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    setInventoryView={setInventoryView}
                />
            )}
        </section>

    )
}

export default InventoryManagement;