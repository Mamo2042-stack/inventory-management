import InventoryHistoryList from "./InventoryHistoryList";
import "./InventoryHistoryView.css"

function InventoryHistoryView({ setDeeperSection, selectedItem }){

    return (
        <section className="inventory-history-view">
            <InventoryHistoryList
                selectedItem={selectedItem}
            />

            <button
                type="button"
                onClick={() => setDeeperSection(null)}
            >⬅︎
            </button>
        </section>
    )
}

export default InventoryHistoryView;