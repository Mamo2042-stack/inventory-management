import { useState } from "react";
import formatDateTime from "../../../utils/formatDateTime";

function PendingOrderCard ({ order, unit, setSelectedOrder, setAnyDetailModal }){
    const { orderedQuantity, receivedQuantity, orderDate } = order;

    const displayDate = formatDateTime(orderDate);

    return (
        <>
            <button
                type="button"
                onClick={() => {
                    setSelectedOrder(order.id)
                    setAnyDetailModal("receipt")
                }}
            >
                <h5>{displayDate}</h5>

                <p>注文数: {orderedQuantity}{unit}</p>
                <p>受取済み: {receivedQuantity}{unit}</p>
            </button>
        </>
    )
}

export default PendingOrderCard;