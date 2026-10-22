import { useState } from "react";
import ItemList from "./ItemList";
import ItemInteraction from "./ItemInteraction";
import { useNavigate } from "react-router";
import "./InventoryManagement.css"

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

            <div>
                {inventoryView === "item" && (
                    <div 
                        className="interaction-backdrop"
                        onClick={() => setInventoryView("item-list")}
            />
                )}
        
                <ItemInteraction
                    key={selectedItem}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    inventoryView={inventoryView}
                    setInventoryView={setInventoryView}
                />
            </div>

            <button
                type="button"
                onClick={() => navigate("/")}
            >⇠
            </button>
        </div>
    )
}

export default InventoryManagement;