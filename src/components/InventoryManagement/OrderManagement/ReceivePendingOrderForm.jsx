import { useState } from "react"
import receiveOrder from "../../../operations/receiveOrder";
import { useAppData } from "../../../context/AppDataContext";

function ReceivePendingOrderForm ({ selectedOrder, pendingOrders, setAnyDetailModal, selectedItem }){
    const { appData, setAppData } = useAppData();
    const [isChecked, setIsChecked] = useState(false);
    const selectedOrderData = pendingOrders.find(order => order.id === selectedOrder)
    const { orderedQuantity, receivedQuantity } = selectedOrderData;
    const [userInput, setUserInput] = useState(orderedQuantity - receivedQuantity);

    console.log(selectedOrder, selectedOrderData, orderedQuantity)

    function handleCheckboxChange(e){
        setIsChecked(e.target.checked);
    }

    function handleInputChange(e){
        setUserInput(e.target.value);
    }


    function handleSubmit(e){
        e.preventDefault();

        const input = Number(userInput);
        const result = receiveOrder(appData, selectedItem, selectedOrder, input);
        
        if(!result.success){
            console.log(result.error);
            return;
        }

        setAppData(result.data);
        setAnyDetailModal(null);
    }

    return (
        <form 
            onSubmit={e => handleSubmit(e)} 
        >
            <fieldset>
                <legend>オーダー受取</legend>

                <input
                    type="checkbox"
                    id="is-partial-receive"
                    checked={isChecked}
                    onChange={handleCheckboxChange}              
                />
                <label htmlFor="is-partial-receive">一部受取</label>
                    
                {isChecked && (
                    <div>
                    <p>未受取数: {orderedQuantity - receivedQuantity}</p>

                    <label htmlFor="received-quantity">受取数</label>
                    <input
                        type="number"
                        max={orderedQuantity - receivedQuantity}
                        min="1"
                        id="received-quantity"
                        value={userInput}
                        onChange={e => handleInputChange(e)}
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
                            setAnyDetailModal(null)
                        }}
                    >閉じる
                    </button>
            </fieldset>
        </form>
    )
}

export default ReceivePendingOrderForm;