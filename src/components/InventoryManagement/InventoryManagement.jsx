import { useState } from "react";
import ItemList from "./ItemList";
import ItemInteraction from "./ItemInteraction";
import { useNavigate } from "react-router";

function InventoryManagement(){
    const [inventoryView, setInventoryView] = useState("item-list");
    const [selectedItem, setSelectedItem] = useState(null);
    const navigate = useNavigate();
    
    return (
        <div>
            <h1>在庫管理</h1>
                 
            <ItemList 
                setSelectedItem={setSelectedItem}
                setInventoryView={setInventoryView}
            />

            
            {inventoryView === "item" && (
                <ItemInteraction
                    key={selectedItem}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    setInventoryView={setInventoryView}
                />
            )}

            <button
                type="button"
                onClick={() => navigate("/")}
            >⇠
            </button>
        </div>
    )
}

export default InventoryManagement;