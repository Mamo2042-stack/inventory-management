import { useState } from "react";
import formatDateTime from "../../utils/formatDateTime";

function PendingOrderCard ({ order, unit, setDeeperSection }){
    const { orderedQuantity, receivedQuantity, orderDate } = order;
    const [isReceivingModalOpen, setIsReceivingModalOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const displayDate = formatDateTime(orderDate);
    console.log(displayDate);

    function handleClick(){
        setIsReceivingModalOpen(true);
    }

    function handleChange(e){
        setIsChecked(e.target.checked);
    }

    return (
        <>
            <button
                type="button"
                onClick={handleClick}
            >
                <h4>{displayDate}</h4>

                <p>注文数: {orderedQuantity}{unit}</p>
                <p>受取済み: {receivedQuantity}{unit}</p>
            </button>

            {isReceivingModalOpen && (
                <form 
                
                >
                <fieldset>
                    <legend>オーダー受取</legend>

                    <input
                        type="checkbox"
                        id="is-partial-receive"
                        checked={isChecked}
                        onChange={handleChange}
                    />
                    <label htmlFor="is-partial-receive">一部受取</label>
                    
                    {isChecked && (
                        <div>
                        <p>未受取数: {order.orderedQuantity - order.receivedQuantity}</p>

                        <label htmlFor="received-quantity">受取数</label>
                        <input
                            type="number"
                            max={orderedQuantity - receivedQuantity}
                            min="1"
                            id="received-quantity"
                        />
                        </div>
                    )}

                    <button
                        type="submit"
                    >登録</button>

                    <button
                        type="button"
                        onClick={() => {
                            setIsChecked(false)
                            setIsReceivingModalOpen(false)
                        }}
                    >閉じる
                    </button>
                </fieldset>
                </form>
            )}
        </>
    )
}

export default PendingOrderCard;