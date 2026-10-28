import { useAppData } from "../../context/AppDataContext";
import { useState, useEffect } from "react";
import adjustInventory from "../../operations/adjustInventory";
import PendingOrdersManagement from "./OrderManagement/PendingOrdersManagement";
import InventoryHistoryView from "./HistoryManagement/InventoryHistoryView";
import calUpcomingQuantity from "../../utils/calUpcomingQuan";
import "./ItemInteraction.css"
import { useInventoryNavigation } from "../../context/InventoryNavigationContext";

function ItemInteraction ({ selectedItem, inventoryView, setInventoryView }){
    const { appData, setAppData } = useAppData();
    const { items } = appData;
    const [isVisible, setIsVisible] = useState(false);
    const { deeperSection, setDeeperSection, closeAllPanels } = useInventoryNavigation();//deeperSection holds null, pending, or history//
    const [isClickable, setIsClickable] = useState();

    useEffect(() => {
        if(inventoryView === "item") {
            requestAnimationFrame(() => {
                setIsVisible(true);
            });
        } else {
            setIsVisible(false);
        }
    }, [inventoryView, selectedItem])

    const displayItem = items.find(item => item.id === selectedItem);
    const [tempQuan, setTempQuan] = useState(displayItem?.quantity ?? 0);//This is only used to display current quantity and reflects users' change responsively//
    if(!displayItem){
        return null;
    }

    useEffect(() => {
        setTempQuan(displayItem.quantity)
    }, [items])

    const upcomingQuantity = calUpcomingQuantity(displayItem);

    function handleClick(e){
        setDeeperSection(e.target.name);
    }

    function handleChange(e){
        const value = e.target.value;

        setTempQuan(Number(value));

        if(/^\d*\.?\d?$/.test(value)){
            setIsClickable(false);
        } else {
            setIsClickable(true);
        }
    }

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
        <section>
            <div className={`item-interaction 
                ${isVisible ? "is-open" : ""}`}
                onTransitionEnd={e => {
                    if(
                        e.target === e.currentTarget &&
                        e.propertyName === "transform" && 
                        inventoryView !== "item"
                    ){
                        setTempQuan(displayItem.quantity)
                        setInventoryView("item-list");
                    }
                }}>

                <h3>{displayItem.name}</h3>

                {deeperSection === null && (
                <div className="regular-section"> 

                    <h4>数量変更</h4>

                    <form 
                        onSubmit={handleSubmit}
                    >
                        <div className="quantity-control">
                            <button 
                                type="button"
                                name="decrease"
                                onClick={() => setTempQuan(previous =>  Math.round((previous - 1) * 10 ) / 10)}
                                disabled={tempQuan <= 0}
                            >-</button>

                            <input
                                type="number"
                                className="quantity"
                                min="0"
                                max="1000"
                                step="0.1"
                                value={tempQuan}
                                onChange={e => handleChange(e)}
                            />

                            <button
                                type="button"
                                name="increase"
                                onClick={() => setTempQuan(previous => Math.round((previous + 1) * 10 ) / 10)}
                            >+
                            </button>

                            {upcomingQuantity ? (
                                <p className="additional-info"> + (注文済み {upcomingQuantity})</p>
                                ) 
                                : 
                                <p className="additional-info"></p>
                            }

                            <button
                                type="submit"
                                className="confirmation-btn"
                                disabled={isClickable || displayItem.quantity === tempQuan}
                            >確定
                            </button>                        
                        </div>
                    </form>
                
                    <div className="deeper-section">
                        {displayItem.replenishmentMethod === "ORDER" && (
                            <button
                                type="button"
                                name="pending"
                                onClick={(e) => handleClick(e)}
                            >⬅︎ 注文
                            </button>
                        )}

                        <button
                            type="button"
                            name="history"
                            onClick={(e) => handleClick(e)}
                        >ヒストリー ➡
                        </button>
                    </div>      
                </div>
                )}         

                {deeperSection === "pending" && (
                    <PendingOrdersManagement
                        selectedItem={selectedItem}
                        setDeeperSection={setDeeperSection}
                    />
                )}

                {deeperSection === "history" && (
                    <InventoryHistoryView
                        setDeeperSection={setDeeperSection}
                        selectedItem={selectedItem}
                    />
                )}

                <button
                    type="button"
                    className="exit"
                    onClick={closeAllPanels}>✕
                </button> 
            </div>
        </section>
    )
}

export default ItemInteraction;