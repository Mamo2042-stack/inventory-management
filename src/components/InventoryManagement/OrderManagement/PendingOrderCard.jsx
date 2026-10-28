import { useState } from "react";
import formatDateTime from "../../../utils/formatDateTime";
import ReceivePendingOrderForm from "./ReceivePendingOrderForm";

function PendingOrderCard ({ order, unit, selectedItem }){
    const { orderedQuantity, receivedQuantity, orderDate } = order;
    const [isReceiving, setIsReceiving] = useState(false);
    
    const displayDate = formatDateTime(orderDate);

    return (
        <>
        <div className={`order-card ${isReceiving ? "is-open" : ""}`}>
            <button
                type="button"
                className="order-button"
                onClick={() => {
                    setIsReceiving(prev => !prev)
                }}
            >
                <h5 className="order-date">{displayDate}</h5>

                <div className="order-quantity">
                    <p>注文数: {orderedQuantity / 10} {unit}</p>
                    <p>受取済み: {receivedQuantity / 10} {unit}</p>
                </div>
            </button>

            <div>
                {isReceiving && (
                    <ReceivePendingOrderForm
                        order={order}//order data//
                        setIsReceiving={setIsReceiving}
                        selectedItem={selectedItem}
                    />
                )}
            </div>
        </div>
        </>
    )
}

export default PendingOrderCard;