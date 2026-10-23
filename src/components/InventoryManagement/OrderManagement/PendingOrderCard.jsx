import { useState } from "react";
import formatDateTime from "../../../utils/formatDateTime";
import ReceivePendingOrderForm from "./ReceivePendingOrderForm";

function PendingOrderCard ({ order, unit, selectedItem }){
    const { orderedQuantity, receivedQuantity, orderDate } = order;
    const [isReceiving, setIsReceiving] = useState(false);
    
    const displayDate = formatDateTime(orderDate);

    return (
        <>
        <div className={`order-info ${isReceiving ? "is-open" : ""}`}>
            <button
                type="button"
                className="order-card"
                onClick={() => {
                    setIsReceiving(true)
                }}
            >
                <h5 className="order-date">{displayDate}</h5>

                <div className="order-quantity">
                    <p>注文数: {orderedQuantity} {unit}</p>
                    <p>受取済み: {receivedQuantity} {unit}</p>
                </div>
            </button>
        </div>

        <div className="receipt">
            {isReceiving && (
                <ReceivePendingOrderForm
                    order={order}//order data//
                    setIsReceiving={setIsReceiving}
                    selectedItem={selectedItem}
                />
            )}
        </div>
        </>
    )
}

export default PendingOrderCard;