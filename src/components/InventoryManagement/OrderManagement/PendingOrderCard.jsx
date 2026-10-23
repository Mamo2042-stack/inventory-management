import { useState } from "react";
import formatDateTime from "../../../utils/formatDateTime";

function PendingOrderCard ({ order, unit, setSelectedOrder, setAnyDetailModal }){
    const { orderedQuantity, receivedQuantity, orderDate } = order;

    const displayDate = formatDateTime(orderDate);

    return (
        <>
            <button
                type="button"
                className="order-card"
                onClick={() => {
                    setSelectedOrder(order.id)
                    setAnyDetailModal("receipt")
                }}
            >
                <h5 className="order-date">{displayDate}</h5>

                <div class="order-quantity">
                    <p>注文数: {orderedQuantity} {unit}</p>
                    <p>受取済み: {receivedQuantity} {unit}</p>
                </div>
            </button>
        </>
    )
}

export default PendingOrderCard;