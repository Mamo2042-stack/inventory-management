import InventoryHistoryList from "./InventoryHistoryList";

function InventoryHistoryView({ setInventoryView, selectedItem }){

    return (
        <section>
            <InventoryHistoryList
                selectedItem={selectedItem}
            />

            <button
                type="button"
                onClick={() => setInventoryView("item-list")}
            >❌
            </button>
        </section>
    )
}

export default InventoryHistoryView;