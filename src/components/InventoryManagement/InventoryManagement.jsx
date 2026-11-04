import { useState } from "react";
import ItemList from "./ItemList";
import ItemInteraction from "./ItemInteraction";
import { useNavigate } from "react-router";
import "./InventoryManagement.css"
import { useInventoryNavigation } from "../../context/useInventoryNavigation";

function InventoryManagement(){
    const { inventoryView, setInventoryView, closeAllPanels } = useInventoryNavigation();
    const [selectedItem, setSelectedItem] = useState(null);
    const navigate = useNavigate();
    
    return (
        <div className="inventory-management">
            <h1>在庫管理</h1>
                 
            <ItemList 
                setSelectedItem={setSelectedItem}
                setInventoryView={setInventoryView}
            />

            <div className="item-interaction-container">
                {inventoryView === "item" && (
                    <div 
                        className="interaction-backdrop"
                        onClick={closeAllPanels}
                    />
                )}
        
                <ItemInteraction
                    key={selectedItem}
                    selectedItem={selectedItem}
                    inventoryView={inventoryView}
                    setInventoryView={setInventoryView}
                />
            </div>

            <button
                type="button"
                className="back-to-home-button clickable-button"
                onClick={() => navigate("/")}
            >⬅︎
            </button>
        </div>
    )
}

export default InventoryManagement;