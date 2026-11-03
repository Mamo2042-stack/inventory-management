import { useAppData } from "../../context/useAppData";
import { useState, useEffect } from "react";
import adjustInventory from "../../operations/adjustInventory";
import PendingOrdersManagement from "./OrderManagement/PendingOrdersManagement";
import InventoryHistoryView from "./HistoryManagement/InventoryHistoryView";
import calUpcomingQuantity from "../../utils/calUpcomingQuan";
import "./ItemInteraction.css"
import { useInventoryNavigation } from "../../context/useInventoryNavigation";
import { isValidQuantity } from "../../utils/isValidQuantity";

function ItemInteraction ({ selectedItem, inventoryView, setInventoryView }){
    const { appData, setAppData } = useAppData();
    const { items } = appData;
    const [isVisible, setIsVisible] = useState(false);
    const { deeperSection, setDeeperSection, closeAllPanels } = useInventoryNavigation();//deeperSection holds null, pending, or history//
    const [isDisabled, setIsDisabled] = useState(false); // Checks whether the input has a number with at most one decimal place //

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
    const [tempQuan, setTempQuan] = useState(displayItem?.quantity ?? 0);//tempQuan is supposed to hold user inputs in tenth in number type when appropriate//

    if(!displayItem){
        return null;
    }

    const upcomingQuantity = calUpcomingQuantity(displayItem);

    useEffect(() => {
        if(displayItem){
            setTempQuan(displayItem.quantity);
            setIsDisabled(false)
        }
    }, [selectedItem, displayItem?.quantity])

    function handleClick(e){
        setDeeperSection(e.target.name);
    }

    function handleChange(e){
        const value = e.target.value;

// set tempQuan for display //

        setTempQuan(value);

// validation for input data type. Stores data in number type only when the data is valid //
        if(!isValidQuantity(value)){
            setIsDisabled(true);
        } else if(Number(value) < 0 || Number(value) > 1000){
            setIsDisabled(true);
            setTempQuan(Number(value) * 10);
        } else {
            setIsDisabled(false);
            setTempQuan(Number(value) * 10);
        }
    }

    function handleSubmit(e){
        e.preventDefault();

        const confirmedQuanData = adjustInventory(appData, selectedItem, tempQuan);

        if(!confirmedQuanData.success){
            console.error(confirmedQuanData.error);
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
                        setIsDisabled(false);
                    }
                }}>

                <h3>{displayItem.name}</h3>

                {deeperSection === null && (
                <div className="regular-section"> 

                    <h4>数量変更</h4>

                    <form 
                        id="quantity-control-panel"
                        onSubmit={handleSubmit}
                    >
                        <div className="quantity-control">
                            <button 
                                type="button"
                                name="decrease"
                                onClick={() => setTempQuan(previous => previous - 10 )}
                                disabled={isDisabled || tempQuan - 10 < 0}
                            >-</button>

                            <input
                                type="number"
                                className="quantity"
                                min="0"
                                max="1000"
                                step="0.1"
                                value={typeof tempQuan === "number" ? tempQuan / 10 : tempQuan}
                                onChange={e => handleChange(e)}
                            />

                            <button
                                type="button"
                                name="increase"
                                onClick={() => setTempQuan(previous => previous + 10)}
                                disabled={isDisabled || tempQuan + 10 > 10000}
                            >+
                            </button>
                        </div>

                        {upcomingQuantity ? (
                            <p className="additional-info"> + (注文済み {upcomingQuantity / 10})</p>
                            ) 
                            : 
                            <p className="additional-info"></p>
                        }

                        {(isDisabled || tempQuan > 10000 || tempQuan < 0) && (
                            <div className="invalid-error-container">
                                <span className="error-message first-line">有効な数字(0~1000、小数点第1位まで)</span>
                                <span className="error-message second-line">を入力して下さい。</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="confirmation-btn clickable-button"
                            disabled={isDisabled || displayItem.quantity === tempQuan || tempQuan > 10000}
                        >確定
                        </button>                         
                    </form>
                
                    <div className="deeper-section">
                        {displayItem.replenishmentMethod === "ORDER" && (
                            <button
                                type="button"
                                className="clickable-button"
                                name="pending"
                                onClick={(e) => handleClick(e)}
                            >⬅︎ 注文
                            </button>
                        )}

                        <button
                            type="button"
                            name="history"
                            className="clickable-button"
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