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
    const { deeperSection, setDeeperSection } = useInventoryNavigation();//Holds null, pending, or history//

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

                {deeperSection === null && (
                <div className="regular-section">
                
                    <h3>{displayItem.name}</h3>

                    <form 
                        onSubmit={handleSubmit}
                    >
                        <h4>数量変更</h4>

                        <div className="quantity-control">
                            <button 
                                type="button"
                                name="decrease"
                                onClick={() => setTempQuan(previous =>  previous - 1)}
                                disabled={tempQuan <= 0}
                            >-</button>

                            <p className="quantity">
                                {tempQuan}
                            </p>

                            <button
                                type="button"
                                name="increase"
                                onClick={() => setTempQuan(previous =>      previous + 1)}
                            >+
                            </button>

                            {upcomingQuantity ? (
                                <p className="additional-info"> + (注文済み     {upcomingQuantity})</p>
                                ) 
                                : 
                                <p className="additional-info"></p>
                            }

                            <button
                                type="submit"
                                className="confirmation-btn"
                                disabled={displayItem.quantity === tempQuan}
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

                    <button
                        type="button"
                        className="exit"
                        onClick={() => {
                            setInventoryView("item-list")
                        }}>✕
                    </button>       
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
            </div>
        </section>
    )
}

export default ItemInteraction;