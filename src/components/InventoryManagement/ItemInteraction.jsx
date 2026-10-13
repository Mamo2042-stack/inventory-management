import { useAppData } from "../../context/AppDataContext";
import { testAppData } from "../../test/fixtures";
import { useState } from "react";
import adjustInventory from "../../operations/adjustInventory";
import PendingOrdersManagement from "./PendingOrdersManagement";

function ItemInteraction ({ selectedItem, setSelectedItem, setInventoryView }){
    const { items } = testAppData;
    const displayItem = items.find(item => item.id === selectedItem);
    const [deeperSection, setDeeperSection] = useState(null);
    const [tempQuan, setTempQuan] = useState(displayItem.quantity);//This is only used to display current quantity and reflects users' change responsively//
    const { appData, setAppData } = useAppData();

    function handleClick (){

    }

    function handleSubmit(e){
        e.preventDefault();

        const diff = displayItem.quantity - tempQuan;
        const confirmedQuanData = adjustInventory(appData, selectedItem, diff);

        setAppData(confirmedQuanData);
    }

    return (
        <div id="item-interaction">
            <h2>{displayItem.name}</h2>

            <form 
                id="quantity-control"
                onSubmit={handleSubmit}
            >
                <h3>数量変更</h3>
                <button 
                    type="button"
                    name="decrease"
                    onClick={() => setTempQuan(previous => previous - 1)}
                >-</button>
                    <p>{tempQuan}</p>
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
                }}>閉じる
            </button>

            <section>
                {deeperSection === "pending" && (
                    <PendingOrdersManagement
                        selectedItem={selectedItem}
                        setDeeperSection={setDeeperSection}
                    />
                )}
            </section>
        </div>
    )
}

export default ItemInteraction;