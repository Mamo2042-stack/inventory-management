import InventoryHistoryList from "./InventoryHistoryList";
import "./InventoryHistoryView.css"
import { MoveLeft } from "lucide-react";

function InventoryHistoryView({ setDeeperSection, selectedItem }){

    return (
        <section className="inventory-history-view">
            <InventoryHistoryList
                selectedItem={selectedItem}
            />

            <button
                type="button"
                onClick={() => setDeeperSection(null)}
            ><MoveLeft size={18} />
            </button>
        </section>
    )
}

export default InventoryHistoryView;