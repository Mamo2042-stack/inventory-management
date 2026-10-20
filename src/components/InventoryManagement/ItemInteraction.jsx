import { useAppData } from "../../context/AppDataContext";
import { useState } from "react";
import adjustInventory from "../../operations/adjustInventory";
import PendingOrdersManagement from "./OrderManagement/PendingOrdersManagement";
import InventoryHistoryView from "./HistoryManagement/InventoryHistoryView";
import calUpcomingQuantity from "../../utils/calUpcomingQuan";

function ItemInteraction ({ selectedItem, setSelectedItem, setInventoryView }){
    const { appData, setAppData } = useAppData();
    const { items } = appData;
    const displayItem = items.find(item => item.id === selectedItem);
    const [deeperSection, setDeeperSection] = useState(null);//Holds null, pending, or history//
    const [tempQuan, setTempQuan] = useState(displayItem.quantity);//This is only used to display current quantity and reflects users' change responsively//
    const upcomingQuantity = calUpcomingQuantity(displayItem);

    function handleSubmit(e){
        e.preventDefault();

        const confirmedQuanData = adjustInventory(appData, selectedItem, tempQuan);

        if(!confirmedQuanData.success){
            console.log(confirmedQuanData.error);
            return;
        }

        setAppData(confirmedQuanData.data);
    }

    return (
        <section id="item-interaction">
            <h3>{displayItem.name}</h3>

            <form 
                id="quantity-control"
                onSubmit={handleSubmit}
            >
                <h4>数量変更</h4>
                <button 
                    type="button"
                    name="decrease"
                    onClick={() => setTempQuan(previous => previous - 1)}
                    disabled={tempQuan <= 0}
                >-</button>
                    <p>
                        {tempQuan}
                    </p>
                    {upcomingQuantity ? (
                            <p> + (注文済み {upcomingQuantity})</p>
                        ) 
                        : 
                        ""
                    }
                <button
                    type="button"
                    name="increase"
                    onClick={() => setTempQuan(previous => previous + 1)}
                >+
                </button>

                <button
                    type="submit"
                    id="confirmation-btn"
                    disabled={displayItem.quantity === tempQuan}
                >確定
                </button>
            </form>

            {displayItem.replenishmentMethod === "ORDER" && (
                <button
                    type="button"
                    onClick={() => setDeeperSection("pending")}
                >注文
                </button>
            )}

            <button
                type="button"
                onClick={() => setDeeperSection("history")}
            >ヒストリー
            </button>
            
            <button
                type="button"
                onClick={() => {
                    setSelectedItem(null)
                    setInventoryView("item-list")
                }}>✕
            </button>

            {deeperSection === "pending" && (
                <PendingOrdersManagement
                    selectedItem={selectedItem}
                    setDeeperSection={setDeeperSection}
                    setInventoryView={setInventoryView}
                />
            )}

            {deeperSection === "history" && (
                <InventoryHistoryView
                    setInventoryView={setInventoryView}
                    selectedItem={selectedItem}
                />
            )}

        </section>
    )
}

export default ItemInteraction;