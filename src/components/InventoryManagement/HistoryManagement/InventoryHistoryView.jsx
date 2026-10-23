import InventoryHistoryList from "./InventoryHistoryList";

function InventoryHistoryView({ setDeeperSection, selectedItem }){

    return (
        <section>
            <InventoryHistoryList
                selectedItem={selectedItem}
            />

            <button
                type="button"
                onClick={() => setDeeperSection(null)}
            >✕
            </button>
        </section>
    )
}

export default InventoryHistoryView;