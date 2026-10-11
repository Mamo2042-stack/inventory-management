import { useAppData } from "../../context/AppDataContext";
import { testAppData } from "../../test/fixtures";
import { useState } from "react";
import adjustInventory from "../../operations/adjustInventory";

function ItemInteraction ({ selectedItem, setSelectedItem, setInventoryView }){
    const { items } = testAppData;
    const displayItem = items.filter(item => item.id === selectedItem)[0];
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
            <h1>{displayItem.name}</h1>

            <form 
                id="quantity-control"
                onSubmit={handleSubmit}
            >
                <h2>数量変更</h2>
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


            <button
                type="button"
                onClick={() => {
                    setSelectedItem(null)
                    setInventoryView("item-list")
                }}>閉じる
            </button>
        </div>
    )
}

export default ItemInteraction;